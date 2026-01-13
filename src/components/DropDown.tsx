import React, {ReactElement, useState, createContext, useContext, useEffect, useRef} from "react"
import styles from "../CSS/components/Dropdown.module.css"

/**
 * Simple interface that bundles together the label for a piece of data and it's actual value
 *
 * @property label The human-readable representation for a piece of data
 * @property value the data itself
 */
interface keyPair {
    label: string;
    value: string | number;
}

// context for the setter that determines which Item is selected within the body of the DropDown
const selectedContext = createContext<React.Dispatch<React.SetStateAction<keyPair>> | null>(null);

// context for the setter that controls whether the DropDown's menu should be shown or not
const visibleContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null);


/**
 * Custom hook that  allows for the Dropdown menu to be dismissed whenever the user clicks outside the menu.
 * Intended to be attached to the container of the DropDown
 *
 * @param setIsExpanded the setter for the state variable that expands the menu
 */
function useLightDismiss(setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            // if the HTML reference is valid and the mouse click is outside the div, close the dropdown menu
            if (ref.current && !ref.current.contains(event.target as Node)) setIsExpanded(false);
        }

        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick); }
    }, []);

    return ref;
}


/**
 * Component that controls the chevron icon indicating whether the DropDown is expanded or not
 *
 * @param isActive state component that represents whether the DropDown is open or not3
 */
function Icon({isActive} : {isActive: boolean}): ReactElement {
    const imgClass = isActive ? styles.icon : `${styles.icon} ${styles.iconFlipped}`;
    const imgAlt = isActive ? "Close Dropdown?" : "Open Dropdown?";

    return ( <img src={ "/icons/chevron_up.svg" } className={ imgClass } alt={ imgAlt }/> )
}


/**
 * Props for Item
 *
 * @param children  A label for the item. The "human-readable" representation of the item
 * @param value     What the option represents internally. (Will default to the value of children)
 * @param className CSS class to add to the component
 */
interface ItemProps {
    children: string;
    value?: string | number;
    className?: string;
}

/**
 * A selectable option within the <DropDown>.
 * Clicking an option within the DropDown menu selects the value that the <Item> represents and closes the menu
 *
 * @param props props defined by {@link ItemProps}
 */
function Item (props: ItemProps) {
    const itemPair: keyPair = {
        label: props.children,
        value: props.value ? props.value : props.children
    }

    // make it so if both contexts are defined, make a function that'll set the selected to the Item's value and then close the menu
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
            className={ props.className ? `${styles.item} ${props.className}` : styles.item }
        >
            {props.children}
        </button>
    )
}


/**
 * props for <Menu>
 *
 * @property isExpanded  state variable that controls whether the menu should be open or not
 * @property setExpanded setter for isExpanded
 * @property setSelected setter for the Item that is Selected within the dropdown
 * @property children    the <Items> that are contained within the menu
 */
interface MenuProps {
    isExpanded: boolean,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    setSelected: React.Dispatch<React.SetStateAction<keyPair>>,
    children: ReactElement[]
}

/**
 * Component that represents the menu that appears when a user expands the DropDown menu.
 * Component is responsible for providing the context for all <Items> within the <DropDown>
 *
 * @param props props defined by {@link MenuProps}
 */
function Menu(props: MenuProps) {
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


/**
 * Props for <DropDown>
 *
 * @property children  an array of <DropDown.Item> passed to DropDown. Each <Item> represents an option that a user can select within the dropdown.
 * @property className the CSS class that the <DropDown> belongs to. This applies to the outer container of the component
 * @property id        the CSS id that the <DropDown> belongs to. This applies to the outer container of the component
 */
interface DropDownProps {
    children: ReactElement<ItemProps>[];
    className?: string;
    id?: string;
}

/**
 * Allows for a user to select one option from a list of options. The options that can be controlled by the dropdown can
 * be passed to <dropdown> through the use of <Item> components.
 *
 * @example
 *     <DropDown>
 *         <DropDown.Item>text to be shown in Dropdown Menu</DropDown.Item>
 *         <DropDown.Item value="some internal data">label that differs from value</DropDown.Item>
 *     </DropDown>
 *
 * @param props props defined by {@link DropDownProps}
 * @see Item
 */
export default function DropDown(props: DropDownProps): ReactElement {
    const [isExpanded, setExpanded] = useState<boolean>(false)
    const [selected, setSelected] = useState<keyPair>({label: "", value: ""}); // this might need to be lifted later for non-demo purposes
    const dismissRef = useLightDismiss(setExpanded);

    return (
        <div
            id={props.id ? props.id : ""}
            className={ `${styles.container} ${props.className ? props.className : ""}` }
            ref={ dismissRef }
        >
            <div className={ `${styles.inputBox} global-text-box-body` } onClick={() => {setExpanded(!isExpanded)}}>
                <p>{selected.label}</p>
                <Icon isActive={ isExpanded }/>
            </div>
            <Menu isExpanded={ isExpanded } setExpanded={ setExpanded } setSelected={ setSelected }>
                { props.children }
            </Menu>
        </div>
    )
}

DropDown.Item = Item;