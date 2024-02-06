export type AuthEmailData = {
    email: string;
    firstName: string;
    lastName: string;
    subject: string;
    url: string;
    type: string;
};

export type FailedPaymentEmailData = {
    email: string;
    firstName: string;
    lastName: string;
    subject: string;
    type: string;
};

export type ActionResult = {
    error: string | null;
};

export type paymentIntent = {
    id: string;
    amonut: number;
    createdAt: string | number;
    currency: string;
    status: string;
};
