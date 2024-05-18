"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa"
import * as z from "zod"
import { LoginSchema } from "@/schema/loginschema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "./error-message"
import { useState } from "react"
import { LuLoader, LuLoader2 } from "react-icons/lu"
import { Login } from "@/actions/login"
import { SuccessMessage } from "./success-message"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { SocialLogin } from "@/actions/socialLogin"
import { useSearchParams } from "next/navigation"
import { FaGithub } from "react-icons/fa6"
// import { SocialLogin } from "@/actions/socialLogin"

type login_schema_type = z.infer<typeof LoginSchema>

export function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<login_schema_type>({
        resolver: zodResolver(LoginSchema),
    });

    const hangleLogin = async (data: login_schema_type) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await Login(data);
            if (response && response.success_status) {
                setSuccess(response.success);
            } else if (response && !response.success_status) {
                setError(response.error);
            } else {
                setError("An unexpected error occurred");
            }
        } catch (error) {
            setError("An error occurred while logging in");
            console.error(error); // Log the error for debugging purposes
        } finally {
            setIsLoading(false);
            if (!error) {
                reset()
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(hangleLogin)} className="">
            <Card className="w-full max-w-sm bg-dark-bg text-gray-300 border-none ">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={isLoading}
                            {...register("email")}
                            id="email"
                            placeholder="abc@example.com"
                            className="font-mono"
                        />
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={isLoading}
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺ ⏺"
                        />
                        {errors.password && <ErrorMessage message={errors.password.message} />}
                        <ErrorMessage message={error} />
                        <SuccessMessage message={success} />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button type="submit" disabled={isLoading} className="w-full hover:bg-white hover:text-black transition">{isLoading ? <LuLoader2 className="animate-spin" /> : "Login"}</Button>
                    <div className="grid grid-cols-2 gap-2 m-2 w-full">
                        <Button variant="outline" className="w-full  hover:bg-white hover:text-black transition"><FaGoogle className="ml-2 size-5" /></Button>
                        <Button variant="outline" disabled={isLoading} className="w-full hover:bg-white hover:text-black transition"><FaGithub className="ml-2 size-5" /></Button>
                    </div>
                    <span className="p-4 text-sm">Not Have an Account? <a className="text-blue-500 underline" href="/register">Register</a></span>
                    <span className="text-sm">Lost, Want to Go Back? <a className="text-blue-500 underline" href="/">Home</a></span>
                    {errors.root && <ErrorMessage message={errors.root.message} />}
                </CardFooter>
            </Card>
        </form>
    )
}
