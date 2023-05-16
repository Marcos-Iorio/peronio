import migratorAbi from "../../../abi/migrator.abi.json";
import { tokens } from "../../constants/addresses";
import { Address, useContractRead } from "wagmi";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const useMigrateRead = (method: string, args: any[] = []): any => {
  const contractConfig = {
    address: tokens["migratorV1"].address as Address,
    abi: migratorAbi
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

export default useMigrateRead;
