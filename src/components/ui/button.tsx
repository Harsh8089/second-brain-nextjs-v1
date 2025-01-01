import { ReactElement } from "react"

interface ButtonProps {
    text: string,
    styles: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick?: () => void
}

export default function Button({
    text,
    styles,
    startIcon,
    endIcon,
    onClick
}: ButtonProps) {
    return <button
        className={styles}
        onClick={onClick}
    >
        {startIcon}
        {text}
        {endIcon}
    </button>
}