import {Job} from "./Job";
import {FloatFryServer} from "../FloatFryServer";

export class TimetableRepository {
    public static async getTimetable(page: number = 0, employeeId?: string) {
        const response = await FloatFryServer.getTimetable(page, employeeId)
        const jobs = response.result

        console.log("REPO", jobs)

        if (jobs) {
            const displayJobs: Job[] = []

            for (let job of jobs) {
                const employeeId = job.employee
                const productId = job.product
                const machineId = job.machine

                const employee = await FloatFryServer.getEmployee(employeeId)
                const product = await FloatFryServer.getProduct(productId)
                const factoryMachine = await FloatFryServer.getFactoryMachine(machineId)

                if (employee && product && factoryMachine) {
                    const machine = await FloatFryServer.getMachine(factoryMachine.machine)

                    if (machine) {
                        const displayJob = {
                            ...job,
                            employeeName: `${employee.firstName} ${employee.lastName}`,
                            productName: product.name,
                            machineName: factoryMachine.name,
                            machineType: machine.name,
                        }

                        displayJobs.push(displayJob)
                    }

                } else {
                    return {
                        ...response,
                        result: null
                    }
                }
            }

            console.log("REPO return", displayJobs)
            return {
                ...response,
                result: displayJobs
            }
        }

        return null
    }

    public static async generateTimetable() {
        return await FloatFryServer.generateTimetable()
    }
}