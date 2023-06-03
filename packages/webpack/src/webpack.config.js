const PORT = process.env.PORT || 3000;

const DEFAULT_DEVSERVER = {
  port: PORT,
  client: { overlay: false },
  compress: true,
};

const DEFAULT_OUTPUT = {
  filename: isProd ? "[name].[contenthash:8].js" : "[name].bundle.js",
  chunkFilename: isProd ? "[name].[contenthash:8].chunk.js" : "[name].chunk.js",
};

const webpackConfig = ({
  devServer = DEFAULT_DEVSERVER,
  output = DEFAULT_OUTPUT,
  rules = [],
  rest = {},
}) => {
  const isProd = process.env.STAGING_ENV === "prod";
  const isDev = process.env.STAGING_ENV === "dev";

  console.log("configs-webpack __dirname:", __dirname);

  return {
    entry: "./src/index.tsx",
    mode: isProd ? "production" : "development",
    output,
    devServer,
    devtool: isDev ? "source-map" : false,
    module: {
      rules,
    },
    // experiments: {
    //   asyncWebAssembly: true,
    // },
    resolve: { extensions: [".js", ".ts", ".tsx"] },
    ...rest,
  };
};

module.exports = (params) => webpackConfig(params);
