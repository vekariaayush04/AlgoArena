
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type NextAuthResult } from 'next-auth';
import authConfig from './auth.config';
import {prisma} from '@repo/db/prisma';


const result = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token }: any) {
          return token;
        },
        async session({ session, token }: any) {
          const user = await prisma.user.findUnique({
            where: {
              id: token.sub,
            },
          });
          if (token) {
            session.accessToken = token.accessToken;
            session.user.id = token.sub;
            // session.user.admin = user?.admin;
          }
          return session;
        },
    },
    ...authConfig
});

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;