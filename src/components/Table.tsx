import React, { ReactElement } from 'react';
import "../CSS/components/Table.css"

export interface TableProps {
    header: string[];                           // the header for each column
    rowItems: React.ComponentType<RowProps>[];  // an array containing the Components will display, these components should be the same
    columns?: number;                           // the amount of columns that the table should display at once (defaults to 1)
}


interface RowProps {
    children: ReactElement[]  // the Child elements of the
    inLastCol: boolean
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


function Column({header, children, isLast}: {header: string[]; children: ReactElement[]; isLast?: boolean}) {
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
    return (
        <div className="table-container">
            <Column header={props.header} isLast={false}>
                <Row>
                    <p>blah1</p>
                    <p>blah2</p>
                </Row>
                <Row>
                    <p>blah3</p>
                    <p>blah4</p>
                </Row>
                <Row>
                    <p>blah5</p>
                    <p>blah6</p>
                </Row>
            </Column>
            <Column header={props.header} isLast={true}>
                <Row>
                    <p>blah1</p>
                    <p>blah2</p>
                </Row>
                <Row>
                    <p>blah3</p>
                    <p>blah4</p>
                </Row>
            </Column>
        </div>
    )
}