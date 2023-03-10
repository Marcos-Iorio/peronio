import { formatUnits } from "ethers/lib/utils";
import { ethers } from "ethers";

export const formatFixedNumber = (
  number: ethers.FixedNumber,
  displayDecimals = 18,
  decimals = 18
) => {
  // Remove decimal
  const [leftSide] = number.toString().split(".");
  return formatBigNumber(
    ethers.BigNumber.from(leftSide),
    displayDecimals,
    decimals
  );
};

export const formatBigNumber = (
  number: ethers.BigNumber,
  displayDecimals = 18,
  decimals = 18
) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  );
  return formatUnits(number.sub(remainder), decimals);
};
