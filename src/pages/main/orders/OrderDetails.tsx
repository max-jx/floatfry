import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import React, {useContext, useEffect, useState} from "react";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import "../../../style/pages/orderDetails.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {Order} from "../../../data/orders/Order";
import {OrdersRepository} from "../../../data/orders/OrdersRepository";
import {Field} from "../../../Field";
import {DateString, DateTimeString} from "../../../utils/DateUtils";

export function OrderDetails() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const orderId = params.get("orderId")!

    const [order, setOrder] = useState<Order>()

    useEffect(() => {
        console.log("ORDER effect")

        const update = async () => {

            console.log("ORDER update")
            const response = await OrdersRepository.getOrder(orderId)

            const order = response.result

            if (order) {
                console.log("ORDER has order")
                setOrder(order)
            }
        }

        update()
    }, [orderId])

    const showActions = () => {
        if (order!.status === "ordered") {
            return <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 12
            }}>
                <button className="filled"
                        onClick={(e) => {
                            navigate({
                                pathname: "./",
                                search: createSearchParams({
                                    productId: orderId,
                                    action: "edit"
                                }).toString()
                            })
                        }}
                >Confirm received</button>
            </div>
        }
    }

    const showStatus = () => {
        let status = "Error"

        if (order!.status === "received") {
            status = "Received"
        }
        else if (order!.status === "ordered") {
            status = "Ordered"
        }

        return <Field name="Status" value={status}/>
    }

    if (!order) {
        return <p>Failed to load order</p>
    }

    return (
        <div className="container">
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12
            }}>
                <button className="text icon"
                        onClick={(e) => navigate("./")}
                ><img src={BackIcon}/></button>
                {showActions()}
            </div>
            <h2 style={{
                margin: 0
            }}>{order!.supplier}</h2>
            {showStatus()}
            <Field name="Order for" value={order.material}/>
            <Field name="Date ordered" value={DateTimeString(order.datePlaced)}/>
        </div>
    )
}