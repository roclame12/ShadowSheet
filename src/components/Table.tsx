import React, {} from 'react';
import styles from "../CSS/components/Table.module.css"


interface TableProps {

}

export default function Table(props: TableProps) {
    return (
        <div className={styles.container}>
            <table>
            </table>
        </div>
    )
}