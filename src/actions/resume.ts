"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { initializeNewResume } from "@/lib/resume";

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
