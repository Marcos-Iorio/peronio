import { useCallback, useEffect, useMemo, useState } from "react";
import { IArsArray } from "../../../../types/fetchPair";
import {
  PairDataTimeWindow,
  PairDataTimeWindowEnum
} from "../../../../types/utils";
import useARSHistoricPrice from "../../../hooks/useARSHistoricPrice";
import usePairs from "../../../hooks/usePairs";
import getPairPrices from "../../../utils/getPairPrices";
import { getTimeWindowChange } from "../../../utils/getTimeWindowChange";
import InfoPopover from "../../InfoPopover/InfoPopover";
import { isSameDay, subDays } from "date-fns";
import { getChartColors } from "../Metrics";
import ArsPriceChart from "./BasicDataChart";
import LoadingChart from "./LoadingChart";

interface IChartWrapper {
  arsPrice: number;
}

const findArsPrice = (prices: any[], date: string | number | Date) => {
  let priceFound: any;
  let lookupDate = new Date(date);
  while (priceFound === undefined) {
    // eslint-disable-next-line no-loop-func
    priceFound = prices.find((price) =>
      isSameDay(new Date(price.date), lookupDate)
    );
    lookupDate = subDays(lookupDate, 1);
  }
  return priceFound;
};

const PairChartWrapper = ({ arsPrice }: IChartWrapper) => {
  const [arsPriceData, setArsPriceData] = useState<IArsArray>([]);
  const [pairPriceData, setPairPriceData] = useState<IArsArray>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>();
  const [hoverDate, setHoverDate] = useState<string | undefined>();
  const [currentDate, setCurrentDate] = useState<string>();

  const [usdcReserve, , pePrice] = usePairs();
  const historicArsPrices = useARSHistoricPrice();

  const arsPricePerPe = Number(pePrice * arsPrice).toFixed(3);

  const { changePercentage, changeValue } = getTimeWindowChange(pairPriceData);
  const isChangePositive = changeValue >= 0;

  const colors = getChartColors({ isChangePositive });
  const valueToDisplay = hoverValue?.toFixed(3) || arsPricePerPe;

  useEffect(() => {
    const data = getPairPrices("DAY", historicArsPrices, false).then(
      (response) => {
        setArsPriceData(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      }
    );
    setTimeWindow(0);
  }, [historicArsPrices]);

  const arsPricedValues = useMemo(() => {
    if (!historicArsPrices || historicArsPrices.length === 0) {
      return [];
    }

    return arsPriceData
      .map((pairPrice) => {
        return {
          ...pairPrice,
          value:
            findArsPrice(historicArsPrices, pairPrice.date)?.price /
            pairPrice.price
        };
      })
      .splice(0, 31);
  }, [arsPriceData, historicArsPrices]);

  useEffect(() => {
    setPairPriceData(arsPricedValues);
  }, [arsPricedValues]);

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

  const changeTimeWindowHandler = async (time: number) => {
    let options: PairDataTimeWindow;

    if (time === 0) {
      options = "DAY";
    } else if (time === 1) {
      options = "WEEK";
    } else {
      options = "MONTH";
    }

    const data = await getPairPrices(options, historicArsPrices, false);

    setArsPriceData(data);
    setTimeWindow(time);
  };
  return (
    <>
      <div className="flex mobile:flex-col xl:flex-row w-full justify-between">
        <div className="flex flex-row gap-3">
          <div className="flex flex-col">
            <div className="font-Roboto xl:text-3xl mobile:text-3xl font-bold">
              {valueToDisplay}
            </div>
            <div>{hoverDate || currentDate}</div>
          </div>
          <div
            style={{ color: isChangePositive ? "#31D0AA" : "#ED4B9E" }}
            className="font-Roboto text-lg mobile:text-xl"
          >{`${isChangePositive ? "+" : ""}${changeValue.toFixed(
            3
          )} (${changePercentage}%)`}</div>
        </div>
        <div className="font-Roboto xl:text-2xl font-bold flex flex-row mobile:justify-between mobile:mb-2 gap-5">
          <p className="xL:text-2xl mobile:text-xl font-Roboto">
            Precio PE/ARS
          </p>
          <InfoPopover
            title='¿Que significa "Precio PE/ARS"?'
            text="El gráfico muestra información sobre el precio del Peronio frente al Peso Argetino en tres períodos diferentes de tiempo."
          />
        </div>
        <div className="flex flex-row mobile:justify-evenly laptop:justify-start laptop:w-fit rounded-md border-solid border-[#00B7C2] border bg-[#363636]/50 backdrop-blur-md gap-1 p-2">
          <button
            onClick={() => changeTimeWindowHandler(0)}
            style={{
              backgroundColor: timeWindow === 0 ? "#00B7C2" : "#1b1b1b"
            }}
            className="font-Abril text-lg font-normal  bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md"
          >
            24H
          </button>
          <button
            onClick={() => changeTimeWindowHandler(1)}
            style={{
              backgroundColor: timeWindow === 1 ? "#00B7C2" : "#1b1b1b"
            }}
            className="font-Abril text-lg font-normal bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md"
          >
            1W
          </button>
          <button
            onClick={() => changeTimeWindowHandler(2)}
            style={{
              backgroundColor: timeWindow === 2 ? "#00B7C2" : "#1b1b1b"
            }}
            className="font-Abril text-lg font-normal  bg-[#1b1b1b]/30 hover:bg-[#3b3b3b] py-1 px-3 rounded-md"
          >
            1M
          </button>
        </div>
      </div>
      <ArsPriceChart
        setHoverDate={setHoverDate}
        setHoverValue={setHoverValue}
        data={pairPriceData}
        colors={colors}
        gradientId="arsColor"
        timeWindow={timeWindow}
        isLoading={isLoading}
      />
    </>
  );
};

export default PairChartWrapper;
