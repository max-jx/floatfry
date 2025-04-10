import {FloatFryServer} from "../FloatFryServer";
import {Product, ProductColor, ProductMachine, ProductMaterial} from "./Product";

export class ProductsRepository {
    public static async getProducts(page: number = 0) {
        const response = await FloatFryServer.getProducts(page)
        const products = response.result
        console.log("PRODUCTS", response)

        if (response) {
            const displayProducts: Product[] = []

            for (let product of products) {
                console.log("PRODUCTS loop")
                const materials = product.designSpec.materials
                const machines = product.manufacturingInstruction.machines
                const colors = product.colors
                const lidMaterials = product.lidMaterials
                const handleMaterials = product.handleMaterials

                console.log("PRODUCTS c", colors)
                console.log("PRODUCTS", machines)

                const resolvedMaterials = []
                const resolvedMachines = []

                const resolvedColors: ProductColor[] = []

                const resolvedLidMaterials: ProductMaterial[] = []

                const resolvedHandleMaterials: ProductMaterial[] = []

                for (let material of materials) {
                    console.log("PRODUCTS loop materials", material)

                    const response = await FloatFryServer.getMaterial(material.material)

                    if (response) {
                        resolvedMaterials.push({
                            ...material,
                            id: response.result.id,
                            name: response.result.name,
                            quantity: material.quantity,
                            quantityUnit: response.result.quantityUnit
                        })
                    } else {
                        console.log("PRODUCTS error materials")

                        return null
                    }
                }

                for (let machine of machines) {
                    console.log("PRODUCTS loop machines")

                    const response = await FloatFryServer.getMachine(machine.machine)

                    if (response) {
                        resolvedMachines.push({
                            index: machine.index,
                            id: response.result.id,
                            name: response.result.name,
                            time: machine.time
                        })
                    } else {
                        console.log("PRODUCTS error machines")

                        return null
                    }
                }

                // colors

                for (let color of colors) {
                    const resolvedMaterials: ProductMaterial[] = []
                    const resolvedMachines: ProductMachine[] = []

                    for (let material of color.materials) {
                        const response = await FloatFryServer.getMaterial(material.material)

                        if (response) {
                            resolvedMaterials.push({
                                id: response.result.id,
                                name: response.result.name,
                                quantity: material.quantity,
                                quantityUnit: response.result.quantityUnit
                            })
                        }
                    }

                    for (let machine of color.machines) {
                        const response = await FloatFryServer.getMachine(machine.machine)

                        if (response) {
                            resolvedMachines.push({
                                index: machine.index,
                                id: response.result.id,
                                name: response.result.name,
                                time: machine.time
                            })
                        }
                    }

                    resolvedColors.push({
                        ...color,
                        materials: resolvedMaterials,
                        machines: resolvedMachines
                    })
                }

                for (let lidMaterial of lidMaterials) {
                    const resolvedMaterials: ProductMaterial[] = []
                    const resolvedMachines: ProductMachine[] = []

                    for (let material of lidMaterial.materials) {
                        const response = await FloatFryServer.getMaterial(material.material)

                        if (response) {
                            resolvedMaterials.push({
                                id: response.result.id,
                                name: response.result.name,
                                quantity: material.quantity,
                                quantityUnit: response.result.quantityUnit
                            })
                        }
                    }

                    for (let machine of lidMaterial.machines) {
                        const response = await FloatFryServer.getMachine(machine.machine)

                        if (response) {
                            resolvedMachines.push({
                                index: machine.index,
                                id: response.result.id,
                                name: response.result.name,
                                time: machine.time
                            })
                        }
                    }

                    resolvedLidMaterials.push({
                        ...lidMaterial,
                        materials: resolvedMaterials,
                        machines: resolvedMachines
                    })
                }

                for (let handleMaterial of handleMaterials) {
                    const resolvedMaterials: ProductMaterial[] = []
                    const resolvedMachines: ProductMachine[] = []

                    for (let material of handleMaterial.materials) {
                        const response = await FloatFryServer.getMaterial(material.material)

                        if (response) {
                            resolvedMaterials.push({
                                id: response.result.id,
                                name: response.result.name,
                                quantity: material.quantity,
                                quantityUnit: response.result.quantityUnit
                            })
                        }
                    }

                    for (let machine of handleMaterial.machines) {
                        const response = await FloatFryServer.getMachine(machine.machine)

                        if (response) {
                            resolvedMachines.push({
                                index: machine.index,
                                id: response.result.id,
                                name: response.result.name,
                                time: machine.time
                            })
                        }
                    }

                    resolvedHandleMaterials.push({
                        ...handleMaterial,
                        materials: resolvedMaterials,
                        machines: resolvedMachines
                    })
                }

                console.log("PRODUCTS loop machines end")


                const displayDesignSpec = {
                    ...product.designSpec,
                    materials: resolvedMaterials
                }

                const displayManufacturingInstruction = {
                    ...product.manufacturingInstruction,
                    machines: resolvedMachines
                }

                displayProducts.push({
                    ...product,
                    designSpec: displayDesignSpec,
                    manufacturingInstruction: displayManufacturingInstruction,
                    colors: resolvedColors,
                    lidMaterials: resolvedLidMaterials,
                    handleMaterials: resolvedHandleMaterials
                })
            }

            console.log("PRODUCTS return", displayProducts)
            return {
                ...response,
                result: displayProducts
            }
        }

        return null
    }

