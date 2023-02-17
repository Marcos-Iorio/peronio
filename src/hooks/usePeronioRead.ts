import { Address, useContractRead } from "wagmi";
import usePeronio from "./usePeronio";

import peronioContract from "@peronio/core/deployments/matic/Peronio.json";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const usePeronioRead = (method: string, args = []) => {
  const contract = usePeronio();

  const contractInfo = {
    addressOrName: contract?.address,
    contractInterface: contract?.abi,
    functionName: method,
    args: args,
  };

  /*  console.log(contractInfo); */

  return useContractRead({
    address: peronioContract.address as Address,
    abi: peronioContract.abi,
    functionName: "buyingPrice",
  });
};

export default usePeronioRead;
