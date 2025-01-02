"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { NEXTAPP_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SignUp() {
    const router = useRouter();

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const signUp = async () => {
        try {
            const res = await axios.post(`${NEXTAPP_URL}/api/auth/signup`, {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            });
            if(res.status === 200) {
                router.push('/signin');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <Input
            type={"text"}
            placeholder="enter username"
            reference={usernameRef}
        />
        <Input
            type={"email"}
            placeholder="enter email"
            reference={emailRef}
        />
        <Input
            type={"password"}
            placeholder="create password"
            reference={passwordRef}
        />
        <Button 
            text="Register"
            style=""
            onClick={signUp}
        />
    </div>
}