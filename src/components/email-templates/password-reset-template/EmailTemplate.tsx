import * as React from "react";
import styles from "./EmailTemplate.module.css";

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    url: string;
}

export const PasswordResetTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    lastName,
    url,
}) => (
    <div>
        <h1>
            Dear {firstName} {lastName},
        </h1>
        <p>
            We received a request to reset the password for your MyResumeHero
            account. To proceed with the password reset, please click on the
            link below:
        </p>
        <br />
        <a href={`${url}`}>Reset Password</a>
        <br />
        <p>
            Note: If you did not request a password reset, please ignore this
            email. Your account will remain secure.
        </p>
        <p>Verification link expires in 2 hours.</p>
        <br />
        <p>Thank you for choosing MyResumeHero,</p>
        <p>MyResumeHero Team</p>
    </div>
);
