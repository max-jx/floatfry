import "./style/table.css"
import React, {useState} from "react";

type TableProps = {
    cols: (string | {name: string, type: string})[],
    rows: string[][],
    isEditable?: boolean,
    editingValue?: number[] | undefined,
    onSelected?: (rowIndex: number) => void
}

export function Table(props: TableProps) {
    const {
        cols,
        rows,
        editingValue,
        onSelected
    } = props

    const isEditable = props.isEditable || false
    console.log("Table in edit mode", isEditable)

    // const index = rows.map((row, rowIndex) => row.map((value, index) => `tableValue-${rowIndex}-${index}`))

    const className = isEditable ? "_editable" : ""

    const showCols = () => cols.map((col, i) => <th key={i} scope="col">{typeof col === "string" ? col : col.name}</th>)
    const showRows = () => rows.map((row, rowIndex) => {
        return <tr key={rowIndex} aria-rowindex={rowIndex} onClick={handleSelected}>{
            row.map((it, i) => {
                // @ts-ignore
                const col = cols[i]
                const type = typeof col === "string" ? "text" : col.type

                if (rowIndex === editingValue?.[0] && i === editingValue?.[1]) {
                    return <input type={type} onKeyDown={handleEditDone}/>
                }

                return <td key={i}
                           onClick={handleEditStart}
                           aria-rowindex={rowIndex}
                           aria-colindex={i}
                >{it}</td>
            })
        }</tr>
    })

    const handleSelected = (e: React.MouseEvent<HTMLTableRowElement>) => {
        //@ts-ignore
        const rowIndex = parseInt(e.currentTarget.ariaRowIndex!)

        onSelected?.(rowIndex)
    }

    const handleEditStart = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
        if (!isEditable) return

        const rowIndex = parseInt(e.currentTarget.ariaRowIndex!)
        const columnIndex = parseInt(e.currentTarget.ariaColIndex!)

        console.log("Table edit requested", rowIndex, columnIndex)
    }
    const handleEditDone = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const id = e.currentTarget.id
            const value = e.currentTarget.value

            console.log("TABLE", id, value)
        }
    }

    return (
        <table className={className}>
            <thead>
            <tr>
                {showCols()}
            </tr>
            </thead>

            <tbody>
            {showRows()}
            </tbody>
        </table>
    )

}