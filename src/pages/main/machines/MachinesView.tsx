import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {MachineDetails} from "./MachineDetails";
import {MachinesList} from "./MachinesList";
import {MachineEdit} from "./MachineEdit";

export function MachinesView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (action === "new" || action === "edit") {
        return <MachineEdit/>
    }
    else {
        if (params.has("machineId")) {
            return <MachineDetails/>
        }
        else {
            return <MachinesList/>
        }
    }
}