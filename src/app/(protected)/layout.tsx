import Navbar from '@/components/protected/navbar'
import React from 'react'
import Image from 'next/image'
import MobileNav from '@/components/protected/mobile_nav'

type Props = {
    children: React.ReactNode
}

const ProtectedPagesLayout = ({ children }: Props) => {
  return (
    <>
        <main className='min-h-screen min-w-full flex items-center justify-center'>
            <div className="left-nav min-h-screen w-1/4  max-lg:hidden bg-dark-bg_secondary border-gray-400 relative">
                <Navbar/>
            </div>
            <div className="main min-h-screen w-1/2  max-md:w-full">
                { children }
            </div>
            <div className="right-nav min-h-screen w-1/4 bg-dark-bg_secondary max-lg:hidden">

            </div>
        </main>
        <div className="main absolute bottom-0 lg:hidden w-full h-14 bg-dark-bg_secondary">
            <MobileNav/>
        </div>
    </>
  )
}

export default ProtectedPagesLayout