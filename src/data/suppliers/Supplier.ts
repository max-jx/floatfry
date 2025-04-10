export type SupplierMaterial = {
    id: string,
    name: string
}

export type Supplier = {
    id: string,
    name: string,
    address: string,
    email: string,
    website: string,
    telephone: string,
    deliveryTime: number,
    materials: SupplierMaterial[]
}