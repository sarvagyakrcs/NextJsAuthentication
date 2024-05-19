import NewVerificationForm from '@/components/new-verification-form';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-full min-w-full">
        <NewVerificationForm/>
    </div>
  )
}

export default Page;