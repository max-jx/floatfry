import "../../../style/pages/dashboard.css"
import "../../../style/card.css"
import {useParams, useSearchParams} from "react-router";
import {MaterialDetails} from "./MaterialDetails";
import {MaterialsList} from "./MaterialsList";
import {MaterialEdit} from "./MaterialEdit";

export function MaterialsView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (action === "new" || action === "edit") {
        return <MaterialEdit/>
    }
    else {
        if (params.has("materialId")) {
            return <MaterialDetails/>
        }
        else {
            return <MaterialsList/>
        }
    }
}