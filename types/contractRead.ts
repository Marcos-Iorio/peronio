export interface IData {
  reserve0: IReserve;
  reserve1: IReserve;
  blockTimestampLast: number;
}

interface IReserve {
  _hex: string;
  _isBigNumber: boolean;
}
