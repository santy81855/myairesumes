export const getUser = async (userId: string) => {
    const response = await fetch(
        `${process.env.APP_DOMAIN}/api/user?userId=${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { tags: ["currentUser"] },
        }
    );
    if (!response.ok) {
        return null;
    }
    return await response.json();
};
