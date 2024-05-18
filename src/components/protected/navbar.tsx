import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { MenuItems } from '@/data'
import LogOutButton from './logOutButton'
import User from '@/components/protected/user'

type Props = {}

const menuItems = MenuItems;

const Navbar = (props: Props) => {
    return (
        <nav className="text-white mt-5 brightness-90 ">
            <div className="main ml-12">
                <Image
                    src='/logo-svg.svg'
                    alt='logo'
                    height={50}
                    width={30}
                    className="m-3"
                />
                <menu className="brightness-95">
                    {menuItems.map((item) => (
                        <div key={item.label} className="flex items-center justify-start ">
                            <Button className="m-2 p-5 transition duration-300 rounded-3xl hover:bg-dark-hover_bg_secondary hover:text-white" variant="ghost">
                                <a href={item.url} className="flex items-center justify-center">
                                    <Image
                                        src={item.icon}
                                        width={26}
                                        height={26}
                                        alt={`${item.label} icon`}
                                        className="inline"
                                    />
                                    <p className='ml-2 inline text-xl'>{item.label}</p>
                                </a>
                            </Button>
                        </div>
                    ))}
                    <Button
                        className="m-2 p-6 text-lg hover:brightness-90 rounded-3xl min-w-48 bg-blue-600"
                        variant="ghost"
                    >Post</Button>

                    <LogOutButton/>
                </menu>
            </div>            
        </nav>
    )
}

export default Navbar
