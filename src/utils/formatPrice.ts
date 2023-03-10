import { formatUnits } from "ethers/lib/utils";
import { ethers } from "ethers";

export const formatBalance = (amount: number) => {
  const bigNumber = ethers.BigNumber.from(amount);
  const fixedNumber = (amount / 10 ** 18).toFixed(2).toLocaleString('es-AR');

  return fixedNumber;
}
