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

export function ProductLidMaterialOptionDetailsEdit() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const productId = params.get("productId")!
    const lidMaterialOptionId = params.get("lidMaterialOptionId")
    const action = params.get("action")

    const ref = useRef<HTMLFormElement>(null)
    const ref2 = useRef<HTMLFormElement>(null)

    const [product, setProduct] = useState<Product>()

    const [lidMaterials, setLidMaterials] = useState<ProductLidMaterial[]>([])
    const [selectedLidMaterial, setSelectedLidMaterial] = useState<ProductLidMaterial | null>(null)

    const [materials, setMaterials] = useState<ProductMaterial[]>([])
    const [selectedMaterials, setSelectedMaterials] = useState<ProductMaterial[]>([])

    const [machines, setMachines] = useState<ProductMachine[]>([])
    const [selectedMachines, setSelectedMachines] = useState<ProductMachine[]>([])

    useEffect(() => {
        const update = async () => {
            const materials = await MaterialsRepository.getAllMaterials()
            const machines = await MachinesRepository.getAllMachines()

            const product = await ProductsRepository.getProduct(productId!)

            if (product && materials && machines) {
                setProduct(product.result)
                console.log("PRODUCT", product)
                const productMaterials = product.result.lidMaterials.find((it: any) => it.id === lidMaterialOptionId)?.materials || []
                const resolvedProductMaterials = productMaterials.map((it: any) => {
                    const material = materials.result.find((material) => material.id === it.id)!

                    return {
                        id: it.material,
                        name: material.name,
                        quantity: it.quantity,
                        quantityUnit: material.quantityUnit
                    }
                })

                const productMachines = product.result.lidMaterials.find((it: any) => it.id === lidMaterialOptionId)?.machines || []
                const resolvedProductMachines = productMachines.map((it: any) => {
                    const machine = machines.result.find((machine) => machine.id === it.id)!

                    return {
                        index: it.index,
                        id: it.material,
                        name: machine.name,
                        time: it.time
                    }
                })
                setSelectedMaterials(resolvedProductMaterials)
                setSelectedMachines(resolvedProductMachines)

                const allProductMaterials: ProductMaterial[] = materials.result.map((material: Material) => {
                    return {
                        id: material.id,
                        name: material.name,
                        quantity: 0,
                        quantityUnit: material.quantityUnit
                    }
                })
                setMaterials(allProductMaterials)

                const allProductMachines: ProductMachine[] = machines.result.map((machine: Machine) => {
                    return {
                        index: -1,
                        id: machine.id,
                        name: machine.name,
                        time: 0
                    }
                })

                setMachines(allProductMachines)
            }


            //@ts-ignore
            const {colors, lidMaterials, handleMaterials} = await ProductsRepository.getProductOptions()

            const selectedLidMaterial = product.result.lidMaterials.find((it: any) => it.id === lidMaterialOptionId)
            const availableLidMaterials = lidMaterials.filter((it: any) => it.id !== selectedLidMaterial.id)
            setLidMaterials(availableLidMaterials)
            setSelectedLidMaterial(selectedLidMaterial)
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
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
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
                            }}/></div>
                    )
                })}</ul>
            )
        } else {
            return (
                <p>No machines selected</p>
            )
        }
    }

    const [colorErrorMessage, setColorErrorMessage] = useState<string | null>(null)
    const [colorErrorMessageVisible, setColorErrorMessageVisible] = useState(false)

    const showColorErrorMessage = () => {
        if (colorErrorMessageVisible) {
            return <p className="error">{colorErrorMessage}</p>
        }
    }

    const showCurrentLidMaterials = () => {
        if (lidMaterials.length > 0) {
            return (
                <ul className="selectionList">
                    {lidMaterials
                        .filter((material) => selectedLidMaterial?.id !== material.id)
                        .map((material) => {
                            return (
                                <li>{material.name} <img src={addIcon} onClick={(e) => {
                                    setSelectedLidMaterial(material)
                                }}/></li>
                            )
                        })
                    }</ul>
            )
        } else {
            return <p>No materials available.</p>
        }
    }

    const showSelectedLidMaterials = () => {
        if (selectedLidMaterial) {
            return (
                <ul className="selectionList">
                    <li>
                        {selectedLidMaterial.name}
                        <img src={closeIcon} onClick={(e) => {
                            setSelectedLidMaterial(null)
                        }}/></li>
                </ul>
            )
        } else {
            return <p>No materials selected.</p>
        }
    }

    const showLidMaterialAdd = () => {
        return (
            <form ref={ref2}>
                <label>Name</label>
                <input type="text" name="materialName" onChange={(e) => setColorErrorMessageVisible(false)}/>

                <button className="filled" onClick={(e) => {
                    e.preventDefault()

                    const form = ref2.current!

                    const formData = new FormData(form)

                    const data = Array.from(formData.entries())
                    const isInvalid = data.some(([key, value]) => value === '')

                    setColorErrorMessage("Please enter all fields")
                    setColorErrorMessageVisible(isInvalid)

                    if (isInvalid) return

                    const c = formData.get("materialName")

                    console.log("COLOR", c, typeof c)

                    const material: ProductLidMaterial = {
                        id: `$color${Date.now()}`,
                        name: formData.get("materialName")?.toString() || "New color",
                        materials: [],
                        machines: []
                    }

                    const allMaterials = [...lidMaterials]
                    if (selectedLidMaterial) {
                        allMaterials.push(selectedLidMaterial)
                    }
                    const materialExists = allMaterials.some((it) => it.name === material.name)

                    setColorErrorMessage("This colour already exists.")
                    setColorErrorMessageVisible(materialExists)
                    if (materialExists) return;

                    setSelectedLidMaterial(material)

                    form.reset()
                }}>Add
                </button>
            </form>
        )
    }

    if (!product) {
        return <p>Error</p>
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
                            const materialOption: any = {
                                name: selectedLidMaterial!.name,
                                materials: selectedMaterials.map((it) => {
                                    return {
                                        material: it.id,
                                        quantity: it.quantity
                                    }
                                }),
                                machines: selectedMachines.map((it, i) => {
                                    return {
                                        index: i,
                                        machine: it.id,
                                        time: it.time
                                    }
                                })
                            }

                            if (action === "edit") {
                                ProductsRepository.updateProductLidMaterialOption(productId, lidMaterialOptionId!, materialOption)
                            } else if (action === "new") {
                                ProductsRepository.addProductLidMaterialOption(productId, materialOption)
                            }
                        }}
                >Upload
                </button>
            </div>

            <h2 style={{
                margin: 0
            }}>{action === "edit" ? `Edit lid option for ${product!.name}` : `Add lid option for ${product!.name}`}</h2>
            <p>Click on a product to view details.</p>

            <form ref={ref} style={{
                flex: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 12
            }}>
                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2 style={{margin: 0}}>Materials</h2>
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
                </div>

                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2 style={{margin: 0}}>Machines</h2>
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
                </div>


                <div className="card" style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    boxSizing: "border-box",
                    gap: 12
                }}>
                    <h2>Lid material name</h2>
                    <p>Select a material name from other existing products or create a new material name.
                        This is an option that will be displayed on the product page for customers to choose.</p>
                    <h2>Materials from other products</h2>
                    {showCurrentLidMaterials()}
                    <h2>Selected materials</h2>
                    {showSelectedLidMaterials()}
                    <h2>New material</h2>
                    {showLidMaterialAdd()}
                </div>
            </form>
        </div>
    )
}