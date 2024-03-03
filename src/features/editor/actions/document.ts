"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/features/authentication/lib/auth";
import {
    initializeNewResume,
    initializeNewCoverLetter,
} from "@/features/editor";

export const createCoverLetter = async (formData: any) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the formData information
    const name = formData.get("name") as string;
    const job = formData.get("job") as string;
    const description = formData.get("description") as string;
    // get the current user while updating the numberCoverLetters field to be the current numberCoverLetters + 1
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            numberCoverLetters: {
                increment: 1,
            },
        },
    });
    if (!updatedUser) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // initialize a new cover letter
    const information = initializeNewCoverLetter(
        updatedUser,
        name,
        job,
        description
    );
    // create the cover letter
    const coverLetter = await prisma.coverLetter.create({
        data: {
            information,
            userId: user.id,
        },
    });
    if (!coverLetter) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect(`/editor/cover-letter/${coverLetter.id}`);
};

export const createResume = async (formData: any) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the formData information
    const name = formData.get("name") as string;
    const job = formData.get("job") as string;
    const description = formData.get("description") as string;
    // get the current user while updating the numberResumes field to be the current numberResumes + 1
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            numberResumes: {
                increment: 1,
            },
        },
    });
    if (!updatedUser) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // initialize a new resume
    const information = initializeNewResume(
        updatedUser,
        name,
        job,
        description
    );
    // create the resume
    const resume = await prisma.resume.create({
        data: {
            information,
            userId: user.id,
        },
    });
    if (!resume) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect(`/editor/resume/${resume.id}`);
};

export const updateResume = async (formData: any) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the formData information
    const document = JSON.parse(formData.get("document"));
    const id = document.id;
    // update the resume
    const updatedResume = await prisma.resume.update({
        where: {
            id,
        },
        data: {
            information: document.information,
        },
    });
    if (!updatedResume) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // revalidateTag("currentResume");
    return {
        success: true,
    };
};

export const updateCoverLetter = async (formData: any) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the formData information
    const document = JSON.parse(formData.get("document"));
    const id = document.id;
    // update the cover letter
    const updatedCoverLetter = await prisma.coverLetter.update({
        where: {
            id,
        },
        data: {
            information: document.information,
        },
    });
    if (!updatedCoverLetter) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // revalidateTag("currentCoverLetter");
    return {
        success: true,
    };
};
