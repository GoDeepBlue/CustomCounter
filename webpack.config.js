/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
  'react-native-swipe-list-view',
  'react-native-keyboard-aware-scroll-view',
  'react-native-vector-icons',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.js'), // Change this to your main App file
    path.resolve(__dirname, 'screens'),

    // path.resolve(__dirname, 'node_modules/react-native-fast-image'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        '@babel/preset-react',
        { plugins: ['@babel/plugin-proposal-class-properties'] },
      ],
      plugins: ['react-native-web'],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: "url-loader", // or directly file-loader
  include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    new webpack.DefinePlugin({ process: { env: {} } }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};
