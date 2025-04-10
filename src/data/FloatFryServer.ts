export class FloatFryServer {
    private static BASE_URL = "http://localhost:3001"
    private static ORDERS_ENDPOINT = "/data/orders"
    private static SUPPLIERS_ENDPOINT = "/data/suppliers"
    private static MATERIALS_ENDPOINT = "/data/materials"
    private static TIMETABLE_ENDPOINT = "/data/timetable"
    private static STAFF_ENDPOINT = "/data/staff"
    private static PRODUCTS_ENDPOINT = "/data/products"
    private static MACHINES_ENDPOINT = "/data/machines"
    private static SALES_ENDPOINT = "/data/sales"
    private static FACTORY_MACHINES_ENDPOINT = "/data/factoryMachines"
    private static FILES_ENDPOINT = "/data/files"

    public static async getProducts(page = 0) {
        return await this.get(this.PRODUCTS_ENDPOINT, {page})
    }

    public static async getProduct(id: string) {
        return await this.get(`${this.PRODUCTS_ENDPOINT}?productId=${id}`)
    }

    public static async updateProduct(id: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, action: "edit"})
    }

    public static async addProduct(product: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, product, {action: "new"})
    }

    public static async updateProductColorOption(id: string, colorOptionId: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, colorOptionId: colorOptionId, action: "editColorOption"})
    }
    public static async updateProductLidMaterialOption(id: string, lidMaterialOptionId: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, lidMaterialOptionId: lidMaterialOptionId, action: "editHandleMaterialOption"})
    }
    public static async updateProductHandleMaterialOption(id: string, handleMaterialOptionId: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, handleMaterialOptionId: handleMaterialOptionId, action: "editHandleMaterialOption"})
    }

    public static async addProductColorOption(id: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, action: "newColorOption"})
    }
    public static async addProductLidMaterialOption(id: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, action: "newHandleMaterialOption"})
    }
    public static async addProductHandleMaterialOption(id: string, update: any) {
        return await this.post(this.PRODUCTS_ENDPOINT, update, {productId: id, action: "newHandleMaterialOption"})
    }

    public static async getMachines(page = 0) {
        return await this.get(this.MACHINES_ENDPOINT, {page})
    }

    public static async getMachine(id: string) {
        return await this.get(`${this.MACHINES_ENDPOINT}?machineId=${id}`)
    }

    public static async updateMachine(id: string, update: any) {
        return await this.post(this.MACHINES_ENDPOINT, update, {machineId: id, action: "edit"})
    }
    public static async addMachine(machine: any) {
        return await this.post(this.MACHINES_ENDPOINT, machine, {action: "new"})
    }

    public static async getSuppliers(page = 0) {
        return await this.get(this.SUPPLIERS_ENDPOINT, {page})
    }

    public static async getSupplier(id: string) {
        return await this.get(`${this.SUPPLIERS_ENDPOINT}?supplierId=${id}`)
    }

    public static async getMaterials(page = 0) {
        return await this.get(this.MATERIALS_ENDPOINT)
    }

    public static async getMaterial(id: string) {
        return await this.get(`${this.MATERIALS_ENDPOINT}?materialId=${id}`)
    }

    public static async getStaff(page = 0) {
        return await this.get(this.STAFF_ENDPOINT, {page})
    }

    public static async getEmployee(id: string) {
        return await this.get(`${this.STAFF_ENDPOINT}?employeeId=${id}`)
    }

    public static async getOrders(page = 0) {
        return await this.get(this.ORDERS_ENDPOINT, {page})
    }

    public static async getOrder(id: string) {
        return await this.get(this.ORDERS_ENDPOINT, {orderId: id})
    }

    public static async placeOrder(order: any) {
        return await this.post(this.ORDERS_ENDPOINT, order, {action: "new"})
    }

    public static async updateEmployee(id: string, update: any) {
        return await this.post(this.STAFF_ENDPOINT, update, {employeeId: id, action: "edit"})
    }

    public static async registerEmployee(update: any) {
        return await this.post(this.STAFF_ENDPOINT, update, {action: "register"})
    }

    public static async updateSupplier(id: string, supplier: any) {
        return await this.post(this.SUPPLIERS_ENDPOINT, supplier, {supplierId: id, action: "edit"})
    }

    public static async addSupplier(supplier: any) {
        return await this.post(this.SUPPLIERS_ENDPOINT, supplier, {action: "new"})
    }

    public static async updateMaterial(id: string, material: any) {
        return await this.post(this.MATERIALS_ENDPOINT, material, {materialId: id, action: "edit"})
    }

    public static async addMaterial(material: any) {
        return await this.post(this.MATERIALS_ENDPOINT, material, {action: "new"})
    }

    public static async getFactoryMachine(id: string) {
        return await this.get(this.FACTORY_MACHINES_ENDPOINT, {machineId: id})
    }
    public static async getFactoryMachines(page: number) {
        return await this.get(this.FACTORY_MACHINES_ENDPOINT, {page})
    }

    public static async newFactoryMachine(machine: any) {
        return await this.post(this.FACTORY_MACHINES_ENDPOINT, machine, {action: "new"})
    }

    public static async getSales(page: number) {
        return await this.get(this.SALES_ENDPOINT, {page})
    }

    public static async getSale(id: string) {
        return await this.get(this.SALES_ENDPOINT, {saleId: id})
    }

    public static async updateSale(id: string, action: string) {
        return await this.post(this.SALES_ENDPOINT, {}, {saleId: id, action})
    }

    public static async getTimetable(page: number = 0, employeeId?: string) {
        const params: any = {page}
        if (employeeId) {
            params.employeeId = employeeId
        }

        return await this.get(this.TIMETABLE_ENDPOINT, params)
    }

    public static async generateTimetable() {
        return await this.post(this.TIMETABLE_ENDPOINT, {})
    }


    public static async uploadFile(file: File) {
        const urlParams = `?action=new&name=${encodeURIComponent(file.name)}`
        // const body = file.arrayBuffer()

        const response = await fetch(`${FloatFryServer.BASE_URL}${this.FILES_ENDPOINT}${urlParams}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer debug",
                "Content-Type": file.type
            },
            body: file
        })

        if (response.status === 201) {
            return {
                status: 201,
                result: await response.json()
            }
        }
        else {
            return {
                status: response.status
            }
        }
    }

    private static async get(endpoint: string, params?: any) {
        const urlParams = params ? `?${Object.keys(params).map(param => `${param}=${params[param]}`)}` : ""

        console.log("SERVER GET", endpoint, urlParams)

        const response = await fetch(`${FloatFryServer.BASE_URL}${endpoint}${urlParams}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.getAccessToken()}`//"Bearer debug"
            }
        })

        if (response.ok) {
            return await response.json()
        }
        else {
            if (response.status === 401) {
                document.location.href = "/login"
            }


            return null
        }
    }

    private static async post(endpoint: string, body: any, params?: any) {
        const urlParams = params ? `?${Object.keys(params).map(param => `${param}=${params[param]}`).join("&")}` : ""

        console.log("SERVER POST", urlParams, body)

        const response = await fetch(`${FloatFryServer.BASE_URL}${endpoint}${urlParams}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.getAccessToken()}`,//"Bearer debug",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (response.status === 401) {
            document.location.href = "/login"
        }

        return response.status
    }

    private static getAccessToken() {
        const cookie = document.cookie.split(";").find((cookie) => cookie.trim().split("=")[0] === "access_token")
        const token = cookie?.split("=")[1]

        return token
    }
}