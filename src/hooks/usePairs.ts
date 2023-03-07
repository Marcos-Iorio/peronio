import uniswapAbi from "../../abi/IUniswapV2Pair.json";
import { useContractRead } from "wagmi";
import { IData } from "../../types/contractRead";

const usePairs = () => {
  const { data }: { data: IData | undefined } = useContractRead({
    address: "0x93cBcAD1F9642A80e38D980fb872215237d91794",
    abi: uniswapAbi,
    functionName: "getReserves"
  });

  const usdcReserve = Number(data?.reserve0._hex);
  const peReserve = Number(data?.reserve1._hex);
  const pePrice = usdcReserve / peReserve;

  return [usdcReserve, peReserve, pePrice];
};

export default usePairs;
