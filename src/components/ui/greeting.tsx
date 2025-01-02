"use client";

import { useSession } from "next-auth/react";
import Button from "./button";
import { CirclePlus } from "lucide-react";

export default function Greeting({
    setModal
}: {
    setModal: any
}) {
    const { data: session } = useSession();
    const currentHour = new Date().getHours();

    let greeting;
    if (currentHour >= 4 && currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour <= 20) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Happy to see you back!';
    }

    const username = session ? session.user.username : "Guest";

    return <div className="flex gap-4 justify-between">
        <div className="text-4xl font-bold text-white">
            {greeting}, { username[0].toUpperCase()+username.slice(1, username.length) }
        </div>
        <Button
            text={"Add Content"}
            style="bg-gradient-to-t from-blue-800 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 text-lg"
            startIcon={<CirclePlus className="w-5 h-5" />}
            onClick={() => setModal(true)}
        />
    </div>
}