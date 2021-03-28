const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    strictMath: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1000,
                  name: 'static/images/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(eot|ttf|woff)/i,
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'file-loader',
            exclude: /\.(js|json|html|mjs|jsx|ts|tsx)$/i,
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.tsx?$/i,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ]
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' })
  ],
  resolve: {
    alias: {
      '~': path.resolve(process.cwd(), './src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
    ]
  },
};
