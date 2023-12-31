### React app setup with cra(create-react-app

### Tools & technologies needed for the setup

- **Node.js** -> Javascript runtime which allow us to run javascript on the server
- **Babel Transpiler** -> Transpiler convert a type of source code to another type of source code. Babel transpile react, newer EcmaScript features, typescripts etc to old javascript, since all browser don't understand newer javascript features and react code or typescript
- **Webpack Bundler** -> Bundler bundles different react code files into one file. When we create react app, we don't write code in one file, instead we create different files to write code and use es6 module system(import/export) to use other files code. And since all browser don't support this module system, bundler does the thing of bundling all files code into one file.
- **VS code** as code editor

### Instructions

- initialize a node project by 'npm init'
- install `react` and `react-dom` package from using npm `npm install --save react react-dom`
- create `public/index.html` file, inside index.html file body tag create a div with id of root
  - `<div id="root"> <div>`
- create `src/App.js` file, here `App.js` is a react component

```js
import React from "react";
export default function App() {
  return (
    <>
      <h1>React App without cra</h1>
    </>
  );
}
```

- create `index.js` in the root directory of the project, this would be the main file of react app

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- Since we will be writing jsx which react can understand but not our browser, so we need to transpile this jsx code into javascript using `Babel Transpiler`
- At the same time we need to bundle all the files into one file, for bundling we'll use `Webpack Bundler`

- Install all `babel` dependency we'll going to need for our react app

  - `npm install @babel/core @babel/preset-env @babel/preset-react babel-loader @babel/cli --save-dev`
  - `@babel/core` -> main package
  - `@babel/preset-env` -> this is what we need to use to transpile es6 javascript to old javascript, that's gonna support all the browsers
  - `@babel/preset-react` -> transpile `react jsx` code into `javascript`
  - `babel-loader` -> when we setup webpack we need to use `babel` to transpile the code before we **bundle** it with webpack
  - `@babel/cli`(optional) -> if we want to transpile our code using command line

- Install all `webpack` dependency

  - `npm install webpack webpack-cli webpack-dev-server --save-dev`
  - `webpack` -> this is the main package we need to install in order to use webpack
  - `webpack-cli` -> to run webpack commands on the command line interface
  - `webpack-dev-server` -> this is the webpack server that we need to use as a server in development same as nodemon/live-server

- Webpack configuration
  - create `webpack.config.js` in the root directory

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development", // development or production
  entry: "./index.js", // a main file which imports and have links with other files need to bundle
  output: {
    // where the bundle file will be and which file(filename)
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  // change webpack server port
  devServer: {
    port: "8000",
  },
  module: {
    // we need to tell webpack to use babel to transpile the code
    rules: [
      {
        test: /\.(js|jsx)$/, // look for all files that ends with .js or .jsx and bundle those file
        exclude: /node_modules/, // don't bundle files inside node_modules
        use: {
          // what is the loader i want to use?
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // this html-webpack-plugin will take the index.html as a template and it will add to it a script tag with the bundled source file
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
```

- Running webpack server
  - first go to the script section of `package.json` file and add script for running development server and building for production

```js
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
},
```
