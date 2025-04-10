import "../../../style/pages/dashboard.css"
import React, {useEffect, useState} from "react";
import {Product} from "../../../data/products/Product";
import "../../../style/card.css"
import {createSearchParams, useNavigate, useSearchParams} from "react-router";
import {ProductsRepository} from "../../../data/products/ProductsRepository";
import BackIcon from "../../../back.svg";
import "../../../style/pages/productDetails.css"
import "../../../style/form.css"

export function ProductDetails() {
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const productId = params.get("productId")!

    const [page, setPage] = useState(0)
    const [pagesCount, setPagesCount] = useState(1)
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        const update = async () => {
            const response = await ProductsRepository.getProduct(productId)

            if (response) {
                console.log("PRODUCTS update", response.result)
                setProduct(response.result)
            } else {
                console.log("PRODUCTS no")
            }
        }

        update()
    }, [page])

    if (!product) {
        return <p>Error</p>
    }

    const showActions = () => {
        if (product!.status === "approved") {
            return <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 12
            }}>
                <button className="text">Delete</button>
                <button className="filled"
                        onClick={(e) => {
                            navigate({
                                pathname: "./",
                                search: createSearchParams({
                                    productId: productId,
                                    action: "edit"
                                }).toString()
                            })
                        }}
                >Edit
                </button>
            </div>
        } else {


            return (
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12
                }}>
                    <button className="text">Delete</button>
                    <button className="filled"
                            onClick={(e) => {
                                navigate({
                                    pathname: "./",
                                    search: createSearchParams({
                                        productId: productId,
                                        action: "edit"
                                    }).toString()
                                })
                            }}
                    >Edit
                    </button>
                    <button className="outlined"
                            onClick={(e) => {

                            }}
                    >Approve
                    </button>
                </div>
            )
        }
    }

    const showTechnicalDrawings = () => {
        if (product!.technicalDrawings.length > 0) {
            return <ul className="list">
                {product!.technicalDrawings.map((it) => {
                    return <li>{it.name}
                        <button className="filled">Download</button>
                    </li>
                })}
            </ul>
        } else {
            return <p>Nothing to show</p>
        }
    }

    const showDesignSpecMaterials = () => {
        console.log("SHOWING materials", product!.designSpec)

        if (product!.designSpec.materials.length > 0) {
            return <ul className="list">
                {product!.designSpec.materials.map((material) => {
                    return <li>{material.name} ({material.quantity}{material.quantityUnit})</li>
                })}
            </ul>
        } else {
            return <p>Nothing to show</p>
        }
    }
    const showDesignSpecFiles = () => {
        if (product!.designSpec.supportingDocuments.length > 0) {
            return <ul className="list">
                {product!.designSpec.supportingDocuments.map((it) => {
                    return <li>{it.name}
                        <button className="filled">Download</button>
                    </li>
                })}
            </ul>
        }
    }

    const showManufacturingInstructionFiles = () => {
        if (product!.manufacturingInstruction.supportingDocuments.length > 0) {
            return <ul className="list">
                {product!.manufacturingInstruction.supportingDocuments.map((it) => {
                    return <li>{it.name}
                        <button className="filled">Download</button>
                    </li>
                })}
            </ul>
        }
    }


    const showMachines = () => {
        if (product!.manufacturingInstruction.machines.length > 0) {
            return <ul className="list">
                {product!.manufacturingInstruction.machines.sort((machine) => machine.index).map((machine) => {
                    return <li>{machine.name} ({machine.time} minutes)</li>
                })}
            </ul>
        } else {
            return <p>Nothing to show</p>
        }
    }

    const showDisplayPhotos = () => {
        if (product!.displayPhotos.length > 0) {
            return (
                <ul className="displayPhotos">
                    {product!.displayPhotos.map((photo) => {
                        console.log("PHOTO", photo.uri)
                        return (
                            <div className="displayPhoto">
                                <img src={photo.uri}/>
                                <div>
                                    <p>{photo.name}</p>
                                    <button className="filled">Download</button>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )
        }
    }

    const showProductColors = () => {
        if (product!.colors.length > 0) {
            return product!.colors.map((productColor) => {
                const materialsText = productColor.materials.length === 1 ? `${productColor.materials[0].name}` : `${productColor.materials.length}`
                const machines = productColor.machines.filter((machine, i) => productColor.machines.indexOf(machine) === i);
                const machinesText = machines.length === 1 ? `${machines[0].name}` : `${machines.length}`

                return <div className="card" onClick={(e) => {
                    navigate(`?productId=${product!.id}&colorOptionId=${productColor.id}`)
                }}>
                    <h2 style={{margin: 0}}>{productColor.name}</h2>
                    <p style={{margin: 0, marginTop: 8}}>
                    <span style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                    }}/>
                        Color <b>{productColor.color}</b>
                    </p>

                    <p style={{margin: 0, marginTop: 12}}>Materials used <b>{materialsText}</b></p>
                    <p style={{margin: 0, marginTop: 12}}>Machines required <b>{machinesText}</b></p>
                </div>
            })
        } else {
            return <p>Nothing to show</p>
        }
    }

    const showProductLidMaterials = () => {
        if (product!.lidMaterials.length > 0) {
            return product!.lidMaterials.map((lidMaterial) => {
                const materialsText = lidMaterial.materials.length === 1 ? `${lidMaterial.materials[0].name}` : `${lidMaterial.materials.length}`
                const machines = lidMaterial.machines.filter((machine, i) => lidMaterial.machines.indexOf(machine) === i);
                const machinesText = machines.length === 1 ? `${machines[0].name}` : `${machines.length}`

                return <div className="card" onClick={(e) => {
                    navigate(`?productId=${product!.id}&lidMaterialOptionId=${lidMaterial.id}`)
                }}>
                    <h2 style={{margin: 0}}>{lidMaterial.name}</h2>

                    <p style={{margin: 0, marginTop: 12}}>Materials used <b>{materialsText}</b></p>
                    <p style={{margin: 0, marginTop: 12}}>Machines required <b>{machinesText}</b></p>
                </div>
            })
        } else {
            return <p>Nothing to show</p>
        }
    }

    const showProductHandleMaterials = () => {
        if (product!.handleMaterials.length > 0) {
            return product!.handleMaterials.map((handleMaterial) => {
                const materialsText = handleMaterial.materials.length === 1 ? `${handleMaterial.materials[0].name}` : `${handleMaterial.materials.length}`
                const machines = handleMaterial.machines.filter((machine, i) => handleMaterial.machines.indexOf(machine) === i);
                const machinesText = machines.length === 1 ? `${machines[0].name}` : `${machines.length}`

                return <div className="card" onClick={(e) => {
                    navigate(`?productId=${product!.id}&handleMaterialOptionId=${handleMaterial.id}`)
                }}>
                    <h2 style={{margin: 0}}>{handleMaterial.name}</h2>

                    <p style={{margin: 0, marginTop: 12}}>Materials used <b>{materialsText}</b></p>
                    <p style={{margin: 0, marginTop: 12}}>Machines required <b>{machinesText}</b></p>
                </div>
            })
        } else {
            return <p>Nothing to show</p>
        }
    }


    return (
        <div className="container">
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12
            }}>
                <button className="text icon"
                        onClick={(e) => navigate("./")}
                ><img src={BackIcon}/></button>
                {showActions()}
            </div>
            <h2 style={{
                margin: 0
            }}>{product.name}</h2>
            <p>Click on an option to view details.</p>

            <div className="card" style={{
                marginTop: 24
            }}>
                <h2>Technical drawings</h2>
                <p><b>{product!.technicalDrawings.length}</b> files available</p>
                {showTechnicalDrawings()}
            </div>

            <div className="card" style={{
                marginTop: 24
            }}>
                <h2>Design specification</h2>
                <p><b>{product!.designSpec.supportingDocuments.length}</b> files available</p>
                {showDesignSpecFiles()}
                <h2>Materials</h2>
                {showDesignSpecMaterials()}
            </div>

            <div className="card" style={{
                marginTop: 24
            }}>
                <h2>Manufacturing instruction</h2>
                <p><b>{product!.designSpec.supportingDocuments.length}</b> files available</p>
                {showDesignSpecFiles()}
                <h2>Machines</h2>
                {showMachines()}
            </div>

            <div className="card" style={{
                marginTop: 24,
            }}>
                <h2>Display photos</h2>
                <p><b>{product!.displayPhotos.length}</b> photos available</p>
                {/*<img className="displayPhoto" src={"http://localhost:3001/img.png"}/>*/}
                {showDisplayPhotos()}
            </div>

            <h2>Product colors</h2>
            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate(`./?action=newColorOption&productId=${productId}`)
                        }}
                >Upload new
                </button>
            </div>
            <div style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12
            }}>
                {showProductColors()}
            </div>

            <h2>Product lid materials</h2>
            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate(`./?action=newLidMaterialOption&productId=${productId}`)
                        }}
                >Upload new
                </button>
            </div>
            <div style={{
                marginTop: 24,
                display: "flex",
                flexFlow: "row wrap",
                gap: 12
            }}>
                {showProductLidMaterials()}
            </div>

            <h2>Product handle materials</h2>
            <div>
                <button className="filled"
                        onClick={(e) => {
                            navigate(`./?action=newHandleMaterialOption&productId=${productId}`)
                        }}
                >Upload new
                </button>
            </div>
            <div style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12
            }}>
                {showProductHandleMaterials()}
            </div>

            <div className="card" style={{
                marginTop: 24
            }}>
                <h2>Product description</h2>
                <p>Name <b>{product!.name}</b></p>
                <p>Description</p>
                <p><b>{product!.description}</b></p>
            </div>
        </div>
    )
}