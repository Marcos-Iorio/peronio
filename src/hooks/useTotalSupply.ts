import usePeronioRead from "./usePeronioRead";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { IDataAttributes } from "../../types/contractRead";

const useTotalSupply = (): number => {
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const { data }: { data: IDataAttributes | undefined } = usePeronioRead(
    undefined,
    "totalSupply"
  );

  useEffect(() => {
    const BnValue = Number(data?._hex);
    setTotalSupply(BnValue);
  }, [data]);

  return totalSupply;
};

export default useTotalSupply;
