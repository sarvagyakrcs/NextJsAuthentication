import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MenuItems } from '@/data';

type Props = {};

const menuItems = MenuItems;

const MobileNav = (props: Props) => {
    return (
        <nav className="text-white mt-2 brightness-90 ml-8">
            <menu className="grid grid-cols-5 brightness-95 ">
                {menuItems.map((item) => (
                    <div key={item.label} className="">
                        <Button className="transition duration-300 rounded-3xl inline hover:bg-dark-hover_bg_secondary hover:text-white" variant="ghost">
                            <a href={item.url}>
                                <Image
                                    src={item.icon}
                                    width={26}
                                    height={26}
                                    alt={`${item.label} icon`}
                                />
                            </a>
                        </Button>
                    </div>
                ))}
            </menu>
        </nav>
    );
}

export default MobileNav;
