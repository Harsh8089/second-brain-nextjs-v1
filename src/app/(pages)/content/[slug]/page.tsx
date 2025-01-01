import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Redirect from "@/components/Redirect";
import prisma from "@/db";
import { getServerSession } from "next-auth"

type tag = "YOUTUBE" | "TWEET" | "DOCUMENT" | "LINK" | undefined

export default async function page({
    params
}: {
    params: Promise<{
        slug: true
    }>
}) {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        return <Redirect to={"/signin"} />
    }

    // @ts-ignore
    const slug: tag = ((await params).slug).toUpperCase();
    
    const contents = await prisma.content.findMany({
        where: {
            type: slug,
            userId: parseInt(session.user.id)
        }
    })

    return <div>
        Tag: {slug}
        {JSON.stringify(contents)}
    </div>
} 