export type File = {
    uri: string,
    name: string
}

export type ProductMaterial = {
    id: string,
    name: string,
    quantity: number,
    quantityUnit: string
}

export type ProductMachine = {
    index: number,
    id: string,
    name: string,
    time: number,
}

export type DesignSpec = {
    materials: ProductMaterial[],
    supportingDocuments: File[]
}

export type ManufacturingInstruction = {
    machines: ProductMachine[]
    supportingDocuments: File[]
}

export type ProductColor = {
    id: string,
    name: string,
    color: string,
    materials: ProductMaterial[],
    machines: ProductMachine[]
}

export type ProductLidMaterial = {
    id: string,
    name: string,
    materials: ProductMaterial[],
    machines: ProductMachine[]
}

export type ProductHandleMaterial = {
    id: string,
    name: string,
    materials: ProductMaterial[],
    machines: ProductMachine[]
}

export type Product = {
    id: string,
    name: string,
    description: string,
    dateCreated: string,
    technicalDrawings: File[],
    designSpec: DesignSpec,
    displayPhotos: File[],
    manufacturingInstruction: ManufacturingInstruction,
    colors: ProductColor[]
    lidMaterials: ProductLidMaterial[]
    handleMaterials: ProductHandleMaterial[],
    status: "draft" | "approved"
}