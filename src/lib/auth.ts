/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

interface CustomUser extends User {
  token?: string;
  refreshToken?: string;
  role?: string;
}

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
}

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/refresh`,
      { refreshToken: token.refreshToken }
    );

    const newToken = response.data.token;
    const decoded = jwtDecode<DecodedToken>(newToken);

    return {
      ...token,
      accessToken: newToken,
      accessTokenExpires: decoded.exp * 1000,
    };
  } catch (error) {
    console.error("Refresh token failed", error);
    return { ...token, accessToken: null }; // invalidate session
  }
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

          const response = await axios.post<{
            user: CustomUser;
            token: string;
            refreshToken: string;
          }>(loginPath, {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, token, refreshToken } = response.data;

          if (user && token) {
            return { ...user, token, refreshToken };
          }
          return null;
        } catch (err) {
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
      // Initial login
      if (user?.token) {
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
        token.role = user.role;

        const decoded = jwtDecode<DecodedToken>(user.token);
        token.accessTokenExpires = decoded.exp * 1000;
        return token;
      }

      // If token not expired, return it
      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token;
      }

      // Token expired → refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }: { session: Session; token: any }) {
      if (!token.accessToken) {
        // Optionally, you can remove sensitive data or throw an error
        // For now, just return the session without accessToken and role
        delete (session.user as any).accessToken;
        delete (session.user as any).role;
        return session;
      }

      (session.user as any).accessToken = token.accessToken;
      (session.user as any).role = token.role;
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
