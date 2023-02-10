import peronioContract from "@peronio/core/deployments/matic/Peronio.json";
import { useContract } from "wagmi";

/**
 * Hook for Peronio contract instance
 */
export const usePeronio = () => {
  return useContract({
    addressOrName: peronioContract.address,
    contractInterface: peronioContract.abi,
  });
};

export default usePeronio;
