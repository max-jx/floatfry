import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {SuppliersList} from "./SuppliersList";
import {SupplierDetails} from "./SupplierDetails";
import {SupplierEdit} from "./SupplierEdit";

export function SuppliersView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (action === "new" || action === "edit") {
        return <SupplierEdit/>
    }
    else {
        if (params.has("supplierId")) {
            return <SupplierDetails/>
        }
        else {
            return <SuppliersList/>
        }
    }
}