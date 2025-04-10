import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {FactoryMachineDetails} from "./FactoryMachineDetails";
import {FactoryMachinesList} from "./FactoryMachinesList";
import {FactoryMachineEdit} from "./FactoryMachineEdit";

export function FactoryMachinesView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (action === "new" || action === "edit") {
        return <FactoryMachineEdit/>
    }
    else {
        if (params.has("machineId")) {
            return <FactoryMachineDetails/>
        }
        else {
            return <FactoryMachinesList/>
        }
    }
}