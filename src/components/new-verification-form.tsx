"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuLoader2 } from 'react-icons/lu';
import { useSearchParams } from 'next/navigation';
import { Typewriter } from './Typewriter';
import { PROJECT_NAME } from '@/data';
import { newVerification } from '@/actions/new-verification';
import { ErrorMessage } from './error-message';
import { SuccessMessage } from './success-message';

type Props = {};
type TypewriterData = {
    content: string,
};

const NewVerificationForm = (props: Props) => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const onSubmit = useCallback(async () => {
        if (!token) {
            setError("Token Does Not Exist");
            setLoading(false);
            return;
        }
        try {
            const res = await newVerification(token);
            if (res.error) {
                setError(res.error);
            } else {
                setSuccess(res.success);
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

    return (
        <div className="h-auto p-4 rounded-md w-3/4 bg-dark-bg_secondary flex items-center justify-center flex-col">
            <Typewriter data={typewriterData} />
            <h1 className="text-2xl m-3 max-md:text-xl font-mono font-bold text-center">Confirming your Verification.</h1>
            {loading && <LuLoader2 className="text-blue-500 animate-spin size-14 mb-3" />}
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

export default NewVerificationForm;
