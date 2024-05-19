import PasswordResetForm from '@/components/PasswordResetForm'
import PasswordResetVerification from '@/components/PasswordResetVerification'
import React from 'react'

type Props = {}

const PasswordResetPage = (props: Props) => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <PasswordResetVerification/>
        </div>
    )
}

export default PasswordResetPage