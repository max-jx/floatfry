import {useSearchParams} from "react-router";
import {EmployeeEdit} from "./staff/EmployeeEdit";
import {EmployeeDetails} from "./staff/EmployeeDetails";

export function Employee() {
    const [urlParams] = useSearchParams()
    const action = urlParams.get("action")

    const showView = () => {
        if (action === "edit") {
            return <EmployeeEdit/>
        }

        return <EmployeeDetails/>
    }

    return <>{showView()}</>
}