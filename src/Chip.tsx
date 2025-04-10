import "./style/chip.css"
import closeIcon from "./close.svg"

export type ChipProps = {
    text: string,
}

export function Chip(props: ChipProps) {
    return (
        <span className="chip">{props.text} <img src={closeIcon}/></span>
    )
}