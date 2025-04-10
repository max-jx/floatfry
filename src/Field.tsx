import "./style/field.css"

export type FieldProps = {
    name: string,
    value: string
}

export function Field(props: FieldProps) {
    const {
        name, value
    } = props

    return <p className="field">{name} <b>{value}</b></p>
}