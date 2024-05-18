"use server"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schema/loginschema"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"
import * as z from "zod"

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