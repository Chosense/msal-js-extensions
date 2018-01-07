const path = require("path");

module.exports = {
    entry: './src/MsalTokens.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [
            // "node_modules",
            // "DevApps"
          ]
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