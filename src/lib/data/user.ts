import prisma from "@/lib/prisma"

export const get_user_by_email = async (email : string | undefined) => {
    const db = prisma;
    const user = db.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        return null;
    }
    return user;
}

export const get_user_by_username = async (username : string) => {
    const db = prisma;
    const user = db.user.findFirst({
        where: {
            userName: username
        }
    })
    if(!user){
        return null;
    }
    return user;
}

export const get_user_by_id = async (id : string | undefined) => {
    const db = prisma;
    const user = db.user.findUnique({
        where: {
            id: id
        }
    })
    if(!user){
        return null;
    }
    return user;
}