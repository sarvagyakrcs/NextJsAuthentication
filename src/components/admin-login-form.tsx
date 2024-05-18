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
import { LuLoader2 } from "react-icons/lu"

type login_schema_type = z.infer<typeof LoginSchema>

export function AdminLoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        handleSubmit,
        formState: {errors},
        register,
        reset
    } = useForm<login_schema_type>({
        resolver: zodResolver(LoginSchema),
    });

    const hangleLogin = (data: login_schema_type) => {
        setIsLoading(true);
        //simulate api call
        setTimeout(() => {
            console.log(data);
            setIsLoading(false);
            reset();
        }, 2000)
    }

    return (
        <form onSubmit={handleSubmit(hangleLogin)} className="max-sm:border-2 rounded-md border-gray-300">
            <Card className="w-full max-w-sm bg-black text-gray-300 border-none ">
                <CardHeader>
                    <CardTitle className="text-2xl">Admin Login</CardTitle>
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
                            type="email"
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
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button type="submit" disabled={isLoading} className="w-full hover:bg-white hover:text-black transition">{isLoading ? <LuLoader2 className="animate-spin"/> : "Login"}</Button>
                    {errors.root && <ErrorMessage message={errors.root.message} />}
                </CardFooter>
            </Card>
        </form>
    )
}
