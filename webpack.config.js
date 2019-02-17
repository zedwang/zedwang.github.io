
const path = require('path')
module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
      app: ['./index.js']
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    },
    output: {
      filename: '[name].[hash].js',
      path: __dirname,
      libraryTarget: 'window'
  },
    optimization: {
      splitChunks: {
        cacheGroups: {
            commons: {
              chunks: 'initial',
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
            }
          },
          chunks: 'all',
          automaticNameDelimiter: '.'
        }
      },
    module: {
      strictExportPresence: true,
  
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-env', {
                    "targets": ["last 2 versions", "ie >= 11"],
                    "useBuiltIns": 'usage'// use @babel/polyfill on global scope
                  }]
                  ],
                plugins: [
                  ['@babel/plugin-proposal-decorators',{ decoratorsBeforeExport: true}],
                  ['@babel/plugin-proposal-class-properties',{loose: true}],
                  '@babel/plugin-proposal-export-default-from',
                  '@babel/plugin-proposal-object-rest-spread',
                  "@babel/plugin-syntax-dynamic-import"
                ],
              }
            },
          ]
        },
        {
          test: /\.(scss|css)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[name].[hash].css'
                  }
              },
              {
                  loader: "extract-loader"
              },
              {
                loader: "css-loader"
              },
              {
                loader: 'sass-loader'
              }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    plugin: [
        
    ],
    resolve: {
      extensions: ['.js'],
      modules: ['node_modules', 'src'],
      alias: {
      }
    },
}
