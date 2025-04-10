import {BASE_URL} from "../Data";
import {Supplier, SupplierMaterial} from "./Supplier";
import {FloatFryServer} from "../FloatFryServer";
import {Certification, Employee} from "../staff/Employee";
import {MachinesRepository} from "../machines/MachinesRepository";
import {MaterialsRepository} from "../materials/MaterialsRepository";

export class SuppliersRepository {
    private static async getMaterials(supplierId: string) {
        const allMaterials = await MaterialsRepository.getAllMaterials()

        if (allMaterials) {
            const materials = allMaterials.result

            const supplierMaterials: SupplierMaterial[] = materials.filter((material) => material.suppliers.some((supplier => supplier.id === supplierId)))
                .map((material) => {
                    return {
                        id: material.id,
                        name: material.name
                    }
                })

            return supplierMaterials
        }

        return null
    }

    public static async getSuppliers(page = 0) {
        const response = await FloatFryServer.getSuppliers(page)

        if (response) {
            const suppliers = response.result
            const resolvedSuppliers: Supplier[] = []

            for (let supplier of suppliers) {

                resolvedSuppliers.push({
                    ...supplier,
                    materials: await this.getMaterials(supplier.id)
                })
            }

            return {
                ...response,
                result: resolvedSuppliers
            }
        }

        return null
    }

    public static async getAllSuppliers() {
        const first = await this.getSuppliers(0)
        if (first) {
            const allSuppliers: Supplier[] = [...first.result]
            const count = first.count

            if (count > 1) {
                for (let i = 1; i < count; i++) {
                    const next = await this.getSuppliers(i)
                    allSuppliers.push(...next.result)
                }
            }

            return {
                result: allSuppliers
            }
        }

        return null
    }

    public static async getSupplier(id: string) {
        const response = await FloatFryServer.getSupplier(id)

        if (response) {
            const supplier = response.result

            const resolvedSupplier: Supplier=  {
                ...supplier,
                materials: await this.getMaterials(supplier.id)
            }

            return {
                ...response,
                result: resolvedSupplier
            }
        }

        return null
    }

    public static async updateSupplier(id: string, supplier: any) {
        const update = {
            name: supplier.name,
            website: supplier.website,
            email: supplier.email,
            telephone: supplier.telephone,
            address: supplier.address
        }

        return await FloatFryServer.updateSupplier(id, update)
    }

    public static async addSupplier(supplier: any) {
        const newSupplier = {
            name: supplier.name,
            website: supplier.website,
            email: supplier.email,
            telephone: supplier.telephone,
            address: supplier.address
        }

        return await FloatFryServer.addSupplier(newSupplier)
    }
}