// get the date in the format of Month Day, Year
export const formatDateMonthDayYear = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatDateMonthYear = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
};

export const formatDateYear = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
    });
};

export const formatDateMMDDYYYY = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};
