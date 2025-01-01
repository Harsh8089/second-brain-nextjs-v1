"use client";

import { useRef } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { error } from "console";

export default function Signin() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignIn = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        });
        console.log(res);
        if(res?.error) {
            console.log(res.error);
        }
        else router.push("/home");
    }

    return <div className="">
        <Input
            type={"email"}
            placeholder={"enter your email"}
            reference={emailRef}
        />
        <Input
            type={"password"}
            placeholder={"enter your password"}
            reference={passwordRef}
        />
        <Button
            text="Login"
            styles=""
            onClick={handleSignIn}
        />
        <Button
            text="Logout"
            styles=""
            onClick={() => signOut()}
        />
    </div>
}