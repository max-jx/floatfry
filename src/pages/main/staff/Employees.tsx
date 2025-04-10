import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {useEffect, useState} from "react";
import {Employee} from "../../../data/staff/Employee";
import {useNavigate} from "react-router";
import {StaffRepository} from "../../../data/staff/StaffRepository";

export function Employees() {
    const navigate = useNavigate()

    const [cols, setCols] = useState([
        "Employee ID",
        "First name",
        "Last name",
        "Email address",
        "Telephone",
        "Role",
    ])

    const [rows, setRows] = useState<string[][]>([])

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [staff, setStaff] = useState<Employee[]>([])

    useEffect(() => {
        // tabulate
        const update = async () => {
            const staff = await StaffRepository.getStaff(page)

            if (staff) {
                setStaff(staff.result)
                setPagesCount(staff.count)
                console.log("STAFF rows", staff.result)
            }
        }

        update()
    }, [page])

    console.log("ROW", rows)

    const [inEditMode, setInEditMode] = useState(false)
    const [editingValue, setEditingValue] = useState<number[] | undefined>(undefined)

    const showActions = () => {
        if (inEditMode) {
            return (
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",

                    marginBottom: 12,
                    gap: 12
                }}>
                    <button className="text"
                            onClick={(e) => setInEditMode(false)}
                    >Cancel changes
                    </button>
                    <button className="filled"
                            onClick={(e) => setInEditMode(false)}
                    >Done
                    </button>
                </div>
            )
        } else {
            return (
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
                                navigate("./?action=register")
                            }}
                    >Register new
                    </button>
                </div>
            )
        }
    }
    const showEmployees = () => {
        const rows = staff.map((employee) => {
            return [
                employee.id, employee.firstName, employee.lastName,
                employee.email, employee.telephone,
                StaffRepository.getEmployeeRoles()
                    .find((it) => it.id === employee.role)!.name
            ]
        })

        return <Table cols={cols}
                      rows={rows}
                      isEditable={inEditMode}
                      editingValue={editingValue}
                      onSelected={(rowIndex) => {
                          const employeeId = rows[rowIndex][0]
                          console.log(rowIndex, employeeId)

                          navigate(`./?employeeId=${employeeId}`)
                      }}
        />
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Employees</h2>

            <p>Click on employee to view details or edit.</p>
            {showActions()}

            {showEmployees()}
        </div>
    )
}