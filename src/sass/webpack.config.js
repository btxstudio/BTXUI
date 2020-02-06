const path = require("path")
const ExtractText = require("extract-text-webpack-plugin")

module.exports = {
    entry: "./src/sass/main.js",
    output: {
        filename: "_main.js",
        path: path.join(__dirname, "../css")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractText.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractText({
            filename: `btx.min.css`
        })
    ]
}