"use client";

import { NEXTAPP_URL } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
    const token = useSearchParams().get('token');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(); 

    useEffect(() => {
        axios.post(`${NEXTAPP_URL}/api/verifyEmail`, {
            token
        })
        .catch(error => setError(error))
        setLoading(false);
    }, [token])

    return <div>
        {
            loading ? 
                <div>Loading ...</div> : 
            error ?
                <div>{JSON.stringify(error)}</div> :
                <div>
                    <p>Email verified successfully</p>
                    <Link href={`${NEXTAPP_URL}/signin`}>
                        Click 
                    </Link>
                    <span>here to signin</span>
                </div>
        }
    </div>
}