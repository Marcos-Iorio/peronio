import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import usePeronioRead from "../../hooks/usePeronioRead";

const dataEx = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Charts = () => {
  return (
    <>
      <div className="flex flex-row gap-5 min-w-full max-w-max">
        <div className="p-5 xl:basis-4/6 2xl:basis-4/5 border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 backdrop-blur-sm rounded-md xl:min-h-[20rem] 2xl:min-h-[25rem] xl:max-w-[80%] flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row gap-3">
              <div className="font-Roboto xl:text-3xl font-bold">1.60</div>
              <div className="font-Roboto text-lg">1.8%</div>
            </div>
            <div className="font-Roboto xl:text-2xl font-bold">
              Precio PE/ARS
            </div>
            <div className="flex flex-row rounded-md border-solid border-[#00B7C2] border-2 bg-[#0B86D2]/20 backdrop-blur-sm gap-3 p-2">
              <div className="font-Abril text-lg font-normal  bg-[#0B4D76] hover:bg-[#06304b] p-2 rounded-md">
                24H
              </div>
              <div className="font-Abril text-lg font-normal bg-[#0B4D76] hover:bg-[#06304b] p-2 rounded-md">
                1W
              </div>
              <div className="font-Abril text-lg font-normal  bg-[#0B4D76] hover:bg-[#06304b] p-2 rounded-md">
                1M
              </div>
            </div>
          </div>
          <ResponsiveContainer className="xl:h-[15rem] 2xl:h-[20rem] w-full">
            <AreaChart
              width={300}
              height={200}
              data={dataEx}
              margin={{
                top: 40,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <Area
                type="linear"
                dataKey="uv"
                fillOpacity={1}
                stroke="#82ca9d"
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 xl:basis-2/6 2xl:basis-1/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm">
          s
        </div>
      </div>
      <div className="flex flex-row gap-5 min-w-full flex-nowrap flex-grow-0-1">
        <div className="p-5 xl:basis-2/6 2xl:basis-1/5 w-full border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 backdrop-blur-sm rounded-md h-full min-h-[20em]">
          asda
        </div>
        <div className="p-5 xl:basis-2/6 2xl:basis-2/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm ">
          s
        </div>
        <div className="p-5 xl:basis-2/6 2xl:basis-2/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm ">
          s
        </div>
      </div>
    </>
  );
};

export default Charts;
