import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'

type Props = {
	message: string | undefined
}

export const SuccessMessage = ({ message }: Props) => {

	if(!message){
		return "";
	}

	return (
		<div className="bg-emerald-500 rounded-md text-center p-1 flex items-center justify-center">
			<CheckCircledIcon className="size-5" />
			<span className="text-white text-center font-sans ml-2 brightness-90"> {message} </span>
		</div>
	)
}