import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { user, token } = response.data;
          if (user) {
            return { ...user, token };
          }
        } catch (err: any) {
          throw new Error(err.message || "Invalid credentials");
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        role: token.role,
      };
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
