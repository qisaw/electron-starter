const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");

const postCSSImport = require("postcss-import");
const postCSSNext = require("postcss-cssnext");
const postCSSReporter = require("postcss-reporter");
const rucksack = require("rucksack-css");
const cssnano = require("cssnano");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

const NODE_ENV = process.env.NODE_ENV;

const isProducion = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'dev';

const entry = {
  app: [
    ...(isDevelopment? [ "react-hot-loader/patch" ]: []),
    "babel-polyfill",
    "./app.js"
  ],
};
const output = {
  path: path.join(__dirname, "/dist"),
  filename: "bundle.js",
};
const devtool = isDevelopment ? "cheap-module-eval-source-map" : "cheap-module-source-map";

const jsLoaders = {
  test: /\.jsx?$/,
  exclude:[
    path.join(__dirname, "/node_modules")
  ],
  loader: "babel-loader",
}
const cssLoaders = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    { loader: "style-loader" },
    {
      loader: "css-loader",
      query: {
        sourceMap: true,
        minimize: true,
        camelCase: true,
        modules: true,
        importLoaders: true,
        localIdentName: "[name]__[local]__[hash:base64:5]",
      },
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: _webpack => [
          postCSSImport({
            addDependencyTo: _webpack,
            path: ["./styles"],
          }),
          postCSSNext({
            features: {
              rem: {
                rootValue: "14px",
              },
            },
          }),
          rucksack(),
          cssnano({
            autoprefixer: false,
            discardComments: {
              removeAll: true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true,
          }),
          postCSSReporter(),
        ],
      }
    }
  ]
}
const productionCssLoaders = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: cssLoaders.use.slice(1),
  }),
}
const devServer =  {
  contentBase: "./",
  historyApiFallback: true,
  hot: true,
  inline: true,
  stats: {
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkModules: false,
    colors: true,
    hash: false,
    reasons: true,
    timings: true,
    version: false,
  },
};

const developmentPlugins = [
  new HotModuleReplacementPlugin(),
];
const productionPlugins = [
  new ExtractTextPlugin("styles.css"),
  new UglifyJsPlugin({
    comments: false,
    compress: {
      dead_code: true,
      screw_ie8: true,
      unused: true,
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
  })
];
const plugins = [
  ...(isDevelopment? developmentPlugins : []),
  ...(isProducion? productionPlugins : []),
  new ProgressPlugin(),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: !isDevelopment,
  }),
  new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    hash: false,
    inject: "body",
    template: "./index.html",
  })
];

module.exports = {
  entry,
  output,
  devtool,
  module: {
    rules: [
      jsLoaders,
      isDevelopment? cssLoaders : productionCssLoaders,
    ],
  },
  devServer,
  plugins,
};

//if (isTest) {
//  config.devtool = "inline-source-map";

//  config.module.rules.push(
//    rules.json,
//    rules.css
//  );

//  config.externals = {
//    jsdom: "window",
//    "react/addons": true,
//    "react/lib/ExecutionEnvironment": true,
//    "react/lib/ReactContext": true,
//  };
//}
