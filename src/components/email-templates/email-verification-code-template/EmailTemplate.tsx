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
        <p>
            Thank you for registering with MyAiResumes! To complete the
            registration process and ensure the security of your account, please
            enter the following verification code:
        </p>
        <br />
        <h2>{code}</h2>
        <br />
        <p>
            Note: If you did not sign up for MyAiResumes, please ignore this
            email.
        </p>
        <p>Verification code expires in 2 hours.</p>
        <br />
        <p>Thank you for choosing MyAiResumes,</p>
        <p>MyAiResumes Team</p>
    </div>
);
