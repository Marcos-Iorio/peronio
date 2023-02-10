import type { NextPage } from "next";
import styled from "@emotion/styled";

import AnimatedUnderline from "../components/animatedUnderline/AnimatedUnderline";
import Charts from "../components/Charts/Charts";

const Main = styled.main`
  height: 100%;
  width: 100%;
  background-image: url("/sol-bg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @media (min-width: 1280px) {
    min-height: 100vh;
  }
`;

const Home: NextPage = () => {
  return (
    <Main>
      <header className="h-fit w-full xl:p-20 text-center flex flex-col items-center">
        <div className="relative h-fit w-fit xl:mb-10">
          <h1 className="font-Abril text-center w-full h-full xl:text-[7rem]">
            Peronio
          </h1>
          <AnimatedUnderline />
        </div>
        <p className="font-Robot xl:text-3xl">
          Comprá, vendé, intercambiá y revisá precios historicos!
        </p>
      </header>
      <div className="flex flex-col gap-5 justify-center xl:px-20 2xl:px-40 xl:pb-16">
        <Charts />
      </div>
    </Main>
  );
};

export default Home;
