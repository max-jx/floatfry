import "../../style/header.css"
import React, {useState} from "react";

type HeaderProps = {
    title: string
}

export function Header(props: HeaderProps) {
    const {title} = props

    return (
        <div className="header">
            <h2>{title}</h2>
        </div>
    )
}