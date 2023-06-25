import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobOrEmail: {
          label: "Mobile",
          type: "text",
          placeholder: "0912xxxxxxx",
        },
        code: {
          label: "code",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        const { id, role } = credentials as any;
        console.log(id);
        const user = {
          id: id,
          role: role,
        };
        return user;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        console.log(user);
        // This will only be executed at login. Each next invocation will skip this part.
        token.user = user;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }: any) => {
      // Here we pass accessToken to the client to be used in authentication with your API
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