    public static async getProduct(id: string)  {
        const response = await FloatFryServer.getProduct(id)
        const product = response.result

        const materials = product.designSpec.materials
        const machines = product.manufacturingInstruction.machines

        const colors = product.colors
        const lidMaterials = product.lidMaterials
        const handleMaterials = product.handleMaterials

        const resolvedMaterials = []
        const resolvedMachines = []

        const resolvedColors: ProductColor[] = []

        const resolvedLidMaterials: ProductMaterial[] = []

        const resolvedHandleMaterials: ProductMaterial[] = []

        for (let material of materials) {
            const response = await FloatFryServer.getMaterial(material.material)

            if (response) {
                resolvedMaterials.push({
                    // ...material,
                    id: response.result.id,
                    name: response.result.name,
                    quantity: material.quantity,
                    quantityUnit: response.result.quantityUnit
                })
            } else {
                return null
            }
        }
        console.log("PRODUCT 2", product)


        for (let machine of machines) {
            const response = await FloatFryServer.getMachine(machine.machine)

            if (response) {
                resolvedMachines.push({
                    index: machine.index,
                    id: response.result.id,
                    name: response.result.name,
                    time: machine.time
                })
            } else {
                return null
            }
        }

        for (let color of colors) {
            const resolvedMaterials: ProductMaterial[] = []
            const resolvedMachines: ProductMachine[] = []

            for (let material of color.materials) {
                const response = await FloatFryServer.getMaterial(material.material)

                if (response) {
                    resolvedMaterials.push({
                        id: response.result.id,
                        name: response.result.name,
                        quantity: material.quantity,
                        quantityUnit: response.result.quantityUnit
                    })
                }
            }

            for (let machine of color.machines) {
                const response = await FloatFryServer.getMachine(machine.machine)

                if (response) {
                    resolvedMachines.push({
                        index: machine.index,
                        id: response.result.id,
                        name: response.result.name,
                        time: machine.time
                    })
                }
            }

            resolvedColors.push({
                ...color,
                materials: resolvedMaterials,
                machines: resolvedMachines
            })
        }

        for (let lidMaterial of lidMaterials) {
            const resolvedMaterials: ProductMaterial[] = []
            const resolvedMachines: ProductMachine[] = []

            for (let material of lidMaterial.materials) {
                const response = await FloatFryServer.getMaterial(material.material)

                if (response) {
                    resolvedMaterials.push({
                        id: response.result.id,
                        name: response.result.name,
                        quantity: material.quantity,
                        quantityUnit: response.result.quantityUnit
                    })
                }
            }

            for (let machine of lidMaterial.machines) {
                const response = await FloatFryServer.getMachine(machine.machine)

                if (response) {
                    resolvedMachines.push({
                        index: machine.index,
                        id: response.result.id,
                        name: response.result.name,
                        time: machine.time
                    })
                }
            }

            resolvedLidMaterials.push({
                ...lidMaterial,
                materials: resolvedMaterials,
                machines: resolvedMachines
            })
        }

        for (let handleMaterial of handleMaterials) {
            const resolvedMaterials: ProductMaterial[] = []
            const resolvedMachines: ProductMachine[] = []

            for (let material of handleMaterial.materials) {
                const response = await FloatFryServer.getMaterial(material.material)

                if (response) {
                    resolvedMaterials.push({
                        id: response.result.id,
                        name: response.result.name,
                        quantity: material.quantity,
                        quantityUnit: response.result.quantityUnit
                    })
                }
            }

            for (let machine of handleMaterial.machines) {
                const response = await FloatFryServer.getMachine(machine.machine)

                if (response) {
                    resolvedMachines.push({
                        index: machine.index,
                        id: response.result.id,
                        name: response.result.name,
                        time: machine.time
                    })
                }
            }

            resolvedHandleMaterials.push({
                ...handleMaterial,
                materials: resolvedMaterials,
                machines: resolvedMachines
            })
        }

        const displayDesignSpec = {
            ...product.designSpec,
            materials: resolvedMaterials
        }

        const displayManufacturingInstruction = {
            ...product.manufacturingInstruction,
            machines: resolvedMachines
        }

        const displayProduct = {
            ...product,
            designSpec: displayDesignSpec,
            manufacturingInstruction: displayManufacturingInstruction,
            colors: resolvedColors,
            lidMaterials: resolvedLidMaterials,
            handleMaterials: resolvedHandleMaterials
        }

        return {
            ...response,
            result: displayProduct
        }
    }

