import peronioContract from "@peronio/core/deployments/matic/Peronio.json";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

const usePeronioWrite = (method: string, args: any[] = []): any => {
  const contractConfig = {
    address: peronioContract.address, //Spender, contract address
    abi: peronioContract.abi
  };

  const { config } = usePrepareContractWrite({
    address: peronioContract.address as Address,
    abi: contractConfig.abi,
    functionName: method,
    args: args
  });

  return useContractWrite({
    ...config
  });
};

export default usePeronioWrite;
