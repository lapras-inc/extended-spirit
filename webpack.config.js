const { EnvironmentPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

/**
 * @type import("webpack").Configuration
 */
module.exports = {
  mode,
  devtool: 'inline-source-map',
  entry: {
    event: `${__dirname}/src/event.ts`,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new EnvironmentPlugin({
      MODE: mode,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    }),
  ],
};
