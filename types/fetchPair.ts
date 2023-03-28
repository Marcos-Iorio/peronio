export interface IReserves {
    reserve0: number;
    reserve1: number;
    hourStartUnix: number;
}

export type IReservesArray = IReserves[];

export interface IArs {
date: Date | string;
price: number;
}

export type IArsArray = IArs[];