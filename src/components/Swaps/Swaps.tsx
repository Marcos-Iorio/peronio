import { motion } from "framer-motion";
import Image from "next/image";
import { TokenInfo } from "../../../types/address";
import { Address, useAccount, useBalance } from "wagmi";
import { ChangeEvent, useEffect, useState } from "react";

interface ISwaps {
  title: string;
  token0Info: TokenInfo;
  token1Info: TokenInfo;
  buttonText: string;
}

const Swaps = ({ title, token0Info, token1Info, buttonText }: ISwaps) => {
  const [token0Value, setToken0Value] = useState<string | undefined>("0.0");
  const [token0Formatted, setToken0Formatted] = useState<string>();

  const { address, isConnected } = useAccount();

  const token0Balance = useBalance({
    address: address,
    token: token0Info.address as Address
  });

  useEffect(() => {
    if (token0Balance?.data?.formatted) {
      const formattedNumber =
        Number(token0Balance.data.formatted) % 1 === 0
          ? Number(token0Balance.data.formatted).toFixed(0)
          : Number(token0Balance.data.formatted).toFixed(5);
      setToken0Formatted(formattedNumber);
    }
  }, [token0Balance?.data?.formatted]);

  const changeTokenValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setToken0Value(event.target.value);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-full w-full xl:basis-1/3 laptop:basis-1/2 border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm"
    >
      <div className="flex flex-col p-5 gap-10">
        <h2 className="font-Roboto text-xl mb-7">{title}</h2>
        <div className="flex flex-col">
          <div className="flex flex-row w-full gap-5 mb-3">
            <Image
              src={token0Info.image}
              width={25}
              height={25}
              alt={token0Info.name}
            />
            <div className="text-Roboto font-bold">{token0Info.name}</div>
            <div className="ml-auto text-Roboto text-sm">
              Saldo: {token0Formatted}
            </div>
          </div>
          <div className="relative w-full xl:h-24">
            <input
              type="text"
              inputMode="decimal"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              value={token0Value}
              className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-10"
              onChange={changeTokenValueHandler}
            />
            <button
              onClick={() => setToken0Value(token0Balance.data?.formatted)}
              className="absolute bottom-2 right-2 text-sm rounded-lg border-solid p-1 bg-[#0B4D76]/50"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row w-full gap-5 mb-3">
            <Image
              src={token1Info.image}
              width={25}
              height={25}
              alt={token1Info.name}
            />
            <div className="text-Roboto font-bold">{token1Info.name}</div>
            <div className="ml-auto text-Roboto text-sm">Saldo: 2</div>
          </div>
          <div className="relative w-full xl:h-24">
            <input
              type="text"
              inputMode="decimal"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-10"
            />
            <button className="absolute bottom-2 right-2 rounded-lg text-sm border-solid p-1 bg-[#0B4D76]/50">
              MAX
            </button>
          </div>
        </div>
        <button className="rounded-md border-solid border-2 border-[#00B7C2] py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30">
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default Swaps;
