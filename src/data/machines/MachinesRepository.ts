import {Machine} from "./Machine";
import {Employee} from "../staff/Employee";
import {BASE_URL} from "../Data";
import {FloatFryServer} from "../FloatFryServer";
import {Material} from "../materials/Material";

export class MachinesRepository {
    private static async getProducts(machineId: string) {
        const allProducts = await FloatFryServer.getProducts()
        const productNames: string[] = []

        if (allProducts) {
            const products = allProducts.result
            const pagesCount = allProducts.count

            productNames.push(...products
                .filter((product: any) => product.manufacturingInstruction.machines.includes(machineId))
                .map((product: any) => {
                    return{
                        id: product.id,
                        name: product.name
                    }
                })
            )

            if (pagesCount > 1) {
                for (let i = 1; i < pagesCount; i++) {
                    const nextPage = await FloatFryServer.getProducts(i)

                    if (nextPage) {
                        productNames.push(
                            ...nextPage.result
                                .filter((product: any) => product.manufacturingInstruction.machines.includes(machineId))
                                .map((product: any) => product.name)
                        )
                    } else {
                        return null
                    }
                }
            }

            return productNames
        } else {
            return null
        }
    }

    public static async getMachines(page: number = 0) {
        const response = await FloatFryServer.getMachines(page)
        const machines = response.result
        console.log("MACHINES response", response)

        if (machines) {
            const displayMachines: Machine[] = []

            for (let machine of machines) {
                displayMachines.push({
                    ...machine,
                    products: await this.getProducts(machine.id)
                })
            }

            console.log("MACHINES return", displayMachines)
            return {
                ...response,
                result: displayMachines
            }
        }

        return null
    }

    public static async getAllMachines() {
        const machines = await this.getMachines()

        if (machines) {
            console.log("MACHINES all", machines)
            const count = machines.count

            const allMachines: Machine[] = [...machines.result]

            if (count > 1) {
                for (let i = 1; i < count; i++) {
                    const next = await this.getMachines(i)

                    allMachines.push(...next.result)
                }
            }

            return {
                count,
                result: allMachines
            }
        }
        else {
            console.log("MACHINES all none")
            return null
        }
    }

    public static async getMachine(id: string) {
        const response = await FloatFryServer.getMachine(id)
        const machine = response.result

        const displayMachine: Machine = {
            ...machine,
            products: await this.getProducts(machine.id)
        }

        return {
            ...response,
            result: displayMachine
        }
    }

    public static async updateMachine(id: string, update: any) {
        return await FloatFryServer.updateMachine(id, update)
    }
    public static async addMachine(machine: any) {
        return await FloatFryServer.addMachine(machine)
    }

}