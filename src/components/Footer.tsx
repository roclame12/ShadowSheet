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
    const elements: ReactElement[] = [];
    for (let i = 0; i < pageNames.length; i++) {
        elements.push(
            <button
                className="footer-button"
                onClick={() => { setPage(i) }}
            >
                { page === i ? <b>{ pageNames[i] }</b> : <p>{ pageNames[i] }</p>}
            </button>
        )
        ;
        elements.push(<p className="separator"> | </p>);
    }

    return (
        <div className="footer-container">
            { elements }
        </div>
    )
}