type Product = {
    id: string,
    name: string
}

export type Machine = {
    id: string,
    name: string,
    productionCapacity: number,
    productionCapacityUnit: string,
    productionCycleSpeed: number,
    productionCycleSpeedUnit: string,
    products: Product[]
}