import React from 'react'
import { Card, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type Props = {}

const ErrorCard = (props: Props) => {
    return (
        <Card className='width-[400px] shadow-md'>
            <CardHeader>
                <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                    <div className="min-w-full flex-col text-red-400 font-mono font-bold flex items-center justify-center">
                        <h1 className='text-3xl text-center'> OOPS! <ExclamationTriangleIcon className='inline mr-2 size-8'/> <br /> Something went Wrong</h1>
                        <div className="flex m-3 flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            <a href="/login">
                                <Button className="w-40 h-10 rounded-xl hover:bg-gray-900 bg-black border dark:border-white border-transparent text-white text-sm">
                                    Back to Login
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default ErrorCard