import { useCallback, useEffect, useState } from "react";

import { Token, Pair, ChainId } from "@uniswap/sdk";
import { default as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { ethers, providers } from "ethers";

const usePairs = () => {
  const [usdcReserve, setUsdcReserve] = useState<number>(0);
  const [peReserve, setPeReserve] = useState<number>(0);

  /* const pairAddress = "0x93cBcAD1F9642A80e38D980fb872215237d91794"; */

  const getPairTokenData = useCallback(async () => {
    const provider = ethers.providers.getDefaultProvider("mainnet");

    const pe = new Token(
      ChainId.MAINNET,
      "0x78a486306D15E7111cca541F2f1307a1cFCaF5C4",
      18
    );
    const usdc = new Token(
      ChainId.MAINNET,
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      6
    );

    const pairAddress = Pair.getAddress(pe, usdc);

    const pair_contract = new ethers.Contract(
      pairAddress,
      IUniswapV2PairABI.abi,
      provider
    );

    const reserves = await pair_contract.functions.getReserves();

    console.log(reserves);
  }, []);

  useEffect(() => {
    getPairTokenData();
  }, []);

  return [usdcReserve, peReserve];
};

export default usePairs;
