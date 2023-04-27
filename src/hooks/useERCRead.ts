import { Address, useContractRead } from "wagmi";
import erc20ABI from "../../abi/IErc-20.json";
import { tokens } from "../constants/addresses";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const useErc20Read = (method: string, args: any[] = []): any => {
  const contractConfig = {
    address: tokens["USDC"].address,
    abi: erc20ABI
  };
  /* const contract = usePeronio(); */

  return useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: method,
    args: args,
    watch: true
  });
};

export default useErc20Read;
