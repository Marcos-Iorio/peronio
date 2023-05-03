import erc20ABI from "../../abi/IErc-20.abi.json";
import { tokens } from "../constants/addresses";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

const useErc20Write = (method: string, args: any[] = []): any => {
  const contractConfig = {
    address: tokens["USDC"].address, //Spender, contract address
    abi: erc20ABI
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

export default useErc20Write;
