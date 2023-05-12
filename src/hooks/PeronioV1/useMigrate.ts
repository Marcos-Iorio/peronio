import migratorAbi from "../../../abi/migrator.abi.json";
import { tokens } from "../../constants/addresses";
import { usePrepareContractWrite, useContractWrite, Address } from "wagmi";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const useMigrate = (
    method: string,
    args: any[] = []
  ): any => {
    const contractConfig = {
        address: tokens["migratorV1"].address, //Spender, contract address
        abi: migratorAbi
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
  
  export default useMigrate;