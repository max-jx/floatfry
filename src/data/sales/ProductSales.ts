export type ProductSales = {
    productId: string,
    weekAverage: number,
    monthAverage: number,
    yearAverage: number,
    estimatedUpcomingWeek: number,
}

export type WeeklySales = {
    productId: string,
    startDate: string,
    endDate: string,
    sales: number[]
}

export type ProductSale = {
    id: string,
    product: string,
    productName: string,
    date: string
    color: string,
    colorName: string,
    colorValue: string,
    lidMaterial: string,
    lidMaterialName: string,
    handleMaterial: string,
    handleMaterialName: string,
    status: string
}