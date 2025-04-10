import "../../style/pages/main.css"

import {Drawer} from "./Drawer";
import {Header} from "./Header";
import {useRef, useState} from "react";
import {Employees} from "./staff/Employees";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import {Timetable} from "./Timetable";
import {SalesView} from "./sales/SalesView";
import {ProductsView} from "./products/ProductsView";
import {SuppliersView} from "./suppliers/SuppliersView";
import {MaterialsView} from "./materials/MaterialsView";
import {FactoryMachinesView} from "./factoryMachines/FactoryMachinesView";
import {OrdersView} from "./orders/OrdersView";
import {StaffView} from "./staff/StaffView";
import {MachinesView} from "./machines/MachinesView";
import {FactoryMachineDetails} from "./factoryMachines/FactoryMachineDetails";
import {TimetableView} from "./timetable/TimetableView";

export function Main() {
    const navigate = useNavigate()
    const location = useLocation()
    const pageId = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length)

    const pages = [
        {pageId: "sales", pageTitle: "Sales"},
        {pageId: "timetable", pageTitle: "Timetable"},
        {pageId: "staff", pageTitle: "Staff"},
        {pageId: "products", pageTitle: "Products"},
        {pageId: "suppliers", pageTitle: "Suppliers"},
        {pageId: "machines", pageTitle: "Machines"},
        {pageId: "factoryMachines", pageTitle: "Factory machines"},
        {pageId: "materials", pageTitle: "Materials"},
        {pageId: "orders", pageTitle: "Orders"}
    ]

    const page = pages.find((page) => page.pageId === pageId)! || pages[0]
    console.log("page", page.pageId, page.pageTitle, pageId)

    const showPage = () => {
        switch (page.pageId) {
            case "orders":
                return <></>
            case "staff":
                return <Employees/>
            default:
                return <></>
        }
    }

    // const [currentPage, setCurrentPage] = useState(page)
    const path = location.pathname.split("/").filter((it) => it.length > 0)[0]
    const title = pages.find((it) => it.pageId === path)?.pageTitle || "FloatFry"
    document.title = title

    const ref = useRef<HTMLDivElement>(null)

    console.log("cookie", document.cookie)

    const cookie = document.cookie.split(";").find((cookie) => cookie.trim().split("=")[0] === "access_token")
    const token = cookie?.split("=")[1]

    if (!token) {
        console.log("LOGIN")
        navigate("/login")
    }


    console.log("LOGIN", document.cookie, token)
    return (
        <div className="main">
            <Drawer pages={pages}
                    selectedPageId={path}
                    onSelected={(id) => navigate(`/${id}`, {replace: true})}/>
            <div ref={ref} style={{
                display: "flex",
                flexDirection: "column",
                flexFlow: "column",
                width: "100%",
                //height: `calc(100% - ${ref.current?.clientTop || 0})`
            }}>
                <Header title={document.title}/>
                {/*{showPage()}*/}
                <Routes>
                    <Route path={`staff/*`} element={<StaffView/>}/>
                    <Route path={`timetable`} element={<TimetableView/>}/>
                    <Route path={`sales`} element={<SalesView/>}/>
                    <Route path={`products`} element={<ProductsView/>}/>
                    <Route path={"suppliers"} element={<SuppliersView/>}/>
                    <Route path={"machines"} element={<MachinesView/>}/>
                    <Route path={"factoryMachines"} element={<FactoryMachinesView/>}/>
                    <Route path={"materials"} element={<MaterialsView/>}/>
                    <Route path={"orders"} element={<OrdersView/>}/>
                </Routes>
            </div>
        </div>
    )
}