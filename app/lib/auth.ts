import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                regno:{label:'reg',type:"text",placeholder:"RegNum"},
                password:{label:"password",type:"passowed",placeholder:"password"}
            },
            async authorize(credentials:any) {
                return{
                    id:"1",
                    name:"sibi",
                }
            },
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
              token.id = user.id; // Add user data to JWT
            }
            return token;
          },
        async session({ session, user }:any) {
          session.userId = user.id; // Add userId to session
          return session;
        },
        
    },
}