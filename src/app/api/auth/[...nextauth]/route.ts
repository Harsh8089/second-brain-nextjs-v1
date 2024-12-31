import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                const userDb = {
                    id: "1",
                    name: "harsh"
                }

                if(userDb) {
                    return userDb
                }   
                return null;
            },   
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }