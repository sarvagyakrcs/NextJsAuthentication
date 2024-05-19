"use server"
import { get_user_by_email, get_user_by_username } from "@/lib/data/user"
import prisma from "@/lib/prisma"
import { RegisterSchema } from "@/schema/registerschema"
import * as z from "zod"
type schema_type = z.infer< typeof RegisterSchema >
import bcrypt from "bcryptjs"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

const Register = async (credentials : schema_type) => {
    const {
        success,
        data
    } = RegisterSchema.safeParse(credentials)

    if(!success){
        return {
            'error' : 'Invalid Credentials!'
        }
    }

    const user = await get_user_by_email(data.email);
    if(user){
        return {
            'error' : 'User Already Registered! Please Login.'
        }
    }

    const user_by_username = await get_user_by_username(data.username);
    if(user_by_username){
        return {
            'error' : 'Username is Already Taken.'
        }
    }

    const db = prisma;
    const hashed_password = await bcrypt.hash(data.password, 10);

    await db.user.create({
        data: {
            email: data.email,
            password: hashed_password,
            userName: data.username
        }
    })

    const verificationToken = await generateVerificationToken(data.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
        'success' : 'Confirmation Email Sent!.'
    }
}

export default Register;