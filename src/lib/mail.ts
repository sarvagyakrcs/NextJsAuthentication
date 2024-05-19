import { BASE_URL, PROJECT_NAME } from '@/data';
import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend('re_RcENQkYx_A8dpquEkcigtHtyj85TxfZes');

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${BASE_URL}/new-verification?token=${token}`

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: `Confirm Your Email for ${PROJECT_NAME}`,
        html: `
            <p>Thank you for signing up for ${PROJECT_NAME}!</p>
            <p>Please confirm your email address by clicking the link below:</p>
            <p><a href="${confirmLink}">Confirm Email</a></p>
            <p>If you did not sign up for ${PROJECT_NAME}, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The ${PROJECT_NAME} Team</p>
        `
    });
    

    
}