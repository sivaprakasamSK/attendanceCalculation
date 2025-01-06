import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/app/lib/prisma"

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                regno: { label: 'reg', type: "text", placeholder: "RegNum" },
                password: { label: "password", type: "password", placeholder: "password" }
            },
            async authorize(credentials: any) {
                if (!credentials) {
                    return null;
                }

                const regno = parseInt(credentials.regno);

                try{
                    const stu = await prisma.student.findFirst({
                        where: {
                            regno:regno,
                            password: credentials.password
                        }
                    })
                    if (!stu) {
                        throw new Error("NO student found in the database");
                    }
                    return {
                        id: String(stu.regno),
                        name: stu.name,
                    }
                }catch(error){
                    throw new Error("Database is currently down. Please try again later.");
                }

                

                
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.regno = token.sub;
            }
            return token;

        },
        async session({ session, token,user }: any) {
            if (session && session.user) {
                session.user.regno = token.regno;
            }

            return session;
        },
        async redirect({url,baseUrl}:any){
            return `${baseUrl}/about`;
        }
    },
}