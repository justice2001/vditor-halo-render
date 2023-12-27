const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        "index": "./src/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: 'HaloJs',
        libraryExport: 'default',
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', 'png'],
    },
    module: {
        rules: [
            {
                test: /.(woff2?|eot|ttf|otf)(.*)?$/,
                exclude: "/node-modules/",
                loader: "file-loader"
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/env',
                                {
                                    targets: {
                                        browsers: [
                                            'last 2 Chrome major versions',
                                            'last 2 Firefox major versions',
                                            'last 2 Safari major versions',
                                            'last 2 Edge major versions',
                                            'last 2 iOS major versions',
                                            'last 2 ChromeAndroid major versions',
                                        ],
                                    },
                                },
                            ],
                        ],
                    },
                },
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/fonts", to: "fonts"}
            ]
        })
    ],
    mode: "production"
}
