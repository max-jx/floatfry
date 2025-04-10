import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {AppContext} from "../../../AppContext";
import "../../../style/card.css"
import "../../../style/icons.css"
import BackIcon from "../../../back.svg"
import {StaffRepository} from "../../../data/staff/StaffRepository";
import {Employee} from "../../../data/staff/Employee";
import {DateString} from "../../../utils/DateUtils";

export function EmployeeDetails() {
    const {staffRepository, machinesRepository} = useContext(AppContext)!
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const employeeId = params.get("employeeId")!

    const [employee, setEmployee] = useState<Employee>()

    useEffect(() => {
        const update = async () => {
            const employee = await StaffRepository.getEmployee(employeeId)

            if (employee) {
                setEmployee(employee.result)
            }
        }

        update()
    }, [employeeId])

    const showCertifications = () => employee!.certifications.map((certification) => {
        return <div className="card" style={{
            width: "20vw",
            gap: 12
        }}>
            <p style={{margin: 0}}>For machine <b>{certification.machineName}</b></p>
            <p style={{margin: 0}}>Obtained on <b>{DateString(certification.dateObtained)}</b></p>
        </div>
    })

    if (!employee) {
        return <p>Error loading employee</p>
    }

    return (
        <div className="container" style={{
            // position: "relative",
            // display: "inline-block"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12
            }}>
                <button className="text icon"><img src={BackIcon} onClick={(e) => navigate("./")}/></button>
                <button className="filled"
                        onClick={(e) => navigate(`./?employeeId=${employeeId}&action=edit`)}
                >Edit</button>
            </div>
            <h2>Employee details</h2>
            <p>First name <b>{employee!.firstName}</b></p>
            <label>Last name <b>{employee!.lastName}</b></label>
            <p>Email address <b>{employee!.email}</b></p>
            <p>Date of birth <b>{DateString(employee!.dob)}</b></p>

            <p>Date joined <b>{DateString(employee!.dateJoined)}</b></p>
            <p>Role <b>{StaffRepository.getEmployeeRoles().find((it) => it.id === employee.role)!.name}</b></p>

            <h2>Certifications</h2>
            <div style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 12
            }}>
                {showCertifications()}

            </div>
        </div>
    )
}