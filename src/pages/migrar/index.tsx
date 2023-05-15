import type { NextPage } from "next";
import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Head from "next/head";

import WizardModal from "../../components/WizardModal/WizardModal";
import { WizardContext } from "../../contexts/WizardContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  Address,
  useContractWrite,
  useAccount,
  useBalance,
  useContractRead,
  useWaitForTransaction
} from "wagmi";
import { tokens } from "../../constants/addresses";
import usePairs from "../../hooks/usePairs";
import BigNumber from "bignumber.js";
import { IDataAttributes } from "../../../types/contractRead";
import MaxButton from "../../components/Swaps/MaxButton";
import { formatDecimals } from "../../utils/formatDecimals";
import Button from "../../components/Button/Button";
import { useModal } from "connectkit";
import { ToastContainer, toast } from "react-toastify";
import { formatBalance } from "../../utils/formatPrice";
import usePeronioV1Read from "../../hooks/PeronioV1/usePeronioV1Read";
import usePeronioV1Write from "../../hooks/PeronioV1/usePeronioV1Write";
import useMigrate from "../../hooks/PeronioV1/useMigrate";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url("/isologo 1.svg");
  background-size: contain !important;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100px;
  @media (min-width: 1280px) {
    padding: 5rem;
    height: 100%;
    overflow-y: hidden;
  }
  @media (min-width: 320px) {
    background-size: cover;
    overflow-y: auto;
    padding: 0.5rem;
  }
