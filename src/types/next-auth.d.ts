import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Session {
		user: {
			/**This is User's Role */
		role: "ADMIN" | "USER" 
		} & DefaultSession["user"]
	} 
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: "ADMIN" | "USER"
  }
}