// function to take in keylist as well as a list of values to change and return a new url
export const UpdateUrl = (
    keyList: { [key: string]: string | string[] | undefined },
    keyValues: { key: string; value: string }[],
    baseUrl: string
): string => {
    let updatedUrl = `${baseUrl}?`;
    let usedKeys = [] as string[];
    Object.keys(keyList).forEach((key) => {
        // Find the corresponding value in keyValues
        const matchingKeyValue = keyValues.find((kv) => kv.key === key);

        // Use the value from keyValues if it exists, otherwise use the value from keyList
        const value = matchingKeyValue ? matchingKeyValue.value : keyList[key];

        // Add key-value pair to the updated URL
        if (value !== undefined) {
            updatedUrl += `${key}=${value}&`;
            usedKeys.push(key);
        }
    });
    // now add any keys from the keyValues that were not in the keyList
    keyValues.forEach((kv) => {
        if (!usedKeys.includes(kv.key)) {
            updatedUrl += `${kv.key}=${kv.value}&`;
        }
    });

    // Remove the trailing "&" if it exists
    if (updatedUrl.endsWith("&")) {
        updatedUrl = updatedUrl.slice(0, -1);
    }

    return updatedUrl;
};
