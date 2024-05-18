import { LoginForm } from '@/components/login-form';
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <LoginForm/>
    </div>
  )
}

export default LoginPage;