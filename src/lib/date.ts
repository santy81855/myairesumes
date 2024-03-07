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
    if (date === "Present") {
        return date;
    }
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

export const formatDateMonYear = (date: string) => {
    if (date === "Present") {
        return date;
    }
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
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

export const sortObjectArrayByDateEnd = (arr: any[], sort: number) => {
    const newArr = [...arr];
    newArr.sort((a, b) => {
        const dateA = getDateValue(a.endDate) as any;
        const dateB = getDateValue(b.endDate) as any;

        if (sort === -1) {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
    return newArr;
};

function getDateValue(dateString: string) {
    if (dateString.toLowerCase() === "present") {
        // A date indicating "present" is considered the latest
        return new Date("9999-12-31");
    } else {
        return new Date(dateString);
    }
}
