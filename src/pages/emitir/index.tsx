import type { NextPage } from "next";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import Head from "next/head";
import Swaps from "../../components/Swaps/Swaps";
import { tokens } from "../../constants/addresses";
import { useContext, useEffect, useState } from "react";
import useErc20Read from "../../hooks/useERCRead";
import useErc20Write from "../../hooks/useErc20Write";
import { Address, useAccount } from "wagmi";
import { formatBalance } from "../../utils/formatPrice";
import usePeronioWrite from "../../hooks/usePeronioWrite";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
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

const Emigrar: NextPage = () => {
  const [usdcValue, setUsdcValue] = useState<string | undefined>("");
  const [connected, setConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [hasApprove, setHasApprove] = useState<boolean>(false);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  const [isMinted, setIsMinted] = useState<boolean>(false);
  const [allowanceLeft, setAllowanceLeft] = useState<string>("0");
  const [amountOfPe, setAmountOfPe] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Emitir");

  const { address, isConnected } = useAccount();

  const { data: allowanceData } = useErc20Read("allowance", [
    address as Address,
    tokens["USDC"].address as Address
  ]);

  const { data, writeAsync: approve } = useErc20Write("approve", [
    tokens["USDC"].address as Address,
    Number(usdcValue)
  ]);

  const { data: mintingData, writeAsync: mint } = usePeronioWrite("mint", [
    address as Address,
    usdcValue,
    amountOfPe
  ]);

  const notifySuccess = () => {
    toast.success(
      `Minteaste ${amountOfPe.toFixed(3)} P por ${usdcValue} USDC.`,
      {
        position: toast.POSITION.TOP_RIGHT
      }
    );
  };

  const runApprove = async () => {
    try {
      await approve();
      setHasApprove(true);
      setIsMinted(true);
    } catch (e: any) {
      setErrorMessage(e.message);
      setHasApprove(false);
    }
  };

  const runMint = async () => {
    try {
      setButtonText("Emitiendo...");
      await mint();
      setUsdcValue("");
      setButtonText("Emitir");
      setIsMinted(false);
      notifySuccess();
      setTimeout(() => {
        setIsMinted(true);
      }, 500);
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (Number(allowanceData?._hex) > 0) {
      setAllowanceLeft(formatBalance(Number(allowanceData._hex), 0, 3));
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

  return (
    <>
      <Head>
        <title>Emitir - Peronio</title>
        <meta property="og:title" content="Emitir - Peronio" key="title" />
      </Head>
      <StyledMain>
        <div className=" flex laptop:flex-row 2xl:flex-row md:flex-col-reverse gap-10 md:px-10 md:py-16 mobile:px-5 mobile:gap-24 mobile:py-2 mobile:flex-col-reverse 2xl:h-full laptop:h-full xl:h-full w-full justify-evenly items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="xl:flex xl:flex-col laptop:h-full xl:basis-1/2 laptop:basis-1/3 laptop:flex laptop:flex-col laptop:justify-between laptop:gap-10"
          >
            <div>
              <h1 className="xl:text-2xl mobile:text-2xl font-Abril mb-7">
                ¿Que es &quot;Emitir&quot;?
              </h1>
              <p className="xl:text-lg mobile:text-xl font-Roboto xl:w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                sed consectetur commodi dolorum mollitia molestias, iste, ab
                officia culpa itaque debitis! Magnam deleniti doloribus aperiam
                molestiae libero, non nobis at.
              </p>
            </div>
            <div
              style={{ visibility: errorMessage ? "visible" : "hidden" }}
              className="rounded-md border-2 border-red-600 p-2 bg-[#363636]/50 backdrop-blur-sm text-red-300"
            >
              {errorMessage}
            </div>
          </motion.div>
          <Swaps
            title={"Cambiá USDC para emitir P"}
            token0Info={tokens["USDC"]}
            token1Info={tokens["P"]}
            buttonText={buttonText}
            address={address}
            setToken0Value={setUsdcValue}
            token0Value={usdcValue}
            allowanceLeft={allowanceLeft}
            hasAllowance={hasAllowance}
            connected={connected}
            runApprove={runApprove}
            mainFunc={runMint}
            hasApprove={hasApprove}
            setAmountOfPe={setAmountOfPe}
            amountOfPe={amountOfPe}
            disableMainButton={isMinted}
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

export default Emigrar;
