import * as React from "react";
import styles from "./EmailTemplate.module.css";

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    code: string;
}

export const EmailVerificationCodeTemplate: React.FC<
    Readonly<EmailTemplateProps>
> = ({ firstName, lastName, code }) => (
    <div>
        <h1>
            Dear {firstName} {lastName},
        </h1>
        <p>Your Code is:</p>
        <br />
        <h2>{code}</h2>
        <br />
        <p>
            To complete the registration process and ensure the security of your
            account, please enter the code in the verification page.
        </p>
        <p>
            Note: If you did not sign up for MyResumeHero, please ignore this
            email.
        </p>
        <p>Verification code expires in 2 hours.</p>
        <br />
        <p>Thank you for choosing MyResumeHero,</p>
        <p>MyResumeHero Team</p>
    </div>
);
