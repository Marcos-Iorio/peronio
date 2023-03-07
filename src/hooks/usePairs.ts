import { useEffect, useState } from "react";
import uniswapAbi from "../../abi/IUniswapV2Pair.json";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { IData } from "../../types/contractRead";

const usePairs = () => {
  const [usdcReserve, setUsdcReserve] = useState<number>(0);
  const [peReserve, setPeReserve] = useState<number>(0);

  const { data }: { data: IData } = useContractRead({
    address: "0x93cBcAD1F9642A80e38D980fb872215237d91794",
    abi: uniswapAbi,
    functionName: "getReserves"
  });

  console.log(data.reserve0);

  const { reserve0, reserve1 } = data;

  /* const token0 = reserve0["_hex"];
  const token1 = reserve1._hex;

  const pePrice = BigInt(token0) / BigInt(token1);

  console.log(pePrice); */

  /* const pairAddress = "0x93cBcAD1F9642A80e38D980fb872215237d91794"; */

  const getPairTokenData = async () => {};

  useEffect(() => {
    getPairTokenData();
  }, []);

  return [usdcReserve, peReserve];
};

export default usePairs;
