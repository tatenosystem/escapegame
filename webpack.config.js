var path = require("path");
var pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
            {
                test: /phaser\.js$/,
                loader: "expose-loader",
                options: {
                    exposes:['phaser']
                }
            }
        ]
    },
    //webpack-dev-serverの起動設定(v4)
    devServer: {
        static: path.join(__dirname, ''),
        devMiddleware: {
            publicPath: '/dist/'
        },
        host: "127.0.0.1",
        port: 9000,
        open: true
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            phaser: phaser
        }
    }
};
