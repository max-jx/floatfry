import "../../style/form.css"
import {useLocation, useNavigate} from "react-router";

export function RegisterConfirm() {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state.email

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 24
        }}>
            <h1>FloatFry</h1>

            <div style={{
                width: "25vw"
            }} className="form-container">
                <h1>Employee registered</h1>
                <p>A link to activate this employee account was sent to <b>{email}</b>.
                </p>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    gap: "12px"
                }}>
                    <button className="text"
                            onClick={(e) => {
                                navigate("/register")
                            }}
                    >Register another</button>

                    <button className="filled"
                            onClick={(e) => {
                                navigate("/")
                            }}
                    >Done</button>
                </div>
            </div>
        </div>
    )
}