const getPePrice = (reserve0: number | string, reserve1: number): number => {
  return Number(reserve0) / reserve1;
};

export default getPePrice;
