import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Redirect from "@/components/Redirect";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import Content from "@/components/ui/content";

type tag = "YOUTUBE" | "TWEET" | "DOCUMENT" | "LINK" | "ALL" | undefined

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
    
    if (!["ALL", "YOUTUBE", "TWEET", "DOCUMENT", "LINK",].includes(slug ?? "")) {
        return <Redirect to={"/error"} />
    }
    
    let contents: any;

    if(slug === "ALL") {
        contents = await prisma.content.findMany({
            where: {
                userId: parseInt(session.user.id)
            },
        })

    } else  {
        contents = await prisma.content.findMany({
            where: {
                type: slug,
                userId: parseInt(session.user.id)
            }
        })
    }

    return <div className="ml-72 bg-black text-white h-screen">
       {
            contents && <Content 
                contents={contents}
            />
       }
    </div>
}