"use server"
import * as z from "zod"
import { get_user_by_email, get_user_by_username } from "@/lib/data/user"
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/tokens";
import { passwerdResetSchema, PasswordSchema } from "@/schema/passwordreset";
import prisma from "@/lib/prisma";
import { getPasswordResetTokenByToken } from "@/lib/data/password-reset-token";
import bcrypt from "bcryptjs"

export const ResetPassword = async(identifier : z.infer<typeof passwerdResetSchema>) => {
    console.log({message : "Hello"});
    const {
        success,
        data
    } = passwerdResetSchema.safeParse(identifier);

    if(!success){
        return {
            "error": "Invalid Email!"
        }
    }

    const email = data.email;
    const existing_user = await get_user_by_email(email);

    if(!existing_user){
        return {
            "error": "Incorrect Email!"
        }
    }

    if(!existing_user.email){
        return {
            "error": "Email does not exists"
        }
    }


    const verification_token = await generatePasswordResetToken(existing_user.email);
    sendPasswordResetEmail(verification_token.email, verification_token.token);

    return {
        "success" : "Verification Email Sent."
    }
}

export const NewPasswordReset = async(token: string) => {
    const existing_token = await getPasswordResetTokenByToken(token);

    if(!existing_token){
        return {
            error: "Token does not exists!"
        }
    }

    const has_expired = new Date() > existing_token.expires;
    if(has_expired){
        return {
            error: "Token has expired please try again!"
        }
    }

    const user = await get_user_by_email(existing_token.email);
    if(!user){
        return {
            error: `User with email ${existing_token.email}, does not exists!`
        }
    }

    return {
        success: "Verification Successfull"
    }
}

export const updatePassword = async(token : string, new_pssd: z.infer<typeof PasswordSchema>) => {
    const existing_token = await getPasswordResetTokenByToken(token);
    if(!existing_token || !existing_token.email){
        return {
            "error" : "Token Does not Exists!"
        }
    }

    const email = existing_token.email;

    const {
        success,
        data
    } = PasswordSchema.safeParse(new_pssd)

    if(!success) {
        return {
            "error" : "Invalid Password!"
        }
    }

    const db = prisma;
    const existing_user = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if(!existing_user?.password){
        return {
            "error" : "Please use appropriate mode to Login!"
        }
    }

    if(!existing_user || !existing_user.email){
        return {
            "error" : "User Does Not Exists!"
        }
    }

    const hashed_password = await bcrypt.hash(data.password, 10);

    const isPasswordSameAsOldPassword : boolean = await bcrypt.compare(existing_user.password, hashed_password);
    if(isPasswordSameAsOldPassword){
        return {
            "error" : "Password Cannot be same as the old Password"
        }
    }

    await db.user.update({
        where: {
            email: existing_user.email
        },
        data: {
            password : hashed_password
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existing_token.id
        }
    })

    return {
        "success": "Password Updated Successfully."
    }
}