import { useContractRead } from "wagmi";
import usePeronio from "./usePeronio";

/**
 * Hook for reading from Peronio contract
 * @param method
 * @param args
 * @example https://wagmi.sh/react/hooks/useContractRead
 */
export const usePeronioRead = (method: string, args = []) => {
  const contract = usePeronio();

  return useContractRead(contract, method, { args });
};

export default usePeronioRead;
