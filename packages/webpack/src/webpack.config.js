const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.STAGING_ENV === "prod";
const IS_DEV = process.env.STAGING_ENV === "dev";

const DEFAULT_DEVSERVER = {
  port: PORT,
  client: { overlay: false },
  compress: true,
};

const DEFAULT_OUTPUT = {
  filename: IS_PROD ? "[name].[contenthash:8].js" : "[name].bundle.js",
  chunkFilename: IS_PROD
    ? "[name].[contenthash:8].chunk.js"
    : "[name].chunk.js",
};

const webpackConfig = ({
  devServer = {},
  output = {},
  rules = [],
  plugins = [],
  rest = {},
}) => {
  console.log("configs-webpack __dirname:", __dirname);

  return {
    entry: "./src/index.tsx",
    mode: IS_PROD ? "production" : "development",
    output: {
      ...DEFAULT_OUTPUT,
      ...output,
    },
    devServer: {
      ...DEFAULT_DEVSERVER,
      ...devServer,
    },
    devtool: IS_DEV ? "source-map" : false,
    module: {
      rules,
    },
    // experiments: {
    //   asyncWebAssembly: true,
    // },
    resolve: { extensions: [".js", ".ts", ".tsx"] },
    plugins,
    ...rest,
  };
};

module.exports = (params) => webpackConfig(params);
