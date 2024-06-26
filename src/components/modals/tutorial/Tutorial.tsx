"use client";
import styles from "./Tutorial.module.css";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type TutorialProps = {};

const Tutorial = ({}: TutorialProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [page, setPage] = useState(0);
    var steps = [] as any;
    var pageElementId = "";

    if (searchParams.get("menu") === "profile") {
        steps = [
            {
                content:
                    "Welcome to the tutorial! This is where you can learn how to use the My Resume Hero platform.",
                elementId: "profile-page",
            },
            {
                content:
                    "This is the profile section. Here you can add add the information that usually doesn't change between resumes so that you only have to type it once.",
                elementId: "profile-page",
            },
            {
                content:
                    "In the Contact section, you can edit your email, phone number, and website if you have one.",
                elementId: "Contact",
            },
            {
                content:
                    "Add your work history here and never have to type it in again!",
                elementId: "Work History",
            },
            {
                content:
                    "You can add your education history here. This is also something that doesn't change between resumes.",
                elementId: "Education History",
            },
            {
                content:
                    "You can add any skills that you want present in every resume here. You can always edit them later in the resume editor.",
                elementId: "Skills",
            },
            {
                content:
                    "Add any projects that you want to showcase here. You can always edit them later in the resume editor.",
                elementId: "Projects",
            },
        ];
        pageElementId = "profile-page";
    } else if (searchParams.get("menu") === "account") {
        steps = [
            {
                content:
                    "Welcome to the tutorial! This is where you can learn how to use the My Resume Hero platform.",
                elementId: "account-page",
            },
            {
                content:
                    "This is the account section. Here you can upgrade/downgrade your plan, view any upcoming bills, and manage your payment method.",
                elementId: "Plan Details",
            },
        ];
        pageElementId = "account-page";
    } else if (searchParams.get("menu") === "jobs") {
        steps = [
            {
                content:
                    "Welcome to the tutorial! This is where you can learn how to use the My Resume Hero platform.",
                elementId: "Your Applications",
            },
            {
                content:
                    "This is the applications section. Here you can manage all of your existing job applications or create a new one.",
                elementId: "Your Applications",
            },
            {
                content:
                    "When you create a new application, it automatically comes with a resume, and optionally a cover letter. This allows you easily tailor each resume to the job you are applying for.",
                elementId: "Your Applications",
            },
            {
                content:
                    "You can also add the job description when you create a new application. This allows the system to help you tailor your resume to the specific job.",
                elementId: "Your Applications",
            },
        ];
        pageElementId = "applications-page";
    }
    if (pathname.includes("editor")) {
        steps = [
            {
                content:
                    "Welcome to the tutorial! This is where you can learn how to use the My Resume Hero document editor.",
                elementId: "editor-page",
            },
            {
                content:
                    "This is the resume editor. Here you can edit your resume or cover letter, save it, and download it.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can add or remove sections in your resume by clicking the 'Section' button on the sidebar.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can browse the templates and select one by clicking the 'Templates' button on the sidebar.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can change the style of your resume by clicking the 'Style' button on the sidebar. This includes things like font, font size, accent colors, margins, etc.",
                elementId: "editor-page",
            },
            {
                content:
                    "To put the document in edit mode, click the 'Edit' button. While in edit mode, you can click on any text to edit it.",
                elementId: "editor-page",
            },
            {
                content:
                    "To put the document in reorder mode, click the 'Reorder' button. While in reorder mode, you can drag and drop sections to reorder them.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can save your changes by clicking the 'Save' button.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can download your document as a pdf at any time by clicking the 'Download' button.",
                elementId: "editor-page",
            },
            {
                content:
                    "You can delete your current document by clicking the 'Delete' button that is hiding right underd this message box.",
                elementId: "editor-page",
            },
        ];
        pageElementId = "editor-page";
    }

    useEffect(() => {
        // Define the handler for window resize
        const handleResize = () => {
            moveContainer(0);
        };

        moveContainer(0);
        // Add the resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const moveContainer = (direction: number) => {
        // update the element position based on the page
        var profilePageElement = document.getElementById(pageElementId);
        var element = document.getElementById(
            steps[page + direction].elementId
        );
        const container = document.getElementById("container");
        if (element && container && profilePageElement) {
            // get the difference between the current element and the profile page element
            const profileRect = profilePageElement.getBoundingClientRect();
            const rect = element.getBoundingClientRect();
            const diffY = rect.y - profileRect.y;
            const diffX = rect.left - profileRect.left;
            // smooth scroll to the element
            element.scrollIntoView({ behavior: "smooth" });

            container.style.top = `${diffY + 50}px`;
            container.style.left = `${diffX + 10}px`;
        }
    };

    const handleNext = () => {
        if (page === steps.length - 1) {
            return;
        }
        moveContainer(1);

        setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page === 0) {
            return;
        }
        moveContainer(-1);
        setPage(page - 1);
    };

    const handleExit = () => {
        if (searchParams.get("menu"))
            router.push("/dashboard?menu=" + searchParams.get("menu"));
        else if (pathname.includes("editor")) {
            // remove the tutorial from the url
            router.push(pathname.replace(/\/tutorial/g, ""));
        }
    };

    return (
        <section className={styles.container} id="container">
            <h1 className={styles.title}>Tutorial</h1>
            <p className={styles.text}>{steps[page].content}</p>
            <section className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${styles.exitButton}`}
                    onClick={handleExit}
                >
                    Close
                </button>
                <section className={styles.navigationButtons}>
                    <button
                        className={styles.button}
                        onClick={handlePrevious}
                        hidden={page === 0}
                    >
                        Prev
                    </button>
                    <button
                        className={styles.button}
                        onClick={handleNext}
                        hidden={page === steps.length - 1}
                    >
                        Next
                    </button>
                </section>
            </section>
        </section>
    );
};

export default Tutorial;
