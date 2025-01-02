import Sidebar from "@/components/ui/sidebar"

export default function layout({
    children
}: {
    children: React.ReactNode
}) {
    return <div>
        <Sidebar />
        {children}
    </div>
} 