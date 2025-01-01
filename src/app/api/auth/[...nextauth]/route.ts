import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                const email = credentials?.email;
                const password = credentials?.password;

                if(!email || !password) return null;
                
                const userDb = await prisma.user.findFirst({
                    where: {
                        email
                    },
                    select: {
                        id: true,
                        username: true,
                        password: true,
                        email: true
                    }
                })
                
                if(!userDb) return null;

                const verifyPassword = await bcrypt.compare(password, userDb.password);
                if(!verifyPassword) return null;

                return {
                    id: userDb.id,
                    name: userDb.username,
                    email: userDb.email
                }
            },   
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: "jwt"
    }
})

export { handler as GET, handler as POST }