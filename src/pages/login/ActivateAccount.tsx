import "../../style/form.css"
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {StaffRepository} from "../../data/staff/StaffRepository";

export function ActivateAccount() {
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const [employeeId, setEmployeeId] = useState(params.get("employeeId"))
    const [firstName, setFirstName] = useState(null)

    useEffect(() => {
        const update = async () => {
            if (employeeId) {
                const response = await StaffRepository.getEmployee(employeeId)

                if (response) {
                    const employee = response.result
                    setFirstName(employee.firstName)
                }
            }
        }

        update()
    }, [employeeId])

    const activateAccount = (formData: FormData) => {
        const data = Array.from(formData.entries())
        const body: any = {}

        if (formData.get("password") !== formData.get("confirm_password")) {
            alert("Passwords do not match")
        }

        for (let entry of data) {
            if (entry[0] === "confirm_password") continue

            body[entry[0]] = entry[1]
        }

        const isInvalid = data.some(([key, value]) => {
            return value === ''
        })

        if (isInvalid) return

        console.log(`bodyToSend`, body)

        fetch(`http://localhost:3001/activate?employeeId=${employeeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer debug"
            },
            body: JSON.stringify({password: formData.get("password")})
        }).then((res) => {
            if (res.ok) {
                navigate("/login")
            }
        })
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h1>FloatFry</h1>
            <div className="form-container" style={{
                position: "relative",
                display: "inline-block"
            }}>
                <h2>Welcome, {firstName}</h2>
                <p>Activate your account by setting a password.</p>

                <p style={{
                    width: "100%",
                    textAlign: "start",
                    color: "var(--color-on-primary-container)"
                }}>Your employee ID is <b>{employeeId}</b>.</p>
                <form ref={ref}>
                    <label>Password</label>
                    <input name="password" type="password"/>
                    <label>Confirm password</label>
                    <input name="confirm_password" type="password"/>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        gap: "12px"
                    }}>
                        <button type="submit" className="filled"
                                onClick={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData(ref.current!)
                                    activateAccount(formData)
                                }}
                        >Activate
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}