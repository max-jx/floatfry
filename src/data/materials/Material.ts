
export type MaterialSupplier = {
    id: string,
    name: string
}

export type MaterialProduct = {
    id: string,
    name: string
}

export type Material = {
    id: string,
    name: string,
    availableQuantity: number,
    quantityUnit: string,
    requiredQuantity: 2,
    suppliers: MaterialSupplier[],
    products: MaterialProduct[]
}
