import React, { ReactElement } from 'react';
import "../CSS/components/Table.css"

export interface TableProps {
    children: ReactElement[];  // an array containing the Components will display, these components should be the same
    header: string[];                           // the header for each column
    colTemplate: string;                        // The template on how the rows should be displayed. Uses grid-template-columns
    columns?: number;                           // the amount of columns that the table should display at once
}


interface RowProps {
    children: ReactElement[]  // the Child elements of the
}

export function Row(props: RowProps) {
    return (
        <div className="table-row">
            {props.children.map(item => ( /* Wrap everything in a div so it'll display correctly */
                <div className="row-child">
                    {item}
                </div>
            ))}
        </div>
    )
}


function Column(
    {header, children, isLast}:
    {header: string[]; children: ReactElement[]; isLast?: boolean}) {
    isLast === undefined ? isLast = false : null;

    return (
        <div className="column-container">
            <div className="column-grid" style={{"--cols": "1fr 2fr"}}>
                <div className="column-header" style={isLast ? {"--header-toggle": "none"} : {"--header-toggle": "\"\""}}>
                    {
                        header.map((item) => (
                            <div className="row-child">
                                <p><b>{item}</b></p>
                            </div>
                    ))
                    }
                </div>
                {children}
            </div>
        </div>
    )
}


/**
 * Creates a table with a header and a set number of columns. Provides a scrollbar if there's an overflow of items
 *
 * @param props see TableProps
 * @constructor
 */
export default function Table(props: TableProps) {
    const components: Array<ReactElement> = []
    const numColumns = props.columns === undefined ? 1 : props.columns;

    for (let i = 0; i < numColumns; i++) {
        components.push(
            <Column header={props.header} key={i}>
                {props.children.filter(
                    (_, j) => {
                        return j % numColumns === 0
                    })}
            </Column>
        )
    }

    return (
        <div className="table-container">
            {components}
        </div>
    )
}