import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {OrderDetails} from "./OrderDetails";
import {OrdersList} from "./OrdersList";

export function OrdersView() {
    const [params] = useSearchParams()

    const action = params.get("action")

    if (params.has("orderId")) {
        return <OrderDetails/>
    } else {
        return <OrdersList/>
    }
}