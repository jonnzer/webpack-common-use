// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const glob = require('glob');

let webpackConfig = {
    mode: "development",
    entry: {
        "app": __dirname + "/app/main.js",//已多次提及的唯一入口文件
        // one: __dirname + "/app/one.js",
        "hdx": __dirname + "/dev/js/hdx/index.js"
    },
    output: {
        path: __dirname + "/build/dist/",
        filename: "[name]-[hash].js",
      //  publicPath: "http://www.baidu.com/js/"  // cdn连接前缀
    },
    devtool: 'null', // eval-source-map
    devServer: {
        contentBase: path.join(__dirname, "./build/dist"), //本地服务器所加载的页面所在的目录
        host: "127.0.0.1",
        port: "8089",
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }],
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        // }),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
};


// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        var split = filepath.split('/');
        var name = split[split.length - 2];

        entries[name] = './' + filepath;
    });

    return entries;
}

var entries = getEntries('dev/js/**/index.js');

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './template.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;