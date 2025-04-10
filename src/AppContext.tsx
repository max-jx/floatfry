import {createContext} from "react";
import {LoginRepository} from "./data/LoginRepository";
import {StaffRepository} from "./data/staff/StaffRepository";
import {MachinesRepository} from "./data/machines/MachinesRepository";
import {ProductsRepository} from "./data/products/ProductsRepository";
import {SalesRepository} from "./data/sales/SalesRepository";
import {MaterialsRepository} from "./data/materials/MaterialsRepository";
import {SuppliersRepository} from "./data/suppliers/SuppliersRepository";

export type AppRepositories = {
    staffRepository: StaffRepository,
    machinesRepository: MachinesRepository,
    materialsRepository: MaterialsRepository,
    productsRepository: ProductsRepository,
    salesRepository: SalesRepository
    suppliersRepository: SuppliersRepository
}

export const AppContext = createContext<AppRepositories | undefined>(undefined)