import Google from 'next-auth/providers/google';
import type { NextAuthConfig }  from "next-auth"
import {prisma} from '@repo/db/prisma';
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google]
} satisfies NextAuthConfig