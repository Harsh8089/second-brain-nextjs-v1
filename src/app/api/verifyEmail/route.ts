import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token
            },
            select: {
                id: true,
                email: true,
                verificationTokenExpiry: true
            }
        })

        if(!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        if(!user.verificationTokenExpiry) {
            return NextResponse.json({ error: "No token found" }, { status: 400 });
        }
        if(user.verificationTokenExpiry < new Date()) {
            return NextResponse.json({ error: "Token Expired" }, { status: 400 });
        }

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        }, {
            status: 500
        });
    }
}