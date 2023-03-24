import { useState, useEffect } from "react";
import { PairDataTimeWindowEnum } from "../../types/utils";
import { createClient } from "urql";

const URL = "https://api.thegraph.com/subgraphs/name/nlgonzalez/peronio-dapp";

const useFetchedPairAddress = () => {
  const [pairData, setPairData] = useState([]);

  const query = `
   query {
      pairs(where: {id: "0x93cbcad1f9642a80e38d980fb872215237d91794"}) {
        pairHourData(first: 24, orderBy: hourStartUnix, orderDirection: desc) {
          reserve0
          reserve1
          hourStartUnix
        }
      }
    }
  `;

  const client = createClient({
    url: URL
  });

  const fetchData = async () => {
    const response = await client.query(query, {}).toPromise();
    setPairData(response.data.pairs[0].pairHourData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return pairData;
};

export default useFetchedPairAddress;
