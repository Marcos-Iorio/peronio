const getPePrice = (reserve0: number, reserve1: number): number => {
  return reserve0 / reserve1;
};

export default getPePrice;
