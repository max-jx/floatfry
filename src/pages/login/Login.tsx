import "../../style/form.css"
import {useRef} from "react";
import {useNavigate} from "react-router";

export function Login () {
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const login = (formData: FormData) => {
        const data = Array.from(formData.entries())
        const body: any = {}

        for (let entry of data) {
            body[entry[0]] = entry[1]
        }

        const isInvalid = data.some(([key, value]) => {
            return value === ''
        })

        if (isInvalid) return

        console.log(`bodyToSend`, body)

        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((res) => {
            if (res.ok) {
                res.json().then((res) => {
                    console.log("result", res)

                    document.cookie = `access_token=${res.access_token}`

                    navigate("/")
                })
            }
            else {
                if (res.status === 401) {
                    alert("Wrong email, employee ID or password")
                }
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
                <h2>Login to your employee account</h2>
                <form ref={ref}>
                    <label>Email or employee ID</label>
                    <input name="id" type="text"/>
                    <label>Password</label>
                    <input name="password" type="password"/>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        gap: "12px"
                    }}>
                        <button className="text"
                                onClick={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData(ref.current!)
                                    login(formData)

                                    navigate(`/activateAccount?employeeId=${formData.get("id")}`)
                                }}
                        >Activate account or change password
                        </button>

                        <button type="submit" className="filled"
                                onClick={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData(ref.current!)
                                    login(formData)

                                    // navigate("/")
                                }}
                        >Login
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}