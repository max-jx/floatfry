import {Material, MaterialProduct} from "./Material";
import {BASE_URL} from "../Data";
import {Supplier} from "../suppliers/Supplier";
import {FloatFryServer} from "../FloatFryServer";
import {Order} from "../orders/Order";

export class MaterialsRepository {
    private static async getProducts(materialId: string) {
        const allProducts = await FloatFryServer.getProducts()
        const productNames: MaterialProduct[] = []

        if (allProducts) {
            const products = allProducts.result
            const pagesCount = allProducts.count

            productNames.push(...products
                .filter((product: any) => product.designSpec.materials.map((material: any) => material.material).includes(materialId))
                .map((product: any) => {
                    return {
                        id: product.id,
                        name: product.name
                    }
                })
            )

            if (pagesCount > 1) {
                for (let i = 1; i < pagesCount; i++) {
                    const nextPage = await FloatFryServer.getProducts(i)

                    if (nextPage) {
                        productNames.push(
                            ...nextPage.result
                                .filter((product: any) => product.designSpec.materials.map((material: any) => material.material).includes(materialId))
                                .map((product: any) => product.name)
                        )
                    } else {
                        return null
                    }
                }
            }

            return productNames
        } else {
            return null
        }
    }

    public static async getAllMaterials() {
        const materials = await this.getMaterials()

        if (materials) {
            const count = materials.count

            const allMaterials: Material[] = [...materials.result]

            if (count > 1) {
                for (let i = 1; i < count; i++) {
                    const next = await this.getMaterials(i)

                    allMaterials.push(...next.result)
                }
            }

            return {
                count,
                result: allMaterials
            }
        } else {
            return null
        }
    }

    public static async getMaterials(page: number = 0) {
        const response = await FloatFryServer.getMaterials(page)
        const materials = response.result
        console.log("MATERIALS", response)

        if (materials) {
            const displayMaterials: Material[] = []

            for (let material of materials) {
                const suppliers = material.suppliers

                const resolvedSuppliers = []

                for (let supplierId of suppliers) {
                    const response = await FloatFryServer.getSupplier(supplierId)

                    if (response) {
                        resolvedSuppliers.push({
                            id: response.result.id,
                            name: response.result.name
                        })
                    } else {
                        return null
                    }
                }

                displayMaterials.push({
                    ...material,
                    suppliers: resolvedSuppliers,
                    products: await this.getProducts(material.id)
                })
            }

            console.log("REPO return", displayMaterials)
            return {
                ...response,
                result: displayMaterials
            }
        }

        return null
    }

    public static async getMaterial(id: string) {
        const response = await FloatFryServer.getMaterial(id)
        console.log("MATERIAL res", response)
        const material = response.result
        console.log("MATERIAL result", material)

        const suppliers = material.suppliers

        const resolvedSuppliers = []

        for (let supplierId of suppliers) {
            const response = await FloatFryServer.getSupplier(supplierId)
            const supplier = response.result

            if (supplier) {
                resolvedSuppliers.push({
                    id: supplier.id,
                    name: supplier.name
                })
            } else {
                return null
            }
        }

        const resolvedMaterial = {
            ...material,
            suppliers: resolvedSuppliers,
            products: await this.getProducts(material.id)
        }

        return {
            ...response,
            result: resolvedMaterial
        }
    }

    public static async updateMaterial(id: string, material: any) {
        return await FloatFryServer.updateMaterial(id, material)
    }

    public static async addMaterial(material: any) {
        return await FloatFryServer.addMaterial(material)
    }
}