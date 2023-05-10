import type { NextPage } from "next";
import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import tetherLogo from "/public/tether.svg";
import pLogo from "/public/logoP.svg";
import Head from "next/head";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAccount, Address, useWaitForTransaction } from "wagmi";
import Swaps from "../../components/Swaps/Swaps";
import { tokens } from "../../constants/addresses";
import usePeronioWrite from "../../hooks/usePeronioWrite";
import usePairs from "../../hooks/usePairs";
import BigNumber from "bignumber.js";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  background-image: url("/isologo 1.svg");
  background-size: contain !important;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100px;
  @media (min-width: 1280px) {
    padding: 5rem;
  }
  @media (min-width: 320px) {
    background-size: cover;
    overflow-y: auto;
    min-height: 100%;
    padding: 0.5rem;
  }
`;

const Retirar: NextPage = () => {
  const [connected, setConnected] = useState(false);
  const [pValue, setPValue] = useState<string>("0.0");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [hasApprove, setHasApprove] = useState<boolean>(false);
  const [hasWithdraw, setHasWithdraw] = useState<boolean>(false);
  const [amountOfPe, setAmountOfPe] = useState<string>("0");
  const [buttonText, setButtonText] = useState<string>("Retirar");

  const { address, isConnected } = useAccount();
  const [, , pePrice] = usePairs();

  const bnValue = new BigNumber(pValue.toString());
  const amountIn = bnValue.times(new BigNumber("10").pow(6));

  const { data: withDrawData, writeAsync: withdraw } = usePeronioWrite(
    "withdraw",
    [address as Address, amountIn.toString()]
  );

  const {
    data: tnxData,
    error,
    isError,
    isLoading,
    isSuccess
  } = useWaitForTransaction({
    hash: withDrawData?.hash
  });

  const runWithdraw = async () => {
    try {
      await withdraw();
      if (error) {
        throw new Error(error?.message);
      } else {
        notifySuccess();
      }
      notifySuccess();
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  const notifySuccess = () => {
    toast.success(
      `Retiraste ${Number(withDrawData._hex)} USDC por ${amountOfPe} P.`,
      {
        position: toast.POSITION.TOP_RIGHT
      }
    );
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    setAmountOfPe(String(Number(pValue) * pePrice));
  }, [pValue, pePrice]);

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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui sed
              consectetur commodi dolorum mollitia molestias, iste, ab officia
              culpa itaque debitis! Magnam deleniti doloribus aperiam molestiae
              libero, non nobis at.
            </p>
          </motion.div>
          <Swaps
            title="Ingresá P para retirar los USDC"
            token0Info={tokens["P"]}
            token1Info={tokens["USDC"]}
            buttonText={buttonText}
            address={address}
            setToken0Value={setPValue}
            token0Value={pValue}
            connected={connected}
            mainFunc={runWithdraw}
            hasApprove={hasApprove}
            setAmountOfPe={setAmountOfPe}
            amountOfPe={amountOfPe}
            disableMainButton={!hasWithdraw}
            pePrice={pePrice}
            hasMarkup={false}
          />
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
    </>
  );
};

export default Retirar;
