import "../../../style/pages/dashboard.css"
import React, {useContext, useEffect, useRef, useState} from "react";
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import "../../../style/pages/materialDetails.css"
import {Material} from "../../../data/materials/Material";
import "../../../style/card.css"
import "../../../style/form.css"
import {MaterialsRepository} from "../../../data/materials/MaterialsRepository";
import {OrdersRepository} from "../../../data/orders/OrdersRepository";

export function MaterialDetails() {
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const materialId = params.get("materialId")!

    const [material, setMaterial] = useState<Material>()

    useEffect(() => {
        const update = async () => {
            const material = await MaterialsRepository.getMaterial(materialId)

            if (material) {
                console.log("MATERIAL", material)
                setMaterial(material.result)
            }
        }

        update()
    }, [materialId])

    const showSuppliers = () => {
        const suppliers = material!.suppliers

        if (suppliers.length > 0) {
            return suppliers.map((supplier) => {
                return (
                    <div style={{
                        width: "50%"
                    }} className="card">
                        <h2>{supplier.name}</h2>
                        <label>Enter amount ({material!.quantityUnit})</label>
                        <input name={`${supplier.id}`} type="number"
                               min={0}
                        />
                    </div>
                )
            })
        }
    }

    if (!material) {
        return <p>Error loading material</p>
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

                <button className="filled"
                        onClick={(e) => navigate(`./?materialId=${materialId}&action=edit`)}
                >Edit
                </button>
            </div>
            <h2 style={{
                margin: 0
            }}>{material!.name}</h2>
            <p>Current stock <b>{`${material!.availableQuantity}${material!.quantityUnit}`}</b></p>
            <p>Required stock <b>{`${material!.requiredQuantity}${material!.quantityUnit}`}</b></p>
            <p>Ordered stock</p>
            <h2>Place order</h2>
            <form ref={ref}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    gap: 12
                }}>
                    <button className="text">Clear</button>
                    <button className="filled"
                            onClick={(e) => {
                                const formData = new FormData(ref.current!)

                                for (let supplier of material!.suppliers) {
                                    const order = {
                                        material: material!.id,
                                        supplier: supplier.id,
                                        quantityUnit: formData.get(supplier.id)
                                    }

                                    OrdersRepository.placeOrder(order)
                                }
                            }}
                    >Place order</button>
                </div>
                {showSuppliers()}
            </form>
        </div>
    )
}