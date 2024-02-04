export const sortObjectArrayByDateEnd = (arr: any[], sort: number) => {
    console.log(arr);
    const newArr = [...arr];
    console.log(newArr);
    newArr.sort((a, b) => {
        const dateA = getDateValue(a.endDate) as any;
        const dateB = getDateValue(b.endDate) as any;

        if (sort === -1) {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });
    console.log(newArr);
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
