import { IArs, IArsArray, IReservesArray } from "../../types/fetchPair";
import formatDate from "./formatDate";
import getPePrice from "./getPePrice";

const createChartData = (data: IReservesArray, historicArsPrice: IArsArray) => {
  const newArray: IArs[] = [];

  if (data === undefined) {
    return [];
  }

  data.forEach((value, index) => {
    const formattedDate = formatDate(
      value.hourStartUnix === undefined ? value.date : value.hourStartUnix
    );

    const pePrice = getPePrice(value.reserve0, value.reserve1);

    newArray.push({
      date: formattedDate,
      price:
        historicArsPrice[index]?.price !== undefined
          ? pePrice * historicArsPrice[index].price
          : 0
    });
  });

  return newArray.reverse().sort();
};

export default createChartData;
