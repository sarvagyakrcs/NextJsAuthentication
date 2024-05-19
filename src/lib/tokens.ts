import { v4 as uuidv4 } from 'uuid';
import { VERIFICATION_TOKEN_EXPIRE_TIME } from '@/data';
import { getVerificationTokenByEmail } from './data/verification-token';
import prisma from './prisma';

export const generateVerificationToken = async (email: string) => {
    const db = prisma;
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + VERIFICATION_TOKEN_EXPIRE_TIME * 1000);

    const existing_token = await getVerificationTokenByEmail(email);
    if(existing_token){
        await db.verificationToken.delete({
            where: {
                id: existing_token.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: expires
        }
    })
    return verificationToken;
}