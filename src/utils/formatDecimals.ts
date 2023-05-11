import { BigNumber } from "ethers";

export const formatDecimals = (
  value: string | undefined | BigNumber
): string => {
  if (value) {
    const formattedNumber =
      Number(value) % 1 === 0
        ? Number(value).toFixed(0)
        : Number(value).toFixed(3);
    return formattedNumber;
  }
  return "";
};
