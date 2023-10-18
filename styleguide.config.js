const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoader = require("vue-loader");

module.exports = {
  // set your styleguidist configuration here
  title: "Default Style Guide",
  components: "src/components/**/[A-Z]*.vue",
  defaultExample: true,
  sections: [
    {
      name: "First Section",
      components: "src/components/**/[A-Z]*.vue",
    },
  ],
  require: [
    // Components style
    path.join(__dirname, "./src/styles/styles.scss"),
    // // Custom doc style
    // path.join(__dirname, 'src-style/stylesheets/app.scss')
  ],
  webpackConfig: {
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: "vue-loader",
        //   options: {
        //     loaders: {
        //       scss: ["vue-style-loader", MiniCssExtractPlugin.loader],
        //     },
        //   },
        // },
        // {
        //   test: /\.js?$/,
        //   exclude: /(node_modules|packages)/,
        //   loader: "babel-loader",
        // },
        // {
        //   test: /\.(css?|scss)(\?.*)?$/,
        //   use: [MiniCssExtractPlugin.loader, "css-loader"],
        // },
        {
          test: /\.scss$/,
          use: ["vue-style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(), new vueLoader.VueLoaderPlugin()],
  },
  // webpackConfig: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.scss$/,
  //         use: ["style-loader", "css-loader", "sass-loader"],
  //       },
  //     ],
  //   },
  // },
  usageMode: "expand",
  exampleMode: "expand",
  styleguideDir: "dist",
};
