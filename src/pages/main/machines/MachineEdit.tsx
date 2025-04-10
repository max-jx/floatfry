import "../../../style/form.css"
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import BackIcon from "../../../back.svg";
import {Material, MaterialProduct, MaterialSupplier} from "../../../data/materials/Material";
import {MaterialsRepository} from "../../../data/materials/MaterialsRepository";
import {SuppliersRepository} from "../../../data/suppliers/SuppliersRepository";
import {Supplier} from "../../../data/suppliers/Supplier";
import "../../../style/card.css"
import {Machine} from "../../../data/machines/Machine";
import {MachinesRepository} from "../../../data/machines/MachinesRepository";


export function MachineEdit() {
    const ref = useRef<HTMLFormElement>(null)
    const ref2 = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const action = params.get("action")
    const machineId = params.get("machineId")!

    const [machine, setMachine] = useState<Machine>()


    const [name, setName] = useState("")
    const [productionCapacity, setProductionCapacity] = useState(0)
    const [productionCapacityUnit, setProductionCapacityUnit] = useState("")
    const [productionCycleSpeed, setProductionCycleSpeed] = useState(0)
    const [productionCycleSpeedUnit, setProductionCycleSpeedUnit] = useState("")

    useEffect(() => {
        const update = async () => {
            if (action === "edit") {

                const response = await MachinesRepository.getMachine(machineId)
                console.log("EDIT r", response)

                if (response) {
                    const result = response.result
                    console.log("EDIT", result)

                    setMachine(result)

                    setName(result.name)
                    setProductionCapacity(result.productionCapacity)
                    setProductionCapacityUnit(result.productionCapacityUnit)
                    setProductionCycleSpeed(result.productionCycleSpeed)
                    setProductionCycleSpeedUnit(result.productionCycleSpeedUnit)
                } else {
                    console.log("EDIT no")
                }
            }
        }

        update()
    }, [machineId, action]);

    const [errorVisible, setErrorVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const showErrorMessage = () => {
        if (errorVisible) {
            return <p className="error">{errorMessage}</p>
        }
    }

    console.log("MACHINE n", typeof productionCapacity, productionCapacity)

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
                                const machine: any = {
                                    name: formData.get("name")!.toString(),
                                    productionCapacity: formData.get("productionCapacity"),
                                    productionCapacityUnit: formData.get("productionCapacityUnit"),
                                    productionCycleSpeed: formData.get("productionCycleSpeed"),
                                    productionCycleSpeedUnit: formData.get("productionCycleSpeedUnit"),
                                }

                                let response: Promise<any>

                                if (action === "edit") {
                                    response = MachinesRepository.updateMachine(machineId, machine)
                                }
                                else {
                                    response = MachinesRepository.addMachine(machine)
                                }

                                response.then((status) => {
                                    console.log("machine", action, status)
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

            <h2>{action === "edit" ? "Edit machine" : "Add new machine"}</h2>
            {showErrorMessage()}
            <form ref={ref}
                  onChange={(e) => setErrorVisible(false)}
            >
                <label>Name</label>
                <input name="name" type="text" defaultValue={name}/>

                <label>Production capacity</label>
                <input name="productionCapacity" type="number" min={0} defaultValue={productionCapacity}/>

                <label>Production capacity unit</label>
                <input name="productionCapacityUnit" type="text" defaultValue={productionCapacityUnit}/>

                <label>Production cycle speed</label>
                <input name="productionCycleSpeed" type="number" min={0} defaultValue={productionCycleSpeed}/>

                <label>Production cycle speed unit</label>
                <input name="productionCycleSpeedUnit" type="text" defaultValue={productionCycleSpeedUnit}/>
            </form>
        </div>
    )
}