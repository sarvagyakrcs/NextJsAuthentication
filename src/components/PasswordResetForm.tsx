"use client"
import React, { useState } from 'react'
import { LuLoader2 } from 'react-icons/lu';
import { Button } from './ui/button';
import { Typewriter } from './Typewriter';
import { PROJECT_NAME } from '@/data';
import { ErrorMessage } from './error-message';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from './ui/label';
import { Input } from './ui/input';
import { LockClosedIcon } from '@radix-ui/react-icons';
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessMessage } from './success-message';
import { ResetPassword } from '@/actions/reset-password';
import { passwerdResetSchema } from '@/schema/passwordreset';

type Props = {}
type TypewriterData = {
    content: string,
};

const PasswordResetForm = (props: Props) => {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<z.infer<typeof passwerdResetSchema>>({
        resolver: zodResolver(passwerdResetSchema)
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit =  async(data : z.infer<typeof passwerdResetSchema>) => {
        setIsLoading(true);
        setError("");
        setSuccess("");

        await ResetPassword(data)
            .then((res) => {
                setError(res.error);
                setSuccess(res.success);
            })
            .catch((err) => {
                setError("Something Went Wrong!")
            });
        
        setIsLoading(false);
    }

    return (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-full my-6 max-w-sm bg-dark-bg text-gray-300 border-none ">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
                    <CardDescription className="flex text-center items-center flex-col justify-center" >
                        <LockClosedIcon className="size-10 m-3" />
                        Please enter your email address, and we will send you a link to get back into your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Input
                            disabled={isLoading}
                            {...register("email")}
                            id="email"
                            placeholder="Email"
                            className="font-mono"
                        />
                        {errors.email && <ErrorMessage message={errors.email.message}/>}
                        {errors.root && <ErrorMessage message={errors.root.message}/>}
                        {error && <ErrorMessage message={error}/>}
                        {success && <SuccessMessage message={success}/>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button type="submit" disabled={isLoading} className="w-full hover:bg-white hover:text-black transition">{isLoading ? <LuLoader2 className="animate-spin" /> : "Send Login Link"}</Button>

                    <a className="text-blue-500 hover:underline p-4 text-sm" href="https://help.instagram.com/374546259294234"><span className="p-4 text-sm">Cannot Reset Your Password? </span></a>
                    <span className="text-sm">Lost, Want to Go Back? <a className="text-blue-500 underline" href="/">Home</a></span>
                </CardFooter>
            </Card>
        </form>
    );
}

export default PasswordResetForm
