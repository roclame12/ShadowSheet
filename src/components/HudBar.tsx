import "../CSS/components/Hudbar.css"
import {ReactElement} from "react";


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


export interface HudBarProps {

}

export default function HudBar(props: HudBarProps) {

    return (
        <div className="hudbar-container">
            <Stat statName="Name" current={0} max={0}/>
            <Stat statName="Health" current={123} max={123}/>
            <Stat statName="Stun" current={123} max={123}/>
            <Stat statName="Karma" current={123} max={123} separator="|"/>
            <Stat statName="Money" current={1234} max={5678} separator="" decoration={<p className="stat-text">$</p>}/>
        </div>
    )
}