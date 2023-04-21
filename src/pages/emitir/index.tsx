import type { NextPage } from "next";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import Head from "next/head";
import Swaps from "../../components/Swaps/Swaps";
import { tokens } from "../../constants/addresses";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

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
  const { allowanceLeft } = useContext(TransactionContext);

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
            className="xl:flex xl:flex-col laptop:h-full xl:basis-1/2 laptop:basis-1/3 laptop:flex laptop:flex-col laptop:justify-between "
          >
            <h1 className="xl:text-2xl mobile:text-2xl font-Abril mb-7">
              ¿Que es &quot;Emitir&quot;?
            </h1>
            <p className="xl:text-lg mobile:text-xl font-Roboto xl:w-3/4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui sed
              consectetur commodi dolorum mollitia molestias, iste, ab officia
              culpa itaque debitis! Magnam deleniti doloribus aperiam molestiae
              libero, non nobis at.
            </p>
          </motion.div>
          <Swaps
            title={"Cambiá USDC para emitir P"}
            token0Info={tokens["USDC"]}
            token1Info={tokens["P"]}
            buttonText="Emitir P"
          />
        </div>
        <h3 className="mobile:mt-16 text-4xl mobile:2xl font-Abril text-center">
          Chequeá nuestro exchange{" "}
          <span className="text-yellow-400">BLOCKS</span>
        </h3>
      </StyledMain>
    </>
  );
};

export default Emigrar;
