// import db from '@/db';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { JWTPayload, SignJWT, importJWK } from 'jose';
// import bcrypt from 'bcrypt';
// import prisma from '@/db';
// import GoogleProvider from 'next-auth/providers/google';
// import { NextAuthOptions } from 'next-auth';
// import { Session } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import connectDB from './connectDB';
// import User from '../models/user';
// import { console } from 'inspector';

// export interface session extends Session {
//   user: {
//     id: string;
//     jwtToken: string;
//     role: string;
//     email: string;
//     name: string;
//   };
// }

// const generateJWT = async (payload: JWTPayload) => {
//   const secret = process.env.JWT_SECRET || 'secret';

//   const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

//   const jwt = await new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('365d')
//     .sign(jwk);

//   return jwt;
// };

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         username: { label: 'email', type: 'text', placeholder: '' },
//         password: { label: 'password', type: 'password', placeholder: '' },
//       },
//       async authorize(credentials: any) {
//         if (!credentials) return null;

//         await connectDB();

//         const userDb = await User.findOne({ email: credentials.username });

//         if (
//           userDb &&
//           userDb.password &&
//           (await bcrypt.compare(credentials.password, userDb.password))
//         ) {
//           return {
//             id: userDb._id.toString(),
//             name: userDb.name,
//             email: userDb.email,
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id as string,
//           name: token.name as string,
//           email: token.email as string,
//         };
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET || 'secr3t',
//   pages: {
//     signIn: '/logIn',
//   },
// };
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTPayload, SignJWT, importJWK } from 'jose';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import connectDB from './connectDB';
import User from '../models/user';

export interface ExtendedSession extends Session {
  user: {
    id: string;
    jwtToken?: string;
    role?: string;
    email: string;
    name: string;
  };
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

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

        await connectDB();

        const userDb = await User.findOne({ email: credentials.username });

        if (
          userDb &&
          userDb.password &&
          (await bcrypt.compare(credentials.password, userDb.password))
        ) {
          return {
            id: userDb._id.toString(),
            name: userDb.name,
            email: userDb.email,
          };
        }

        return null;
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
        };
      }
      return customSession;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  pages: {
    signIn: '/logIn',
  },
};
