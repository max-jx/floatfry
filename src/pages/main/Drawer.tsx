import "../../style/drawer.css"
import React, {useState} from "react";

type DrawerProps = {
    pages: {
        pageId: string,
        pageTitle: string
    }[],
    selectedPageId: string,
    onSelected: (pageId: string) => void
}

export function Drawer(props: DrawerProps) {
    const {
        pages,
        selectedPageId,
        onSelected
    } = props

    const showList = () => {
        const elements = pages.map((page) => {
            const className = selectedPageId === page.pageId ? "_selected" : ""
            return <li key={page.pageId} className={className} onClick={handleSelect}
                       id={page.pageId}>{page.pageTitle}</li>
        })

        return elements
    }

    const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(e.currentTarget.id)

        const id = e.currentTarget.id

        onSelected(id)
    }

    return (
        <nav className="drawer" style={{height: "100%"}}>
            <ul style={{height: "100%"}}>
                {showList()}
            </ul>
        </nav>
    )
}