const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development", // development or production
  entry: "./index.js", // a main file which imports and have links with other files need to bundle
  output: { // where the bundle file will be and which file(filename)
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  // change webpack server port
  devServer: {
    port: '8000'
  },
  module: { // we need to tell webpack to use babel to transpile the code
    rules: [
      {
        test: /\.(js|jsx)$/, // look for all files that ends with .js or .jsx and bundle those file
        exclude: /node_modules/, // don't bundle files inside node_modules
        use: { // what is the loader i want to use?
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ // this html-webpack-plugin will take the index.html as a template and it will add to it a script tag with the bundled source file
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
