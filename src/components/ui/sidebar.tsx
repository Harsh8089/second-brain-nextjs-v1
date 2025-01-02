import { NEXTAPP_URL } from "@/config";
import { 
    Brain,
    File, 
    LinkIcon, 
    Twitter, 
    Youtube 
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { ReactElement } from "react";


type SideBarLinkProps = {
    startIcon: ReactElement,
    link: string
};

type isActive = {
    activeSideBarLink: string
};

type SideBarProps = SideBarLinkProps & isActive;

const sideBarLinks: SideBarLinkProps[] = [
    { startIcon: <Brain className="w-8 h-8" />, link: "All" },
    { startIcon: <Youtube className="w-8 h-8" />, link: "youtube" },
    { startIcon: <Twitter className="w-8 h-8" />, link: "tweet" },
    { startIcon: <File className="w-8 h-8" />, link: "document"},
    { startIcon: <LinkIcon className="w-8 h-8" />, link: "link" }
];

function SidebarLink({
    startIcon,
    link,
    activeSideBarLink
}: SideBarProps) {
    return <Link 
        href={`${link === "All" ? `${NEXTAPP_URL}/home` : `${NEXTAPP_URL}/content/${link}`}`}
        className={`w-full py-2 px-3 rounded-lg
            ${activeSideBarLink === link ? "bg-blue-800 bg-opacity-30" : "hover:bg-blue-950 hover:bg-opacity-40 duration-150 transition-all group"}    
        `}
    >
        <div className="flex items-center gap-4">
            <div className={`${activeSideBarLink !== link ? "text-white group-hover:text-blue-500 duration-150 transition-all" : "text-blue-500"}`}>
                {startIcon}
            </div>
            <div className={`${activeSideBarLink !== link ? "text-white group-hover:text-blue-500 duration-150 transition-all" : "text-blue-500"} text-xl tracking-wide font-semibold`}>
                {link[0].toUpperCase()+link.slice(1, link.length)}
            </div>
        </div>
    </Link>
}

export default async function Sidebar() {
    const headersList = await headers();
    const pathName: string[] = headersList.get('x-current-path')?.split("/") ?? [];
    const activeSideBarLink = pathName[pathName.length - 1];
    
    return <div className="fixed left-0 top-0 h-screen w-72 flex flex-col bg-black z-10 py-10 px-2">
        <h1>Logo</h1>
        <div className="flex flex-col mt-14 gap-6 items-start">
            {
                sideBarLinks.map((sidebar, index) => {
                    return <SidebarLink 
                        key={index}
                        startIcon={sidebar.startIcon}
                        link={sidebar.link}
                        activeSideBarLink={activeSideBarLink}
                    />
                })
            }
        </div>
    </div>
}