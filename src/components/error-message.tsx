import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'

type Props = {
	message: string | undefined
}

export const ErrorMessage = ({ message }: Props) => {

	if(!message){
		return "";
	}

	return (
		<div className="bg-red-500 rounded-md text-center p-1 flex items-center justify-center">
			<ExclamationTriangleIcon className="size-5" />
			<span className="text-white text-center font-sans ml-2 brightness-90"> {message} </span>
		</div>
	)
}