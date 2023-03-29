import { useState, useEffect } from "react";
import { PairDataTimeWindow } from "../../types/utils";
import fetchPairHourDatas from "../querys/fetchPairHourDatas";
import fetchPairDayDatas from "../querys/fetchPairDayDatas";
import createChartData from "../utils/createChartData";
import { IArsArray } from "../../types/fetchPair";

const getPairPrices = async (
  time: PairDataTimeWindow,
  historicArsPrice: IArsArray
) => {
  switch (time) {
    case "DAY":
      const dayResult = await fetchPairHourDatas(12);
      const dayData = createChartData(
        dayResult.data.pairHourDatas,
        historicArsPrice
      );
      return dayData;
    case "WEEK":
      const weekResult = await fetchPairDayDatas(8);
      const weekData = createChartData(
        weekResult.data.pairDayDatas,
        historicArsPrice
      );
      return weekData;
    case "MONTH":
      const monthResult = await fetchPairDayDatas(31);
      const monthData = createChartData(
        monthResult.data.pairDayDatas,
        historicArsPrice
      );
      return monthData;
    default:
      return [];
  }
};

export default getPairPrices;
