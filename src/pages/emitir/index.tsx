import type { NextPage } from "next";
import Image from "next/image";
import styled from "@emotion/styled";
import {motion} from 'framer-motion'

import tetherLogo from '/public/tether.svg'
import pLogo from '/public/logoP.svg'


export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh !important;
  width: 100%;
  background-image: url("/isologo 1.svg");
  background-size: contain !important;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100px;
  @media (min-width: 1280px) {
    padding: 5rem;
    min-height: 100vh;
  }
  @media (min-width: 320px) {
    background-size: cover;
    overflow-y: auto;
    min-height: 100%;
    padding: 0.5rem
  }
`;


const Migrar: NextPage = () => {
  return (
    <StyledMain>
      <div className=" flex laptop:flex-row 2xl:flex-row md:flex-col-reverse gap-10 md:px-10 md:py-16 mobile:px-5 mobile:py-2 mobile:flex-col-reverse 2xl:h-full laptop:h-full xl:h-full w-full justify-evenly items-center">
        <motion.div initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1, ease: 'easeInOut'}} className="xl:flex xl:flex-col h-full xl:basis-1/2 laptop:basis-1/3">
          <h1 className="xl:text-2xl mobile:text-2xl font-Abril mb-7">¿Que es "Emitir"?</h1>
          <p className="xl:text-lg mobile:text-xl font-Roboto xl:w-3/4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui sed consectetur commodi dolorum mollitia molestias, iste, ab officia culpa itaque debitis! Magnam deleniti doloribus aperiam molestiae libero, non nobis at.</p>
        </motion.div>
        <motion.div initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1.5, ease: 'easeInOut'}} className="h-full w-full xl:basis-1/3 laptop:basis-1/2 border-solid border rounded-md border-[#00B7C2] bg-[#363636]/50 backdrop-blur-sm">
          <div className="flex flex-col p-5 gap-10">
              <h2 className="font-Roboto text-xl mb-7">Ingresá USDT para emitir PE</h2>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image src={tetherLogo} width={25} height={25} alt="Tether Logo"/>
                  <div className="text-Roboto font-bold">USDT</div>
                  <div className="ml-auto text-Roboto text-sm">Saldo: 0</div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input type="text" placeholder="0.0" className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-10"/>
                  <button className="absolute bottom-2 right-2 rounded-lg border-solid border-2 border-[#0B4D76] p-1 bg-[#188DD6]/50">MAX</button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-5 mb-3">
                  <Image src={pLogo} width={25} height={25} alt="Peronio v2 Logo"/>
                  <div className="text-Roboto font-bold">P</div>
                  <div className="ml-auto text-Roboto text-sm">Saldo: 2</div>
                </div>
                <div className="relative w-full xl:h-24">
                  <input type="text" placeholder="0.0" className="placeholder:text-white rounded-md bg-[#00B7C2] h-full w-full text-right p-5 pb-10"/>
                  <button className="absolute bottom-2 right-2 rounded-lg border-solid border-2 border-[#0B4D76] p-1 bg-[#188DD6]/50">MAX</button>
                </div>
              </div>
              <button className="rounded-md border-solid border-2 border-[#00B7C2] py-2 font-Roboto font-bold laptop:text-xl mobile:text-lg bg-[#0B4D76]/30">Emitir P</button>
          </div>
        </motion.div>
      </div>
    </StyledMain>
  );
};

export default Migrar;
