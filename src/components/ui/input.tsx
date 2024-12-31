import { ReactElement } from "react";

interface InputProps { 
    type: "email" | "text" | "password" | "number",
    placeholder?: string
    reference: any,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
}

export default function Input({
    type,
    placeholder,
    reference,
    startIcon,
    endIcon,
}: InputProps) {
    return <input
        type={type}
        placeholder={placeholder}
        ref={reference}
    >
    </input>
}