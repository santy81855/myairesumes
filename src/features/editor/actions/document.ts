"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/features/authentication/lib/auth";
import {
    initializeNewResume,
    initializeNewCoverLetter,
} from "@/features/editor";

export const createJobCoverLetter = async (jobObject: any) => {
    "use server";
    try {
        // get the current user
        const { user } = await validateRequest();
        if (!user) {
            return redirect("/sign-in");
        }

        const coverLetterInformation = initializeNewCoverLetter(
            user,
            user.firstName + "-" + user.lastName + "-CoverLetter",
            jobObject.jobName, // job
            "Cover Letter for " +
                jobObject.jobName +
                " application at " +
                jobObject.companyName
        );
        // create the cover letter
        const coverLetter = await prisma.coverLetter.create({
            data: {
                information: {
                    ...coverLetterInformation,
                    jobDescription: jobObject.information.jobDescription,
                },
                userId: user.id,
                jobId: jobObject.id,
            },
        });

        // update the user's numberCoverLetters field to be the current numberCoverLetters + 1
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                numberCoverLetters: {
                    increment: 1,
                },
            },
        });

        revalidateTag("currentUser");
        return coverLetter;
    } catch (error) {
        console.log(error);
        // return an error that will be caught by the catch block
        throw new Error("An unknown error occurred. Please try again.");
    }
};

export const createJobResume = async (jobObject: any) => {
    "use server";
    try {
        // get the current user
        const { user } = await validateRequest();
        if (!user) {
            return redirect("/sign-in");
        }

        const resumeInformation = initializeNewResume(
            user,
            user.firstName + "-" + user.lastName + "-Resume",
            jobObject.jobName, // job
            "Resume for " +
                jobObject.jobName +
                " application at " +
                jobObject.companyName
        );

        // create the resume
        const resume = await prisma.resume.create({
            data: {
                information: {
                    ...resumeInformation,
                    jobDescription: jobObject.information.jobDescription,
                },
                userId: user.id,
                jobId: jobObject.id,
            },
        });

        // update the user's numberResumes field to be the current numberResumes + 1
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                numberResumes: {
                    increment: 1,
                },
            },
        });

        revalidateTag("currentUser");
        return resume;
    } catch (error) {
        console.log(error);
        // return an error that will be caught by the catch block
        throw new Error("An unknown error occurred. Please try again.");
    }
};

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

        const information = {
            jobDescription: description || "",
            notes: [],
        };

        // create the job
        const createdJob = await prisma.job.create({
            data: {
                companyName,
                jobName: job,
                color,
                userId: user.id,
                information,
            },
        });

        const resumeInformation = initializeNewResume(
            user,
            resumeName,
            job, // job
            "Resume for " + job + " application at " + companyName
        );

        // create the resume
        await prisma.resume.create({
            data: {
                information: {
                    ...resumeInformation,
                    jobDescription: description || "",
                },
                userId: user.id,
                jobId: createdJob.id,
            },
        });

        const coverLetterInformation = initializeNewCoverLetter(
            user,
            formData.get("coverLetterName") as string,
            job, // job
            "Cover Letter for " + job + " application at " + companyName
        );

        // if the user has a cover letter create the cover letter
        if (coverLetter === "on" || coverLetter === "true") {
            await prisma.coverLetter.create({
                data: {
                    information: {
                        ...coverLetterInformation,
                        jobDescription: description || "",
                    },
                    userId: user.id,
                    jobId: createdJob.id,
                },
            });
        }

        const updateData = {
            numberJobs: {
                increment: 1,
            },
            numberResumes: {
                increment: 1,
            },
            numberCoverLetters: {
                increment:
                    coverLetter === "on" || coverLetter === "true" ? 1 : 0,
            },
        };

        // update the user's numberJobs field to be the current numberJobs + 1
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: updateData,
        });

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

export const updateJob = async (jobId: string, data: any) => {
    "use server";
    try {
        // get the current user
        const { user } = await validateRequest();
        if (!user) {
            return redirect("/sign-in");
        }
        // update the job
        await prisma.job.update({
            where: {
                id: jobId,
            },
            data,
        });

        // if the data includes jobDescription then update the resume and cover letter information
        if (data.information?.jobDescription) {
            await prisma.resume.updateMany({
                where: {
                    jobId,
                },
                data: {
                    information: {
                        jobDescription: data.information.jobDescription,
                    },
                },
            });

            await prisma.coverLetter.updateMany({
                where: {
                    jobId,
                },
                data: {
                    information: {
                        jobDescription: data.information.jobDescription,
                    },
                },
            });
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

        // delete the job
        const deletedJob = await prisma.job.delete({
            where: {
                id,
            },
            include: {
                resume: true,
                coverLetter: true,
            },
        });

        revalidatePath("/dashboard");

        const updateData = {
            numberJobs: {
                decrement: 1,
            },
            numberResumes: {
                decrement: deletedJob.resume ? 1 : 0,
            },
            numberCoverLetters: {
                decrement: deletedJob.coverLetter ? 1 : 0,
            },
        };

        // get the user
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: updateData,
        });

        return {
            success: true,
        };
    } catch (error) {
        console.log("Error in deleteJob action: " + error);
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

export const isLastJobDocument = async (id: string, type: string) => {
    "use server";

    try {
        let job = null;
        // if the type is resume then get the resume with the given id, and include the job that the resume is associated with
        if (type === "resume") {
            const resume = await prisma.resume.findUnique({
                where: {
                    id: id,
                },
                include: {
                    job: {
                        include: {
                            resume: true,
                            coverLetter: true,
                        },
                    },
                },
            });
            job = resume?.job || null;
        } else {
            const coverLetter = await prisma.coverLetter.findUnique({
                where: {
                    id: id,
                },
                include: {
                    job: {
                        include: {
                            resume: true,
                            coverLetter: true,
                        },
                    },
                },
            });
            job = coverLetter?.job || null;
        }
        // if the job is null then return false
        if (!job) {
            return null;
        }
        // if the job has both a resume and a cover letter then return false
        if (job.resume && job.coverLetter) {
            return null;
        }
        // since the job only has one document, then it is the last document
        return job;
    } catch (error) {
        console.log("Error in checkLastJobDocument action: " + error);
        // return an error that will be caught by the catch block
        throw new Error("An unknown error occurred. Please try again.");
    }
};
