import "../../../style/form.css"
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {Material, MaterialProduct, MaterialSupplier} from "../../../data/materials/Material";
import {MaterialsRepository} from "../../../data/materials/MaterialsRepository";
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";
import {Supplier} from "../../../data/suppliers/Supplier";
import "../../../style/card.css"


export function MaterialEdit() {
    const ref = useRef<HTMLFormElement>(null)
    const ref2 = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const action = params.get("action")
    const materialId = params.get("materialId")!

    const [material, setMaterial] = useState<Material>()


    const [name, setName] = useState("")
    const [availableQuantity, setAvailableQuantity] = useState(0)
    const [quantityUnit, setQuantityUnit] = useState("")
    const [materialSuppliers, setMaterialSuppliers] = useState<MaterialSupplier[]>([])
    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    useEffect(() => {
        const update = async () => {
            if (action === "edit") {

                const response = await MaterialsRepository.getMaterial(materialId)
                console.log("EDIT r", response)

                if (response) {
                    const result = response.result
                    console.log("EDIT", result)

                    setMaterial(result)

                    setName(result.name)
                    setAvailableQuantity(result.availableQuantity)
                    setQuantityUnit(result.quantityUnit)
                    setMaterialSuppliers(result.suppliers)
                } else {
                    console.log("EDIT no")
                }
            }

            const suppliersResponse = await SuppliersRepository.getAllSuppliers()

            if (suppliersResponse) {
                setSuppliers(suppliersResponse.result)
            }
        }

        update()
    }, [materialId, action]);

    const [errorVisible, setErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const showSuppliers = () => {
        if (materialSuppliers.length > 0) {
            return materialSuppliers.map((supplier) => { // employee.
                return <div className="card" style={{
                    width: "20vw",
                    gap: 12,
                }}>
                    <p style={{margin: 0}} key={supplier.id}>Supplier <b>{supplier.name}</b></p>
                    <button className="text"
                            onClick={(e) => {
                                e.preventDefault()

                                const id = supplier.id

                                // console.log("DELETE", id, s)

                                const newSuppliers = materialSuppliers.filter((it) => it.id !== id)
                                setMaterialSuppliers(newSuppliers)
                            }}
                    >Delete
                    </button>
                </div>
            })
        } else {
            return <p>This material has no suppliers.</p>
        }
    }

    const showAddSuppliers = () => {
        const unassignedSuppliers = suppliers.filter((supplier) => !materialSuppliers.some((it) => it.id === supplier.id))

        if (unassignedSuppliers.length > 0) {
            const today = new Date().toISOString().split("T")[0]
            console.log("TODAY", today)

            return <form ref={ref2} style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <label>Supplier</label>
                <select name="supplier">
                    {unassignedSuppliers.map((it) => <option key={it.id} value={it.id}>{it.name}</option>)}
                </select>

                <button className="filled"
                        onClick={(e) => {
                            e.preventDefault()

                            const formData = new FormData(ref2.current!)
                            const data = Array.from(formData.entries())

                            const isInvalid = data.some(([key, value]) => value === '')

                            if (isInvalid) return

                            const supplierId = formData.get("supplier")!.toString()
                            const newMaterialSuppliers = [...materialSuppliers, {
                                id: supplierId,
                                name: suppliers.find((supplier) => supplier.id === supplierId)!.name,
                            }]

                            setMaterialSuppliers(newMaterialSuppliers)
                        }}
                >Add
                </button>
            </form>
        } else {
            return <div>
                <p>No more suppliers available.</p>
            </div>
        }
    }


    const showErrorMessage = () => {
        if (errorVisible) {
            return <p className="error">{errorMessage}</p>
        }
    }

    return (
        <div className="container" style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12
            }}>
                <button className="text icon"
                        onClick={(e) => navigate("./")}
                ><img src={BackIcon}/></button>

                <button className="filled"
                        onClick={(e) => {
                            e.preventDefault()
                            const formData = new FormData(ref.current!)

                            const data = Array.from(formData.entries())
                            const isValid = !data.some(([_, value]) => value === '')

                            if (isValid) {
                                console.log("MATERIAL isValid")
                                const material: any = {
                                    name: formData.get("name")!.toString(),
                                    availableQuantity: formData.get("availableQuantity")!,
                                    quantityUnit: formData.get("quantityUnit")!.toString(),
                                    suppliers: materialSuppliers.map((it) => it.id)
                                }

                                let response: Promise<any>

                                if (action === "edit") {
                                    response = MaterialsRepository.updateMaterial(materialId, material)
                                }
                                else {
                                    material.requiredQuantity = 0
                                    response = MaterialsRepository.addMaterial(material)
                                }

                                response.then((status) => {
                                    console.log("material", action, status)
                                })
                            }
                            else {
                                setErrorMessage("Please fill out all fields.")
                                setErrorVisible(true)
                            }
                        }}
                >Done
                </button>
            </div>

            <h2>{action === "edit" ? "Edit material" : "Add new material"}</h2>
            {showErrorMessage()}
            <form ref={ref}
                  onChange={(e) => setErrorVisible(false)}
            >
                <label>Name</label>
                <input name="name" type="text" defaultValue={name}/>
                <label>Available quantity</label>
                <input name="availableQuantity" type="number" min={0} defaultValue={availableQuantity}/>
                <label>Quantity unit</label>
                <input name="quantityUnit" type="text" defaultValue={quantityUnit}/>
            </form>

            <h2>Suppliers</h2>
            {showSuppliers()}
            <h2>Add supplier</h2>
            {showAddSuppliers()}
        </div>
    )
}