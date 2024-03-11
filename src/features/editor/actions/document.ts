"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/features/authentication/lib/auth";
import {
    initializeNewResume,
    initializeNewCoverLetter,
} from "@/features/editor";

export const createJob = async (formData: any) => {
    "use server";
    try {
        // get the current user
        const { user } = await validateRequest();
        if (!user) {
            return redirect("/sign-in");
        }
        // get the formData information
        const color = formData.get("color") as string;
        const companyName = formData.get("companyName") as string;
        const job = formData.get("job") as string;
        const resumeName = formData.get("resumeName") as string;
        const coverLetter = formData.get("coverLetter") as string;
        const description = formData.get("description") as string;

        // create the job
        const createdJob = await prisma.job.create({
            data: {
                companyName,
                jobName: job,
                color,
                jobDescription: description || "",
                userId: user.id,
            },
        });

        // update the user's numberJobs field to be the current numberJobs + 1
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                numberJobs: {
                    increment: 1,
                },
            },
        });

        // create the resume
        await prisma.resume.create({
            data: {
                information: initializeNewResume(
                    user,
                    resumeName,
                    job,
                    "Resume for " + job + " application at " + companyName
                ),
                userId: user.id,
                jobId: createdJob.id,
            },
        });

        // if the user has a cover letter create the cover letter
        if (coverLetter === "on" || coverLetter === "true") {
            await prisma.coverLetter.create({
                data: {
                    information: initializeNewCoverLetter(
                        user,
                        formData.get("coverLetterName") as string,
                        job,
                        "Cover Letter for " +
                            job +
                            " application at " +
                            companyName
                    ),
                    userId: user.id,
                    jobId: createdJob.id,
                },
            });
        }

        revalidateTag("currentUser");
    } catch (error) {
        console.log(error);
        // return an error that will be caught by the catch block
        throw new Error("An unknown error occurred. Please try again.");
    }
};

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
    revalidateTag("currentResume");
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
    revalidateTag("currentCoverLetter");
    return {
        success: true,
    };
};

export const deleteJob = async (id: string) => {
    "use server";

    try {
        // get the current user
        const { user } = await validateRequest();
        if (!user) {
            return redirect("/sign-in");
        }
        // get the user
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                numberJobs: {
                    decrement: 1,
                },
            },
        });
        if (!updatedUser) {
            return {
                error: "An unknown error occurred. Please try again.",
            };
        }
        // delete the job
        const deletedJob = await prisma.job.delete({
            where: {
                id,
            },
        });
        if (!deletedJob) {
            return {
                error: "An unknown error occurred. Please try again.",
            };
        }
        revalidatePath("/dashboard");
        return {
            success: true,
        };
    } catch (error) {
        console.log(error);
        // return an error that will be caught by the catch block
        throw new Error("An unknown error occurred. Please try again.");
    }
};

export const deleteResume = async (id: string) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the user
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            numberResumes: {
                decrement: 1,
            },
        },
    });
    if (!updatedUser) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // delete the resume
    const deletedResume = await prisma.resume.delete({
        where: {
            id,
        },
    });
    if (!deletedResume) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag(updatedUser.id);

    return {
        success: true,
    };
};

export const deleteCoverLetter = async (id: string) => {
    "use server";
    // get the current user
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/sign-in");
    }
    // get the user
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            numberCoverLetters: {
                decrement: 1,
            },
        },
    });
    if (!updatedUser) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    // delete the cover letter
    const deletedCoverLetter = await prisma.coverLetter.delete({
        where: {
            id,
        },
    });
    if (!deletedCoverLetter) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag(updatedUser.id);

    return {
        success: true,
    };
};
