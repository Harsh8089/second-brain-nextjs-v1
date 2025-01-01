import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Redirect from "@/components/Redirect";
import Modal from "@/components/ui/modal";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return <Redirect to={"/signin"} />
    }
    const contents = await fetch(`${BACKEND_URL}/api/content`, {
        headers: await headers()
    });
    const data = await contents.json();
    
    return <div>
        {JSON.stringify(data)}
    </div>
}