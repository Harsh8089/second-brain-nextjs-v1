import { ReactElement } from "react";

interface InputProps { 
    type: "email" | "text" | "password" | "number" | "radio",
    placeholder?: string
    reference?: any,
    id?: string,
    value?: string
    style?: string,
    onChange?: any
    checked? : any
}

export default function Input({
    type,
    placeholder,
    id,
    value,
    reference,
    style,
    onChange,
    checked
}: InputProps) {
    return <input
        type={type}
        placeholder={placeholder}
        ref={reference}
        value={value}
        className={style}
        id={id}
        onChange={onChange}
        checked={checked}
    >
    </input>
}