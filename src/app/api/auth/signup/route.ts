import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcyrpt from "bcryptjs";

export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json();

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                username,
                email
            }
        })
    
        if(userExist) return NextResponse.json({
            error: "User already exists"
        }, {
            status: 409
        });
    
        const hashPassword = await bcyrpt.hash(password, 10);
        const userDb = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        });

        return NextResponse.json({
            user: userDb
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 501
        });
    }
}