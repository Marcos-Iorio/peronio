import { useState, useEffect } from "react";
import { PairDataTimeWindow } from "../../types/utils";
import fetchPairHourDatas from "../querys/fetchPairHourDatas";
import fetchPairDayDatas from "../querys/fetchPairDayDatas";
import useARSHistoricPrice from "./useARSHistoricPrice";
import createChartData from "../utils/createChartData";
import { IArsArray } from "../../types/fetchPair";

const useFetcherPairPrices = (time: PairDataTimeWindow) => {
  const historicalArsPrices = useARSHistoricPrice();

  const [data, setData] = useState<IArsArray>([]);

  const fetchData = async () => {
    switch (time) {
      case "DAY":
        const dayResult = await fetchPairHourDatas(24);
        const dayData = createChartData(dayResult.data.pairHourDatas, historicalArsPrices);
        setData(dayData);
        break;
      case "WEEK":
        const weekResult = await fetchPairDayDatas(7);
        const weekData = createChartData(weekResult.data.pairDayDatas, historicalArsPrices);
        setData(weekData);
        break;
      case "MONTH":
        const monthResult = await fetchPairDayDatas(31);
        const monthData = createChartData(monthResult.data.pairDayDatas, historicalArsPrices);
        setData(monthData);
        break;
      default:
        setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export default useFetcherPairPrices;
