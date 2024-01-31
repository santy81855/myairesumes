import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
});

export const getStripeSession = async ({
    priceId,
    domainUrl,
    customerId,
}: {
    priceId: string;
    domainUrl: string;
    customerId: string;
}) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        billing_address_collection: "auto",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${domainUrl}/payment`,
        cancel_url: `${domainUrl}/payment`,
    });
    return session.url;
};
