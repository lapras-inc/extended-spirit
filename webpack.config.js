const { EnvironmentPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

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
    new GenerateJsonPlugin('manifest.json', {
      name: `extended-spirit${isProduction ? '' : `(${mode})`}`,
      version: '1.0',
      manifest_version: 2,
      background: {
        scripts: ['event.js'],
      },
      permissions: ['contextMenus', 'cookies', '*://app.holaspirit.com/'],
    }),
    new ZipPlugin({
      path: '..',
      filename: 'extension.zip',
    }),
  ],
};
