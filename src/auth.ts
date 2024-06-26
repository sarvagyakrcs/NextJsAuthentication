import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config";
import { get_user_by_id } from "./lib/data/user";
const db = prisma;

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/login',
		error: '/error'
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }){
			const existing_user = await get_user_by_id(user.id);
			if(account?.provider !== "credentials"){
				//allow OAuth users to login without email verification
				return true;
			}
			if(!existing_user || !existing_user?.emailVerified){
				//dont allow non verified users to login
				return false;
			}
			// TODO : Add 2FA check
			return true;
		},
		async jwt({token}){
			if(!token.sub) return token; //User Logged Out
			const existing_user = await get_user_by_id(token.sub);
			if(!existing_user) return token;
			token.role = existing_user.role;
			return token;
		},
		async session({session, token}){
			if(token.sub && session.user){
				session.user.id = token.sub;
			}
			if(token.role && session.user){
				session.user.role = token.role;
			}
			return session;
		}
	},
	...authConfig
})