import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import GaugeChart from "react-gauge-chart";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import usePeronioRead from "../../hooks/usePeronioRead";

interface HomeModalProps {
  isOpen: boolean;
  openModal: () => void;
  title: string;
  text: string;
}

const dataEx = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

import imagenBoveda from "/public/boveda.svg";
import Modal from "../Modal/Modal";

const Charts = () => {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showGaugeModal, setShowGaugeModal] = useState(false);
  const [showLiquidityModal, setShowLiquidityModal] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-5 min-w-full max-w-max">
        <div className="p-5 xl:basis-4/6 2xl:basis-4/5 border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md xl:min-h-[20rem] 2xl:min-h-[25rem] xl:max-w-[80%] flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row gap-3">
              <div className="font-Roboto xl:text-3xl font-bold">1.60</div>
              <div className="font-Roboto text-lg">1.8%</div>
            </div>
            <div className="font-Roboto xl:text-2xl font-bold flex flex-row gap-5">
              <p className="text-2xl font-Roboto">Precio PE/ARS</p>
              <button
                type="button"
                onClick={() => setShowPriceModal(true)}
                data-model="precio_pe/ars_modal"
                className="text-lg font-Roboto rounded-full bg-[#00B7C2] w-7 h-7 text-center hover:bg-transparent hover:border-[#00B7C2] hover:border-solid hover:border"
              >
                ?
              </button>
              {showPriceModal && (
                <Modal
                  modalName="price_modal"
                  isOpen={showPriceModal}
                  title="¿Cómo se estima el precio del peronio"
                  text="lorem ipsum"
                  setModal={setShowPriceModal}
                />
              )}
            </div>
            <div className="flex flex-row rounded-md border-solid border-[#00B7C2] border bg-[#363636]/50 backdrop-blur-md gap-1 p-2">
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
                bottom: 0,
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
        </div>
        <div className="p-5 xl:basis-2/6 2xl:basis-1/5 min-w-max border-solid border border-[#00B7C2] bg-[#363636]/50 rounded-md backdrop-blur-md">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">USDT/PE</p>
              <p className="text-center text-6xl">240</p>
            </div>
            <div className="w-full h-[1px] my-2 bg-[#00B7C2]"></div>
            <div className="bg-[#1b1b1b]/30 w-full p-5 rounded-md">
              <p className="text-lg font-Roboto text-center">Dólar Blue.</p>
              <p className="text-center text-6xl">380</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 min-w-full flex-nowrap flex-grow-0-1 max-h-[20rem]">
        <div className="p-5 xl:basis-[15%] 2xl:basis-[20%] w-full border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md h-full min-h-[20em]">
          <div className="flex flex-col h-full w-full items-center justify-center align-middle">
            <div className="flex flex-row w-full justify-between">
              <p className="text-2xl font-Roboto">Equilibrado</p>
              <span className="text-lg font-Roboto rounded-full bg-[#00B7C2] w-7 h-7 text-center">
                ?
              </span>
            </div>
            <div className="rounded-md bg-[#1b1b1b]/30 box-content">
              <div className="flex flex-col justify-center items-center py-3">
                <p className="text-4xl font-Roboto">0.0041</p>
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
        </div>
        <div className="p-5 xl:basis-[37.6%] 2xl:basis-2/5 border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md xl:max-w-[80%] flex flex-col">
          <div className="flex flex-row w-full justify-center">
            <p className="text-2xl font-Roboto">0.0041</p>
            <div className="font-Roboto xl:text-xl basis-2/4 2xl:text-2xl font-bold flex flex-col items-center">
              <p>Liquidity pool</p>
              <span>(PE/USDT)</span>
            </div>
            <span className="text-lg font-Roboto rounded-full bg-[#00B7C2] w-7 h-7 text-center ml-auto">
              ?
            </span>
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
                bottom: 0,
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
        </div>
        <div className="p-3 xl:basis-2/6 2xl:basis-2/5 min-w-max border-solid border border-[#00B7C2] bg-[#363636]/50 rounded-md backdrop-blur-md ">
          <p className="2xl:hidden font-Roboto text-2xl text-center h-fit">
            Bóveda
          </p>
          <div className="flex 2xl:flex-row xl:flex-col justify-center w-full 2xl:h-full">
            <div className="xl:hidden 2xl:flex flex flex-col w-full justify-center 2xl:items-center rounded-md bg-[#1b1b1b]/30 box-content">
              <p className="font-Roboto text-2xl text-center h-fit">Bóveda</p>
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: [0, -10, 10] }}
                transition={{
                  type: "spring",
                  stiffness: 2000,
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 5,
                }}
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
                  <p className="text-center font-Roboto xl:text-2xl 2xl:text-3xl">
                    10.000
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className=" font-Roboto text-md">PE en circulación</p>
                <div className="border border-solid border-[#00B7C2] bg-[#0D0D0D]/50 rounded-md p-2 w-full">
                  <p className="text-center font-Roboto xl:text-2xl 2xl:text-3xl">
                    2.500.000
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className=" font-Roboto text-md">Rrecio PE por USDT</p>
                <div className="border border-solid border-[#00B7C2] bg-[#0D0D0D]/50 rounded-md p-2 w-full">
                  <p className="text-center font-Roboto xl:text-2xl 2xl:text-3xl">
                    0.004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
