"use client";

import Signin from "@/components/auth/SignIn"
import Redirect from "@/components/Redirect";
import { useSession } from "next-auth/react"

export default function SignIn() {
    const session = useSession();

    if(session && session.status === 'authenticated') {
        return <Redirect to="/dashboard" />
    }

    return <div>
        <h2>Sign in with Email</h2>
        <Signin />
    </div>
}