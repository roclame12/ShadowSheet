import React, {ReactElement, useState, createContext, useContext, useEffect, useRef} from "react"
import styles from "../CSS/components/Dropdown.module.css"

interface keyPair {
    label: string;
    value: string | number;
}

const selectedContext = createContext<React.Dispatch<React.SetStateAction<keyPair>> | null>(null);
const visibleContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);


/**
 * Custom React hook that allows for the dropdown to be "light Dismissed", allowing for the Dropdown menu to
 * be dismissed whenever the user clicks outside the menu
 *
 * @param setIsExpanded the setter for the state variable that expands the menu
 */
function useLightDismiss(setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            // if the HTML reference is valid and the mouse click is outside the div, close the dropdown menu
            if (ref.current && !ref.current.contains(e.target as Node)) setIsExpanded(false);
        }

        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick); }
    }, []);

    return ref;
}


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


interface DDItemProps {
    children: string;
    value?: string | number;
}


export function DDItem (props: DDItemProps) {
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
        <visibleContext.Provider value={ props.setExpanded }>
            <selectedContext.Provider value={ props.setSelected }>
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
    id?: string;
}

export default function DropDown(props: DropDownProps): ReactElement{
    const [isExpanded, setExpanded] = useState<boolean>(false)
    const [selected, setSelected] = useState<keyPair>({label: "", value: ""});
    const dismissRef = useLightDismiss(setExpanded);

    return (
        <div
            id={props.id ? props.id : ""}
            className={ `${styles.container} ${props.className ? props.className : ""}` }
            ref={ dismissRef }
        >
            <div className={ `${styles.inputBox} global-text-box-body` } onClick={() => {setExpanded(!isExpanded)}}>
                <p>{selected.label}</p>
                <ExpandBtn isActive={ isExpanded } setActive={ setExpanded }/>
            </div>
            <DropDownMenu isExpanded={ isExpanded } setExpanded={ setExpanded } setSelected={ setSelected }>
                { props.children }
            </DropDownMenu>
        </div>
    )
}
