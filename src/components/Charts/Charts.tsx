import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
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
        <div className="p-5 xl:basis-4/5 border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 backdrop-blur-sm rounded-md xl:min-h-[25rem] xl:max-w-[80%] h-full flex flex-col">
          <div className="flex flex-row w-full justify-between">
            <div>0%</div>
            <div>Precio PE/ARS</div>
            <div>Semanal | Diario | Mensual</div>
          </div>
          <ResponsiveContainer className="h-[20rem] w-full">
            <AreaChart
              width={300}
              height={200}
              data={data}
              margin={{
                top: 40,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <Area
                type="linear"
                dataKey="uv"
                stroke="#110d63"
                fill="#483ff3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 xl:basis-1/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm">
          s
        </div>
      </div>
      <div className="flex flex-row gap-5 min-w-full flex-nowrap flex-grow-0-1">
        <div className="p-5 xl:basis-1/5 w-full border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 backdrop-blur-sm rounded-md h-full min-h-[20em]">
          asda
        </div>
        <div className="p-5 xl:basis-2/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm ">
          s
        </div>
        <div className="p-5 xl:basis-2/5 min-w-max border-solid border-2 border-[#00B7C2] bg-[#0B4D76]/50 rounded-md backdrop-blur-sm ">
          s
        </div>
      </div>
    </>
  );
};

export default Charts;
