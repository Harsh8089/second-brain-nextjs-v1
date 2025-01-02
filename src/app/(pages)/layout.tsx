import Redirect from "@/components/Redirect";
import Sidebar from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"

export default async function layout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();
    if(!session?.user) {
        return <Redirect to={"/signin"} />
    }
    
    return <div>
        <Sidebar />
        {children}
    </div>
} 