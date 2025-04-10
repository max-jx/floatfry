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
import {FactoryMachinesRepository} from "../../../data/factoryMachines/FactoryMachinesRepository";
import {FactoryMachine} from "../../../data/factoryMachines/FactoryMachine";


export function FactoryMachineEdit() {
    const ref = useRef<HTMLFormElement>(null)
    const ref2 = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const action = params.get("action")
    const machineId = params.get("machineId")!

    const [factoryMachine, setFactoryMachine] = useState<FactoryMachine>()


    const [name, setName] = useState("")
    const [machine, setMachine] = useState("")
    const [allMachines, setAllMachines] = useState<Machine[]>([])


    useEffect(() => {
        const update = async () => {
            const machinesResponse = await MachinesRepository.getAllMachines()

            if (machinesResponse) {
                const machinesResult = machinesResponse.result
                console.log("EDIT machines", machinesResult)
                setAllMachines(machinesResult)
            }

            if (action === "edit") {
                const response = await FactoryMachinesRepository.getMachine(machineId)
                console.log("EDIT r", response)

                if (response && machinesResponse) {
                    const result = response.result
                    console.log("EDIT", result)

                    setFactoryMachine(result)
                    setName(result.name)
                    setMachine(result.machine)
                } else {
                    console.log("EDIT no")
                }
            } else if (action === "new") {
                console.log("all machines", allMachines)
                // setMachine(allMachines[0].id)
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
                                    machine: formData.get("machine")!.toString(),
                                }

                                console.log("FACTORY", machine)

                                let response: Promise<any>

                                response = FactoryMachinesRepository.newMachine(machine)

                                response.then((status) => {
                                    if (status === 201) {
                                        navigate("./")
                                    }
                                })
                            } else {
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

                <label>Machine</label>
                <select name={"machine"} defaultValue={machine}>
                    {allMachines.map((machine) => {
                        return (
                            <option value={machine.id}>{machine.name}</option>
                        )
                    })}
                </select>
            </form>
        </div>
    )
}