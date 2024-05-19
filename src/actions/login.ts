"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schema/loginschema"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import * as z from "zod"
import { get_user_by_email } from "@/lib/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const Login = async (credentials : z.infer<typeof LoginSchema>) => {
    const {
        data,
        success
    } = LoginSchema.safeParse(credentials)
    
    if(!success){
        return {
            "error" : "Invalid Credentials!",
            success_status: false
        }
    }

    const {
        email,
        password
    } = data;

    const existing_user = await get_user_by_email(email);

    if(!existing_user || !existing_user.email){
        return {
            "error" : "Email does not Exist!",
            success_status: false
        }
    }

    if(!existing_user.password){
        return {
            "error" : "Please Login Using Correct Mode!",
            success_status: false
        }
    }

    if(!existing_user.emailVerified){
        const verificationToken = await generateVerificationToken(existing_user.email);
        sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {
            "success" : "Verification Email Sent.",
            success_status: true
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        "error" : "Incorrect Username or Password!",
                        success_status: false
                    }

                    case "UntrustedHost":
                        return {
                            "error" : "Untrusted host",
                            success_status: false
                        }
                    case "AccessDenied":
                        return {
                            "error" : "Please Verify Your Email to Login.",
                            success_status: false
                        }
            
                default:
                    return {
                        "error" : "Something Went Wrong!",
                        success_status: false
                    }
            }
        }
        throw error;
    }

    return {
        "success" : "Email Sent!",
        success_status:true
    }
}