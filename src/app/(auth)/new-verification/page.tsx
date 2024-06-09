import NewVerificationForm from '@/components/new-verification-form';
import React, { Suspense } from 'react';

type Props = {}

const Page = (props: Props) => {
	return (
		<div className="flex items-center justify-center min-h-full min-w-full">
		    <Suspense fallback={<div>Loading...</div>}>
			<NewVerificationForm />
		    </Suspense>
		</div>
	)
}

export default Page;
