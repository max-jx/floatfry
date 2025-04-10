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
import {MachinesRepository} from "../../../data/machines/MachinesRepository";
import {Machine} from "../../../data/machines/Machine";

export function MachineDetails() {
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const machineId = params.get("machineId")!

    const [machine, setMachine] = useState<Machine>()

    useEffect(() => {
        const update = async () => {
            const machine = await MachinesRepository.getMachine(machineId)

            if (machine) {
                console.log("MACHINE", machine)
                setMachine(machine.result)
            }
        }

        update()
    }, [machineId])

    const showProducts = () => {
        const products = machine!.products

        if (products.length > 0) {
            return products.map((product) => {
                return (
                    <div style={{
                        width: "50%"
                    }} className="card">
                        <h2>{product.name}</h2>
                    </div>
                )
            })
        }
    }

    if (!machine) {
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
                        onClick={(e) => navigate(`./?machineId=${machineId}&action=edit`)}
                >Edit
                </button>
            </div>
            <h2 style={{
                margin: 0
            }}>{machine!.name}</h2>
            <p>Production capacity <b>{`${machine!.productionCapacity}${machine!.productionCapacityUnit}`}</b></p>
            <p>Production cycle speed <b>{`${machine!.productionCycleSpeed}${machine!.productionCycleSpeedUnit}`}</b></p>

            <h2>Used in</h2>
            {showProducts()}
        </div>
    )
}