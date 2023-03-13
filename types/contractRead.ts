export interface IDataReserves {
  reserve0: IDataAttributes;
  reserve1: IDataAttributes;
  blockTimestampLast: number;
}

export interface IDataAttributes {
  _hex: string;
  _isBigNumber: boolean;
}

export interface IReturnedContract {}
