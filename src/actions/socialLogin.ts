"use server"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SocialLogin = async (provider : "google" | "github") => {
    signIn(provider, {
        redirectTo: DEFAULT_LOGIN_REDIRECT
    })
    return null;
}