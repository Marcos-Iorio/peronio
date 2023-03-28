import { fromUnixTime } from "date-fns";

/**
 * It takes a number of milliseconds and returns an actual date object.
 * @param {number} milliseconds - number - The number of milliseconds to subtract from the current
 * date.
 * @returns A date object.
 */
const formatDate = (milliseconds: number) => {
    const date = new Date(fromUnixTime(milliseconds));

    return date;
}

export default formatDate