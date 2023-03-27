/**
 * It takes a number of milliseconds and returns an actual date object.
 * @param {number} milliseconds - number - The number of milliseconds to subtract from the current
 * date.
 * @returns A date object.
 */
const formatDate = (milliseconds: number): string => {
    const date = new Date(Date.now() - milliseconds);

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}

export default formatDate