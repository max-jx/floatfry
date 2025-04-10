import {useEffect, useRef, useState} from "react";
import {useActionData, useNavigate, useSearchParams} from "react-router";
import "../../../style/form.css"
import {StaffRepository} from "../../../data/staff/StaffRepository";
import {Certification, Employee} from "../../../data/staff/Employee";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";
import {Machine} from "../../../data/machines/Machine";
import {DateString, IsoDate} from "../../../utils/DateUtils";

export function EmployeeEdit() {
    const ref = useRef<HTMLFormElement>(null)
    const ref2 = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const employeeId = params.get("employeeId")!
    const action = params.get("action")

    const roles = StaffRepository.getEmployeeRoles()

    const [employee, setEmployee] = useState<Employee>()
    const [machines, setMachines] = useState<Machine[]>([])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [dob, setDob] = useState("")
    const [dateJoined, setDateJoined] = useState(IsoDate(new Date().toISOString()))
    const [role, setRole] = useState(StaffRepository.getEmployeeRoles()[0].name)

    const [certifications, setCertifications] = useState<Certification[]>([])

    const register = (formData: FormData, onRegistered: (result: number) => void) => {
        const data = Array.from(formData.entries())
        const body: any = {}

        for (let entry of data) {
            body[entry[0]] = entry[1]
        }

        const isInvalid = data.some(([key, value]) => {
            return value === ''
        })

        setErrorMessage("Please enter all fields")
        setErrorVisible(isInvalid)

        if (isInvalid) return

        console.log(`bodyToSend`, body)

        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            (res) => {
                if (res.ok) {
                    res.json().then((res) => {
                        onRegistered(200)
                    })
                } else {
                    console.log("ERROR", res.status)
                    onRegistered(res.status)
                }
            },
            (res) => {
                console.log(`error occurred: ${res}`)
                onRegistered(res)
            }
        ).catch((e) => {

        })
    }

    const [errorVisible, setErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [errorVisible2, setErrorVisible2] = useState(false)
    const [errorMessage2, setErrorMessage2] = useState<string | null>(null)

    useEffect(() => {
        const update = async () => {
            if (employeeId) {
                const employeeResponse = await StaffRepository.getEmployee(employeeId)

                if (employeeResponse) {
                    const e = employeeResponse.result
                    setEmployee(employeeResponse.result)
                    console.log("IS NULL", employeeResponse.result)
                    setCertifications(employeeResponse.result.certifications)

                    setFirstName(e.firstName)
                    setLastName(e.lastName)
                    setEmail(e.email)
                    setTelephone(e.telephone)
                    setDob(IsoDate(e.dob))
                    setDateJoined(IsoDate(e.dateJoined))
                    setRole(e.role)
                }
            }
            const machines = await MachinesRepository.getAllMachines()

            if (machines) {
                console.log("STAFF machines")
                setMachines(machines.result)
            } else {
                console.log("STAFF no machines")
            }
        }

        update()
    }, [employeeId])

    const showRoleOptions = () => {
        return roles.map((role) => <option key={role.id}
                                           value={role.id}>{role.name}</option>)
    }

    const showErrorMessage = () => {
        if (errorVisible) {
            return <p className="error">{errorMessage}</p>
        }
    }

    const showErrorMessage2 = () => {
        if (errorVisible2) {
            return <p className="error">{errorMessage2}</p>
        }
    }
    const showCertifications = () => {
        if (certifications.length > 0) {
            return certifications.map((certification) => { // employee.
                return <div className="card" style={{
                    width: "20vw",
                    gap: 12,
                }}>
                    <p style={{margin: 0}}>For machine <b>{certification.machineName}</b></p>
                    <p style={{margin: 0}}>Obtained on <b>{certification.dateObtained}</b></p>
                    <button className="text"
                            onClick={(e) => {
                                e.preventDefault()

                                const id = certification.machineId

                                // employee.certifications = employee.certifications.filter((it) => it.machine !== id)
                                // employee.firstName = "NEWNAME"
                                // setEmployee(employee)

                                const newCertifications = employee!.certifications.filter((it) => it.machineId !== id)
                                setCertifications(newCertifications)
                            }}
                    >Delete
                    </button>
                </div>
            })
        } else {
            return <p>This employee has no certifications.</p>
        }
    }

    const showAddCertifications = () => {
        if (ref.current && false) {
            // const formData = new FormData(ref.current)
            // const role = formData.get("role")
            //
            // console.log("EMPLOYEE role", role)
            //
            // if (role !== "stamping_machine_operator") {
            //     return
            // }
        }

        console.log("STAFF all certif", certifications)
        const unobtainedCertifications = machines.filter((machine) => !certifications.some((it) => it.machineId === machine.id))
        console.log("STAFF u certif", machines)

        if (unobtainedCertifications.length > 0) {
            const today = new Date().toISOString().split("T")[0]
            console.log("TODAY", today)

            return <form ref={ref2} style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <h2>Add certification</h2>
                {showErrorMessage2()}
                <label>Machine</label>
                <select name="machine">
                    {unobtainedCertifications.map((it) => <option key={it.id} value={it.id}>{it.name}</option>)}
                </select>

                <label>Date obtained</label>
                <input type="date" name="dateObtained" defaultValue={today} onChange={(e) => setErrorVisible(false)}/>

                <button className="filled"
                        onClick={(e) => {
                            e.preventDefault()

                            const formData = new FormData(ref2.current!)
                            const data = Array.from(formData.entries())

                            const isInvalid = data.some(([key, value]) => value === '')

                            setErrorMessage2("Please enter all fields")
                            setErrorVisible2(isInvalid)
                            if (isInvalid) return

                            // certifications.push({
                            //     employeeId: employee.id,
                            //     machine: formData.get("machine")!.toString(),
                            //     dateObtained: formData.get("dateObtained")!.toString()
                            // })
                            const newCertifications = [...certifications, {
                                machineId: formData.get("machine")!.toString(),
                                machineName: machines.find((machine) => machine.id)!.name,
                                dateObtained: formData.get("dateObtained")!.toString()
                            }]

                            setCertifications(newCertifications)

                            console.log("ADD", certifications)
                        }}
                >Add
                </button>
            </form>
        } else {
            return <div>
                <p>This employee has obtained all possible certifications</p>
            </div>
        }
    }

    // if (!employee) {
    //     return <p>Error loading employee</p>
    // }

    return (
        <div className="container" style={{
            position: "relative",
            display: "inline-block"
        }}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                gap: "12px"
            }}>
                <h2 style={{flex: 1}}>Employee details</h2>
                <button className="text" onClick={(e) => {
                    e.preventDefault()
                    navigate("./")
                }}>Cancel
                </button>
                <button type="submit" className="filled"
                        onClick={(e) => {
                            e.preventDefault()
                            const formData = new FormData(ref.current!)

                            const data = Array.from(formData.entries())
                            const isValid = !data.some(([_, value]) => value === '')

                            if (isValid) {
                                const employee = {
                                    firstName: formData.get("firstName")!.toString(),
                                    lastName: formData.get("lastName")!.toString(),
                                    email: formData.get("email")!.toString(),
                                    telephone: formData.get("telephone")!.toString(),
                                    dob: formData.get("dob")!.toString(),
                                    dateJoined: formData.get("dateJoined")!.toString(),
                                    role: formData.get("role")!.toString(),
                                    certifications: certifications.map((it) => {
                                        return {
                                            machineId: it.machineId,
                                            dateObtained: it.dateObtained
                                        }
                                    }),
                                }

                                let response: Promise<number>

                                if (action === "edit") {
                                    console.log("staff edit")
                                    response = StaffRepository.updateEmployee(employeeId, employee)
                                } else {
                                    console.log("staff new")
                                    response = StaffRepository.registerEmployee(employee)
                                }

                                response.then((response) => {
                                    console.log("staff post", response)

                                    if (response === 200) {
                                        // ok
                                    } else if (response === 409) {
                                        // conflict
                                    } else {
                                        // error
                                    }
                                })
                            }
                            else {
                                setErrorMessage("Please fill out all fields.")
                                setErrorVisible(true)
                            }
                        }}
                >Done
                </button>
            </div>
            {showErrorMessage()}
            <form ref={ref}
                  onChange={(e) => setErrorVisible(false)}
            >
                <label>First name</label>
                <input name="firstName" type="text" defaultValue={firstName}/>

                <label>Last name</label>
                <input name="lastName" type="text" defaultValue={lastName}/>

                <label>Email address</label>
                <input name="email" type="email" defaultValue={email}/>

                <label>Telephone</label>
                <input name="telephone" type="tel" defaultValue={telephone}/>

                <label>Date of birth</label>
                <input name="dob" type="date" defaultValue={dob}/>

                <label>Date joined</label>
                <input name="dateJoined" type="date" defaultValue={dateJoined}/>

                <label>Role</label>
                <select name="role" defaultValue={role}>
                    {showRoleOptions()}
                </select>
            </form>

            {/*Certifications*/}
            <h2>Certifications</h2>

            <div style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 12
            }}>
                {showCertifications()}
                {showAddCertifications()}
            </div>
        </div>
    )
}