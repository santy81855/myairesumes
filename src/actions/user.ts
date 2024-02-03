"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (id: string, data: any) => {
    "use server";
    const response = await prisma.user.update({
        where: { id },
        data,
    });
    return response;
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
    return redirect("/dashboard?menu=profile");
};
