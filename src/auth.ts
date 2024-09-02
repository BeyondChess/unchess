import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('🚀 ~ redirect ~ baseUrl:', baseUrl);
      console.log('🚀 ~ redirect ~ url:', url);
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return baseUrl;
      return baseUrl;
    },
  },
});
