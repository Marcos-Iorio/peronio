import { motion } from "framer-motion";

const LoadingChart = () => {
  return (
    <>
      <div className="relative">
        <motion.svg
          id="e3Po0fvpDMC1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 750 250"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          className="opacity-75"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
            d="M185.063592,235.814918l18.209006-13.656755l17.450297,8.345794q26.554801-25.037385,28.072218-25.037385t31.107052,6.069669l16.691589,9.104503q18.209006-5.310961,18.209006-6.069669t18.967715-11.380628l33.383177-9.863213l19.726423-38.694138l37.935429,6.828377l22.761258,12.139337q51.592183-38.694138,52.350892-38.694138t38.694138-20.485132q29.589635,14.415464,30.348344,15.932881t16.691589,21.24384l34.900594,13.656755l18.209005-15.174172l26.554801-7.587086l29.589634-17.493761l37.935429-14.371999l16.476429,8.39605l24.663439-4.602508q43.904803-21.538112,42.48446-21.538112t35.508589-41.430615q24.145841,21.482541,25.566183,21.482541t22.432232-13.810204"
            transform="matrix(1.04907 0 0 0.971047-194.144662-11.150249)"
            fill="none"
            stroke="#31d0aa"
            stroke-width="5"
          />
        </motion.svg>

        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-Roboto mobile:text-xl laptop:text-2xl bg-black/50 rounded-md p-3">
          Cargando grafica...
        </h2>
      </div>
    </>
  );
};

export default LoadingChart;
