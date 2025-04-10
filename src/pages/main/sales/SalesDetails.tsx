import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import React, {useContext, useEffect, useState} from "react";
import {Title} from "../../../Title";
import {AppContext} from "../../../AppContext";
import "../../../style/card.css"
import {useNavigate, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {ProductSale} from "../../../data/sales/ProductSales";
import {DateTimeString} from "../../../utils/DateUtils";
import {SalesRepository} from "../../../data/sales/SalesRepository";

export function SalesDetails() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const saleId = params.get("saleId")!

    const [sale, setSale] = useState<ProductSale>()

    useEffect(() => {
        const update = async () => {
            const response = await SalesRepository.getSale(saleId)
            console.log("SALES", response)

            if (response) {
                const result = response.result
                const count = response.count

                setSale(result)
            }
        }

        update()
    }, [saleId])

    if (!sale) {
        return <p>Error</p>
    }

    const showAction = () => {
        if (sale.status === "ordered") {
            return <button className="filled" onClick={(e) => {
                SalesRepository.markAsManufactured(saleId)
            }}>Mark as manufactured</button>
        }
        if (sale.status === "manufactured") {
            return <button className="filled" onClick={(e) => {
                SalesRepository.markAsShipped(saleId)
            }}>Mark as shipped</button>
        }
        if (sale.status === "shipped") {
            return <button className="filled" onClick={(e) => {
                SalesRepository.markAsDelivered(saleId)
            }}>Mark as delivered</button>
        }
    }

    let statusText = sale.status
    switch (sale.status) {
        case "ordered":
            statusText = "Ordered"
            break
        case "manufactured":
            statusText = "Awaiting shipping"
            break
        case "shipped":
            statusText = "Shipped"
            break
        case "delivered":
            statusText = "Delivered"
            break
    }


    return (
        <div className="container">
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <button className="text icon"><img src={BackIcon} onClick={(e) => navigate("./")}/></button>
                {showAction()}
            </div>

            <div style={{
                marginTop: 12
            }}>
                <h2 style={{margin: 0}}>{sale!.productName}</h2>
                <p style={{margin: 0, marginTop: 8}}>Status <b>{statusText}</b></p>
                <p style={{margin: 0, marginTop: 8}}>Date <b>{DateTimeString(sale!.date)}</b></p>
                <p style={{margin: 0, marginTop: 8}}>Color <b>{sale!.colorName}</b></p>
                <p style={{margin: 0, marginTop: 8}}>Lid material <b>{sale!.lidMaterialName}</b></p>
                <p style={{margin: 0, marginTop: 8}}>Handle material <b>{sale!.handleMaterialName}</b></p>
            </div>
        </div>
    )
}