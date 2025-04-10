import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {useParams, useSearchParams} from "react-router";
import {JobsList} from "./JobsList";

export function TimetableView() {
    const [params] = useSearchParams()

    return <JobsList/>
}