import { createClient } from "urql";

const URL = "https://api.thegraph.com/subgraphs/name/nlgonzalez/peronio-dapp";

const fetchPairHourDatas = async (time: number) => {
    const query = `
     query ($time: Int!) {
      pairHourDatas(
        first: $time
        where: {pair: "0x93cbcad1f9642a80e38d980fb872215237d91794"}
        orderBy: hourStartUnix
        orderDirection: desc
      ) {
        reserve0
        reserve1
        hourStartUnix
      }
      }
    `;
  
    const client = createClient({
      url: URL
    });

    const data = await client.query(query, {time}).toPromise();

    return data;
}

export default fetchPairHourDatas