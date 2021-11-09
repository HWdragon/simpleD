// resolve用来拼接绝对路径的方法
const { resolve } = require("path"); 
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    // 入口起点
    entry: "./src/index.js",
    // 输出
    output: {
        // 输出文件名
        filename: "build.js",
        // 输出路径
        // __dirname 是nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, "build")
    },
    // loader的配置
    module: {
        rules: [
            // 详细loader配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader进行处理,use数组的执行顺序是从右往左，从下到上
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                // 配置less的loader
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // less-loader能将less文件编译成css文件
                    "less-loader"
                ]
            },
            {
                // 要打包的第三方模块
                test: /\.(js|jsx)?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
                // include: path.resolve(__dirname, 'src')
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 图片大小限制，小于该值则会被处理为base64编码，优点是减少请求数量，缺点是打包体积会更大
                            limit: 10 * 1024,  // 单位是b, 一般用kb描述，因此乘以1024
                            // url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，因此需要改为false
                            esModule: false,
                            // name: '[hash:10].[ext]'  // 自定义打包后的图片名，即hash取前十位，后缀名不变
                        }
                    }
                ],
                type: 'javascript/auto'
            },
            {
                // 处理html中的图片资源
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    // 显示错误的来源
    devtool: 'eval',
    // 配置devServer
    devServer: {
        // contentBase: './src',   // 在打包过程中，我们找不到的资源，就到我们指定的目录下寻找 => 一般不必设置它
        hot: true,   //热更新
        open: true, //编译完自动打开浏览器
        // compress: true   //开启gzip压缩  => 这个属性到底是影响了哪里的压缩？？？
    },
    // plugins进行插件的配置
    plugins: [
        // html-webpack-plugin插件：会自动创建一个空的html文件，并自动引入打包输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            // 复制"./src/index.html"文件，并自动引入打包输出的所有资源(js/css)
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    // 打包模式
    mode: "development"   // mode: "production"
}