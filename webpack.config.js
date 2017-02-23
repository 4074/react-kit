var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {
    var isDevelopment = !(env && env.release)
    return {
        target: 'web',
        entry: {
            bundle: './src/index.js'
        },
        output: {
            filename: isDevelopment ? '[name].js' : 'bundle/[name]' + '.[chunkhash:8].js',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(__dirname, 'src')],
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src')
            ],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
                }
            }),

            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource)
            }),

            ...isDevelopment ? [] : [
                new webpack.optimize.UglifyJsPlugin({
                    text: /\.jsx?$/,
                    sourceMap: true,
                    compress: {
                        warnings: false
                    }
                })
            ]
        ],

        node: {
            console: false,
            global: false,
            __dirname: false
        },

        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 8090
        }
    }
}