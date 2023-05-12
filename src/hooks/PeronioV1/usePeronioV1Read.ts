import { Address, useContractRead } from "wagmi";
import peronioV1Contract from "../../../abi/peronioV1.abi.json";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const usePeronioV1Read = (
  method: string,
  args: any[] = []
): any => {
  const contractConfig = {
    address: peronioV1Contract.address,
    abi: peronioV1Contract.abi
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

export default usePeronioV1Read;
