import peronioContract from "@peronio/core/deployments/matic/Peronio.json";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

const usePeronioWrite = (
  tokenAddress: string,
  method: string,
  args: any[] = []
): any => {
  const contractConfig = {
    address: peronioContract.address, //Spender, contract address
    abi: peronioContract.abi
  };

  const { config } = usePrepareContractWrite({
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    abi: contractConfig.abi,
    functionName: method,
    args: args
  });

  return useContractWrite({
    ...config
  });
};

export default usePeronioWrite;
