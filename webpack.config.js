const CopyPlugin = require('copy-webpack-plugin');

/**
 * @type import("webpack").Configuration
 */
module.exports = {
  mode: process.env.NODE_ENV || 'development',
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
