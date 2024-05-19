import prisma from "../prisma";

export const getPasswordResetTokenByEmail = async (email : string) => {
    const db = prisma;
    try {
        const passwordResetToken = db.passwordResetToken.findFirst({
            where: {
                email: email
            }
        })
        return passwordResetToken
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByToken = async (token : string) => {
    const db = prisma;
    try {
        const passwordResetToken = db.passwordResetToken.findUnique({
            where: {
                token: token
            }
        })
        return passwordResetToken
    } catch (error) {
        return null;
    }
}