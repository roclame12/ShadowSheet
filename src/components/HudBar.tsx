import "../CSS/components/Hudbar.css"
import { ReactElement, useState } from "react";


interface StatProps {
    statName: string;           // name of the stat to be displayed
    current: number;            // what the stat is currently at
    max: number;                // the highest that the stat can be
    separator?: string;         // the ASCII character you'd like between current and max (defaults to '/')
    decoration?: ReactElement;  // An extra node that can be used to display extra information about a stat (for example negative modifiers to your stats due to a lack of health)
}

function Stat(props: StatProps) {
    const separator = props.separator !== undefined ? props.separator : "/";
    const decoration = props.decoration ? props.decoration : null;

    return (
        <div className="stat-container">
            <h1 className="stat-header">{props.statName}:</h1>
            <p className="stat-text">{props.current} {separator} {props.max}</p>
            {decoration}
        </div>
    )
}


interface TextStatProps {
    statName: string;           // name of the stat to be displayed
    statText: string;           // the text of the stat to be displayed
    decoration?: ReactElement;  // An extra node that can be used to display extra information about a stat (for example negative modifiers to your stats due to a lack of health)
    className?: string;
}

function TextStat(props: TextStatProps) {
    const decoration = props.decoration !== undefined ? props.decoration : null;

    return (
        <div className="stat-container">
            <h1 className="stat-header">{props.statName}:</h1>
            <p className="stat-text">{props.statText}</p>
            {decoration}
        </div>
    )
}


function UpgradeButton({isActive, setActive}: {isActive: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>}) {
    const imgSrc = isActive ? "/icons/close.svg" : "/icons/arrow_upward.svg";
    const titleStr = isActive ? "Finish Upgrading?" : "Upgrade Your character's stats?";

    return (
        <button
            className="upgrade-button"
            title={ titleStr }
            onClick={() => { setActive(!isActive); }}
        >
            <img src={ imgSrc } alt="upgrade character" className="upgrade-button-icon"/>
        </button>
    )
}


export interface HudBarProps {
    // leaving this blank in the case I'll need some props later
}

export default function HudBar(props: HudBarProps) {
    const [isActive, setActive] = useState(false);

    return (
        <div className="hudbar-container">
            <TextStat statName="Name" statText="John Smith"/>
            <Stat statName="Health" current={ 120 } max={ 123 } decoration={ <b className="stat-modifier">-1</b> }/>
            <Stat statName="Stun" current={ 120 } max={ 123 } decoration={ <b className="stat-modifier">-1</b> }/>
            <Stat statName="Karma" current={ 123 } max={ 456 } separator="|" decoration={ <UpgradeButton isActive={ isActive } setActive={ setActive }/> }/>
            <TextStat statName="Money" statText="1234567890" decoration={ <p className="stat-text" >¥</p> }/>
        </div>
    )
}