`;

const ButtonStyles = {
  enabled:
    "rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30 mx-auto w-full",
  disabled:
    "rounded-md py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-gray-400/20 text-gray-500 mx-auto w-full"
};

const Migrar: NextPage = () => {
  const [peValue, setPeValue] = useState<string>("0.0");
  const [connected, setConnected] = useState<boolean>(false);
  const [isWindowReady, setIsWindowReady] = useState<boolean>(false);
  const [usdcPerPe, setUsdcPerPe] = useState<string>("0.0");
  const [buttonText, setButtonText] = useState<string>("Migrar");
  const [hasApprove, setHasApprove] = useState<boolean>(false);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  const [isMigrated, setIsMigrated] = useState<boolean>(false);
  const [allowanceLeft, setAllowanceLeft] = useState<string>("0");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [tokensBalanceFormatted, setTokensBalanceFormatted] = useState({
    pe: "0",
    usdc: "0",
    p: "0"
  });

  const { address, isConnected } = useAccount();
  const [, , pePrice] = usePairs();
  const { isOpen } = useContext(WizardContext);
  const { open, setOpen } = useModal();

  const connectWalletHandler = () => {
    setOpen(true);
  };

  const peBalance = useBalance({
    address: address as Address,
    token: tokens["PE"].address as Address
  });

  const usdcBalance = useBalance({
    address: address as Address,
    token: tokens["USDC"].address as Address
  });

  const pBalance = useBalance({
    address: address as Address,
    token: tokens["P"].address as Address
  });

  const slippage = (Number(peValue) * 5) / 100;
  const bnValue = new BigNumber((Number(peValue) - slippage).toFixed(3));
  const amountIn = bnValue.times(new BigNumber("10").pow(6));

  //read collateralRatio of V1
  const { data: PeData }: { data: IDataAttributes | undefined } =
    usePeronioV1Read("collateralRatio");

  //allowance and approve
  const { data: allowanceData } = usePeronioV1Read("allowance", [
    address as Address,
    tokens["PE"].address as Address
  ]);

  const { data: approveData, writeAsync: approve } = usePeronioV1Write(
    "approve",
    [tokens["PE"].address as Address, amountIn.toString()]
  );
  //write into migrator to migrate pe into p
  const { data: migrationData, writeAsync: migrate } = useMigrate("migrate", [
    amountIn.toString()
  ]);

  const { data: tnxData, error } = useWaitForTransaction({
    hash: migrationData?.hash
  });

  const runApprove = async () => {
    try {
      await approve();
      setHasApprove(true);
      setIsMigrated(true);
    } catch (e: any) {
      setErrorMessage(e.message);
      setHasApprove(false);
    }
  };

  const runMigrate = async () => {
    try {
      setButtonText("Migrando...");
      const response = await migrate();
      if (error) {
        throw new Error(error?.message);
      } else {
        notifySuccess();
      }
      setIsMigrated(false);
      setTimeout(() => {
        setIsMigrated(true);
        setPeValue("");
        setButtonText("Migrar");
      }, 500);
    } catch (e: any) {
      setErrorMessage(e.message);
      setButtonText("Migrar");
      setIsMigrated(true);
    }
  };

  const notifySuccess = () => {
    toast.success(
      `Migraste ${Number(peValue).toFixed(3)} PE por ${
        Number(usdcPerPe) / pePrice
      } P.`,
      {
        position: toast.POSITION.TOP_RIGHT
      }
    );
  };

  const changePeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const reg = /^-?\d*\.?\d*$/;
    if (reg.test(newValue) || newValue === "") {
      setPeValue(newValue);
    }
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowReady(true);
    }
  }, []);

  useEffect(() => {
    setUsdcPerPe(String(Number(peValue) * (Number(PeData?._hex) / 1000000)));
  }, [PeData?._hex, peValue]);

  useEffect(() => {
    if (Number(allowanceData?._hex) > 0) {
      setAllowanceLeft(formatBalance(Number(allowanceData._hex), 0, 3));
      setIsMigrated(true);
      setHasAllowance(true);
    }
  }, [allowanceData?._hex]);

  useEffect(() => {
    if (allowanceLeft === "0") {
      setHasAllowance(false);
      setHasApprove(false);
    }
  }, [allowanceLeft]);

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }

  useEffect(() => {
    setTokensBalanceFormatted((tokensBalanceFormatted) => ({
      pe: formatDecimals(peBalance.data?.formatted),
      usdc: formatDecimals(usdcBalance.data?.formatted),
      p: formatDecimals(pBalance.data?.formatted)
    }));
  }, [
    peBalance.data?.formatted,
    usdcBalance.data?.formatted,
    pBalance.data?.formatted
  ]);

  return (
    <>
      <Head>
        <title>Migrar - Peronio</title>
        <meta property="og:title" content="Migrar - Peronio" key="title" />
      </Head>
      <StyledMain>
        <div className=" flex laptop:flex-row 2xl:flex-row md:flex-col-reverse gap-10 md:px-10 md:py-16 mobile:px-5 mobile:py-2 mobile:flex-col-reverse 2xl:h-full laptop:h-full xl:h-full w-full justify-evenly items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="xl:flex xl:flex-col h-full xl:basis-1/2 laptop:basis-1/3"
          >
            <h1 className="xl:text-2xl mobile:text-2xl font-Abril mb-7">
              ¿Qué es la migración a la versión 2?
            </h1>
            <p className="xl:text-lg mobile:text-xl font-Roboto xl:w-3/4">
              Migramos de PE(V1) a P la nueva versión del Peronio.
            </p>
            <div
              style={{ visibility: errorMessage ? "visible" : "hidden" }}
              className="rounded-md border-2 border-red-600 p-2 bg-[#363636]/50 backdrop-blur-sm text-red-300"
            >
              {errorMessage}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full w-full xl:basis-1/4 laptop:basis-1/2 border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm"
          >
            <div className="flex flex-col p-5 gap-10">
              <h2 className="font-Roboto text-xl mb-1">
                Depositá PE(V1) y recibí P.
              </h2>
              <p className="mb-auto h-full font-Roboto">
                Tenés disponible para gastar: {formatDecimals(allowanceLeft)}
              </p>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image
                    src={tokens["PE"].image}
                    width={25}
                    height={25}
                    className={
                      isWindowReady && peBalance.data?.formatted === "0.0"
                        ? "grayscale"
                        : "grayscale-0"
                    }
                    alt="Peronio v2 Logo"
                  />
                  <div className="text-Roboto font-bold">PE(V1)</div>
                  <div className="ml-auto text-Roboto text-sm">
                    Saldo: {tokensBalanceFormatted.pe}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    placeholder="0.0"
                    onChange={changePeValueHandler}
                    value={peValue}
                    className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-10"
                  />
                  <MaxButton
                    setInputValue={setPeValue}
                    maxValue={peBalance.data?.formatted ?? "0"}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image
                    src={tokens["USDC"].image}
                    width={25}
                    height={25}
                    alt="USDC Logo"
                  />
                  <div className="text-Roboto font-bold">USDC</div>
                  <div className="ml-auto text-Roboto text-sm">
                    Saldo: {tokensBalanceFormatted.usdc}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    value={usdcPerPe}
                    className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-5"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image
                    src={tokens["P"].image}
                    width={25}
                    height={25}
                    alt="P Logo"
                  />
                  <div className="text-Roboto font-bold">P</div>
                  <div className="ml-auto text-Roboto text-sm">
                    Saldo: {tokensBalanceFormatted.p}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    value={formatDecimals(String(Number(usdcPerPe) / pePrice))}
                    className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-5"
                    readOnly={true}
                  />
                </div>
              </div>
              {!connected ? (
                <Button
                  text="Conectar monedero"
                  onClick={connectWalletHandler}
                />
              ) : peValue === undefined || peValue === "" ? (
                <Button
                  isDisabled={isWindowReady}
                  text="Ingrese una cantidad"
                />
              ) : peValue > (peBalance?.data?.formatted ?? 0) ? (
                <Button isDisabled={isWindowReady} text="Saldo insuficiente" />
              ) : (
                <div className="flex flex-row gap-4">
                  {allowanceLeft !== undefined ? (
                    !hasApprove && allowanceLeft < peValue ? (
                      <button
                        className={`${
                          !hasApprove
                            ? ButtonStyles.disabled
                            : ButtonStyles.enabled
                        }`}
                        onClick={runApprove}
                      >
                        Aprobar
                      </button>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <Button
                    isDisabled={!isMigrated}
                    onClick={runMigrate}
                    text={buttonText}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <h3 className="mobile:mt-16 text-4xl mobile:2xl font-Abril text-center">
          Chequeá nuestro exchange{" "}
          <span className="text-yellow-400">BLOCKS</span>
        </h3>
        <ToastContainer
          autoClose={5000}
          bodyClassName={() => "text-md font-white font-Roboto block p-3"}
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-black/70 backdrop-blur-md"
          }
        />
      </StyledMain>
      {isOpen && <WizardModal />}
    </>
  );
};

export default Migrar;
