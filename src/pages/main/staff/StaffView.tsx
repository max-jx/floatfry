import "../../../style/pages/dashboard.css"
import {useSearchParams} from "react-router";
import {Employees} from "./Employees";
import {EmployeeDetails} from "./EmployeeDetails";
import {EmployeeEdit} from "./EmployeeEdit";

export function StaffView() {
    const [params] = useSearchParams()
    console.log("params", params.get("employeeId"))
    const action = params.get("action")

    // const show = () => {
    if (action === "register" || action === "edit") {
        return <EmployeeEdit/>
    } else {
        if (params.has("employeeId")) {
            return <EmployeeDetails/>
        }
        else {
            return <Employees/>
        }
    }
}