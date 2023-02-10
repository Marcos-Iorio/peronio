import peronioContract from "@peronio/core/deployments/matic/Peronio.json";
import { useContract } from "wagmi";

/**
 * Hook for Peronio contract instance
 */
export const usePeronio = () => {
  return useContract({
    address: peronioContract.address,
    abi: peronioContract.abi,
  });
};

export default usePeronio;
