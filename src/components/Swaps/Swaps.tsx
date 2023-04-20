import { motion } from "framer-motion";
import Image from "next/image";
import { TokenInfo } from "../../../types/address";
import { Address, useAccount, useBalance } from "wagmi";
import { ChangeEvent, useEffect, useState } from "react";
import MaxButton from "./MaxButton";
import { formatDecimals } from "../../utils/formatDecimals";
import usePairs from "../../hooks/usePairs";
import * as Icon from "react-icons/tb";
import { useModal } from "connectkit";
import Button from "../Button/Button";
import InfoPopover from "../InfoPopover/InfoPopover";
import usePeronioRead from "../../hooks/usePeronioRead";

interface ISwaps {
  title: string;
  token0Info: TokenInfo;
  token1Info: TokenInfo;
  buttonText: string;
}

const Swaps = ({ title, token0Info, token1Info, buttonText }: ISwaps) => {
  const [token0Value, setToken0Value] = useState<string | undefined>("");
  const [token0Formatted, setToken0Formatted] = useState<string>();
  const [token1Formatted, setToken1Formatted] = useState<string>();
  const [toggleCurrencyText, setToggleCurrencyText] = useState<boolean>(true);
  const [amountOfPe, setAmountOfPe] = useState<number>(0);
  const [isWindowReady, setIsWindowReady] = useState<boolean>(false);
  const [connected, setConnected] = useState(false);

  const { address, isConnected } = useAccount();
  const [, , pePrice] = usePairs();

  const { open, setOpen } = useModal();

  const data = usePeronioRead("allowance", [
    "0x4BADCf0DCeaAD060f86D9b34c9E118c8319945AE" as Address,
    address as Address
  ]);

  const connectWalletHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowReady(true);
    }
  }, []);

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
    const newValue = event.target.value;
    const reg = /^-?\d*\.?\d*$/;
    if (reg.test(newValue) || newValue === "") {
      setToken0Value(newValue);
      setAmountOfPe(Number(newValue) / pePrice);
    }
  };

  const toggleCurrencyTextHandler = () => {
    setToggleCurrencyText(() => !toggleCurrencyText);
  };

  useEffect(() => {
    const token0Formatted = formatDecimals(token0Balance.data?.formatted);
    setToken0Formatted(token0Formatted);
    const token1Formatted = formatDecimals(token1Balance.data?.formatted);
    setToken1Formatted(token1Formatted);
  }, [token0Balance.data?.formatted, token1Balance.data?.formatted]);

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <section className="flex flex-col gap-3 h-[30rem] w-full xl:basis-1/3 2xl:basis-1/5 laptop:basis-1/2">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm"
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
                value={formatDecimals(amountOfPe.toString())}
                className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-5"
                readOnly={true}
              />
            </div>
          </div>

          <div
            style={{ visibility: token0Value !== "" ? "visible" : "hidden" }}
            className="flex flex-row w-full gap-3"
          >
            <h4 className="font-bold font-Roboto text-[#00B7C2]">Precio</h4>
            {toggleCurrencyText ? (
              <div className="ml-auto font-Roboto">{changeCurrency.usdc}</div>
            ) : (
              <div className="ml-auto font-Roboto">{changeCurrency.p}</div>
            )}
            <button
              className="bg-[#00B7C2]/20 rounded-full p-1"
              onClick={toggleCurrencyTextHandler}
            >
              <Icon.TbExchange />
            </button>
          </div>
          {!connected ? (
            <Button
              key="connect-wallet"
              text="Conectar monedero"
              onClick={connectWalletHandler}
            />
          ) : token0Value === undefined || token0Value === "" ? (
            <Button
              key="enter-amount"
              isDisabled={isWindowReady}
              text="Ingrese una cantidad"
            />
          ) : token0Value > (token0Balance?.data?.formatted ?? 0) ? (
            <Button
              key="insufficient-balance"
              isDisabled={isWindowReady}
              text="Saldo insuficiente"
            />
          ) : (
            <Button key="emit-p" text="Emitir P" />
          )}
        </div>
      </motion.div>
      <div
        style={{
          visibility: token0Value !== "" ? "visible" : "hidden"
        }}
        className="flex flex-col border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm p-5"
      >
        <div className="flex flex-row w-full">
          <h5 className="font-bold font-Roboto text-[#00B7C2]">
            Minimo recibido
          </h5>
          <span className="ml-auto font-Roboto">{amountOfPe.toFixed(2)} P</span>
        </div>
        <div className="flex flex-row w-full gap-2">
          <h5 className="font-bold font-Roboto text-[#00B7C2]">
            Markup (5.00%)
          </h5>
          <InfoPopover
            sm={true}
            ydirection={"TOP"}
            title={"Markup"}
            text="La bóveda cobra un markup del 5% que queda adentro del contrato, beneficiando a todos los tenedores de PE."
          />
          <span className="ml-auto font-Roboto">
            USDC {(Number(token0Value) * 5) / 100}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Swaps;
