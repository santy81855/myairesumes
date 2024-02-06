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
            encountered an issue processing your recent payment for your upgrade
            to MyAiResumes Pro. As a valued member of MyAiResumes, we want to
            ensure you continue to enjoy uninterrupted access to our premium
            features.
        </p>
        <h2>Action Required:</h2>
        <p>
            To resolve this matter and retain your pro account status, please
            take the following steps:
        </p>
        <ol>
            <li>
                Log in to your MyAiResumes account at{" "}
                <a href="https://new.myairesumes.com">new.MyAiResumes.com</a>
            </li>
            <li>Go to the Dashboard-&gt;account section.</li>
            <li>Update your payment details.</li>
        </ol>
        <h2>What Happens Next:</h2>
        <p>
            If you successfully update your payment details, your premium access
            will be retained, and you can continue to benefit from all the
            exclusive features of MyAiResumes Pro. Failure to take action within
            7 days will result in the downgrade of your account to the free
            plan.
        </p>
        <br />
        <p>Thank you for choosing MyAiResumes,</p>
        <p>MyAiResumes Team</p>
    </div>
);
