import { ReactNode } from 'react';
import styles from "../CSS/components/Table.module.css"


/**
 * interface that determines the layout of the table.
 *
 * @property text  What the text should say
 * @property width the percentage of the sub-table the column should take up. Components assume that the given widths add up to 100%
 */
interface HeaderObj {
    text: string;
    width: number;
}


/**
 * Props for {@link Head}
 *
 * @property headers outlines the text you'd like to display in the heading row and the width (if using {@link HeaderObj}) that you'd like it to be
 * @property subTables the amount of subTables in the Table. See {@link Table} for a definition of what a subtable is.
 */
interface HeadProps {
    headers: Array<HeaderObj | string> | string | HeaderObj;
    subTables: number;
}

/**
 * Constructs the header row for {@link Table}. Can implicitly determine the width of the rows by the headers given to it.
 * HeaderObjs give an explicit percentage width of the subtable to take up, while strings will take whatever space that
 * is remaining.
 *
 * @param props the props for the Head, defined by {@link HeadProps}
 */
function Head(props: HeadProps) {
    const headers = Array.isArray(props.headers) ? props.headers : [props.headers]

    // figure out the total width and throw an error if that width is larger than 100%
    const percentageSum = headers.reduce((sum: number, current): number => {
        const adder = typeof current === "string" ? 0 : current.width;
        return sum + adder;
    }, 0)
    if (percentageSum > 100) throw "Percentage total for table should be no more than 100%";

    const undefinedWidths = headers.reduce( (sum: number, current) => {
            const adder = typeof current === "string" ? 1 : 0;
            return sum + adder;
        }, 0)
    const fillWidth = (100 - percentageSum) / undefinedWidths;

    // construct a formatted list of <td/> tags with the proper widths
    let formated: ReactNode[] = [];
    for (let i = 0; i < props.subTables; i++) {
        formated.push(
            ...headers.map(
                (value) => {
                    const style = typeof value === "string" ?
                        { width: `${ fillWidth / props.subTables }%`} :
                        { width: `${ value.width / props.subTables }%`};
                    const text = typeof value === "string" ? value : value.text;

                    return ( <td style={style} key={text + i}>{ text }</td> )
            })
        );
    }

    return (
        <thead>
            <tr>
                { formated }
            </tr>
        </thead>
    );
}


/**
 * Props for {@link Body}
 *
 * @property children The children passed to {@link Table}
 * @property headerNum the amount of headers per sub table
 * @property subTables the amount of subTables in the Table. See {@link Table} for a definition of what a subtable is.
 */
interface BodyProps {
    children: ReactNode | ReactNode[];
    headerNum: number;
    subTables: number;
}

/**
 * Component that handles the formating of the table's body. Takes the children passed to {@link Table} and then places
 * them into a table body with rows with the same amount of cells as columns within the table.
 *
 * @param props the props for the Body, defined in {@link BodyProps}
 * @constructor
 */
function Body(props: BodyProps) {
    const columns = props.headerNum * props.subTables;

    // stack the children with fragments until there's enough elements to be even with the amount of columns in the table
    let children = Array.isArray(props.children) ? [...props.children] : [props.children];
    for (let i = 0; i < (children.length % columns); i++) {
        children.push(<></>)
    }

    // put each child into a table row, then put that row into formatted
    let formatted: ReactNode[] = [];
    for (let j = 0; j < (children.length / columns); j++) {
        const slice = children.slice(j * columns, (j + 1) * columns);

        const formattedSlice = slice.map((value, i) => {
            // if the column number of a cell is at the boundary of a sub table, add a border to the right of the cell
            return (i + 1) % (columns / props.subTables) === 0 && (i + 1) !== slice.length ?
                <td className={styles.borderRow} key={`row${j}-${i}`}>{value}</td> :
                <td key={`row${j}-${i}`}>{value}</td>
        });
        
        formatted.push(<tr key={j}>{formattedSlice}</tr>)
    }

    return (<tbody>{ formatted }</tbody>)
}


/**
 * Props for {@link Table}
 *
 * @property header    an array of {@link HeaderObj} objects to determine the layout of the table
 * @property children  The components that will be contained within the table.
 * @property subTables How many times the header should repeat so the table can take up more space horizontally (defaults to 1)
 */
interface TableProps {
    header: HeaderObj | string | Array<HeaderObj | string>;
    children: ReactNode | ReactNode[];
    subTables?: number
}

/**
 * A responsive table component.
 *
 * Children will fill rows left to right. If there's not enough children to fill a row, whitespace will fill the remainder.
 *
 * To aid in maximizing the use of space, the table utilizes "subtables". Each subtable repeats the text of the header
 * into new columns to allow for more information per row to be displayed.
 *
 * @example<caption>The following creates a table with 4 equal width columns, and 8 total cells (including the header) with the last cell being empty</caption>
 * <Table header={[{text: "foo"}, {text:"bar"}]} subTables={2}>
 *     <>Lorem ipsum</>
 *     <>dolor sit</>
 *     <>amet, consectetur</>
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
                <Head headers={ headers } subTables={ subTables }/>
                <Body headerNum={ headers.length } subTables={ subTables }>
                    { props.children }
                </Body>
            </table>
        </div>
    )
}