import "../../../style/pages/dashboard.css"
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {Supplier} from "../../../data/suppliers/Supplier";
import "../../../style/pages/supplierDetails.css"
import "../../../style/card.css"
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";

export function SupplierDetails() {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const supplierId = params.get("supplierId")!

    const [supplier, setSupplier] = useState<Supplier>()

    useEffect(() => {
        const update = async () => {
            const response = await SuppliersRepository.getSupplier(supplierId)

            if (response) {
                const result = response.result

                setSupplier(result)
            }
        }

        update()
    }, [supplierId])

    const showMaterials = () => {
        if (supplier!.materials.length > 0) {
            return <ul className="list">
                {supplier!.materials.map((material) => {
                    return <li className="card">{material.name}</li>
                })}
            </ul>
        }
    }

    if (!supplier) {
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
                <button className="text icon"
                        onClick={(e) => navigate("./")}
                ><img src={BackIcon}/></button>

                <button className="filled"
                        onClick={(e) => navigate(`./?supplierId=${supplierId}&action=edit`)}
                >Edit</button>
            </div>
            <h2 style={{
                margin: 0
            }}>{supplier!.name}</h2>
            <p>Website <b><a href={`https://${supplier!.website}`}>{supplier!.website}</a></b></p>
            <p>Email <b><a href={`mailto:${supplier!.email}`}>{supplier!.email}</a></b></p>
            <p>Call <b><a href={`tel:${supplier!.telephone}`}>{supplier!.telephone}</a></b></p>
            <p>Address <b>{supplier!.address}</b></p>
            <h2>Materials supplied</h2>
            {showMaterials()}
        </div>
    )
}