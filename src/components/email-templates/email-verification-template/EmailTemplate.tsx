import * as React from "react";
import styles from "./EmailTemplate.module.css";

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    url: string;
}

export const EmailVerificationTemplate: React.FC<
    Readonly<EmailTemplateProps>
> = ({ firstName, lastName, url }) => (
    <div>
        <h1>
            Dear {firstName} {lastName},
        </h1>
        <p>
            Thank you for registering with MyResumeHero! To complete the
            registration process and ensure the security of your account, please
            click on the link below to verify your email address:
        </p>
        <br />
        <a href={`${url}`}>Verify Email</a>
        <br />
        <p>
            Note: If you did not sign up for MyResumeHero, please ignore this
            email.
        </p>
        <p>Verification link expires in 2 hours.</p>
        <br />
        <p>Thank you for choosing MyResumeHero,</p>
        <p>MyResumeHero Team</p>
    </div>
);
