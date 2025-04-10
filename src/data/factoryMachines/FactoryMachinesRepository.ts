import {FloatFryServer} from "../FloatFryServer";
import {MachinesRepository} from "../machines/MachinesRepository";
import {FactoryMachine} from "./FactoryMachine";

export class FactoryMachinesRepository {
    public static async getMachines(page: number = 0) {
        const response = await FloatFryServer.getFactoryMachines(page)
        console.log("FACTORY", response)

        if (response) {
            const factoryMachines = response.result
            const resolvedFactoryMachines: FactoryMachine[] = []

            for (let factoryMachine of factoryMachines) {
                const machineResponse = await FloatFryServer.getMachine(factoryMachine.machine)

                if (machineResponse) {
                    resolvedFactoryMachines.push({
                        ...factoryMachine,
                        machineName: machineResponse.result.name
                    })
                } else {
                    return null
                }
            }

            return {
                ...response,
                result: resolvedFactoryMachines
            }
        }

        return null
    }

    public static async getMachine(id: string) {
        const response = await FloatFryServer.getFactoryMachine(id)
        console.log("FACTORY response", response)
        const factoryMachine = response.result

        const machineResponse = await FloatFryServer.getMachine(factoryMachine.machine)

        if (response && machineResponse) {
            console.log("FACTORY ok")
            return {
                ...response,
                result: {
                    ...factoryMachine,
                    machineName: machineResponse.result.name
                }
            }
        }

        return null
    }

    public static async newMachine(machine: any) {
        return await FloatFryServer.newFactoryMachine(machine)
    }
}