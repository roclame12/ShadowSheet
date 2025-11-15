import "../CSS/components/Footer.css"
import {ReactElement, useState} from "react";

export enum Pages {
    character,
    combat,
    gear,
    lore
}


export default function Footer() {
    const [page, setPage] = useState<Pages>(Pages.character);  // state is most likely going to need to be lifted to App.tsx, it's here right now for demo purposes

    const pageNames = Object.keys(Pages).filter(key => !isNaN(Number(Pages[key])));
    const pageTooltips = ["Your character's skills and talents", "Your character's weapons and attacks", "Your character's stuff", "Your character's backstory"]

    const elements: ReactElement[] = [];
    for (let i = 0; i < pageNames.length; i++) {
        elements.push(
            <button
                className="footer-button"
                onClick={() => { setPage(i) }}
                title={pageTooltips[i]}
            >
                { page === i ? <b>{ pageNames[i] }</b> : <p>{ pageNames[i] }</p>}
            </button>
        )
        ;
        i !== pageNames.length - 1 ? elements.push(<p className="separator">|</p>) : elements.push();
    }

    return (
        <div className="footer-container">
            { elements }
        </div>
    )
}