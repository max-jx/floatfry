import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StaffRepository} from "./data/staff/StaffRepository";
import {MachinesRepository} from "./data/machines/MachinesRepository";
import {MaterialsRepository} from "./data/materials/MaterialsRepository";
import {ProductsRepository} from "./data/products/ProductsRepository";
import {SalesRepository} from "./data/sales/SalesRepository";
import {SuppliersRepository} from "./data/suppliers/SuppliersRepository";
import {Endpoint} from "./data/Endpoint";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Staff = new StaffRepository()
export const Machines = new MachinesRepository()
export const Materials = new MaterialsRepository()
export const Products = new ProductsRepository()
export const Sales = new SalesRepository()
export const Suppliers = new SuppliersRepository()

// document.cookie = "cooki=hello;"

console.log("RELOAD", document.cookie)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
