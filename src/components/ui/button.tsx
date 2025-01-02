import { ReactElement } from "react"

interface ButtonProps {
    text?: string,
    style?: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick?: () => void
}

export default function Button({
    text,
    style,
    startIcon,
    endIcon,
    onClick
}: ButtonProps) {
    return <button
        className={style}
        onClick={onClick}
    >
        {startIcon}
        <p>{text}</p>
        <div>{endIcon}</div>
    </button>
}