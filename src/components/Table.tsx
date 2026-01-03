import React, {ReactNode} from 'react';
import styles from "../CSS/components/Table.module.css"


/**
 * interface that determines the layout of the table.
 *
 * @property text  What the text should say
 * @property width the percentage of the sub-table the column should take up. Component assumes that the given widths add up to 100%
 */
interface HeaderObj {
    text: string;
    width?: number;
}

/**
 * Function to format HeaderObjs into table cells that have an appropriate width for the table.
 *
 * @param headers the HeaderObjs that are passed to {@link Table}
 * @param subTables the amount of "subtables" the table has. See {@link Table} for a definition of what a subtable is.
 */
function formatHeaders(headers: HeaderObj[], subTables: number) {
    // figure out the total widths and throw an error if those widths are wrong
    const percentageSum = headers.reduce((sum: number, current) => {
        const adder = current.width ? current.width : 0;
        return sum + adder;
    }, 0)
    if (percentageSum > 100) throw "Percentage total for table should be no more than 100%";

    //return a formatted list of <td/> tags with the proper widths
    let formated: ReactNode[] = [];
    for (let i = 0; i < subTables; i++) {
        formated.push(...headers.map(
            (value) =>
                <td
                    style={{width: `${value.width ? (value.width / subTables) : {}}%`}}
                    key={value.text + i}
                >
                    {value.text}
                </td>
        ));
    }

    return formated;
}


/**
 * interface for Table's props
 *
 * @property header    an array of {@link HeaderObj} objects to determine the layout of the table
 * @property children  The components that will be contained within the table.
 * @property subTables How many times the header should repeat so the table can take up more space horizontally (defaults to 1)
 */
interface TableProps {
    header: HeaderObj | HeaderObj[];
    children: ReactNode | ReactNode[];
    subTables?: number
}

/**
 * A responsive table component that is styled appropriately for the app.
 *
 * Children will fill rows left to right. If there's not enough children to fill a row, whitespace will fill the remainder.
 *
 * To aid in maximizing the use of space, the table utilizes "subtables". Each subtable repeats the text of the header
 * into new columns to allow for more information per row to be displayed.
 *
 * @example<caption>The following creates a table with 4 equal width columns, and 8 total cells (including the header) with the last cell being empty</caption>
 * <Table header={[{text: "foo", width:50}, {text:"bar", width: 50}]} subTables={2}>
 *     <p>Lorem ipsum</p>
 *     <p>dolor sit</p>
 *     <p>amet, consectetur</p>
 * </Table>
 *
 * @param props the props for the table, defined in {@link TableProps}
 */
export default function Table(props: TableProps) {
    const subTables = props.subTables ? props.subTables : 1;
    const headers = Array.isArray(props.header) ? props.header : [props.header];

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        { formatHeaders(headers, subTables) }
                    </tr>
                </thead>
                <tbody>
                    { props.children }
                </tbody>
            </table>
        </div>
    )
}