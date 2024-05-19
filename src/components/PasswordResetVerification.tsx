"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuLoader2 } from 'react-icons/lu';
import { useSearchParams } from 'next/navigation';
import { Typewriter } from './Typewriter';
import { PROJECT_NAME } from '@/data';
import { ErrorMessage } from './error-message';
import { SuccessMessage } from './success-message';
import { NewPasswordReset, updatePassword } from '@/actions/reset-password';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { PasswordSchema } from '@/schema/passwordreset';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {};
type TypewriterData = {
    content: string,
};

const PasswordResetVerification = (props: Props) => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const [verified, setIsVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const onSubmit = useCallback(async () => {
        if (!token) {
            setError("Token Does Not Exist");
            setLoading(false);
            return;
        }
        try {
            const res = await NewPasswordReset(token);
            if (res.success) {
                setSuccess(res.success);
                setIsVerified(true)
            }
            if (res.error) {
                setError(res.error);
            }
        } catch {
            setError("Something Went Wrong");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    const Heading = `Welcome to, ${PROJECT_NAME}.`;
    const typewriterData: TypewriterData[] = Heading.split(" ").map((word) => ({
        content: word,
    }));

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<z.infer <typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema)
    })

    const updatePasswordClient = async(new_pssd : z.infer<typeof PasswordSchema>) => {
        setLoading(true);
        setError("");
        setSuccess("");
        if(!token){
            return null;
        }
        await updatePassword(token, new_pssd)
            .then((res) => {
                if(res.error) setError(res.error);
                if(res.success) setSuccess(res.success)
            })
            .catch((error) => {
                setError("An Unexpected Error Occured!");
            })
        
        setLoading(false);
        setIsVerified(false);
    }

    const newPasswordForm = (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 m-6 flex items-center justify-center">
            <form onSubmit={handleSubmit(updatePasswordClient)} className="max-w-sm w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <label htmlFor="pssd" className="block mb-2">Enter New Password</label>
                <input
                    {...register("password")}
                    type="password"
                    id="pssd"
                    className="block w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800">
                    Reset Password
                </button>
                {errors.password && <ErrorMessage message={errors.password.message} />}
            </form>
        </div>
    )

    return (
        <div className="h-auto p-4 rounded-md w-3/4 bg-dark-bg_secondary flex items-center justify-center flex-col">
            <Typewriter data={typewriterData} />
            <h1 className="text-2xl m-3 max-md:text-xl font-mono font-bold text-center">Confirming your Verification.</h1>
            {loading && <LuLoader2 className="text-blue-500 animate-spin size-14 mb-3" />}
            {verified && newPasswordForm}
            {!loading && (error || success) && (
                <>
                    {error && <ErrorMessage message={error} />}
                    {success && <SuccessMessage message={success} />}
                </>
            )}
            <a href="/"><Button className="m-4" variant="default">Back to Home</Button></a>
        </div>
    );
};

export default PasswordResetVerification;
