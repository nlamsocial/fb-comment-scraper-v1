const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
                test: /\.css$/i,
            },
        ],
    },
    resolve: { extensions: ['.jsx', '.js'] },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        ...getHtmlPlugins(['popup']),
    ],
    entry: {
        popup: path.resolve(__dirname, 'src', 'popup', 'index.js'),
        // contentScript: path.resolve(__dirname, 'src', 'content', 'contentScript.js'),
        // background: path.resolve(__dirname, 'src', 'background', 'background.js'),
    },
    output: {
        filename: '[name].js',
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    stats: {
        errorDetails: true,
        children: true,
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HtmlPlugin({
                title: 'react-comment-scarping-v1',
                filename: `${chunk}.html`,
                chunks: [chunk],
            }),
    );
}
