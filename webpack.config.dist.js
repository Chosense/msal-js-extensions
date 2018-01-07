const path = require("path");

module.exports = {
    entry: './src/MsalService.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader?silent=true',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'msal-js-extensions.js',
      path: path.resolve(__dirname, 'dist')
    }
  };