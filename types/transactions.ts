import { Dispatch, SetStateAction } from "react";

export interface ITransactionContext {
  hasAllowance: boolean;
  allowanceLeft: string;
  hasApproved: boolean;
  setAllowanceLeft?: Dispatch<SetStateAction<string>>;
  setHasApproved?: Dispatch<SetStateAction<boolean>>;
  setHasAllowance?: Dispatch<SetStateAction<boolean>>;
}

export interface ITransactionContextProvider {
  children: React.ReactNode;
}
