import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import React, {useContext, useState} from "react";
import {Title} from "../../../Title";
import {AppContext} from "../../../AppContext";
import "../../../style/card.css"
import {useSearchParams} from "react-router";
import {SalesDetails} from "./SalesDetails";
import { Sales } from "./Sales";

export function SalesView() {
    const [params] = useSearchParams()
    const isProductPage = params.has("productId")
    // const product = params.get("productId")

    if (params.has("saleId")) {
        return <SalesDetails/>
    }
    return <Sales/>
}