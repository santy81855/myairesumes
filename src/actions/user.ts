"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateUserContactInfo = async (user: any, formData: any) => {
    "use server";
    const { id } = user;
    const email = formData.get("email");
    const phone = formData.get("phone");
    const website = formData.get("website");
    const name = formData.get("name");
    const basicInfo = user.basicInfo;
    const data = {
        basicInfo: {
            ...basicInfo,
            name,
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

export const addUserWorkInfo = async (user: any, formData: any) => {
    "use server";
    const { id } = user;
    const company = formData.get("company");
    const position = formData.get("position");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const currentEmployer = formData.get("currentEmployer");
    const work = user.basicInfo.work;
    const newWork = {
        company,
        position,
        startDate,
        endDate,
        currentEmployer: currentEmployer === "on" ? true : false,
    };
    work.push(newWork);
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

export const initializeUserBasicInfo = async (user: any) => {
    "use server";
    const { firstName, lastName, email, imageUrl } = user;
    const name = `${firstName} ${lastName}`;
    const phone = "";
    const website = "";
    const work = [] as any;
    const education = [] as any;
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            basicInfo: {
                name,
                email,
                phone,
                website,
                work,
                education,
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
