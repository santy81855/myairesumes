"use server";
import {
    getStripeSession,
    stripe,
    getStripeSessionUpdatePayment,
} from "@/lib/stripe";
import { validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function cancelSubscription() {
    "use server";
    const { user } = await validateRequest();
    if (!user) {
        return {
            error: "Please create an account.",
        };
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!existingUser) {
        return {
            error: "Please create an account.",
        };
    }
    if (!existingUser.stripeCustomerId) {
        return {
            error: "No subscription to cancel.",
        };
    }
    const subscriptions = await stripe.subscriptions.list({
        customer: existingUser.stripeCustomerId,
    });
    if (!subscriptions) {
        return {
            error: "Error fetching subscriptions.",
        };
    }
    if (subscriptions.data.length === 0) {
        return {
            error: "No subscription to cancel.",
        };
    }
    const canceledSubscription = await stripe.subscriptions.cancel(
        subscriptions.data[0].id
    );
    if (!canceledSubscription) {
        return {
            error: "Error canceling subscription.",
        };
    }
    revalidateTag("user");
    return {
        success: "Successfully canceled subscription.",
    };
}

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
        priceId: process.env.PRO_KEY!,
        domainUrl: process.env.APP_DOMAIN!,
        customerId: existingUser.stripeCustomerId as string,
    });
    if (!subscriptionUrl) {
        return {
            error: "Error generating checkout session.",
        };
    }
    revalidateTag("user");
    return redirect(subscriptionUrl);
}

export const updatePayment = async (
    customerId: string,
    subscriptionId: string
) => {
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
    const sessionUrl = await getStripeSessionUpdatePayment(
        customerId,
        subscriptionId,
        process.env.APP_DOMAIN!
    );
    if (!sessionUrl) {
        return {
            error: "Error generating checkout session.",
        };
    }
    return redirect(sessionUrl);
};
