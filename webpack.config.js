const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin"); 

const miniCssExtract = new MiniCssExtractPlugin({
    filename: '../style/[name].css',
    ignoreOrder: process.env.NODE_ENV === 'development',
})
module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        index: './src/script/index.js',
        // vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'build/script'),
        filename: '[name].js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                include:[
                    path.resolve(__dirname, 'src/script')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: "../",
                        },
                    },
                    "css-loader",
                    "less-loader"
                ],
            }
        ]
    },
    plugins: [
        miniCssExtract,
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor'],
        // })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
          cacheGroups: {
            vendor: {
                test:  /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
          },
        },
        runtimeChunk:true
      },
      
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // }
}