import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Redirect from "@/components/Redirect";
import Content from "@/components/ui/content";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export default async function page() {
    const session = await getServerSession(authOptions);
    
    if(!session?.user) return <Redirect to={"/signin"} />

    const contents = await prisma.content.findMany({
        where: {
            userId: parseInt(session.user.id)
        },
    })

    return <Content
        contents={contents}
    />
}