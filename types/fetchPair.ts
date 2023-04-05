export interface IReserves {
  reserve0: string | number;
  reserve1: number;
  hourStartUnix: number;
  date: number;
}

export type IReservesArray = IReserves[];

export interface IArs {
  date: Date | string | number;
  price: number;
}

export type IArsArray = IArs[];
