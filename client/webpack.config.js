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
      header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
/////////////////plugins/////////////////////////////////////////// ///////    
    plugins: [
      new HtmlWebpackPlugin({ // Generates default index.html
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest({ // Generates service-worker.js
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({ // Generates manifest.json
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          //////////////////////// icons ////////////////////////////////
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
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
