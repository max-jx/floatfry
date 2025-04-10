import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {useEffect, useState} from "react";
import {Employee} from "../../../data/staff/Employee";
import {useNavigate, useSearchParams} from "react-router";
import "../../../style/card.css"
import {StaffRepository} from "../../../data/staff/StaffRepository";
import {Machine} from "../../../data/machines/Machine";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";
import {FactoryMachinesRepository} from "../../../data/factoryMachines/FactoryMachinesRepository";
import {FactoryMachine} from "../../../data/factoryMachines/FactoryMachine";
import {TimetableRepository} from "../../../data/timetable/TimetableRepository";
import {Job} from "../../../data/timetable/Job";
import {DateTimeString} from "../../../utils/DateUtils";

export function JobsList() {
    const [params] = useSearchParams()
    const navigate = useNavigate()

    const employeeId = params.get("employeeId")

    const [cols, setCols] = useState([
        "Name",
        "ID",
        "Machine",
    ])

    const [rows, setRows] = useState<string[][]>([])

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        // tabulate
        const update = async () => {
            const jobs = await TimetableRepository.getTimetable(page, employeeId || undefined)

            if (jobs) {
                setJobs(jobs.result)
                setPagesCount(jobs.count)
                console.log("TIMETABLE jobs", jobs.result)
            }
        }

        update()
    }, [page])

    console.log("ROW", rows)

    const [inEditMode, setInEditMode] = useState(false)
    const [editingValue, setEditingValue] = useState<number[] | undefined>(undefined)

    const showJobs = () => {
        return <ul>{jobs.map((job) => {
            return <div className="card" onClick={(e) => {
                //navigate(`./?machineId=${machine.id}`)
            }}>
                <h2>{job.id}</h2>
                <p>{job.employeeName}</p>
                <p>{job.machineName}</p>
                <p>{DateTimeString(job.time)}</p>
                <p>{job.duration}</p>
                <p>{job.machineName}</p>
                <p>{job.machineType}</p>
                <p>{job.productName}</p>
                <p></p>
            </div>
        })}</ul>
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Timetable</h2>

            <p>...</p>
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
                            TimetableRepository.generateTimetable().then((res) => {
                                if (res === 201) {
                                    navigate("./")
                                }
                            })
                        }}
                >Generate
                </button>
            </div>

            {showJobs()}
        </div>
    )
}