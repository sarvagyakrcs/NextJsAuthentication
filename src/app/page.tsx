"use client"
import React from 'react'
import Image from 'next/image'
import { Bento } from '@/components/Bento'
import { Typewriter } from '@/components/Typewriter'
import { Content } from 'next/font/google'
import { homepage_data, PROJECT_NAME } from '@/data'
import { Button } from '@/components/ui/button'

type Props = {
}

type typewriterData = {
	"content": string,
}

const Page = ({ }: Props) => {
	const { Heading, Subheading } = homepage_data;
	const app_name = PROJECT_NAME;

	const typewriterData: typewriterData[] = [];

	const Heading_Words = Heading.split(" ");
	Heading_Words.map((word) => {
		typewriterData.push({
			"content": word,
		})
	})


	return (
		<div className="bg-black">
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
				<div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
					<div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
					<div className="min-w-full flex-col text-emerald-400 flex items-center justify-center">
						<h1 className="text-6xl text-blue-400 brightness-90 font-mono font-bold "> {app_name} </h1>
						<Typewriter data={typewriterData} />
						<div className="flex m-3 flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
							<a href="/login">
								<Button className="w-40 h-10 rounded-xl hover:bg-gray-900 bg-black border dark:border-white border-transparent text-white text-sm">
									Login
								</Button>
							</a>
							<a href="/register">
								<Button className="w-40 h-10 rounded-xl hover:bg-blue-50  bg-white text-black border border-black  text-sm">
									Sign Up
								</Button>
							</a>
						</div>
					</div>
				</div>
			</main>
			<div className="flex items-center justify-center min-h-screen">
				<Bento />
			</div>

		</div>
	)
}

export default Page