import { useCallback, useEffect, useState } from "react";

import { Token, Pair, ChainId } from "@uniswap/sdk";
import { default as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { ethers, providers } from "ethers";

const usePairs = () => {
  const [usdcReserve, setUsdcReserve] = useState<number>(0);
  const [peReserve, setPeReserve] = useState<number>(0);

  const pairAddress = "0x93cBcAD1F9642A80e38D980fb872215237d91794";

  const getPairTokenData = useCallback(async () => {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

    const pair_contract = new ethers.Contract(
      pairAddress,
      IUniswapV2PairABI.abi,
      provider
    );

    /* const reserves = await pair_contract.functions.getReserves(''); */

   console.log(pair_contract)
  }, []);

  useEffect(() => {
    getPairTokenData();
  }, []);

  return [usdcReserve, peReserve];
};

export default usePairs;
