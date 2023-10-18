const path = require("path");
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
    path.join(__dirname, "src/assets/variables.scss"),
    // // Custom doc style
    // path.join(__dirname, 'src-style/stylesheets/app.scss')
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["style-loader", "sass-loader", "css-loader"],
        },
      ],
    },
  },
  exampleMode: "expand",
};
