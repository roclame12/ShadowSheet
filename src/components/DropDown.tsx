import React, {ReactElement, useState, createContext, useContext} from "react"
import styles from "../CSS/components/Dropdown.module.css"

interface keyPair {
    label: string;
    value: string | number;
}

const selectedContext = createContext<React.Dispatch<React.SetStateAction<keyPair>> | null>(null);
const visibleContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);

function ExpandBtn(
    {isActive, setActive}:
    {isActive: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>}) {
    const imgClass = isActive ? styles.icon : `${styles.icon} ${styles.iconFlipped}`;
    const imgAlt = isActive ? "Close Dropdown?" : "Open Dropdown?";

    return (
        <button onClick={() => { setActive(!isActive); }} className={ styles.btn }>
            <img src={ "/icons/chevron_up.svg" } className={ imgClass } alt={ imgAlt }/>
        </button>
    )
}


interface DropDownItemProps {
    children: string;
    value?: string | number;
}


export function DropDownItem (props: DropDownItemProps) {
    const itemPair: keyPair = {
        label: props.children,
        value: props.value ? props.value : props.children
    }

    const setSelected = useContext(selectedContext);
    const setActive = useContext(visibleContext);
    const handleClick = setSelected && setActive ?
        () => {
        setSelected(itemPair);
        setActive(false);
    }
        :
        () => {};

    return (
        <button
            key={ itemPair.value }
            onClick={ handleClick }
            className={ styles.item }
        >
            {props.children}
        </button>
    )
}


interface DropDownMenuProps {
    isExpanded: boolean,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setSelected: React.Dispatch<React.SetStateAction<keyPair>>,
    children: ReactElement[]
}

function DropDownMenu(props: DropDownMenuProps) {
    return (
        <visibleContext.Provider value={props.setExpanded}>
            <selectedContext.Provider value={props.setSelected}>
                <div className={ styles.menu }>
                    { props.isExpanded && props.children }
                </div>
            </selectedContext.Provider>
        </visibleContext.Provider>
    )
}


interface DropDownProps {
    children: ReactElement[];
    className?: string;
}

export default function DropDown(props: DropDownProps): ReactElement{
    const [isExpanded, setExpanded] = useState<boolean>(false)
    const [selected, setSelected] = useState<keyPair>({label: "", value: ""});

    return (
        <div className={ styles.container }>
            <div style={{width: "100px", display: "flex", flexDirection: "row"}}>
                <p>{selected.label}</p>
                <ExpandBtn isActive={ isExpanded } setActive={ setExpanded }/>
            </div>
            <DropDownMenu isExpanded={ isExpanded } setExpanded={ setExpanded } setSelected={ setSelected }>
                { props.children }
            </DropDownMenu>
        </div>
    )
}
