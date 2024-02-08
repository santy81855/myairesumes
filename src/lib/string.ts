export const getSubstringEllipsis = (
    str: string,
    start: number,
    end: number
) => {
    if (str.length > end) {
        return str.substring(start, end) + "...";
    }
    return str;
};
