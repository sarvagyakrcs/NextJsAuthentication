import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from '@/actions/logout'

type Props = {}

const LogOutButton = async (props: Props) => {
    return (
        <div className="">
            <form action={LogOut}>
                <Button
                    className="m-2 p-6 text-lg hover:brightness-90 rounded-3xl min-w-48 bg-blue-600"
                    variant="ghost"
                >Logout</Button>
            </form>
        </div>
    )
}

export default LogOutButton