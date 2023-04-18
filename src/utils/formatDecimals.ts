export const formatDecimals = (value: string | undefined): string => {
    if (value) {
        const formattedNumber =
          Number(value) % 1 === 0
            ? Number(value).toFixed(0)
            : Number(value).toFixed(5);
        return formattedNumber;
      }
      return ""
}