import { useEffect, useState } from "react";

const USD_URL = "https://api.bluelytics.com.ar/v2/latest";

const useARSPrice = () => {
  const [price, setPrice] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch(USD_URL);
      const data = await response.json();
      setPrice(data.blue?.value_avg);
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
