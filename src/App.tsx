import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import "./style/colors.css"
import "./style/button.css"
import {LoginRepository} from "./data/LoginRepository";
import {RegisterContext} from "./RegisterContext";
import {RegisterConfirm} from "./pages/login/RegisterConfirm";
import {ActivateAccount} from "./pages/login/ActivateAccount";
import {Login} from "./pages/login/Login";
import {BrowserRouter, Route, Router, Routes, useLocation, useNavigate} from "react-router";
import {Drawer} from "./pages/main/Drawer";
import {Main} from "./pages/main/Main";
import {EmployeeDetails} from "./pages/main/staff/EmployeeDetails";
import {Employees} from "./pages/main/staff/Employees";
import {Timetable} from "./pages/main/Timetable";
import {Sales} from "./pages/main/sales/Sales";
import {ProductDetails} from "./pages/main/products/ProductDetails";
import {StaffRepository} from "./data/staff/StaffRepository";
import {AppContext, AppRepositories} from "./AppContext";
import {MachinesRepository} from "./data/machines/MachinesRepository";
import {ProductsRepository} from "./data/products/ProductsRepository";
import {SalesRepository} from "./data/sales/SalesRepository";
import {MaterialsRepository} from "./data/materials/MaterialsRepository";
import {SuppliersRepository} from "./data/suppliers/SuppliersRepository"
import {StaffView} from "./pages/main/staff/StaffView";
import {Navigate} from "react-router-dom"

const staffRepository = new StaffRepository()
const machinesRepository = new MachinesRepository()
const materialsRepository = new MaterialsRepository()
const productsRepository = new ProductsRepository()
const salesRepository = new SalesRepository()
const suppliersRepository = new SuppliersRepository()

function App() {
    const loginRepository = new LoginRepository()

    loginRepository.init() // TODO debug

    const [repositories, setRepositories] = useState<AppRepositories>({
        staffRepository: staffRepository,
        machinesRepository: machinesRepository,
        materialsRepository: materialsRepository,
        productsRepository: productsRepository,
        salesRepository: salesRepository,
        suppliersRepository: suppliersRepository
    })

    /*
    https://stackoverflow.com/questions/73701164/nested-routes-do-not-work-react-router-v6
     */

    // document.cookie = "access_token=aCookie"

    return (
        <BrowserRouter>
            <AppContext value={repositories}>
                <Routes>
                    <Route path="/" element={<Navigate to="/sales"/>}/>
                    <Route path="/*" element={<Main/>}>
                        <Route path="sales" element={<Sales/>}/>
                        <Route path="staff" element={<StaffView/>}/>
                        <Route path="timetable/*" element={<Timetable/>}/>
                        <Route path="products/*" element={<ProductDetails/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registerConfirm" element={<RegisterConfirm/>}/>
                    <Route path="/activateAccount" element={<ActivateAccount/>}/>
                </Routes>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