    public static async updateProduct(id: string, product: any) {
        const displayPhotos = []
        const technicalDrawings = []
        const designSpecDocs = []
        const manufacturingInstructionDocs = []

        console.log("PRODUCT edit", product)

        console.log("PRODUCT uploaded", product.technicalDrawings)
        for (let document of product.technicalDrawings) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                technicalDrawings.push({
                    name: response.result.name,
                    uri: response.result.uri
                })
            } else {
                return 500
            }
        }

        for (let document of product.designSpec.supportingDocuments) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                designSpecDocs.push({
                    name: response.result.name,
                    uri: response.result.uri
                })
            } else {
                return 500
            }
        }

        for (let document of product.manufacturingInstruction.supportingDocuments) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                manufacturingInstructionDocs.push({
                    name: response.result.name,
                    uri: response.result.uri
                })
            } else {
                return 500
            }
        }

        for (let displayPhoto of product.displayPhotos) {
            const response = await FloatFryServer.uploadFile(displayPhoto)

            if (response.status === 201) {
                displayPhotos.push({
                    name: response.result.name,
                    uri: response.result.uri
                })

            } else {
                return 500
            }
        }

        const update = {
            ...product,
            technicalDrawings: technicalDrawings,
            designSpec: {
                ...product.designSpec,
                supportingDocuments: designSpecDocs
            },
            manufacturingInstruction: {
                ...product.manufacturingInstruction,
                supportingDocuments: manufacturingInstructionDocs
            },
            displayPhotos: displayPhotos
        }

        return await FloatFryServer.updateProduct(id, update)
    }

    public static async updateProductColorOption(id: string, colorOptionId: string, update: any) {
        return await FloatFryServer.updateProductColorOption(id, colorOptionId, update)
    }
    public static async updateProductLidMaterialOption(id: string, lidMaterialOptionId: string, update: any) {
        return await FloatFryServer.updateProductLidMaterialOption(id, lidMaterialOptionId, update)
    }
    public static async updateProductHandleMaterialOption(id: string, handleMaterialOptionId: string, update: any) {
        return await FloatFryServer.updateProductHandleMaterialOption(id, handleMaterialOptionId, update)
    }

    public static async addProductColorOption(id: string, update: any) {
        return await FloatFryServer.addProductColorOption(id, update)
    }
    public static async addProductLidMaterialOption(id: string, update: any) {
        return await FloatFryServer.addProductLidMaterialOption(id, update)
    }
    public static async addProductHandleMaterialOption(id: string, update: any) {
        return await FloatFryServer.addProductHandleMaterialOption(id, update)
    }

    public static async addProduct(product: any) {
        const displayPhotos = []
        const technicalDrawings = []
        const designSpecDocs = []
        const manufacturingInstructionDocs = []

        for (let document of product.technicalDrawings) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                technicalDrawings.push({
                    name: response.result.name,
                    uri: response.result.uri
                })

                console.log("PRODUCT uploaded", technicalDrawings[technicalDrawings.length - 1])
            } else {
                return 500
            }
        }

        for (let document of product.designSpec.supportingDocuments) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                designSpecDocs.push({
                    name: response.result.name,
                    uri: response.result.uri
                })

                console.log("PRODUCT uploaded", designSpecDocs[designSpecDocs.length - 1])
            } else {
                return 500
            }
        }

        for (let document of product.manufacturingInstruction.supportingDocuments) {
            const response = await FloatFryServer.uploadFile(document)

            if (response.status === 201) {
                manufacturingInstructionDocs.push({
                    name: response.result.name,
                    uri: response.result.uri
                })

                console.log("PRODUCT uploaded", manufacturingInstructionDocs[manufacturingInstructionDocs.length - 1])
            } else {
                return 500
            }
        }

        for (let displayPhoto of product.displayPhotos) {
            const response = await FloatFryServer.uploadFile(displayPhoto)
            console.log("PRODUCT photos response", response)

            if (response.status === 201) {
                displayPhotos.push({
                    name: response.result.name,
                    uri: response.result.uri
                })

                console.log("PRODUCT uploaded", displayPhoto[displayPhoto.length - 1])
            } else {
                return 500
            }
        }

        const newProduct = {
            ...product,
            technicalDrawings: technicalDrawings,
            designSpec: {
                ...product.designSpec,
                supportingDocuments: designSpecDocs
            },
            manufacturingInstruction: {
                ...product.manufacturingInstruction,
                supportingDocuments: manufacturingInstructionDocs
            },
            displayPhotos: displayPhotos
        }

        return await FloatFryServer.addProduct(newProduct)
    }

    public static async getProductOptions() {
        const allProducts = await FloatFryServer.getProducts()
        const colors = []
        const lidMaterials = []
        const handleMaterials = []

        if (allProducts) {
            const products = allProducts.result
            const pagesCount = allProducts.count

            colors.push(...products.flatMap((product: any) => product.colors))
            lidMaterials.push(...products.flatMap((product: any) => product.lidMaterials))
            handleMaterials.push(...products.flatMap((product: any) => product.handleMaterials))

            if (pagesCount > 1) {
                for (let i = 1; i < pagesCount; i++) {
                    const nextPage = await FloatFryServer.getProducts(i)

                    if (nextPage) {
                        colors.push(...nextPage.result.flatMap((product: any) => product.colors))
                        lidMaterials.push(...nextPage.result.flatMap((product: any) => product.lidMaterials))
                        handleMaterials.push(...nextPage.result.flatMap((product: any) => product.handleMaterials))
                    } else {
                        return null
                    }
                }
            }

            return {colors, lidMaterials, handleMaterials}
        } else {
            return null
        }
    }
}