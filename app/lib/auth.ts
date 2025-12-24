import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export interface ExtendedSession extends Session {
  user: {
    id: string;
    jwtToken?: string;
    role?: string;
    email: string;
    name: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();

          if (res.ok && data.user) {
            return {
              id: data.user.id || data.user._id,
              name: data.user.name || `${data.user.firstName} ${data.user.lastName}`,
              email: data.user.email,
              role: data.user.role,
              jwtToken: data.access_token || data.tokens?.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const customSession = session as ExtendedSession;
      if (token) {
        customSession.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
          jwtToken: token.jwtToken as string,
        };
      }
      return customSession;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.jwtToken = (user as any).jwtToken;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  pages: {
    signIn: '/logIn',
  },
};
