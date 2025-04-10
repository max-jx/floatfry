import "./style/pagination.css"
import "./style/button.css"
import previous from "./back.svg"
import next from "./forward.svg"
import {CSSProperties} from "react";

export type PaginationProps = {
    index: number,
    count: number
    text: string,
    onPrevious: () => void,
    onNext: () => void,
}

export function Pagination(props: PaginationProps) {
    const {
        index, count,
        text,
        onPrevious, onNext
    } = props

    const previousButtonStyle: CSSProperties = {
        visibility: index > 0 ? "visible" : "hidden"
    }

    const nextButtonStyle: CSSProperties = {
        visibility: index < count - 1 ? "visible" : "hidden"
    }

    return (
        <div>
            <div className="pagination">
                <button style={previousButtonStyle} className="text icon" onClick={onPrevious}><img src={previous}/></button>
                <p>{text}</p>
                <button style={nextButtonStyle} className="text icon" onClick={onNext}><img src={next}/></button>
            </div>
        </div>
    )
}