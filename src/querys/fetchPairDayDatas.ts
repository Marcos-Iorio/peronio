import { createClient } from "urql";

const URL = "https://api.thegraph.com/subgraphs/name/nlgonzalez/peronio-dapp";

const fetchPairDayDatas = async (time: number) => {
    const query = `
     query ($first: Int!) {
        pairDayDatas(
            first: 10
            where: {pairAddress: "0x93cbcad1f9642a80e38d980fb872215237d91794"}
            orderBy: date
            orderDirection: desc
        ) {
            reserve0
            reserve1
            date
        }
      }
    `;
  
    const client = createClient({
      url: URL
    });

    const data = await client.query(query, {time}).toPromise();

    return data;
}

export default fetchPairDayDatas