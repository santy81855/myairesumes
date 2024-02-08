export const getSubstringEllipsis = (
    str: string,
    start: number,
    end: number
) => {
    const len = str.length;
    if (len < end || len < start || start < 0 || end < 0 || start > end) {
        return str;
    }
    return str.substring(start, end) + "...";
};
