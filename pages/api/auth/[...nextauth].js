import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "@/config/db";
import bcrypt from 'bcryptjs';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials){
                const {email, password} = credentials;

                try{

                    // Find One
                    const user = await prisma.regist.findFirst({
                        where: {
                            email: {
                                equals: email
                            }
                        }
                    })
                    
                    if(!user){
                        return null;
                    }
                    
                    // Matching Password
                    const passMatch = await bcrypt.compare(password, user.password);

                    // Check Pass
                    if(!passMatch){
                        return null;
                    }

                    return user;
                }catch(error){
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
  }

  
export default NextAuth(authOptions);
