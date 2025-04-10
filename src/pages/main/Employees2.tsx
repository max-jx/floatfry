export default {}

// import "../../style/pages/dashboard.css"
// import {Table} from "../../Table";
// import {useContext, useEffect, useState} from "react";
// import {AppContext} from "../../AppContext";
// import {Employee} from "../../data/staff/Employee";
//
// export function Employees() {
//     const appContext = useContext(AppContext)!
//     const { staffRepository } = appContext
//
//     const [cols, setCols] = useState([
//         "Employee ID",
//         "First name",
//         "Last name",
//         "Email address",
//         "Date of birth",
//         "Date joined",
//         "Role",
//     ])
//
//     const [rows, setRows] = useState<string[][]>([
//         // ["josephm", "Max", "Joseph", "max@gmail.com", "25/12/2004", "27/02/2025", "Stamping machine operator"],
//         // ["josephm", "Max", "Joseph", "max@gmail.com", "25/12/2004", "27/02/2025", "Floor manager"]
//     ])
//
//     const [staff, setStaff] = useState<Employee[]>([])
//
//     staffRepository.load((hasNewData) => {
//         if (hasNewData) {
//             setStaff(staffRepository.staff)
//         }
//     })
//
//     useEffect(() => {
//         // tabulate
//         const newRows: string[][] = []
//
//         for (let employee of staff) {
//             const row = [
//                 employee.id, employee.firstName, employee.lastName, employee.email, employee.dob,
//                 employee.dateJoined, employee.role
//             ]
//
//             newRows.push(row)
//         }
//
//         setRows(newRows)
//
//         console.log("STAFF set ")
//     }, [staff])
//
//     console.log("ROW", rows)
//
//     const [inEditMode, setInEditMode] = useState(false)
//     const [editingValue, setEditingValue] = useState<number[] | undefined>(undefined)
//
//     const showActions = () => {
//         if (inEditMode) {
//             return (
//                 <div style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "end",
//
//                     marginBottom: 12,
//                     gap: 12
//                 }}>
//                     <button className="text"
//                             onClick={(e) => setInEditMode(false)}
//                     >Cancel changes
//                     </button>
//                     <button className="filled"
//                             onClick={(e) => setInEditMode(false)}
//                     >Done
//                     </button>
//                 </div>
//             )
//         } else {
//             return (
//                 <div style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "end",
//
//                     marginBottom: 12,
//                     gap: 12
//                 }}>
//                     <button className="text"
//                             onClick={(e) => setInEditMode(true)}
//                     >Edit
//                     </button>
//                     <button className="filled">Register new</button>
//                 </div>
//             )
//         }
//     }
//
//     return (
//         <Table cols={cols}
//                rows={rows}
//                isEditable={inEditMode}
//                editingValue={editingValue}
//
//         />
//     )
// }