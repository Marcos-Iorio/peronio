import { Address, useContractRead } from "wagmi";
import usePeronio from "./usePeronio";
import peronioContract from "@peronio/core/deployments/matic/Peronio.json";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const usePeronioRead = (method: string, args: any[] = []): any => {
  const contractConfig = {
    address: peronioContract.address,
    abi: peronioContract.abi
  };
  /* const contract = usePeronio(); */

  return useContractRead({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: method,
    args: args
  });
};

export default usePeronioRead;
