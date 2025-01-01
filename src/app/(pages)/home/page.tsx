import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Redirect from "@/components/Redirect";
import prisma from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";


export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return <Redirect to={"/signin"} />
    }
    const contents = await prisma.content.findMany({
        where: {
            userId: parseInt(session.user.id)
        }
    })
    
    return <div>
        {JSON.stringify(contents)}
    </div>
}