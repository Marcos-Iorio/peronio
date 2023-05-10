import type { NextPage } from "next";
import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import pLogo from "/public/logoP.svg";
import peLogo from "/public/logoPE.svg";
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
  useContractRead
} from "wagmi";
import { tokens } from "../../constants/addresses";
import migratorAbi from "../../../abi/migrator.abi.json";
import peronioV1Contract from "../../../abi/peronioV1.abi.json";
import usePairs from "../../hooks/usePairs";
import BigNumber from "bignumber.js";
import { IDataAttributes } from "../../../types/contractRead";
import MaxButton from "../../components/Swaps/MaxButton";
import { formatDecimals } from "../../utils/formatDecimals";

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

const Migrar: NextPage = () => {
  const [peValue, setPeValue] = useState<string>("0.0");

  const { address, isConnected } = useAccount();
  const [, , pePrice] = usePairs();
  const { isOpen } = useContext(WizardContext);

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

  const bnValue = new BigNumber(peValue.toString());
  const amountIn = bnValue.times(new BigNumber("10").pow(6));

  //read collateralRatio of V1
  const { data: PeData }: { data: IDataAttributes | undefined } =
    useContractRead({
      address: peronioV1Contract.address as Address,
      abi: peronioV1Contract.abi,
      functionName: "collateralRatio"
    });

  const usdcPerPe = Number(peValue) * (Number(PeData?._hex) / 1000000);

  //write into migrator to migrate pe into p
  const contractConfig = {
    address: tokens["migratorV1"].address, //Spender, contract address
    abi: migratorAbi
  };

  const { config } = usePrepareContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "migrate",
    args: [amountIn]
  });

  const { data, writeAsync: migrate } = useContractWrite({
    ...config
  });

  const changePeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const reg = /^-?\d*\.?\d*$/;
    if (reg.test(newValue) || newValue === "") {
      setPeValue(newValue);
    }
  };

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
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full w-full xl:basis-1/3 laptop:basis-1/2 border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm"
          >
            <div className="flex flex-col p-5 gap-10">
              <h2 className="font-Roboto text-xl mb-7">
                Depositá PE(V1) y recibí P.
              </h2>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image
                    src={tokens["PE"].image}
                    width={25}
                    height={25}
                    className={
                      peBalance.data?.formatted == "0.0"
                        ? "grayscale"
                        : "grayscale-0"
                    }
                    alt="Peronio v2 Logo"
                  />
                  <div className="text-Roboto font-bold">PE(V1)</div>
                  <div className="ml-auto text-Roboto text-sm">
                    Saldo: {formatDecimals(peBalance.data?.formatted)}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    placeholder="0.0"
                    onChange={changePeValueHandler}
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
                    Saldo: {formatDecimals(usdcBalance.data?.formatted)}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    value={usdcPerPe.toFixed(2)}
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
                    Saldo: {formatDecimals(pBalance.data?.formatted)}
                  </div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0.0"
                    value={Number(usdcPerPe / pePrice).toFixed(2)}
                    className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-5"
                    readOnly={true}
                  />
                </div>
              </div>
              <button className="rounded-md border-solid border-2 border-[#00B7C2] py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30">
                Migrar
              </button>
            </div>
          </motion.div>
        </div>
        <h3 className="mobile:mt-16 text-4xl mobile:2xl font-Abril text-center">
          Chequeá nuestro exchange{" "}
          <span className="text-yellow-400">BLOCKS</span>
        </h3>
      </StyledMain>
      {isOpen && <WizardModal />}
    </>
  );
};

export default Migrar;
