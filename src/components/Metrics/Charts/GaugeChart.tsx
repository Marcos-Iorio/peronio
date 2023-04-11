import { useEffect, useState } from "react";
import getPairPrices from "../../../utils/getPairPrices";
import InfoPopover from "../../InfoPopover/InfoPopover";

import Gauge from "react-gauge-chart";
import useARSHistoricPrice from "../../../hooks/useARSHistoricPrice";
import { IArsArray } from "../../../../types/fetchPair";
import { getTimeWindowChange } from "../../../utils/getTimeWindowChange";
import usePeronioRead from "../../../hooks/usePeronioRead";

interface IGauge {
  pePrice: number;
}

const GaugeChart = ({ pePrice }: IGauge) => {
  const [lpData, setLpData] = useState<IArsArray>([]);
  const [buyingPrice, setBuyingPrice] = useState<number>(0);
  const [gaugeIndicator, setGaugeIndicator] = useState<string>("0");
  const historicArsPrices = useARSHistoricPrice();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data } = usePeronioRead("buyingPrice");

  const intPePrice = Number(pePrice * 1000000).toFixed(0);
  const rest = buyingPrice - parseInt(intPePrice);
  const averagePrice = (parseInt(intPePrice) + buyingPrice) / 2;
  const percentage = (rest / averagePrice) * 100;

  let title = "";
  let color = "";

  if (parseFloat(gaugeIndicator) * 2 >= 0.7) {
    title = "Oportunidad";
    color = "#61ff5e";
  } else if (parseFloat(gaugeIndicator) * 2 <= 0.3) {
    title = "Oportunidad";
    color = "#ff4e4e";
  } else {
    title = "Equilibrado";
    color = "#ffe851";
  }

  useEffect(() => {
    const BnValue = Number(data?._hex);
    setBuyingPrice(BnValue);
  }, [data]);

  useEffect(() => {
    setGaugeIndicator((percentage / 10).toFixed(2));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const data = getPairPrices("WEEK", historicArsPrices, true).then(
      (response) => setLpData(response)
    );
  }, [historicArsPrices]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center align-middle">
      <div className="flex flex-row w-full justify-between">
        <p style={{ color: color }} className="text-2xl font-Roboto">
          {title}
        </p>
        <InfoPopover title="¿Cómo funciona el indicador?" text="asd" />
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="rounded-md bg-[#1b1b1b]/30 box-content">
          <div className="flex flex-col justify-center items-center py-3">
            <p className="text-3xl font-Roboto">{pePrice.toFixed(6)}</p>
            <p style={{ color: color }} className="text-2xl font-Roboto">
              {percentage.toFixed(2)}%
            </p>
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
              percent={parseFloat(gaugeIndicator) * 2}
              hideText={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaugeChart;
