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

    const { title, description, type, link, tags } = await req.json();
    if(!title || !type || !link || !description || !tags) return NextResponse.json({
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
                link,
                userId: parseInt(session.user.id),
                tags: {
                    // @ts-ignore
                    create: tags.map(tag => ({ "tag": tag }))
                }
            },
        })    
        return NextResponse.json({
            content
        }, {
            status: 200
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message, error.stack);
        } else {
            console.log("An unknown error occurred", error);
        }
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Unknown error occurred"
        }, {
            status: 500
        });  
    }
}