import {Order} from "./Order";
import {FloatFryServer} from "../FloatFryServer";

export class OrdersRepository {
    public static async getOrders(page: number = 0) {
        const response = await FloatFryServer.getOrders(page)
        const orders = response.result

        console.log("REPO", orders)

        if (orders) {
            const displayOrders: Order[] = []

            for (let order of orders) {
                const supplierId = order.supplier
                const materialId = order.material

                const supplier = await FloatFryServer.getSupplier(supplierId)

                const material = await FloatFryServer.getMaterial(materialId)

                if (supplier && material) {
                    const displayOrder = {
                        ...order,
                        supplier: supplier.result.name,
                        material: material.result.name
                    }

                    displayOrders.push(displayOrder)
                }
                else {
                    return {
                        ...response,
                        result: null
                    }
                }
            }

            console.log("REPO return", displayOrders)
            return {
                ...response,
                result: displayOrders
            }
        }

        return null
    }

    public static async getOrder(id: string) {
        const response = await FloatFryServer.getOrder(id)
        const order = response.result

        const supplierId = order.supplier
        const materialId = order.material

        const supplier = await FloatFryServer.getSupplier(supplierId)

        const material = await FloatFryServer.getMaterial(materialId)

        if (supplier && material) {
            const displayOrder = {
                ...order,
                supplier: supplier.result.name,
                material: material.result.name
            }

            return {
                ...order,
                result: displayOrder
            }
        }
        else {
            return null
        }
    }

    public static async placeOrder(order: any) {
        return await FloatFryServer.placeOrder(order)
    }
}