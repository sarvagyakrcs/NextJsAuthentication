import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

export const {
    auth
} = NextAuth(authConfig);

export default auth((req) => {

    const path = req.nextUrl.pathname;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = path.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    if (isApiAuthRoute) {
        return NextResponse.next();;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
        }
        return NextResponse.next();;
    }

    if (!isPublicRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
        else {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
})



// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}