const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker 
// and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      publicPath: '',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'IndexedDB'
      }),

      new WebpackPwaManifest({
        name: 'My Web App',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: 'black',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          }],
        filename: "./manifest.json"
      })
    ],

    module: {
      rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },


      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },

      ],
    },
  };
};
