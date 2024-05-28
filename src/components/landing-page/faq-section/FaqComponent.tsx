"use client";

import styles from "./FaqComponent.module.css";
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const FaqComponentLandingPage = () => {
    const generalQuestions = {
        title: "General Questions",
        rows: [
            {
                title: "What is My Resume Hero?",
                content:
                    "My Resume Hero is an application that helps you create, store, and manage your job applications in one place. It also assists you in generating personalized resumes and cover letters for each job application, greatly increasing your chances of getting hired.",
            },
            {
                title: "How do I upgrade my account?",
                content:
                    "To upgrade your account, go to the Dashboard->Account->Upgrate to Pro. Once you have upgraded your account, you will have access to all the premium features of My Resume Hero.",
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
        </section>
    );
};

export default FaqComponentLandingPage;
