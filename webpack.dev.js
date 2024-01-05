const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    watch: true,
    entry: {
        "index.js": './demo/index.js'
    },
    output: {
        path: path.resolve(__dirname, "demo/dist"),
        filename: "[name]"
    },
    resolve: {
        extensions: ['.js', '.ts', '.png', '.less'],
    },
    module: {
        rules: [
            {
                test: /.(woff2?|eot|ttf|otf)(.*)?$/,
                exclude: "/node-modules/",
                loader: "file-loader"
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node-modules/"
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            url: false,
                        },
                    },
                    "less-loader"
                ]
            }
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index.js'],
            filename: "index.html",
            template: "./demo/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/fonts", to: "fonts"},
                {from: "src/icons", to: "icons"},
                {from: "types", to: ""}
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname , 'assets'),
        },
        port: 9000,
        host: "0.0.0.0"
    }
}
