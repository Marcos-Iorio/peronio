import type { NextPage } from "next";
import styled from '@emotion/styled'

import AnimatedUnderline from "../components/animatedUnderline/AnimatedUnderline";

const Main = styled.main`
height: 100%;
width: 100%;
background-image: url("/sol-bg.svg");
background-size: contain;
background-repeat: no-repeat;
background-position: center center;
`;

const Home: NextPage = () => {
  return (
    <Main>
      <header className="h-full w-full min-h-screen xl:p-20 text-center flex flex-col items-center">
        <div className="relative h-fit w-fit xl:mb-10">
          <h1 className="font-Abril text-center w-full h-full xl:text-[7rem]">Peronio</h1>
          <AnimatedUnderline/>
        </div>
        <p className="font-Robot xl:text-3xl">Comprá, vendé, intercambiá y revisá precios historicos!</p>
      </header>
      <div>
        
      </div>
    </Main>
  );
};

export default Home;


