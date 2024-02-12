"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const initializeUserBasicInfo = async (user: any) => {
    "use server";
    const { firstName, lastName, email, imageUrl } = user;
    const first = firstName;
    const last = lastName;
    const phone = "";
    const website = "";
    const work = [] as any;
    // from newest to oldest
    const workOrder = -1;
    const education = [] as any;
    // from newest to oldest
    const educationOrder = -1;
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            firstName: first,
            lastName: last,
            basicInfo: {
                firstName: first,
                lastName: last,
                email,
                phone,
                website,
                work,
                education,
                workOrder,
                educationOrder,
                imageUrl,
            },
        },
    });
    if (!updatedUser) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile&tutorial=true");
};

export const updateUserContactInfo = async (user: any, formData: any) => {
    "use server";
    const { id } = user;
    const email = formData.get("email");
    const phone = formData.get("phone");
    const website = formData.get("website");
    const first = formData.get("firstName");
    const last = formData.get("lastName");
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            firstName: first,
            lastName: last,
            email,
            phone,
            website,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const removeUserEducationInfo = async (
    user: any,
    educationId: number
) => {
    "use server";
    if (educationId < 0) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const { id } = user;
    const education = user.basicInfo.education;
    const educationToRemove = education.find((e: any) => e.id === educationId);
    if (!educationToRemove) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const newEducation = education.filter((e: any) => e.id !== educationId);
    newEducation.forEach((e: any, i: number) => {
        e.id = i + 1;
    });
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            education: newEducation,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const updateUserEducationInfo = async (
    user: any,
    educationId: number,
    formData: any
) => {
    "use server";
    if (educationId < 0) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const { id } = user;
    const schoolName = formData.get("schoolName");
    const degreeType = formData.get("degreeType");
    const degreeField = formData.get("degreeField");
    const currentEnrollment = formData.get("currentEnrollment");
    const startDate = formData.get("startDate");
    const endDate =
        currentEnrollment === "on" ? "Present" : formData.get("endDate");
    const education = user.basicInfo.education;
    const educationToUpdate = education.find((e: any) => e.id === educationId);
    if (!educationToUpdate) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    educationToUpdate.schoolName = schoolName;
    educationToUpdate.degreeType = degreeType;
    educationToUpdate.degreeField = degreeField;
    educationToUpdate.startDate = startDate;
    educationToUpdate.endDate = endDate;
    educationToUpdate.currentEnrollment =
        currentEnrollment === "on" ? true : false;
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            education,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const addUserEducationInfo = async (user: any, formData: any) => {
    "use server";
    const { id } = user;
    const schoolName = formData.get("schoolName");
    const degreeType = formData.get("degreeType");
    const degreeField = formData.get("degreeField");
    const currentEnrollment = formData.get("currentEnrollment");
    const startDate = formData.get("startDate");
    const endDate =
        currentEnrollment === "on" ? "Present" : formData.get("endDate");
    const education = user.basicInfo.education;
    const newEducation = {
        id: education.length + 1,
        schoolName,
        degreeType,
        degreeField,
        startDate,
        endDate,
        currentEnrollment: currentEnrollment === "on" ? true : false,
    };
    education.push(newEducation);
    education.forEach((e: any, i: number) => {
        e.id = i + 1;
    });
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            education,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const removeUserWorkInfo = async (user: any, workId: number) => {
    "use server";
    if (workId < 0) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const { id } = user;
    const work = user.basicInfo.work;
    const workToRemove = work.find((w: any) => w.id === workId);
    if (!workToRemove) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const newWork = work.filter((w: any) => w.id !== workId);
    newWork.forEach((w: any, i: number) => {
        w.id = i + 1;
    });
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            work: newWork,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const updateUserWorkInfo = async (
    user: any,
    workId: number,
    formData: any
) => {
    "use server";
    if (workId < 0) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    const { id } = user;
    const company = formData.get("company");
    const position = formData.get("position");
    const startDate = formData.get("startDate");
    const currentEmployer = formData.get("currentEmployer");
    const endDate =
        currentEmployer === "on" ? "Present" : formData.get("endDate");
    const work = user.basicInfo.work;
    const workToUpdate = work.find((w: any) => w.id === workId);
    if (!workToUpdate) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    workToUpdate.company = company;
    workToUpdate.position = position;
    workToUpdate.startDate = startDate;
    workToUpdate.endDate = endDate;
    workToUpdate.currentEmployer = currentEmployer === "on" ? true : false;
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            work,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};

export const addUserWorkInfo = async (user: any, formData: any) => {
    "use server";
    const { id } = user;
    const company = formData.get("company");
    const position = formData.get("position");
    const startDate = formData.get("startDate");
    const currentEmployer = formData.get("currentEmployer");
    const endDate =
        currentEmployer === "on" ? "Present" : formData.get("endDate");
    const work = user.basicInfo.work;
    const newWork = {
        id: work.length + 1,
        company,
        position,
        startDate,
        endDate,
        currentEmployer: currentEmployer === "on" ? true : false,
    };
    work.push(newWork);
    work.forEach((w: any, i: number) => {
        w.id = i + 1;
    });
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            work,
        },
    };
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    if (!response) {
        return {
            error: "An unknown error occurred. Please try again.",
        };
    }
    revalidateTag("currentUser");
    return redirect("/dashboard?menu=profile");
};
