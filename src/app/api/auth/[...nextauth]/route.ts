/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";

interface CustomUser extends User {
  token?: string;
  role?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const loginPath = `${process.env.BACKEND_URL}/api/auth/login`;

          console.log(loginPath);

          const response = await axios.post<{
            user: CustomUser;
            token: string;
          }>(loginPath, {
            email: credentials.email,
            password: credentials.password,
          });

          console.log({ response });

          const { user, token } = response.data;
          if (user) {
            return { ...user, token };
          }
          return null;
        } catch (err) {
          // Handle Axios errors specifically
          if (err instanceof AxiosError) {
            throw new Error(
              err.response?.data?.message || "Invalid credentials"
            );
          }
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};

// Initialize NextAuth with the auth options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
