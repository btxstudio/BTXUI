const path = require("path")
const ExtractText = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        "btx.webapp": "./src/sass/btx.webapp.scss",
        "btx": "./src/sass/btx.scss",
        "btx.mob": "./src/sass/btx.mob.scss",
        "btx.pad": "./src/sass/btx.pad.scss",
    },
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
            filename: `[name].min.css`
        })
    ]
}