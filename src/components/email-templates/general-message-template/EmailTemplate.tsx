import * as React from "react";
import styles from "./EmailTemplate.module.css";

interface EmailTemplateProps {
    email: string;
    content: string;
}

export const GeneralMessageTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    email,
    content,
}) => (
    <div>
        <p>Message from {email}</p>
        <p>{content}</p>
    </div>
);
