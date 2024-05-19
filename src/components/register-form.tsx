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
import { FaGoogle, FaLinkedin } from "react-icons/fa"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "./error-message"
import { useEffect, useState } from "react"
import { RegisterSchema } from "@/schema/registerschema"
import { LuLoader, LuLoader2 } from "react-icons/lu"
import Register from "@/actions/register"
import { SuccessMessage } from "./success-message"
import { get_user_by_username } from "@/lib/data/user"
import { existing_email, existing_username } from "@/actions/other_actions"

type register_schema_type = z.infer<typeof RegisterSchema>

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const {
        handleSubmit,
        formState: {errors},
        register,
        reset
    } = useForm<register_schema_type>({
        resolver: zodResolver(RegisterSchema),
    });

    const hangleLogin = async (data: register_schema_type) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        Register(data)
            .then((res) => {
                if(res.error) setError(res.error);
                if(res.success) setSuccess(res.success)
            })

        setIsLoading(false);
        if(!error){
            reset()
        }
    }

    useEffect(() => {
        if(username.length < 6){
            setError("")
            return;
        }

        if(username){
            setError("")
        }

        const checkUsername = async () => {
            setError("");
            const result = await existing_username(username);
            if(result){
                setError("Username Already Taken.");
            } else {
                setError('');
            }
        };

        if (username) {
            checkUsername();
        }
    }, [username]);

    useEffect(() => {
        if(email.length < 6){
            setError("")
            return;
        }

        if(email){
            setError("")
        }

        const checkEmail = async () => {
            setError("");
            const result = await existing_email(email);
            if(result){
                setError("Email Already Taken.");
            } else {
                setError('');
            }
        };

        if (email) {
            checkEmail();
        }
    }, [email]);

    return (
        <form onSubmit={handleSubmit(hangleLogin)} >
            <Card className="w-full max-w-sm bg-dark-bg text-gray-300 border-none ">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your credentials below to create an account.
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <ErrorMessage message={errors.email.message} />}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            disabled={isLoading}
                            {...register("username")}
                            id="username"
                            type="text"
                            placeholder="john_doe"
                            className="font-mono"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <ErrorMessage message={errors.username.message} />}
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
                        <ErrorMessage message={error}/>
                        <SuccessMessage message={success}/>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button type="submit" disabled={isLoading || !!error} className="w-full hover:bg-white hover:text-black transition">{isLoading ? <LuLoader2 className="animate-spin"/> : "Register"}</Button>
                    <div className="grid grid-cols-2 gap-2 m-2 w-full">
                        <Button disabled={isLoading} variant="outline"  className="w-full hover:bg-white hover:text-black transition"><FaGoogle className="ml-2 size-5" /></Button>
                        <Button disabled={isLoading} variant="outline"  className="w-full hover:bg-white hover:text-black transition"><FaLinkedin className="ml-2 size-5" /></Button>
                    </div>
                    <span className="p-4 text-sm">Already Have an Account? <a className="text-blue-500 underline" href="/login">Login</a></span>
                    <span className="text-sm">Lost, Want to Go Back? <a className="text-blue-500 underline" href="/">Home</a></span>
                    {errors.root && <ErrorMessage message={errors.root.message} />}
                </CardFooter>
            </Card>
        </form>
    )
}
