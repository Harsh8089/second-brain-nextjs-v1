import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        username: string,
        email: string
    }
    interface Session {
        user: {
            id: string,
            username: string,
            email: string
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        username: string,
        email: string
    }
}

export const authOptions: AuthOptions = {
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

                if (!email || !password) return null;

                const userDb = await prisma.user.findFirst({
                    where: { email },
                    select: {
                        id: true,
                        username: true,
                        password: true,
                        email: true
                    }
                });

                if (!userDb) return null;

                const verifyPassword = await bcrypt.compare(password, userDb.password);
                if (!verifyPassword) return null;

                return {
                    id: userDb.id,
                    username: userDb.username,
                    email: userDb.email
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // console.log("\n==============user=================\n");
                // console.log(user);
                token.id = user.id;
                token.username = user.username;  
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // console.log("\n==============token=================\n");
                // console.log(token);
                session.user.id = token.id;
                session.user.username = token.username; 
                session.user.email = token.email;
            }
            // console.log("\n==============session=================\n");
            // console.log(session);
            return session;
        }
    },
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "secr3t",
}