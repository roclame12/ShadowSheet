import React, { ReactNode } from "react";
import styles from "../CSS/components/Popup.module.css"


interface PopupProps {
    children: ReactNode | ReactNode[];
    className?: string;
}

export default function Popup(props: PopupProps) {

    return (
        <div className={styles.blur}>
            <div className={ props.className ? `${props.className} ${styles.container}` : styles.container}>
                { props.children }
            </div>
        </div>
    )
}