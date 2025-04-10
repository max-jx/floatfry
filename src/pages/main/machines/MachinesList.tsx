import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {useEffect, useState} from "react";
import {Employee} from "../../../data/staff/Employee";
import {useNavigate} from "react-router";
import {StaffRepository} from "../../../data/staff/StaffRepository";
import {Machine} from "../../../data/machines/Machine";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";

export function MachinesList() {
    const navigate = useNavigate()

    const [cols, setCols] = useState([
        "Name",
        "Production capacity",
        "Production cycle speed",
        "Used for"
    ])

    const [rows, setRows] = useState<string[][]>([])

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [machines, setMachines] = useState<Machine[]>([])

    useEffect(() => {
        // tabulate
        const update = async () => {
            const machines = await MachinesRepository.getMachines(page)

            if (machines) {
                setMachines(machines.result)
                setPagesCount(machines.count)
                console.log("STAFF rows", machines.result)
            }
        }

        update()
    }, [page])

    console.log("ROW", rows)

    const [inEditMode, setInEditMode] = useState(false)
    const [editingValue, setEditingValue] = useState<number[] | undefined>(undefined)

    const showMachines = () => {
        const rows = machines.map((machine) => {
            const productsText = machine.products.length === 1 ? machine.products[0].name : `${machine.products.length} products`

            return [
                machine.name,
                `${machine.productionCapacity}${machine.productionCapacityUnit}`,
                `${machine.productionCycleSpeed}${machine.productionCycleSpeedUnit}`,
                productsText
            ]
        })

        return <Table cols={cols}
                      rows={rows}
                      isEditable={inEditMode}
                      editingValue={editingValue}
                      onSelected={(rowIndex) => {
                          const machineId = machines[rowIndex].id
                          console.log(rowIndex, machineId)

                          navigate(`./?machineId=${machineId}`)
                      }}
        />
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Employees</h2>

            <p>Click on employee to view details or edit.</p>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",

                marginBottom: 12,
                gap: 12
            }}>
                {/*<button className="text"*/}
                {/*        onClick={(e) => setInEditMode(true)}*/}
                {/*>Edit*/}
                {/*</button>*/}
                <button className="filled"
                        onClick={(e) => {
                            navigate("./?action=new")
                        }}
                >Add
                </button>
            </div>

            {showMachines()}
        </div>
    )
}