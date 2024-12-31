interface ButtonProps {
    text: string,
    styles: string,
    onClick: () => void
}

export default function Button({
    text,
    styles,
    onClick
}: ButtonProps) {
    return <button
        className={styles}
        onClick={onClick}
    >
        {text}
    </button>
}