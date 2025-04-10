import "../../../style/pages/dashboard.css"
import React, {useEffect, useState} from "react";
import {Product, ProductColor, ProductHandleMaterial, ProductLidMaterial} from "../../../data/products/Product";
import "../../../style/card.css"
import "../../../style/pages/productDetails.css"
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {ProductsRepository} from "../../../data/products/ProductsRepository";

export function ProductHandleMaterialOptionDetails() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const productId = params.get("productId")!
    const handleMaterialOptionId = params.get("handleMaterialOptionId")!

    const [product, setProduct] = useState<Product>()
    const [handleMaterial, setHandleMaterial] = useState<ProductHandleMaterial>()

    useEffect(() => {
        const update = async () => {
            const response = await ProductsRepository.getProduct(productId)

            if (response) {
                console.log("PRODUCT response", response.result)
                setProduct(response.result)

                const handleMaterial = response.result.handleMaterials.find((it: ProductHandleMaterial) => it.id === handleMaterialOptionId)
                setHandleMaterial(handleMaterial)
            }
            else {
                console.log("PRODUCT no response")
            }
        }

        update()
    }, [productId, handleMaterialOptionId])

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
                                    action: "edit",
                                    handleMaterialOptionId: handleMaterialOptionId
                                }).toString()
                            })
                        }}
                >Edit</button>
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
                                        action: "edit",
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
                {product!.manufacturingInstruction.machines.map((machine) => {
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

    const showColourOptions = () => {
        if (product!.colors.length > 0) {
            return <ul className="list">
                {product!.colors.map((color) => {
                    return <li style={{
                        justifyContent: "left",
                        gap: 12
                    }}><span style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: "var(--color-outline)",
                        backgroundColor: color.color,
                    }}></span>{color.name} <b>{color.color}</b></li>
                })}
            </ul>
        }
    }

    const showLidMaterialOptions = () => {
        if (product!.lidMaterials.length > 0) {
            return <ul className="list">
                {product!.lidMaterials.map((material) => {
                    return <li style={{
                        justifyContent: "left",
                        gap: 12
                    }}>{material.name}</li>
                })}
            </ul>
        }
    }

    const showHandleMaterialOptions = () => {
        if (product!.handleMaterials.length > 0) {
            return <ul className="list">
                {product!.handleMaterials.map((material) => {
                    return <li style={{
                        justifyContent: "left",
                        gap: 12
                    }}>{material.name}</li>
                })}
            </ul>
        }
    }

    if (!product || !handleMaterialOptionId) {
        return <p>Error loading product</p>
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
            }}>{product!.name}</h2>

            <p><b>{handleMaterial!.name}</b></p>

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
                <h2>Materials</h2>
                {showDesignSpecMaterials()}
            </div>

            <div className="card" style={{
                marginTop: 24
            }}>
                <h2>Machines</h2>
                {showMachines()}
            </div>
        </div>
    )
}