import { Address, usePrepareContractWrite, useContractWrite } from "wagmi";
import peronioV1Contract from "../../../abi/peronioV1.abi.json";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const usePeronioV1Write = (
  method: string,
  args: any[] = []
): any => {
    const contractConfig = {
        address: peronioV1Contract.address, //Spender, contract address
        abi: peronioV1Contract.abi
      };
    
      const { config } = usePrepareContractWrite({
        address: contractConfig.address as Address,
        abi: contractConfig.abi,
        functionName: method,
        args: args
      });
    
      return useContractWrite({
        ...config
      });
};

export default usePeronioV1Write;
