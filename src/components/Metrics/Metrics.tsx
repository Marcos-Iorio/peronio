import Image from "next/image";
import { motion } from "framer-motion";
import imagenBoveda from "/public/boveda.svg";
import usePairs from "../../hooks/usePairs";
import useARSPrice from "../../hooks/useARSPrice";
import { formatBalance } from "../../utils/formatPrice";
import useTotalSupply from "../../hooks/useTotalSupply";
import PairChartWrapper from "./Charts/PairChartWrapper";
import LpChartWrapper from "./Charts/LpChartWrapper";

import GaugeChart from "./Charts/GaugeChart";
import { useCallback } from "react";

const showChartsVariants = {
  visible: {
    transition: {
      delayChildren: 1,
      staggerChildren: 0.18
    }
  },
  hidden: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1
    }
  }
};

const chartVariant = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  }
};

export const getChartColors = ({
  isChangePositive
}: {
  isChangePositive: boolean;
}) => {
  return isChangePositive
    ? { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" }
    : { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E" };
};

const Metrics = () => {
  const arsPrice = useARSPrice();
  const [usdcReserve, , pePrice] = usePairs();
  const arsPricePerPe = Number(pePrice * arsPrice).toFixed(3);
  const totalSupply = useTotalSupply();
  const fmtBalance = formatBalance(usdcReserve, 6, 8);
  const fmtTotalSupply = formatBalance(
    totalSupply / Number(arsPricePerPe),
    6,
    12
  );

  const usdcPerPe = 1 / pePrice;

  return (
    <>
      <motion.div
        variants={showChartsVariants}
        initial="hidden"
        animate="visible"
        className="flex laptop:flex-row mobile:flex-col mobile:min-h-full gap-5"
      >
        <motion.div
          variants={chartVariant}
          className="p-5 xl:basis-4/6 laptop:basis-1/2 2xl:basis-4/5 border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md xl:min-h-[20rem] 2xl:min-h-[25rem] xl:max-w-[80%] laptop:max-w-[50%] flex flex-col"
        >
          <PairChartWrapper arsPrice={arsPrice} />
        </motion.div>
        <motion.div
          variants={chartVariant}
          className="p-5 xl:basis-2/6 laptop:basis-1/2 2xl:basis-1/5 min-w-max border-solid border border-[#00B7C2] bg-[#363636]/50 rounded-md backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">USDC/PE</p>
              <p className="text-center text-6xl">{usdcPerPe.toFixed(2)}</p>
            </div>
            <div className="w-full h-[1px] my-2 bg-[#00B7C2]"></div>
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">USDT/ARS.</p>
              <p className="text-center text-6xl">{arsPrice}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={showChartsVariants}
        initial="hidden"
        animate="visible"
        className="flex mobile:flex-col xl:flex-row xl:flex-nowrap xl:min-w-full gap-5 2xl:min-w-full 2xl:flex-nowrap laptop:flex-row laptop:max-w-fit laptop:flex-wrap xl:max-h-[20rem]"
      >
        <motion.div
          variants={chartVariant}
          className="p-5 2xl:basis-[20%] laptop:basis-1/2 laptop:max-w-fit border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md h-full min-h-[20em]"
        >
          <GaugeChart pePrice={pePrice} />
        </motion.div>
        <LpChartWrapper animation={chartVariant} pePrice={pePrice} />
        <motion.div
          variants={chartVariant}
          className="p-3 xl:basis-2/6 xl:max-w-[31%] laptop:basis-full 2xl:basis-2/5 laptop:w-full 2xl:max-w-[40%]  border-solid border border-[#00B7C2] bg-[#363636]/50 rounded-md backdrop-blur-md "
        >
          <p className="2xl:hidden laptop:hidden xl:block font-Roboto text-2xl text-center h-fit">
            Bóveda
          </p>
          <div className="flex 2xl:flex-row xl:flex-col justify-center w-full 2xl:h-full">
            <div className="mobile:hidden xl:hidden laptop:flex 2xl:flex flex-col w-full justify-center 2xl:items-center rounded-md bg-[#1b1b1b]/30 box-content 2xl:max-h-[20rem]">
              <p className="font-Roboto text-2xl text-center h-fit">Bóveda</p>
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: [0, -10, 10] }}
                transition={{
                  type: "spring",
                  stiffness: 2000,
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 5
                }}
                className="flex justify-center"
              >
                <Image
                  src={imagenBoveda}
                  alt="Ilustración de bóveda"
                  width={200}
                  height={200}
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-2 py-2 px-5 w-full h-fit">
              <div className="flex flex-col w-full">
                <p className=" font-Roboto text-md">Respaldo en USDT</p>
                <div className="border border-solid border-[#00B7C2] bg-[#0D0D0D]/50 rounded-md p-2 w-full">
                  <p className="text-center font-Roboto mobile:text-2xl xl:text-2xl 2xl:text-3xl">
                    {fmtBalance}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className=" font-Roboto text-md">PE en circulación</p>
                <div className="border border-solid border-[#00B7C2] bg-[#0D0D0D]/50 rounded-md p-2 w-full">
                  <p className="text-center font-Roboto mobile:text-2xl xl:text-2xl 2xl:text-3xl">
                    {fmtTotalSupply}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className=" font-Roboto text-md">Precio PE por USDT</p>
                <div className="border border-solid border-[#00B7C2] bg-[#0D0D0D]/50 rounded-md p-2 w-full">
                  <p className="text-center font-Roboto mobile:text-2xl xl:text-2xl 2xl:text-3xl">
                    {pePrice.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Metrics;
