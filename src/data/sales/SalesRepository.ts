import {ProductSale, ProductSales} from "./ProductSales";
import {FloatFryServer} from "../FloatFryServer";

export class SalesRepository {
    public static async getSales(page: number = 0) {
        const response = await FloatFryServer.getSales(page)

        if (response) {
            const resolvedSales: ProductSale[] = []
            const sales = response.result

            for (let sale of sales) {
                const productResponse = await FloatFryServer.getProduct(sale.product)

                if (productResponse) {
                    console.log("SALES product", productResponse)
                    const product = productResponse.result

                    resolvedSales.push({
                        ...sale,
                        productName: product.name,
                        colorName: product.colors.find((color: any) => color.id === sale.color).name,
                        colorValue: product.colors.find((color: any) => color.id === sale.color).color,
                        lidMaterialName: product.lidMaterials.find((lidMaterial: any) => lidMaterial.id === sale.lidMaterial).name,
                        handleMaterialName: product.handleMaterials.find((handleMaterial: any) => handleMaterial.id === sale.handleMaterial).name
                    })
                }
            }

            return {
                ...response,
                result: resolvedSales
            }
        }

        return null
    }

    public static async getSale(id: string) {
        const response = await FloatFryServer.getSale(id)

        if (response) {
            const sale = response.result

            const productResponse = await FloatFryServer.getProduct(sale.product)

            if (productResponse) {
                const product = productResponse.result

                return {
                    ...response,
                    result: {
                        ...sale,
                        productName: product.name,
                        colorName: product.colors.find((color: any) => color.id === sale.color).name,
                        colorValue: product.colors.find((color: any) => color.id === sale.color).color,
                        lidMaterialName: product.lidMaterials.find((lidMaterial: any) => lidMaterial.id === sale.lidMaterial).name,
                        handleMaterialName: product.handleMaterials.find((handleMaterial: any) => handleMaterial.id === sale.handleMaterial).name
                    }
                }
            }
        }

        return null
    }

    public static async markAsManufactured(id: string) {
        return await FloatFryServer.updateSale(id, "confirmManufactured")
    }

    public static async markAsShipped(id: string) {
        return await FloatFryServer.updateSale(id, "confirmShipped")
    }

    public static async markAsDelivered(id: string) {
        return await FloatFryServer.updateSale(id, "confirmDelivered")
    }
}