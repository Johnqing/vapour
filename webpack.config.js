const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const node_modules = path.resolve(__dirname, 'node_modules');
const appRoot = path.join(__dirname, 'src');
/**
 * 自动查找目录生成entry123
 */
var chunks = [];
function getEntry() {
    var dir = appRoot;
    var entry = path.join(dir, 'vapour.js');
    var files = {};
    glob.sync(entry).forEach((file, index) => {
        var name = file.replace(dir, '').substring(1);
        var matchs = name.match(/(.+)\.js$/);
        chunks.push(matchs[1]);
        files[matchs[1]] = file;
    });
    return files;
}
var entry = getEntry();
/**
 * 生成map，在上生产前用来做替换用
 */
function chunkList() {
    this.plugin('done', function (stats) {
        // 获取文件列表
        var filemaps = stats.toJson();
        var filemapsStr = JSON.stringify(filemaps.assetsByChunkName);
        // 生成编译文件的maps
        fs.writeFileSync(path.join(__dirname, 'build', 'assets.json'), filemapsStr);
    });
}

var plugins = [];
var output = {
    path: path.join(__dirname, 'src'),
    filename: '[name].js'
};

var devtool = 'source-map';
if (process.env.NODE_ENV === 'production') {
    plugins.push(
        chunkList,
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
    output.filename = '[name].js';
    devtool = null;
    console.log('[name].css');
} else {
    plugins.push(
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    )
}

var cssLoader = 'css!autoprefixer!less?sourceMap';
var directories = path.join(__dirname, appRoot, 'directories');
module.exports = {
    target: 'web',
    cache: true,
    entry: entry,
    output: output,
    resolve: {
        root: appRoot,
        extensions: ['', '.js', '.jsx', '.less', '.css', '.html']
    },
    module: {
        preLoaders: [
            {
                test: /\.js|jsx$/,
                exclude: node_modules,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2015-loose'],
                    "plugins": [
                        "add-module-exports"
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.less$/,
                loader: `style!${cssLoader}`
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(cssLoader)
            },
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/,
                loader: 'url-loader',
                query: {
                    limit: '1'
                }
            }
        ]
    },
    plugins: plugins,
    devtool: devtool
};
