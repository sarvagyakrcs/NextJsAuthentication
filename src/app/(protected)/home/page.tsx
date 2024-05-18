import { auth } from '@/auth'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
	const session = await auth();
	return (
		<div className="flex items-center justify-center flex-col">
			<div className="text-4xl text-blue-400 text-center">Home</div>
			<div className="text-white">{ JSON.stringify(session) }</div>
		</div>
	)
}

export default Page