var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry:path.resolve(__dirname, 'app/index.jsx'),
    output:{
        path:__dirname + '/dist',
        publicPath:'/',
        filename:'js/bundle.js'
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
                use:[
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                exclude:/node_modules/,
                use:[
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        query:{
                            limit:5120
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
                            limit:5120
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, 'app/index.tmpl.html'),
            filename:'index.html'
        }),
        new OpenBrowserPlugin({
            url:'http://localhost:8080'
        }),
        // 定义全局变量 __DEV__
        new webpack.DefinePlugin({
            __DEV__:JSON.stringify(JSON.parse(process.env.NODE_ENV === 'dev') || 'false')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        proxy:{
            '/api': {
                target:'http://localhost:5000',
                secure:false
            }
        },
        contentBase:__dirname + '/dist',
        publicPath: '/',
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             from:/^\/*.js$/,
        //             to:function(context) {
        //                 console.log(context)
                             
        //                 // return context.parsedUrl.pathname;
        //                 return 'bundle/js'
        //             }
        //         }
        //     ]
        // },
        historyApiFallback: true,
        inline:true,
        hot:true
    }
}