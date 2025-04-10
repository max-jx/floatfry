import {BASE_URL} from "./Data";

export class Endpoint {
    private static BASE_URL = "http::/localhost:3001"

    private endpoint: string
    private token: string = "debug"

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    public setToken(token: string) {
        this.token = token
    }

    public async get(params: any = null) {
        let url
        if (params) {
            url = `${BASE_URL}${this.endpoint}?${Object.keys(params).map((param) => `${param}=${params[param]}`)}`
        } else {
            url = `${BASE_URL}${this.endpoint}`
        }

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })

        if (response.ok) {
            const body = await response.json()

            return {
                status: response.status,
                result: body.result,
            }
        } else {
            return {
                status: response.status
            }
        }
    }

    public async post(params: any, body: any) {
        const urlParams = Object.keys(params).map((param) => `${param}=${params[param]}`)

        const url = `${BASE_URL}${this.endpoint}?${urlParams}`

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            const result = await response.json()

            return {
                status: response.status,
                data: result.data,
                meta: result.meta,
            }
        } else {
            return {
                status: response.status
            }
        }
    }

}