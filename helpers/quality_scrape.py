import sqlite3
import bs4
import re
import requests
import json
from typing import TypedDict, Optional
from enum import Enum


class LimitOperator(Enum):
    GREATER_THAN = "gt"
    LESS_THAN = "lt"
    EQUAL_TO = "eq"
    NOT_EQUAL = "ne"

class Limitation(TypedDict):
    """
    Maps to the "limitations" section of the Quality dict.

    MEMBERS:
        key: Key within the global state that the limitation would affect.
        operator: the operator to compare the key against the value. GREATER_THAN and LESS_THAN can only be used on numbers, EQUAL_TO and NOT_EQUAL can be used on either numbers or strings.
        value: value of the limitation. Can either be a number or a string.

    EXAMPLE:
        If a source book states that a character "needs to have a magic rating to take this quality", the limitation
        would be the following:
        { key: "magic", operator: LimitOperator.GREATER_THAN, value: "1" }
    """
    key: str
    operator: LimitOperator
    value: str


class EffectOperator(Enum):
    ADD = "+"
    SUB = "-"
    MUL = "*"
    DIV = "/"

class Effect(TypedDict):
    """
    maps to the "effects" section of the Quality dict.

    MEMBERS:
        key: Key within the global state that the effect would modify.
        operator: how the value would modify the key
        modifier: how the value would modify the key

    EXAMPLE:
        If a source book states that a quality gives "+2 DP to sneaking checks", the effect would be the following:
        { key: "sneaking", operator: EffectOperator.ADD, modifier: 2 }
    """
    key: str
    operator: EffectOperator
    modifier: int


class Quality(TypedDict):
    """
    Matches the schema of the Qualities table.

    MEMBERS:
        name: name of the quality.
        positive: True if it's a positive trait, False if negative.
        metagenic: True if it's a metagenic trait, False if not.
        cost: the amount of karma the trait costs/awards.
        rating: the amount of times the trait can be taken
        src: the source book the trait comes from
        description: the description that the book gives of the trait
        condition: A string explaining a situation where the quality would apply
        limitations: list of limitation dicts
        effects: list of effect dicts
    """
    name: str
    positive: bool
    metagenic: bool
    cost: int
    rating: int
    src: str
    description: str
    condition: Optional[str]
    limitations: list[Limitation]
    effects: list[Effect]


def group(url: str) -> list[bs4.BeautifulSoup] | None:
    """
    Groups the Quality entries in the ShadowRun wiki into their own BeautifulSoup objects to make further scraping easier.
    The function does this by gathering everything between the <h2> tags in the wiki page.

    :param url: the page of the ShadowRun wiki to scrape
    :return: a list of BeautifulSoup objects that includes everything from the header of the section to end of the entry. In the case of error the function will return None
    """

    # request the site and then have bs parse it
    response = requests.get(url)
    if response.status_code == 200:
        soup = bs4.BeautifulSoup(response.text, "html.parser")
    else:
        print(f"failed to reach site, got code {response.status_code}")
        return None

    # trim the first <h2> tag as that's the header for the table of contents, and the last as that's a header in the footer
    tags = soup.find_all("h2")[1:-1]

    sections = []
    for i, tag in enumerate(tags):
        content = [tag]
        current = tag.next_sibling

        while current:
            if i < len(tags) - 1 and current == tags[i + 1]:
                break
            if hasattr(current, "get") and current.get("class") == "printfooter":
                break


            if current.name:
                content.append(current)
            current = current.next_sibling

        section_html = "".join(str(item) for item in content)
        sections.append(bs4.BeautifulSoup(section_html, "html.parser"))

    return sections


def create_entry(section: bs4.BeautifulSoup, positive: bool, metagenic: bool):
    name = section.find("span", class_="mw-headline").text
    description = section.find("p").text

    rows = section.find("tr")

    cost = re.search("[0-9]+", rows.contents[1].text).group()
    for i in range(4): rows = rows.next_sibling

    print(rows.contents)






def main():
    # connection = sqlite3.connect("qualities.db")
    # cursor = connection.cursor()
    #
    # with connection:
    #     cursor.execute("""
    #                    CREATE TABLE IF NOT EXISTS qualities (
    #                         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #                         name TEXT,
    #                         positive BOOLEAN      -- true if positive, false if negative
    #                         cost INTEGER,         -- the karma cost for the quality
    #                         rating INTEGER,       -- the maximum amount of times this quality can be taken
    #                         src INTEGER,          -- enum describing the sourcebook that the quality came from
    #                         description TEXT,     -- The source book's description of what the quality does
    #                         conditional TEXT,     -- whether the quality applies constantly or only under certain circumstances
    #                         limitations TEXT,     -- JSON of global state variables that must be satisfied for the trait to be choosable
    #                         effects TEXT          -- JSON of effects that the quality has, maps directly to *put python class here* objects
    #                    )
    #                    """)
    url = "http://adragon202.no-ip.org/Shadowrun/index.php/SR5:Positive_Qualities"

    sections = group(url)
    create_entry(sections[0], positive=False, metagenic=False)


if __name__ == "__main__": main()