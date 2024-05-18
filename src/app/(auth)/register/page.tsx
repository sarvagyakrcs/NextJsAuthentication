import { RegisterForm } from '@/components/register-form';
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <RegisterForm/>
    </div>
  )
}

export default LoginPage;