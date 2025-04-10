import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import React, {useContext, useEffect, useState} from "react";
import {Title} from "../../../Title";
import {AppContext} from "../../../AppContext";
import "../../../style/card.css"
import {useNavigate} from "react-router";
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";
import {ProductSale} from "../../../data/sales/ProductSales";
import {SalesRepository} from "../../../data/sales/SalesRepository";
import {DateTimeString} from "../../../utils/DateUtils";

export function Sales() {
    const navigate = useNavigate()

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [sales, setSales] = useState<ProductSale[]>([])

    const cols = [
        "Product", "Date", "Color", "Lid material", "Handle material", "Status"
    ]

    useEffect(() => {
        const update = async () => {
            const response = await SalesRepository.getSales(page)
            console.log("SALES", response)

            if (response) {
                const result = response.result
                const count = response.count

                setSales(result)
                setPagesCount(count)
            }
        }

        update()
    }, [page])

    const showSales = () => {
        if (sales.length > 0) {
            const rows = sales.map((sale) => {
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


                return [
                    sale.productName, DateTimeString(sale.date), sale.colorName, sale.lidMaterialName, sale.handleMaterialName, statusText
                ]
            })

            return <Table cols={cols} rows={rows} onSelected={(rowIndex) => {
                const saleId = sales[rowIndex].id

                navigate(`?saleId=${saleId}`)
            }}/>
        } else {
            return <p>Nothing to see</p>
        }
    }


    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Sales</h2>

            <div style={{
                marginTop: 24,
                // display: "flex",
                // flexDirection: "column",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12
            }}>
                {showSales()}
            </div>
        </div>
    )
}