import "../../../style/pages/dashboard.css"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AppContext} from "../../../AppContext";
import {Supplier} from "../../../data/suppliers/Supplier";
import {Table} from "../../../Table";
import {Order} from "../../../data/orders/Order";
import {OrdersRepository} from "../../../data/orders/OrdersRepository";
import {Pagination} from "../../../Pagination";
import {DateString} from "../../../utils/DateUtils";

export function OrdersList() {
    const navigate = useNavigate()

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [orders, setOrders] = useState<Order[]>([])

    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [previous, setPrevious] = useState<Supplier[]>([])
    const [next, setNext] = useState<Supplier[]>([])

    const cols = [
        "Supplier", "Material", "Date placed", "Status"
    ]

    // const [rows, setRows] = useState<string[][]>([])

    useEffect(() => {
        console.log("ORDERS done")
        const update = async () => {
            const response = await OrdersRepository.getOrders(page)
            const orders = response.result
            const pagesCount = response.count

            console.log("ORDERS callback")
            if (orders) {
                console.log("ORDERS load")
                setPagesCount(pagesCount)
                setOrders(orders)
            } else {
                console.log("ORDERS empty")
            }
        }

        update()

    }, [page])

    const showOrders = () => {
        if (orders.length > 0) {
            const rows = orders.map((order) => {
                const status = order.status === "ordered" ? "Ordered" : "Received"

                return [
                    order.supplier, order.material, DateString(order.datePlaced), status
                ]
            })

            return <Table cols={cols} rows={rows} onSelected={(rowIndex) => {
                const orderId = orders[rowIndex].id

                navigate(`?orderId=${orderId}`)
            }}/>
        } else {
            return <p>Nothing to see</p>
        }
    }

    return (
        <div className="container">
            <h2 style={{
                margin: 0
            }}>Orders</h2>
            <p>Click on an order to view details.</p>

            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate("./?action=new")
                        }}
                >Add new
                </button>
            </div>
            <Pagination index={page} count={pagesCount} text={`${page + 1} of ${pagesCount}`}
                        onPrevious={() => {

                        }}
                        onNext={() => {

                        }}/>
            {showOrders()}
        </div>
    )
}