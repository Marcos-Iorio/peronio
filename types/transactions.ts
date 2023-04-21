import { Dispatch, SetStateAction } from "react"

export interface ITransactionContext {
    hasAllowance: boolean,
    allowanceLeft: number,
    hasApproved: boolean,
   setAllowanceLeft?: Dispatch<SetStateAction<number>>
   setHasApproved?: Dispatch<SetStateAction<boolean>>
}

export interface ITransactionContextProvider {
    children: React.ReactNode
}