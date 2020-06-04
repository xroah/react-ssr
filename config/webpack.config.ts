import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [{
            test: /\.(?:tsx?)|(?:jsx)$/,
            use: "babel-loader"
        }]
    },
    plugins: [new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "../index.html")
    })]
};

export default config;