import React, { ReactElement, CSSProperties } from 'react';
import "../CSS/components/Table.css"

export interface TableProps {
    children: ReactElement[];                   // an array containing the Components will display, these components should be the same
    header: string[];                           // the header for each column
    colTemplate: string;                        // The template on how the rows should be displayed. Uses grid-template-columns
    columns?: number;                           // the amount of columns that the table should display at once
    style?: CSSProperties;                      // a way to style the table in-line if desired
}


/**
 * Wrapper intended to be used with Table. Formats ReactElements to better work within the table's rows.
 *
 * @param children the child elements of the row
 */
export function Row({ children }: {children: ReactElement[]}): ReactElement {
    return (
        <div className="table-row" role="row">
            {children.map(item => ( /* Wrap everything in a div so it'll display correctly */
                <div className="row-child">
                    {item}
                </div>
            ))}
        </div>
    )
}


/**
 * A column of the Table. Each Column contains it's own sub-columns that are enforced through a grid.
 *
 * @param header the header for the column, gives labels for each sub-column of the column
 * @param children the Rows of the table
 * @param colTemplate the way that the rows of the table should be laid out.
 * @param isLast Whether this is the last column in the table
 */
function Column(
    {header, children, colTemplate, isLast}:
    {header: string[]; children: ReactElement[]; colTemplate: string; isLast?: boolean}) {
    isLast === undefined ? isLast = false : null;

    return (
        <div className="column-container">
            <div className="column-grid" style={{"--cols": colTemplate}}>
                <div className="column-header" style={isLast ? {"--header-toggle": "none"} : {"--header-toggle": "\"\""}} role="columnheader">
                    {
                        header.map((item) => (
                            <div className="row-child">
                                <p><b>{item}</b></p>
                            </div>
                    ))}
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
    const tableStyle = props.style === undefined ? {} : props.style;

    for (let i = 0; i < numColumns; i++) {
        components.push(
            <Column header={props.header} colTemplate={props.colTemplate} key={i}>
                {props.children.filter(
                    (_, j) => {
                        return j % numColumns === i
                    })}
            </Column>
        )
    }

    return (
        <div className="table-container" style={tableStyle} role="table">
            {components}
        </div>
    )
}