import BigNumber from "bignumber.js";

const FMT = {
  prefix: "",
  decimalSeparator: ",",
  groupSeparator: ".",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: ""
};

export const formatBalance = (
  amount: number | BigNumber,
  decimals = 18,
  decimalsToCut = -4
): string => {
  BigNumber.config({ FORMAT: FMT });

  const balanceBN = new BigNumber(amount);
  const decimalsBN = new BigNumber(decimals);
  const divisor = new BigNumber(10).pow(decimalsBN);

  const beforeDecimal = balanceBN.div(divisor);

  return beforeDecimal.toFormat(undefined).slice(0, decimalsToCut);
};
