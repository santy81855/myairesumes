import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
});

export const getCustomerSubscription = async (customerId: string) => {
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
    });
    if (!subscriptions?.data) return null;
    // only return the first subscription in the array if there are at least 1 subscription
    if (subscriptions.data.length === 0) return null;
    return subscriptions.data[0] as Stripe.Subscription;
};

export const getStripeCustomer = async (customerId: string) => {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
};

export const getAllCustomerSessions = async (customerId: string) => {
    const sessions = await stripe.checkout.sessions.list({
        limit: 3,
    });
    return sessions.data;
};

export const getStripeCustomerInvoices = async (customerId: string) => {
    const invoices = await stripe.invoices.list({
        customer: customerId,
        limit: 100,
    });
    return invoices.data;
};

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
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        payment_method_types: ["card", "cashapp"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${domainUrl}/dashboard?menu=account`,
        cancel_url: `${domainUrl}/dashboard?menu=account`,
    });
    return session.url;
};

export const getStripeSessionUpdatePayment = async (
    customerId: string,
    subscriptionId: string,
    domainUrl: string
) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "setup",
        billing_address_collection: "auto",
        payment_method_types: ["card", "cashapp"],
        setup_intent_data: {
            metadata: {
                customer_id: customerId,
                subscription_id: subscriptionId,
                type: "update_payment",
            },
        },
        success_url: `${domainUrl}/dashboard?menu=account`,
        cancel_url: `${domainUrl}/dashboard?menu=account`,
    });
    if (!session) throw new Error("Error creating checkout session.");
    return session.url;
};

export const getStripePaymentDetails = async (paymentMethodId: string) => {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (!paymentMethod) throw new Error("Error getting payment method.");
    return paymentMethod;
};
