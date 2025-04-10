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
import {FactoryMachine} from "../../../data/factoryMachines/FactoryMachine";
import {FactoryMachinesRepository} from "../../../data/factoryMachines/FactoryMachinesRepository";

export function FactoryMachineDetails() {
    const ref = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const machineId = params.get("machineId")!

    const [factoryMachine, setFactoryMachine] = useState<FactoryMachine>()


    const [name, setName] = useState("")
    const [machine, setMachine] = useState("")
    const [allMachines, setAllMachines] = useState<Machine[]>([])


    useEffect(() => {
        const update = async () => {
            console.log("FACTORY")
            const response = await FactoryMachinesRepository.getMachine(machineId)
            const machinesResponse = await MachinesRepository.getAllMachines()
            console.log("FACTORY 1", response)
            console.log("FACTORY 2", machinesResponse)

            if (response && machinesResponse) {
                const result = response.result
                const machinesResult = machinesResponse.result
                console.log("EDIT", result)

                setFactoryMachine(result)

                setName(result.name)
            } else {
                console.log("EDIT no")
            }
        }

        update()
    }, [machineId]);

    if (!factoryMachine) {
        return <p>Error loading machine</p>
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
            }}>{factoryMachine!.name}</h2>
            <p>Machine <b>{factoryMachine!.machineName}</b></p>
        </div>
    )
}