"use client";

import styles from "./FaqComponent.module.css";
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const FaqComponent = () => {
    const generalQuestions = {
        title: "General Questions",
        rows: [
            {
                title: "What is My Resume Hero?",
                content:
                    "My Resume Hero is an application that helps you create, store, and manage your job applications in one place. It also assists you in generating personalized resumes and cover letters for each job application, greatly increasing your chances of getting hired.",
            },
            {
                title: "Can I edit my job applications after I create them?",
                content:
                    "Yes, you can edit your job applications at any time by going to Dashboard->Applications. You can then edit any of the job details and the resume and/or cover letter associated with the job application. You can also delete them if you no longer need them.",
            },
            {
                title: "Can I add the job post information to my job applications?",
                content:
                    "Yes, you can add the job listing information to your job applications. This will help you keep track of the job listings you have applied to and the status of each application. It will also allow the Artificial Intelligence helper to generate better personalized resumes and cover letters for each job application.",
            },
            {
                title: "How can I keep my applications organized?",
                content:
                    "You can keep your applications organized by using the Dashboard->Applications page. You can choose to color code the applications based on your organization system, and you can search for specific applications using the search bar.",
            },
            {
                title: "How do I download my resume from a job application?",
                content:
                    "You can download your resume from a job application by going to Dashboard->Applications->Manage on the specific application. You can then open the resume and download it as a PDF. You can also download the cover letter associated with the job application.",
            },
        ],
    };

    const accountQuestions = {
        title: "Account Questions",
        rows: [
            {
                title: "How can I cancel my membership?",
                content:
                    "You can cancel your membership at any time by going to Dashboard->Account->Manage. You can then choose to cancel your membership, and you will no longer be billed for the next billing cycle. You can still use the application until the end of the current billing cycle.",
            },
            {
                title: "How can I upgrade my account if I accidentally cancelled my membership?",
                content:
                    "If you cancel your membership, you can re-upgrade at any time by going to Dashboard->Account->Renew Subscription. This will reinitiate your membership, and you will not be billed until the next billing cycle.",
            },
            {
                title: "How can I update my payment details?",
                content:
                    "If you need to update your payment details, you can do so by going to Dashboard->Account->Update. You can then update your payment information, and the changes will take effect immediately. You will receive a confirmation email once the changes have been made.",
            },
        ],
    };

    const faqStyles = {
        bgColor: "white",
        titleTextColor: "#48482a",
        rowTitleColor: "#78789a",
        rowTitleTextSize: "16px",
        rowContentColor: "#48484a",
        rowContentTextSize: "12px",
        rowContentPaddingTop: "10px",
        rowContentPaddingBottom: "10px",
        rowContentPaddingLeft: "0px",
        rowContentPaddingRight: "20px",
        arrowColor: "black",
    };

    return (
        <section className={styles.faqContainer}>
            <Faq data={generalQuestions} styles={faqStyles} />
            <Faq data={accountQuestions} styles={faqStyles} />
        </section>
    );
};

export default FaqComponent;
