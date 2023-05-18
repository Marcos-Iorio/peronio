import { useEffect, useState } from "react";

const USD_URL = "https://criptoya.com/api/usdt/ars/0.1";

const useARSPrice = () => {
  const [price, setPrice] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch(USD_URL);
      const data = await response.json();

      console.log();
      setPrice(data["lemoncash"].ask);
    } catch (e: any) {
      setPrice(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return price;
};

export default useARSPrice;
