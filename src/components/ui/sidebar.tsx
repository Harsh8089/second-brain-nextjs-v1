import { NEXTAPP_URL } from "@/config";
import Link from "next/link";

export default function Sidebar() {
    return <div>
        <Link href={`${NEXTAPP_URL}/content/youtube`}>
            Youtube
        </Link>
        <Link href={`${NEXTAPP_URL}/content/tweet`}>
            Tweets
        </Link>
        <Link href={`${NEXTAPP_URL}/content/document`}>
            Document
        </Link>
        <Link href={`${NEXTAPP_URL}/content/link`}>
            Link
        </Link>
    </div>
}