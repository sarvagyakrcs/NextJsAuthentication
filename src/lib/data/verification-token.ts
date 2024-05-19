import prisma from "../prisma";

export const getVerificationTokenByEmail = async (email : string) => {
    const db = prisma;
    try {
        const verificationToken = db.verificationToken.findFirst({
            where: {
                email: email
            }
        })
        return verificationToken
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token : string) => {
    const db = prisma;
    try {
        const verificationToken = db.verificationToken.findUnique({
            where: {
                token: token
            }
        })
        return verificationToken
    } catch (error) {
        return null;
    }
}