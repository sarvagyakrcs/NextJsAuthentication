import PasswordResetForm from '@/components/PasswordResetForm'
import PasswordResetVerification from '@/components/PasswordResetVerification'
import { useSearchParams } from 'next/navigation';

type Props = {}

const PasswordResetPage = (props: Props) => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <Suspense fallback={<div>Loading...</div>}>
                <PasswordResetVerification/>
            </Suspense>
        </div>
    )
}

export default PasswordResetPage
