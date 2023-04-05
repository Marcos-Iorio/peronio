import { BigNumber } from "ethers";
import { IArs, IArsArray, IReservesArray } from "../../types/fetchPair";
import formatDate from "./formatDate";
import { formatBalance } from "./formatPrice";
import getPePrice from "./getPePrice";

const MAX_LENGTH = 11;

const createChartData = (
  data: IReservesArray,
  historicArsPrice: IArsArray,
  isLpData: boolean
) => {
  const newArray: IArs[] = [];

  if (data === undefined) {
    return [];
  }

  data.forEach((value, index) => {
    const formattedDate = formatDate(
      value.hourStartUnix === undefined ? value.date : value.hourStartUnix
    );

    const pePrice = getPePrice(value.reserve0, value.reserve1);

    if (value.reserve0.toString().length < MAX_LENGTH) {
      value.reserve0 = value.reserve0 + "0";
    }

    const fmtUSDCLiquidity: string = formatBalance(
      Number(value.reserve0.toString().replace(".", "")),
      6,
      8
    );

    if (isLpData) {
      newArray.push({
        date: formattedDate,
        price: parseFloat(fmtUSDCLiquidity)
      });
    } else {
      newArray.push({
        date: formattedDate,
        price:
          historicArsPrice[index]?.price !== undefined
            ? pePrice * historicArsPrice[index].price
            : 0
      });
    }
  });

  return newArray.reverse().sort();
};

export default createChartData;
