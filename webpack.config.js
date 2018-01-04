const webpack = require('webpack');
const path = require('path');

var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');

var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        main: './src/main.ts',
        vendor: ['pixi', 'p2', 'phaser']
    },
    output: {
        filename: './dist/[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' /* chunkName= */ ,
            filename: 'dist/vendor.js' /* filename= */
        })
        // new webpack.optimize.UglifyJsPlugin() /* 压缩插件用于减少脚本体积  */
    ],
    devtool: 'source-map',
    module: {
        loaders: [{
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }

}