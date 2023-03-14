import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";

import GaugeChart from "react-gauge-chart";
import Image from "next/image";
import { motion } from "framer-motion";
import imagenBoveda from "/public/boveda.svg";
import InfoPopover from "../InfoPopover/InfoPopover";
import usePairs from "../../hooks/usePairs";
import useARSPrice from "../../hooks/useARSPrice";
import { formatBalance } from "../../utils/formatPrice";
import useTotalSupply from "../../hooks/useTotalSupply";

const dataEx = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

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

const Charts = () => {
  const [usdcReserve, , pePrice] = usePairs();
  const arsPrice = useARSPrice();
  const totalSupply = useTotalSupply();

  const arsPricePerPe = Number(pePrice * arsPrice).toFixed(3);

  const fmtBalance = formatBalance(usdcReserve, 6, 8);
  const fmtTotalSupply = formatBalance(
    totalSupply / Number(arsPricePerPe),
    6,
    12
  );

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
          <div className="flex mobile:flex-col xl:flex-row w-full justify-between">
            <div className="flex flex-row gap-3">
              <div className="font-Roboto xl:text-3xl mobile:text-3xl font-bold">
                {arsPricePerPe}
              </div>
              <div className="font-Roboto text-lg mobile:text-xl">1.8%</div>
            </div>
            <div className="font-Roboto xl:text-2xl font-bold flex flex-row mobile:justify-between mobile:mb-2 gap-5">
              <p className="xL:text-2xl mobile:text-xl font-Roboto">
                Precio PE/ARS
              </p>
              <InfoPopover title='¿Que significa "Precio PE/ARS"?' text="asd" />
            </div>
            <div className="flex flex-row mobile:justify-evenly laptop:justify-start laptop:w-fit rounded-md border-solid border-[#00B7C2] border bg-[#363636]/50 backdrop-blur-md gap-1 p-2">
              <div className="font-Abril text-lg font-normal  bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md">
                24H
              </div>
              <div className="font-Abril text-lg font-normal bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md">
                1W
              </div>
              <div className="font-Abril text-lg font-normal  bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md">
                1M
              </div>
            </div>
          </div>
          <ResponsiveContainer className="xl:h-[15rem] 2xl:h-[20rem] w-full">
            <AreaChart
              width={300}
              height={200}
              data={dataEx}
              margin={{
                top: 40,
                right: 0,
                left: 0,
                bottom: 0
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                  <stop offset="80%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <Area
                type="linear"
                dataKey="uv"
                fillOpacity={1}
                stroke="#82ca9d"
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          variants={chartVariant}
          className="p-5 xl:basis-2/6 laptop:basis-1/2 2xl:basis-1/5 min-w-max border-solid border border-[#00B7C2] bg-[#363636]/50 rounded-md backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">USDT/PE</p>
              <p className="text-center text-6xl">240</p>
            </div>
            <div className="w-full h-[1px] my-2 bg-[#00B7C2]"></div>
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">Dólar Blue.</p>
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
          <div className="flex flex-col h-full w-full items-center justify-center align-middle">
            <div className="flex flex-row w-full justify-between">
              <p className="text-2xl font-Roboto">Equilibrado</p>
              <InfoPopover title="¿Cómo funciona el indicador?" text="asd" />
            </div>
            <div className="rounded-md bg-[#1b1b1b]/30 box-content">
              <div className="flex flex-col justify-center items-center py-3">
                <p className="text-3xl font-Roboto">{pePrice.toFixed(4)}</p>
                <p className="text-2xl font-Roboto">+3%</p>
              </div>
              <div className="mt-auto h-full relative">
                <p className="absolute left-16 top-1 font-Roboto">0%</p>
                <p className="absolute right-14 top-1 font-Roboto">+5%</p>
                <GaugeChart
                  id="gauge-chart4"
                  colors={["#ff4e4e", "#ffe851", "#61ff5e"]}
                  nrOfLevels={3}
                  arcPadding={0.1}
                  cornerRadius={3}
                  needleColor="#fff"
                  needleBaseColor="#fff"
                  percent={0.6}
                  hideText={true}
                />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={chartVariant}
          className="p-5 xl:basis-[37.6%] 2xl:basis-2/5 laptop:basis-1/2 laptop:grow border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md xl:min-w-[37%] 2xl:min-w-[40%] flex flex-col"
        >
          <div className="flex flex-row w-full justify-between">
            <p className="text-2xl font-Roboto">{pePrice.toFixed(4)}</p>
            <div className="font-Roboto xl:text-xl mobile:text-2xl basis-2/4 2xl:text-2xl font-bold flex flex-col items-center">
              <p>Liquidity pool</p>
              <span>(PE/USDT)</span>
            </div>
            <InfoPopover title='¿Que es "el Liquidity Pool"?' text="asd" />
          </div>
          <ResponsiveContainer className="h-full w-full">
            <AreaChart
              width={300}
              height={200}
              data={dataEx}
              margin={{
                top: 40,
                right: 0,
                left: 0,
                bottom: 0
              }}
            >
              <defs>
                <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DD0FAA" stopOpacity={0.3} />
                  <stop offset="80%" stopColor="#DD0FAA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <Area
                type="linear"
                dataKey="uv"
                fillOpacity={1}
                stroke="#DD0FAA"
                fill="url(#lineColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
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
                    {pePrice.toFixed(4)}
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

export default Charts;
