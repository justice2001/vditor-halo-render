const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node-modules/"
            }
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index.js'],
            filename: "index.html",
            template: "./demo/index.html"
        })
    ],
    devServer: {
        port: 9000,
        host: "0.0.0.0"
    }
}
