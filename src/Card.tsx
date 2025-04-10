import "./style/card.css"
import {ReactNode} from "react";

export type CardProps = {
    children: ReactNode
}

export function Card(props: CardProps) {
    return (
        <div className="card">{props.children}</div>
    )
}