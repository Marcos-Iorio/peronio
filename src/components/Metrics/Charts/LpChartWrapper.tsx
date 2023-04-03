import { motion } from "framer-motion";
import InfoPopover from "../../InfoPopover/InfoPopover";
import { useState, useEffect } from "react";
import { IArsArray } from "../../../../types/fetchPair";
import { getTimeWindowChange } from "../../../utils/getTimeWindowChange";
import useARSHistoricPrice from "../../../hooks/useARSHistoricPrice";
import getPairPrices from "../../../utils/getPairPrices";
import BasicDataChart from "./BasicDataChart";
import usePairs from "../../../hooks/usePairs";

interface ILpChartWrapper {
  animation: any;
  pePrice: number;
}
const getChartColors = ({
  isChangePositive
}: {
  isChangePositive: boolean;
}) => {
  return isChangePositive
    ? { gradient1: "#00E7B0", gradient2: "#0C8B6C", stroke: "#31D0AA" }
    : { gradient1: "#ED4B9E", gradient2: "#ED4B9E", stroke: "#ED4B9E " };
};

const LpChartWrapper = (props: ILpChartWrapper) => {
  const [lpData, setLpData] = useState<IArsArray>([]);
  const [hoverValue, setHoverValue] = useState<number | undefined>();
  const [hoverDate, setHoverDate] = useState<string | undefined>();
  const [currentDate, setCurrentDate] = useState<string>();

  const [usdcReserve, , pePrice] = usePairs();
  const historicArsPrices = useARSHistoricPrice();

  const { changePercentage, changeValue } = getTimeWindowChange(lpData);
  const isChangePositive = changeValue >= 0;

  const valueToDisplay = hoverValue?.toFixed(5) || pePrice.toFixed(5);

  const colors = getChartColors({ isChangePositive });

  useEffect(() => {
    const data = getPairPrices("WEEK", historicArsPrices, true).then(
      (response) => setLpData(response)
    );
  }, [historicArsPrices]);

  console.log(lpData);

  useEffect(() => {
    const currentDate = new Date().toLocaleString("es-es", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    setCurrentDate(currentDate);
  }, []);

  return (
    <motion.div
      variants={props.animation}
      className="p-5 xl:basis-[37.6%] 2xl:basis-2/5 laptop:basis-1/2 laptop:grow border-solid border border-[#00B7C2] bg-[#363636]/50 backdrop-blur-md rounded-md xl:min-w-[37%] 2xl:min-w-[40%] flex flex-col"
    >
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <p className="text-2xl font-Roboto">{valueToDisplay}</p>
          <div>{hoverDate || currentDate}</div>
        </div>
        <div className="font-Roboto xl:text-xl mobile:text-2xl basis-2/4 2xl:text-2xl font-bold flex flex-col items-center">
          <p>Liquidity pool</p>
          <span>(PE/USDT)</span>
        </div>
        <InfoPopover title='¿Que es "el Liquidity Pool"?' text="asd" />
      </div>
      <BasicDataChart
        data={lpData}
        colors={colors}
        timeWindow={1}
        setHoverDate={setHoverDate}
        setHoverValue={setHoverValue}
      />
    </motion.div>
  );
};

export default LpChartWrapper;
