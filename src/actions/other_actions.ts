"use server"
import { get_user_by_email, get_user_by_username } from "@/lib/data/user";

export const existing_username = async (username : string) => {
    const user = await get_user_by_username(username);
    if(user){
        return true
    }
    return false
}

export const existing_email = async (email : string) => {
    const user = await get_user_by_email(email);
    if(user){
        return true
    }
    return false
}
