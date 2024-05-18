"use client"
import React from 'react'
import Image from 'next/image'

type Props = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <main className='grid grid-cols-2 min-h-screen max-md:flex justify-center bg-black'>
            <div className="relative hidden sm:block">
                <Image
                    src="/login-left-bg.jpg"
                    height={1920}
                    width={1080}
                    alt='login-left-bg'
                    className="hidden sm:block min-h-screen min-w-full"
                />
                <Image
                    src="/logo-svg.svg"
                    width={250}
                    height={250}
                    alt="Logo-SVG"
                    className="hidden sm:block absolute right-1/3 top-1/3 brightness-75"
                />
            </div>
            <div className="min-w-full">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout