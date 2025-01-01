import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    

    if(!session || !session.user) return NextResponse.json({
        error: "User is not logged in"
    }, {
        status: 401
    });

    const { title, description, type, link } = await req.json();
    if(!title || !type) return NextResponse.json({
        error: "Title / Description / Type is missing"
    }, {
        status: 401
    });

    try {
        const content = await prisma.content.create({
            data: {
                title,
                description,
                type,
                userId: parseInt(session.user.id)
            }
        })    
        return NextResponse.json({
            content
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 500
        })   
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user) return NextResponse.json({
        error: "User is not logged in"
    }, {
        status: 401
    });

    try {
        const contents = await prisma.content.findMany({
            where: {
                userId: parseInt(session.user.id)
            }
        })

        return NextResponse.json({
            contents
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 500
        })   
    }
}