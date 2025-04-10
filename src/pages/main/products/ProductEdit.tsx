import "../../../style/pages/dashboard.css"
import {Table} from "../../../Table";
import {useContext, useEffect, useRef, useState} from "react";
import {
    Product,
    ProductColor,
    ProductHandleMaterial,
    ProductLidMaterial, ProductMachine,
    ProductMaterial
} from "../../../data/products/Product";
import "../../../style/card.css"
import "../../../style/form.css"
import App from "../../../App";
import {AppContext} from "../../../AppContext";
import {Chip} from "../../../Chip";
import {Material} from "../../../data/materials/Material";
import "../../../style/list.css"
import closeIcon from "../../../close.svg"
import addIcon from "../../../add.svg"
import {Machine} from "../../../data/machines/Machine";
import "../../../style/pages/productUpload.css"
import BackIcon from "../../../back.svg";
import {useNavigate, useSearchParams} from "react-router";
import {ProductsRepository} from "../../../data/products/ProductsRepository";
import {MaterialsRepository} from "../../../data/materials/MaterialsRepository";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";
import "../../../style/form.css"
import {FloatFryServer} from "../../../data/FloatFryServer";

export function ProductEdit() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const productId = params.get("productId")
    const action = params.get("action")

    const ref = useRef<HTMLFormElement>(null)
    const designSpecRef = useRef<HTMLInputElement>(null)
    const manufacturingInstructionRef = useRef<HTMLInputElement>(null)
    const technicalDrawingsRef = useRef<HTMLInputElement>(null)
    const displayPhotosRef = useRef<HTMLInputElement>(null)

    const [productColors, setProductColors] = useState<ProductColor[]>([])
    const [selectedProductColors, setselectedProductColors] = useState<ProductColor[]>([])

    const [lidMaterials, setLidMaterials] = useState<ProductLidMaterial[]>([])
    const [selectedLidMaterials, setSelectedLidMaterials] = useState<ProductLidMaterial[]>([])

    const [handleMaterials, setHandleMaterials] = useState<ProductHandleMaterial[]>([])
    const [selectedHandleMaterials, setSelectedHandleMaterials] = useState<ProductHandleMaterial[]>([])

    const [materials, setMaterials] = useState<ProductMaterial[]>([])
    const [selectedMaterials, setSelectedMaterials] = useState<ProductMaterial[]>([])

    const [machines, setMachines] = useState<ProductMachine[]>([])
    const [selectedMachines, setSelectedMachines] = useState<ProductMachine[]>([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const update = async () => {
            const materials = await MaterialsRepository.getAllMaterials()
            const machines = await MachinesRepository.getAllMachines()

            if (action === "edit") {
                const product = await ProductsRepository.getProduct(productId!)

                if (product) {
                    console.log("PRODUCT", product)
                    setName(product.result.name)
                    setDescription(product.result.description)
                    setSelectedMaterials(product.result.designSpec.materials)
                    setSelectedMachines(product.result.manufacturingInstruction.machines)
                }
            }
            if (materials) {
                const productMaterials: ProductMaterial[] = materials.result.map((material: Material) => {
                    return {
                        id: material.id,
                        name: material.name,
                        quantity: 0,
                        quantityUnit: material.quantityUnit
                    }
                })
                setMaterials(productMaterials)
            }
            if (machines) {
                const productMachines: ProductMachine[] = machines.result.map((machine: Machine) => {
                    return {
                        index: -1,
                        id: machine.id,
                        name: machine.name,
                        time: 0,
                    }
                })

                setMachines(productMachines)
            }

            //@ts-ignore
            const {colors, lidMaterials, handleMaterials} = await ProductsRepository.getProductOptions()

            setProductColors(colors)
            setLidMaterials(lidMaterials)
            setHandleMaterials(handleMaterials)
        }

        update()
    }, [action])

    const showMaterials = () => materials
        .filter((material) => !selectedMaterials.some((it) => it.id === material.id))
        .map((material) => {
            return (
                <li style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 40,
                    margin: 0,
                    padding: "12px 12px",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",

                    borderRadius: 20
                }}>{material.name} <img src={addIcon} onClick={(e) => {
                    const selected = [...selectedMaterials, material]
                    setSelectedMaterials(selected)
                }}/></li>
            )
        })

    const showSelectedMaterials = () => {
        if (selectedMaterials.length > 0) {
            return (
                <ul style={{
                    display: "flex",
                    // gridTemplateColumns: "repeat(2, 1fr)",
                    flexDirection: "column",
                    maxHeight: "50vh",
                    listStyleType: "none",
                    overflowY: "scroll",
                    gap: 12,
                    padding: 0
                }}>
                    {selectedMaterials.map((material) => {
                        return (
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // height: 40,
                                margin: 0,
                                boxSizing: "border-box",
                                width: "calc(50% - 12px)",
                                padding: "12px 12px",
                                backgroundColor: "var(--color-primary)",
                                color: "var(--color-on-primary)",

                                borderRadius: 20
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12
                                }}>
                                    <label>{material.name} ({material.quantityUnit})</label>
                                    <input type="number" min={0} name={material.id} defaultValue={material.quantity}/>
                                </div>
                                <img src={closeIcon} onClick={(e) => {
                                    const selected = selectedMaterials.filter((it) => it.id !== material.id)
                                    setSelectedMaterials(selected)
                                }}/></div>
                        )
                    })
                    }</ul>
            )
        } else {
            return (
                <p>No materials selected</p>
            )
        }
    }
    const showSelectedMaterials2 = () => {
        if (selectedMaterials.length > 0) {
            return (
                <ul style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    maxHeight: "50vh",
                    listStyleType: "none",
                    overflowY: "scroll",
                    gap: 12,
                    padding: 0
                }}>
                    {selectedMaterials.map((material) => {
                        return (
                            <li style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: 40,
                                margin: 0,
                                padding: "12px 12px",
                                backgroundColor: "var(--color-primary)",
                                color: "var(--color-on-primary)",

                                borderRadius: 20
                            }}>{material.name} <img src={closeIcon} onClick={(e) => {
                                const selected = selectedMaterials.filter((it) => it.id !== material.id)
                                setSelectedMaterials(selected)
                            }}/></li>
                        )
                    })
                    }</ul>
            )
        } else {
            return (
                <p>No materials selected</p>
            )
        }
    }

    const showMachines = () => machines
        .filter((machine) => true || !selectedMachines.some((it) => it.id === machine.id))
        .map((machine) => {
            return (
                <li style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 40,
                    margin: 0,
                    padding: "12px 12px",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-on-primary)",

                    borderRadius: 20
                }}>{machine.name} <img src={addIcon} onClick={(e) => {
                    const selected = [...selectedMachines, machine]
                    setSelectedMachines(selected)
                }}/></li>
            )
        })

    const showSelectedMachines = () => {
        if (selectedMachines.length > 0) {
            return (
                <ul style={{
                    display: "flex",
                    flexDirection: "column",
                    // gridTemplateColumns: "repeat(2, 1fr)",
                    maxHeight: "50vh",
                    listStyleType: "none",
                    overflowY: "scroll",
                    gap: 12,
                    padding: 0
                }}>{selectedMachines.map((machine) => {
                    return (
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            // height: 40,
                            margin: 0,
                            padding: "12px 12px",
                            backgroundColor: "var(--color-primary)",
                            color: "var(--color-on-primary)",

                            borderRadius: 20
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12
                            }}>
                                {machine.name}
                                <label>Time (minutes)</label>
                                <input type="number" min={0} name={`${machine.id}-${machine.index}`}
                                       defaultValue={machine.time}/>
                            </div>
                    <img src={closeIcon} onClick={(e) => {
                        const selected = selectedMachines.filter((it) => it.id !== machine.id)
                        setSelectedMachines(selected)
                    }}/>
                </div>
                )
                })}</ul>
            )
        } else {
            return (
                <p>No machines selected</p>
            )
        }
    }

    const showCurrentColors = () => {
        if (productColors.length > 0) {
            return (
                <ul className="selectionList">
                    {productColors
                        .filter((color) => !selectedProductColors.some((it) => it.id === color.id))
                        .map((color) => {
                            return (
                                <li>
                                <span style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 12
                                }}>
                                    <span style={{
                                        display: "inline-block",
                                        width: 18,
                                        height: 18,
                                        backgroundColor: color.color,
                                        borderRadius: 9,
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        borderColor: "var(--color-outline)"
                                        // boxShadow: `1px 1px 24px 1px ${it.color}`
                                    }}/>{color.name} <b>{color.color}</b>
                                    </span>
                                    <img src={addIcon} onClick={(e) => {
                                        const selected = [...selectedProductColors, color]
                                        setselectedProductColors(selected)
                                    }}/></li>
                            )
                        })
                    }</ul>
            )
        } else {
            return <p>No colours available.</p>
        }
    }

    const [colorErrorMessage, setColorErrorMessage] = useState<string | null>(null)
    const [colorErrorMessageVisible, setColorErrorMessageVisible] = useState(false)

    const showColorErrorMessage = () => {
        if (colorErrorMessageVisible) {
            return <p className="error">{colorErrorMessage}</p>
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
                <button className="text icon"><img src={BackIcon} onClick={(e) => {
                    if (params.has("productId")) {
                        navigate(`./?productId=${params.get("productId")}`)
                    } else {
                        navigate("./")
                    }
                }}/></button>
                <button className="filled"
                        onClick={(e) => {
                            const formData = new FormData(ref.current!)
                            const product = {
                                name: formData.get("name"),
                                description: formData.get("description"),
                                //@ts-ignore
                                displayPhotos: displayPhotosRef.current!.files as File[],
                                //@ts-ignore
                                technicalDrawings: technicalDrawingsRef.current!.files as File[],
                                designSpec: {
                                    materials: selectedMaterials.map((it) => {
                                        return {
                                            material: it.id,
                                            quantity: it.quantity
                                        }
                                    }),
                                    //@ts-ignore
                                    supportingDocuments: designSpecRef.current!.files as File[]
                                },
                                manufacturingInstruction: {
                                    machines: selectedMachines.map((it, i) => {
                                        return {
                                            index: i,
                                            machine: it.id,
                                            time: it.time,
                                        }
                                    }),
                                    //@ts-ignore
                                    supportingDocuments: manufacturingInstructionRef.current!.files as File[]
                                }
                            }

                            let response: Promise<number>
                            if (action === "edit") {
                                response = ProductsRepository.updateProduct(productId!, product)
                            } else {
                                response = ProductsRepository.addProduct(product)
                            }

                            response.then((status) => {
                                console.log("PRODUCTS r", status)
                            })
                        }}
                >Upload
                </button>
            </div>

            <h2 style={{
                margin: 0
            }}>{action === "edit" ? "Edit product" : "Add product"}</h2>
            <p>You can edit product options such as color and, lid and handle materials by clicking on an option in
                the product details page.</p>

            <form ref={ref} style={{
                flex: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                <div className="card" style={{
                    display: "flex",
                    width: "100%",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    gap: 12
                }}>
                    <h2 style={{margin: 0}}>Technical drawings</h2>
                    <input ref={technicalDrawingsRef} type="file" multiple={true} name="technicalDrawings"/>
                </div>

                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2 style={{margin: 0}}>Design specification</h2>
                    <p style={{margin: 0}}>Select required materials and upload any supporting documents.</p>
                    <h2 style={{margin: 0}}>All materials</h2>
                    <ul style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        maxHeight: "50vh",
                        listStyleType: "none",
                        overflowY: "scroll",
                        gap: 12,
                        padding: 0
                    }}>
                        {showMaterials()}

                    </ul>

                    <h2 style={{margin: 0}}>Selected materials</h2>

                    {showSelectedMaterials()}

                    <label>Supporting documents</label>
                    <input ref={designSpecRef} type="file" name="designSpecSupportingDocuments" multiple={true}/>
                </div>

                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2 style={{margin: 0}}>Manufacturing instruction</h2>
                    <p style={{margin: 0}}>Select required machines and upload any supporting documents.</p>
                    <h2 style={{margin: 0}}>All machines</h2>
                    <ul style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        maxHeight: "50vh",
                        listStyleType: "none",
                        overflowY: "scroll",
                        gap: 12,
                        padding: 0
                    }}>
                        {showMachines()}
                    </ul>

                    <h2 style={{margin: 0}}>Selected machines</h2>
                    {showSelectedMachines()}

                    <label>Supporting documents</label>
                    <input ref={manufacturingInstructionRef} type="file"
                           name="manufacturingInstructionSupportingDocuments" multiple={true}/>
                </div>

                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2>Display photos</h2>
                    <p>Chose photos to display on product page.</p>
                    <input ref={displayPhotosRef} type="file" multiple={true} name="displayPhotos"/>
                </div>

                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2>Product name</h2>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={name}/>
                    <label>Description</label>
                    <textarea name={"description"} rows={5} defaultValue={description}/>
                </div>
            </form>
        </div>
    )
}