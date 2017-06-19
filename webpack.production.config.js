var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:{
        app:path.resolve(__dirname, 'app/index.jsx'),
        // 第三方库
        vendor:Object.keys(pkg.dependencies)
    },
    output:{
        path:__dirname + '/build',
        filename:'js/[name].[chunkhash:8].min.js'
    },
    resolve:{
        extensions:['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader?importLoaders=1',
                        'postcss-loader'
                    ]
                })
            },
            {
                test:/\.less$/,
                exclude:/node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        query:{
                            limit:5120,
                            name:'img/[name].[chunkhash:8].[ext]'
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        query:{
                            progressive: true
                        }
                    }
                ]
            },
            {
                test:/\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                use:[
                    {
                        loader:'url-loader',
                        query:{
                            limit:5120,
                            name:'fonts/[name].[chunkhash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // 行首版权信息
        new webpack.BannerPlugin('copyright by wulei_lalala@163.com'),
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'app/index.tmpl.html'),
            filename:'index.html'
        }),
        // 定义为生产环境，编译React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                // NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // new webpack.optimize.OccurenceOrderPlugin(),

        new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'js/[name].[chunkhash:8].min.js'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "manifest",
        //     minChunks: Infinity
        // }),
        // 定义全局变量 __DEV__
        new webpack.DefinePlugin({
            __DEV__:JSON.stringify(JSON.parse(process.env.NODE_ENV === 'dev') || 'false')
        })
    ]
}

