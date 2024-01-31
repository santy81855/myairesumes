"use server";
import { getStripeSession, stripe } from "@/lib/stripe";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSubscription() {
    "use server";
    const { user } = await validateRequest();
    if (!user) {
        return {
            error: "Please create an account.",
        };
    }
    // get the user with prisma
    const existingUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    // if the user doesn't exist, throw an error
    if (!existingUser) {
        return {
            error: "Please create an account.",
        };
    }
    // if the user doesn't have a stripe customer id, create one
    if (!existingUser.stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
        });
        if (!customer) {
            return {
                error: "Error creating customer id.",
            };
        }
        const updatedUser = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                stripeCustomerId: customer.id,
            },
        });
        if (!updatedUser) {
            return {
                error: "Error updating user.",
            };
        }
    }
    const subscriptionUrl = await getStripeSession({
        priceId: process.env.AI_RESUME_PRO_KEY!,
        domainUrl: process.env.APP_DOMAIN!,
        customerId: existingUser.stripeCustomerId as string,
    });
    if (!subscriptionUrl) {
        return {
            error: "Error generating checkout session.",
        };
    }

    return redirect(subscriptionUrl);
}
