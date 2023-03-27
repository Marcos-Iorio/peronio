import { useState, useEffect } from "react";
import { PairDataTimeWindow } from "../../types/utils";
import fetchPairHourDatas from "../querys/fetchPairHourDatas";
import fetchPairDayDatas from "../querys/fetchPairDayDatas";
import useARSHistoricPrice from "./useARSHistoricPrice";
import createChartData from "../utils/createChartData";

const URL = "https://api.thegraph.com/subgraphs/name/nlgonzalez/peronio-dapp";

const useFetcherPairPrices = (time: PairDataTimeWindow) => {
  const historicalArsPrices = useARSHistoricPrice();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    switch(time){
      case 'DAY':
        const dayResult = await fetchPairHourDatas(24);
        createChartData(dayResult.pairHourDatas, historicalArsPrices);
        break;
      case 'WEEK':
        const weekResult = await fetchPairDayDatas(7);
        break;
      case "MONTH":
        const monthResult = await fetchPairDayDatas(31);
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
