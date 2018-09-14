/**
 * Created by Administrator on 2016/9/18.
 */

const webpack = require("webpack");
const os = require("os");
const devConf = require("./hdx-dev-conf");
const path = require('path');

//配置默认文件
let entry = devConf.webpack.entry ? devConf.webpack.entry : {
};

const entryKeyList = Object.keys(entry);
const chunkFilename = devConf.webpack.chunkFilename?devConf.webpack.chunkFilename:'[id]-chunk.js';
const publicPath = devConf.webpack.publicPath?devConf.webpack.publicPath:'/Content/v2.0/dist/js';
let plugins =[];

module.exports = function (ops = {}) {

    let webpackConf = {
        entry,
        externals: {
            "jquery": "jQuery",
            "zepto": "Zepto",
            "@": "dev",
        },
        output: {
            filename: "[name]/[name].js",
            chunkFilename: chunkFilename,
            path: path.resolve(__dirname, 'dist/js'),
            publicPath: publicPath,
        },
        watch: true,
        module: {
            rules: [
                // ...([createLintingRule()]),

                {
                    test: /\.js$/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'eslint-loader',
                            options: {
                                emitWarning: true,
                                emitError: true,
                                failOnError: true
                            }
                        },
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/, use: ["style-loader","css-loader"]
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192'
                },
                {
                    test: /\.vue$/,
                    use:[
                        {
                            loader: 'vue-loader',
                            options: {
                                cssSourceMap:false,
                                transformToRequire:{},
                            },
                        },
                        {
                            loader: 'eslint-loader',
                            options: {
                                emitWarning: true,
                                emitError: true,
                                failOnError: true,

                            }
                        },
                    ],
                    exclude: /node_modules/
                },
            ],
        },
        // devServer: {
        //     proxy: { // proxy URLs to backend development server
        //         '/api': 'http://localhost:3000'
        //     },
        //     contentBase: path.join(__dirname), // boolean | string | array, static file location
        //     compress: true, // enable gzip compression
        //     hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        //     https: false, // true for self-signed, object for cert authority
        //     noInfo: false,
        //     watchOptions: {
        //         poll: true,
        //         ignored: ['/node_modules/','./dev/sass/**/*.*'],
        //         progress: true,
        //     },
        //     // ...
        // },
        plugins: plugins,
        // devtool:'source-map'
        devtool: 'eval-source-map',
    };

    if (ops.env == "production"||process.env.NODE_ENV == 'production') {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            cache: true,
            sourceMap: true,
            compress: {
                warnings: false,
                pure_funcs: [ 'console.log' ]
            }
        }));
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }));

        webpackConf['devtool'] = 'source-map';//开发模式生成sourcemap文件
    }


    return webpackConf;
};



