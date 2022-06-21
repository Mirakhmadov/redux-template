export const makeUpperCase = (string) => {
    if (string !== null)
        return string.toUpperCase()
}

export const makeLowerCase = (string) => {
    if (string !== null)
        return string.toLowerCase()
}

export const makeFirstCapital = (str = "") => {
    if (!str) {
        return;
    }
    return str[0].toUpperCase() + str.slice(1);
};
