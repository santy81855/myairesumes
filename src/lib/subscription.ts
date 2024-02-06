export const getSubscription = async (userId: string) => {
    return await fetch(
        `${process.env.APP_DOMAIN}/api/subscription?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: ["subscription"] },
        }
    );
};
