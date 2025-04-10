type IconProps = {
    path: string
}

export function Icon(props: IconProps) {
    return(<svg>
        <use href={props.path}/>
    </svg>)
}