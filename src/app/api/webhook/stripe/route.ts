import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import axios from "axios";

const relevantEvents = new Set([
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.payment_failed",
]);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
    try {
        if (!signature || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
        return new Response("webhook error", { status: 400 });
    }

    if (!relevantEvents.has(event.type))
        return new Response(null, { status: 200 });

    try {
        let subscription: Stripe.Subscription;
        let session: Stripe.Checkout.Session;
        let invoice: Stripe.Invoice;
        switch (event.type) {
            // optimistically create subscription as soon as checkout session is completed
            case "checkout.session.completed":
                session = event.data.object;
                subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );
                if (!subscription) throw new Error("Subscription not found...");
                const customerId = String(session.customer);
                const user = await prisma.user.findUnique({
                    where: {
                        stripeCustomerId: customerId,
                    },
                });

                if (!user) throw new Error("User not found...");
                // create a subscription in the database
                const newSubscription = await prisma.subscription.create({
                    data: {
                        stripeSubscriptionId: subscription.id,
                        userId: user.id,
                        currentPeriodStart: subscription.current_period_start,
                        currentPeriodEnd: subscription.current_period_end,
                        status: subscription.status,
                        planId: subscription.items.data[0].plan.id,
                        interval: String(
                            subscription.items.data[0].plan.interval
                        ),
                    },
                });
                if (!newSubscription)
                    throw new Error("Error creating subscription...");
                // Rather than waiting for the "customer.subscription.created" event, we can update the user's subscription status to "pro" here since we already checked that the subscription creation was successful.
                await prisma.user.update({
                    where: {
                        stripeCustomerId: customerId,
                    },
                    data: {
                        status: "pro",
                    },
                });
                break;
            case "customer.subscription.updated":
                subscription = event.data.object;
                // update the subscription in the database
                await prisma.subscription.update({
                    where: {
                        stripeSubscriptionId: subscription.id,
                    },
                    data: {
                        currentPeriodStart: subscription.current_period_start,
                        currentPeriodEnd: subscription.current_period_end,
                        status: subscription.status,
                        planId: subscription.items.data[0].plan.id,
                        interval: String(
                            subscription.items.data[0].plan.interval
                        ),
                    },
                });
                break;
            // The subscription was deleted from stripe
            case "customer.subscription.deleted":
                subscription = event.data.object;
                // remove the subscription from the database
                await prisma.subscription.delete({
                    where: {
                        stripeSubscriptionId: subscription.id,
                    },
                });
                // update the user's status to "free"
                await prisma.user.update({
                    where: {
                        stripeCustomerId: subscription.customer as string,
                    },
                    data: {
                        status: "free",
                    },
                });

                break;
            // The payment failed
            case "invoice.payment_failed":
                invoice = event.data.object;
                // get the user with prisma
                const failedPaymentUser = await prisma.user.findUnique({
                    where: {
                        stripeCustomerId: invoice.customer as string,
                    },
                });
                if (!failedPaymentUser) throw new Error("User not found...");
                // only give the user a 7 day grace period if they are currently a pro user
                // if they are not a pro user, there is nothing to do
                if (failedPaymentUser.status === "free") {
                    break;
                }
                await prisma.user.update({
                    where: {
                        stripeCustomerId: invoice.customer as string,
                    },
                    data: {
                        gracePeriodEnd: new Date(
                            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
                        ),
                    },
                });
                // delete the user's subscription
                await prisma.subscription.deleteMany({
                    where: {
                        userId: failedPaymentUser.id,
                    },
                });
                // send the user an email
                const { email, firstName, lastName } = failedPaymentUser;
                const response = await axios.post(
                    `${process.env.APP_DOMAIN}/api/send`,
                    {
                        email,
                        firstName,
                        lastName,
                        subject: "REQUIRES ACTION - Payment Problem",
                        type: "failed-payment",
                    }
                );
                if (!response) throw new Error("Error sending email...");
                break;
            default:
                return new Response(null, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new Response(
            "Webhook handler failed. View logs to see the error.",
            {
                status: 400,
            }
        );
    }
    return new Response(null, { status: 200 });
}
