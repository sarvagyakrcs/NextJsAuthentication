"use server"
import { signOut } from "@/auth";

export const LogOut = async () => {
    await signOut();
}