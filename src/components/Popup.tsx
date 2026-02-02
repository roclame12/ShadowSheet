import { ReactNode, Dispatch, SetStateAction } from "react";
import { useOnClickAway } from "../hooks.ts";
import styles from "../CSS/components/Popup.module.css"


interface PopupProps {
    children: ReactNode | ReactNode[];
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>

    className?: string;
}

export default function Popup(props: PopupProps) {
    const close = () => props.setOpen(false);

    if (props.open) return (
        <div className={ styles.backDrop }>
            <div className={styles.container} ref={ useOnClickAway(close) }>
                <div className={styles.closeContainer}>
                    <button onClick={ close }>
                        <img src="/icons/close.svg" alt="close icon" />
                    </button>
                </div>
               <div className={props.className ? props.className : ""}>{ props.children }</div>
            </div>
        </div>
    )
    return (<></>)
}