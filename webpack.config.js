// resolve用来拼接绝对路径的方法
const { resolve } = require("path"); 
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    // 入口起点
    entry: "./src/main.js",
    // 输出
    output: {
        // 输出文件名
        filename: "build.js",
        // 输出路径
        // __dirname 是nodejs的变量，代表当前文件的目录绝对路径
        path: path.join(__dirname, "build"),
        // 该属性的目的是在url前加上一个 build/ 路径
        // publicPath: "build/"   
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
                            limit: 8 * 1024,  // 单位是b, 一般用kb描述，因此乘以1024
                            // url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，因此需要改为false
                            esModule: false,
                            // 自定义打包后的图片名，即hash取前十位，后缀名不变
                            // 表示打包的图片放在 build 文件夹下的 img 文件夹里，文件名使用原来的名字加上截取的10位hash,仍然使用原来的拓展名
                            name: 'img/[name].[hash:10].[ext]'  
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
        // historyApiFallback: true,   //是否跳转到index.html
        hot: true,   //热更新
        open: true, //编译完自动打开浏览器
        // compress: true   //开启gzip压缩  => 这个属性到底是影响了哪里的压缩？？？
    },
    // plugins进行插件的配置
    plugins: [
        // html-webpack-plugin插件：会自动创建一个空的html文件，并自动引入打包输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            // 复制"./src/index.html"文件，并自动引入打包输出的所有资源(js/css)
            template: "./src/index.html",
            // filename: 'first.html',     //生成html文件的文件名，默认是index.html
            // hash: true,   // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值  比如：src="common.js?a3e1396b501cdd9041be"
            // chunks: ['./js/main']  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
        }),
        new CleanWebpackPlugin()
    ],
    // 打包模式  development 指开发模式，代码未压缩   production 指产品模式，代码压缩
    mode: "development"   // mode: "production"
}