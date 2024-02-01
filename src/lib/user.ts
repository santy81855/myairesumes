export const getUser = async (userId: string) => {
    return await fetch(`${process.env.APP_DOMAIN}/api/user?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { tags: ["currentUser"] },
    });
};
