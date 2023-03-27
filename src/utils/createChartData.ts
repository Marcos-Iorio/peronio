import { isEqual } from "date-fns";
import formatDate from "./formatDate";
import getPePrice from "./getPePrice";

interface IReserves {
    reserve0: number,
    reserve1: number,
    hourStartUnix: number;
}

interface IReservesArray {
    reserves: IReserves[];
}

interface IArs{
    date: string,
    price: number;
}

interface IArsArray {
    prices: IArs[];
}

const createChartData = (data: IReservesArray, historicArsPrice: IArsArray) => {
    const newArray:IArs[] = [];

    data.reserves.forEach((value, index) => {
        const formattedDate = formatDate(value.hourStartUnix);
        const pePrice = getPePrice(value.reserve0, value.reserve1);

        if(formattedDate === historicArsPrice.prices[index].date){
            newArray.push({date: historicArsPrice.prices[index].date, price: pePrice * historicArsPrice.prices[index].price});
        }
    });

    return newArray;

}

export default createChartData;