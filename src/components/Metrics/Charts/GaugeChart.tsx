import { useEffect, useState } from "react";
import getPairPrices from "../../../utils/getPairPrices";
import InfoPopover from "../../InfoPopover/InfoPopover";

import Gauge from "react-gauge-chart";
import useARSHistoricPrice from "../../../hooks/useARSHistoricPrice";
import { IArsArray } from "../../../../types/fetchPair";
import { getTimeWindowChange } from "../../../utils/getTimeWindowChange";

interface IGauge {
  pePrice: number;
}

const GaugeChart = ({ pePrice }: IGauge) => {
  const [lpData, setLpData] = useState<IArsArray>([]);
  const historicArsPrices = useARSHistoricPrice();

  const { changePercentage, changeValue } = getTimeWindowChange(lpData);

  useEffect(() => {
    const data = getPairPrices("WEEK", historicArsPrices, true).then(
      (response) => setLpData(response)
    );
  }, [historicArsPrices]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center align-middle">
      <div className="flex flex-row w-full justify-between">
        <p className="text-2xl font-Roboto">Equilibrado</p>
        <InfoPopover title="¿Cómo funciona el indicador?" text="asd" />
      </div>
      <div className="rounded-md bg-[#1b1b1b]/30 box-content">
        <div className="flex flex-col justify-center items-center py-3">
          <p className="text-3xl font-Roboto">{pePrice.toFixed(4)}</p>
          <p className="text-2xl font-Roboto">{changePercentage}%</p>
        </div>
        <div className="mt-auto h-full relative">
          <p className="absolute left-16 top-1 font-Roboto">0%</p>
          <p className="absolute right-14 top-1 font-Roboto">+5%</p>
          <Gauge
            id="gauge-chart4"
            colors={["#ff4e4e", "#ffe851", "#61ff5e"]}
            nrOfLevels={3}
            arcPadding={0.1}
            cornerRadius={3}
            needleColor="#fff"
            needleBaseColor="#fff"
            percent={1}
            hideText={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
