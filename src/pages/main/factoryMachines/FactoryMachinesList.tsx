import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {useEffect, useState} from "react";
import {Employee} from "../../../data/staff/Employee";
import {useNavigate} from "react-router";
import "../../../style/card.css"
import {StaffRepository} from "../../../data/staff/StaffRepository";
import {Machine} from "../../../data/machines/Machine";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";
import {FactoryMachinesRepository} from "../../../data/factoryMachines/FactoryMachinesRepository";
import {FactoryMachine} from "../../../data/factoryMachines/FactoryMachine";

export function FactoryMachinesList() {
    const navigate = useNavigate()

    const [cols, setCols] = useState([
        "Name",
        "ID",
        "Machine",
    ])

    const [rows, setRows] = useState<string[][]>([])

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [machines, setMachines] = useState<FactoryMachine[]>([])

    useEffect(() => {
        // tabulate
        const update = async () => {
            const machines = await FactoryMachinesRepository.getMachines(page)

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
        return <ul>{machines.map((machine) => {
            return <div className="card" onClick={(e) => {
                navigate(`./?machineId=${machine.id}`)
            }}>
                <h2>{machine.name}</h2>
                <p>{machine.machineName}</p>
            </div>
        })}</ul>
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