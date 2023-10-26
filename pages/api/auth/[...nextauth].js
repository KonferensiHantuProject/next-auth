import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials){
                const user = {id: "1"};
                return user
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: "/",
    },
  })
