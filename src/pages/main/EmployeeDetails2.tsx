
export default {}
// import {useContext, useRef, useState} from "react";
// import {RegisterContext} from "../../RegisterContext";
// import {useNavigate} from "react-router";
//
// export function EmployeeDetails() {
//     const loginRepository = useContext(RegisterContext)!
//     const ref = useRef<HTMLFormElement>(null)
//     const navigate = useNavigate()
//
//     const roles = loginRepository.getRoles()
//     const selectionOptions = roles.map((role) => {
//         return <option key={role.id} value={role.id}>{role.name}</option>
//     })
//
//     const register = (formData: FormData, onRegistered: (result: number) => void) => {
//         const data = Array.from(formData.entries())
//         const body: any = {}
//
//         for (let entry of data) {
//             body[entry[0]] = entry[1]
//         }
//
//         const isInvalid = data.some(([key, value]) => {
//             return value === ''
//         })
//
//         setErrorMessage("Please enter all fields")
//         setErrorVisible(isInvalid)
//
//         if (isInvalid) return
//
//         console.log(`bodyToSend`, body)
//
//         fetch("http://localhost:3001/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(body)
//         }).then(
//             (res) => {
//                 if (res.ok) {
//                     res.json().then((res) => {
//                         onRegistered(200)
//                     })
//                 } else {
//                     console.log("ERROR", res.status)
//                     onRegistered(res.status)
//                 }
//             },
//             (res) => {
//                 console.log(`error occurred: ${res}`)
//                 onRegistered(res)
//             }
//         ).catch((e) => {
//
//         })
//     }
//
//     const [errorVisible, setErrorVisible] = useState(false)
//     const [errorMessage, setErrorMessage] = useState<string | null>(null)
//
//     const showErrorMessage = () => {
//         if (errorVisible) {
//             return <p className="error">{errorMessage}</p>
//         }
//     }
//
//     return (
//         <div className="form-container" style={{
//             position: "relative",
//             display: "inline-block"
//         }}>
//             <h2>Register an new employee</h2>
//             {showErrorMessage()}
//             <form ref={ref}
//                   onChange={(e) => setErrorVisible(false)}
//             >
//                 <label>First name</label>
//                 <input name="firstName" type="text"/>
//                 <label>Last name</label>
//                 <input name="lastName" type="text"/>
//                 <label>Email address</label>
//                 <input name="email" type="email"/>
//                 <label>Date of birth</label>
//                 <input name="dob" type="date"/>
//                 <label>Role</label>
//                 <select name="role">
//                     {selectionOptions}
//                 </select>
//
//                 <div style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "end",
//                     gap: "12px"
//                 }}>
//                     <button className="text" onClick={(e) => {
//                         e.preventDefault()
//                     }}>Cancel
//                     </button>
//                     <button type="submit" className="filled"
//                             onClick={(e) => {
//                                 e.preventDefault()
//                                 const formData = new FormData(ref.current!)
//                                 const email = formData.get("email")
//
//                                 register(formData, (result) => {
//                                     if (result === 200) {
//                                         navigate("/registerConfirm", {state: {email: email}})
//                                     } else {
//                                         if (result === 409) {
//                                             // already registered
//                                             setErrorMessage(`Employee with email address ${email} already exists.`)
//                                         } else {
//                                             // some other error
//                                             setErrorMessage("An error occurred. Please try again later.")
//                                         }
//                                         setErrorVisible(true)
//                                     }
//                                 })
//                             }}
//                     >Register
//                     </button>
//                 </div>
//             </form>
//
//         </div>
//     )
// }