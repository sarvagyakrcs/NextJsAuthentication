import * as z from "zod"

export const passwerdResetSchema = z.object({
    email: z.string().email()
})

export const PasswordSchema = z.object({
    password: z.string()
        .min(6, "Password is too short!")
        .refine(data => /[!@#$%^&*(),.?":{}|<>]/.test(data), "Include special characters")
})