import { useState, useEffect } from "react";
import { PairDataTimeWindowEnum } from "../../types/utils";

type useFetchPairPricesParams = {
  token0Address: string;
  token1Address: string;
  timeWindow: PairDataTimeWindowEnum;
  currentSwapPrice: {
    [key: string]: number;
  };
};

const URL = "https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2";

const useFetchedPairAddress = ({
  token0Address,
  token1Address,
  timeWindow,
  currentSwapPrice
}: useFetchPairPricesParams) => {};

export default useFetchedPairAddress;
