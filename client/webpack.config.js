const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// DONE: Add and configure workbox plugins for a service worker and manifest file.
const { InjectManifest } = require('workbox-webpack-plugin');


// DONE: Add CSS loaders and babel to webpack.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


////////////// module exports ////////////////////////////////////////////////////////////
module.exports = () => {
  return { 
    mode: 'development', 
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
/////////////////plugins/////////////////////////////////////////// ///////    
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
          {
            src: path.resolve('src/assets/large-icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
          },
          {
            src: path.resolve('src/assets/maskable-icon.png'),
            size: '1024x1024',
            purpose: 'maskable'
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],
//////////////end plugins////////////////////////////////////////////////////////

//////////////module rules mini css extract plugins////////////////////////////////////////////////////////
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          },
        }
        
      ],
    },
//////////////end module rules////////////////////////////////////////////////////////    
  };
};
