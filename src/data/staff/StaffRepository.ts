import {Certification, Employee} from "./Employee";
import {Role} from "./Role";
import {BASE_URL} from "../Data";
import {FloatFryServer} from "../FloatFryServer";
import {Product} from "../products/Product";
import {MachinesRepository} from "../machines/MachinesRepository";

export class StaffRepository {
    public static async getStaff(page: number = 0) {
        const response = await FloatFryServer.getStaff(page)

        if (response) {
            const staff = response.result
            const resolvedStaff: Employee[] = []

            for (let employee of staff) {
                const resolvedCertifications: Certification[] = []

                for (let certification of employee.certifications) {
                    const machineId = certification.machineId

                    const machine = await MachinesRepository.getMachine(machineId)

                    console.log("MACHINE", machine)

                    resolvedCertifications.push({
                        ...certification,
                        name: machine.result.name
                    })
                }

                resolvedStaff.push({
                    ...employee,
                    certifications: resolvedCertifications
                })
            }

            return {
                ...response,
                result: resolvedStaff as Employee[]
            }
        }

        return null
    }

    public static async getEmployee(id: string) {
        const response = await FloatFryServer.getEmployee(id)

        if (response) {
            const employee = response.result
            const resolvedCertifications: Certification[] = []


            console.log("STAFF certifications", employee)
            for (let certification of employee.certifications) {
                const machineId = certification.machineId

                const machine = await MachinesRepository.getMachine(machineId)

                resolvedCertifications.push({
                    ...certification,
                    name: machine.result.name
                })
            }

            return {
                ...response,
                result: {
                    ...employee,
                    certifications: resolvedCertifications
                } as Employee
            }
        }

        return null
    }

    public static getEmployeeRoles() {
        return [
            {id: "production_manager", name: "Production manager"},
            {id: "production_operative", name: "Production operative"},
            {id: "product_engineer", name: "Product engineer"},
            {id: "floor_manager", name: "Floor manager"},
            {id: "stamping_machine_operator", name: "Stamping machine operator"}
        ]
    }

    public static async updateEmployee(id: string, employee: any) {
        const update = {
            ...employee,
            certifications: employee.certifications.map((it: any) => {
                return {
                    machineId: it.machineId,
                    dateObtained: it.dateObtained
                }
            })
        }

        return await FloatFryServer.updateEmployee(id, update)
    }

    public static async registerEmployee(employee: any) {
        const update = {
            ...employee,
            certifications: employee.certifications.map((it: any) => {
                return {
                    machineId: it.machineId,
                    dateObtained: it.dateObtained
                }
            })
        }

        return await FloatFryServer.registerEmployee(update)
    }
}