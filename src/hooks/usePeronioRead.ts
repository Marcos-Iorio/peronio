import { useContractRead } from "wagmi";
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
    address: "0x78a486306D15E7111cca541F2f1307a1cFCaF5C4",
    abi: peronioContract.abi,
    functionName: "buyingPrice",
  });
};

export default usePeronioRead;
