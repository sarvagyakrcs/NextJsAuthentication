import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import * as z from "zod"
import { LoginSchema } from "./schema/loginschema";
import { get_user_by_email, get_user_by_username } from "./lib/data/user";
import bcrypt from "bcryptjs"
type login_schema_type = z.infer<typeof LoginSchema>

export default {
    providers: [
        // Google({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // }),
        // Github({
        //     clientId: process.env.GI,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        // }),
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req){
                const {
                    success,
                    data
                } = LoginSchema.safeParse(credentials);
                
                if(!success){
                    return null;
                }

                const user = await get_user_by_email(data?.email);
                const password_match = await bcrypt.compare(data.password, user?.password ?? "")

                if(user && password_match){
                    return user;
                }

                if(!user){
                    return null;
                }
                return null;
            }
        }),
        Github({
            clientId : process.env.GITHUB_CLIENT_ID,
            clientSecret : process.env.GITHUB_CLIENT_SECRET
        })
    ]
} satisfies NextAuthConfig