import { motion } from "framer-motion";
import Image from "next/image";
import { TokenInfo } from "../../../types/address";
import { Address, useAccount, useBalance } from "wagmi";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import MaxButton from "./MaxButton";
import { formatDecimals } from "../../utils/formatDecimals";
import usePairs from "../../hooks/usePairs";
import * as Icon from "react-icons/tb";
import WizardContext from "../../contexts/WizardContext";
import { useModal } from "connectkit";

interface ISwaps {
  title: string;
  token0Info: TokenInfo;
  token1Info: TokenInfo;
  buttonText: string;
}

const Swaps = ({ title, token0Info, token1Info, buttonText }: ISwaps) => {
  const [token0Value, setToken0Value] = useState<number>(0.0);
  const [token0Formatted, setToken0Formatted] = useState<string>();
  const [token1Formatted, setToken1Formatted] = useState<string>();
  const [toggleCurrencyText, setToggleCurrencyText] = useState<boolean>(true);
  const [amountOfPe, setAmountOfPe] = useState<number>();

  const { address, isConnected } = useAccount();
  const [, , pePrice] = usePairs();

  const { open, setOpen } = useModal();

  const connectWalletHandler = () => {
    setOpen(true);
  };

  const changeCurrency = {
    usdc: `${pePrice.toFixed(4)} USDC por P`,
    p: `${Number(1 / pePrice).toFixed(3)} P por USDC`
  };

  const token0Balance = useBalance({
    address: address,
    token: token0Info.address as Address
  });

  const token1Balance = useBalance({
    address: address,
    token: token1Info.address as Address
  });

  const changeToken0ValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setToken0Value(Number(event.target.value));
  };

  const toggleCurrencyTextHandler = () => {
    setToggleCurrencyText(() => !toggleCurrencyText);
  };

  useEffect(() => {
    setAmountOfPe(Number(token0Value) / pePrice);
  }, [token0Value, pePrice]);

  useEffect(() => {
    const token0Formatted = formatDecimals(token0Balance.data?.formatted);
    setToken0Formatted(token0Formatted);
    const token1Formatted = formatDecimals(token1Balance.data?.formatted);
    setToken1Formatted(token1Formatted);
  }, [token0Balance.data?.formatted, token1Balance.data?.formatted]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="h-[30rem] w-full xl:basis-1/5 laptop:basis-1/2 border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm"
    >
      <div className="flex flex-col p-5 gap-5 h-full">
        <h2 className="font-Roboto text-xl mb-1">{title}</h2>
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
              onChange={changeToken0ValueHandler}
            />
            <MaxButton
              setInputValue={setToken0Value}
              maxValue={token0Balance.data?.formatted}
            />
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
            <div className="ml-auto text-Roboto text-sm">
              Saldo: {token1Formatted}
            </div>
          </div>
          <div className="relative w-full xl:h-16">
            <input
              type="text"
              inputMode="decimal"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0.0"
              value={amountOfPe?.toFixed(3)}
              className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-5"
              readOnly
            />
          </div>
        </div>

        <div
          style={{ visibility: token0Value !== 0 ? "visible" : "hidden" }}
          className="flex flex-row w-full gap-3"
        >
          <h4 className="font-bold font-Roboto text-[#00B7C2]">Precio</h4>
          {toggleCurrencyText ? (
            <div className="ml-auto font-Roboto">{changeCurrency.usdc}</div>
          ) : (
            <div className="ml-auto font-Roboto">{changeCurrency.p}</div>
          )}
          <button onClick={toggleCurrencyTextHandler}>
            <Icon.TbExchange />
          </button>
        </div>
        {!isConnected ? (
          <button
            onClick={connectWalletHandler}
            className="rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30 mx-auto w-full"
          >
            Conectar monedero
          </button>
        ) : token0Value !== 0 ? (
          token0Value > Number(token0Balance.data?.formatted) ? (
            <button
              disabled
              className="rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-gray-400/20 text-gray-500 mx-auto w-full"
            >
              El saldo es insuficiente
            </button>
          ) : !isConnected ? (
            <button className="rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30 mx-auto w-full">
              {buttonText}
            </button>
          ) : (
            <button className="rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30 mx-auto w-full">
              {buttonText}
            </button>
          )
        ) : (
          <button
            disabled
            className="rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-gray-400/20 text-gray-500 mx-auto w-full"
          >
            Ingresa una cantidad
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Swaps;
