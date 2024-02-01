import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    lastName: string;
}

export const FailedPaymentTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    lastName,
}) => (
    <div>
        <h1>
            Dear {firstName} {lastName},
        </h1>
        <p>
            We hope this email finds you well. We wanted to inform you that we
            encountered an issue processing your recent payment for our premium
            subscription service. As a valued member of MyAiResumes, we want to
            ensure you continue to enjoy uninterrupted access to our premium
            features.
        </p>
        <h2>Action Required:</h2>
        <p>
            To resolve this matter and retain your premium account status,
            please take the following steps within the next 7 days:
        </p>
        <ol>
            <li>Log in to your MyAiResumes account</li>
            <li>Go to the billing section</li>
            <li>Active your subscription</li>
        </ol>
        <h2>What Happens Next:</h2>
        <p>
            If you successfully update your payment details within the specified
            timeframe, your premium access will be reinstated, and you can
            continue to benefit from all the exclusive features of MyAiResumes.
        </p>
        <br />
        <p>Thank you for choosing MyAiResumes,</p>
        <p>MyAiResumes Team</p>
    </div>
);
