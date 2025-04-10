import {Role} from "./Role";

export class LoginRepository {
    private roles: Role[] = []

    init = () => {
        this.roles.push(
            {id: "smo", name: "Stamping machine operator"},
            {id: "prod_opt", name: "Production operative"},
            {id: "prod_eng", name: "Product engineer"},
            {id: "floor_man", name: "Floor manager"},
            {id: "prod_man", name: "Production manager"},
            {id: "marketing_dir", name: "Marketing director"}
        )
    }

    getRoles = () => this.roles

    getIdForName = (name: string) => {
        return this.roles.find((role) => role.name === name)
    }

    getNameForId = (id: string) => {
        return this.roles.find((role) => role.id === id)
    }

    getRoleIds = () => {
        return this.roles.map((role) => role.id)
    }

    getRoleNames = () => {
        return this.roles.map((role) => role.name)
    }
}