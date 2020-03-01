//导入gulp
const gulp = require('gulp');

// CSS  导入gulp-cssmin  压缩css代码
const cssmin = require('gulp-cssmin');
// CSS   导入gulp-autoprefixser 自动添加前缀
const autoprefixer = require('gulp-autoprefixer');

//JS 导入gulp-uglify
const uglify = require('gulp-uglify');
//JS 导入gulp-babel 下载需要下载这三个 gulp-babel @babel/core @babel/preset-env 导入一个gulp-babel
const babel = require('gulp-babel');

//HTML 导入gulp-htmlmin
const htmlmin = require('gulp-htmlmin');

//DEL 导入del
const del = require('del');

//导入 webserver
const webserver = require('gulp-webserver');


//打包css
const cssHandler = () => {
    return gulp.src('./src/css/*.css') // 找到 src 目录下 css 目录下 所有后缀为 .css 的文件
        // 把 css 代码自动添加前缀  需要在package.json里添加"browserslist": ["last 2 versions","iOS > 7","FireFox < 20","last 2 Explorer versions"]
        .pipe(autoprefixer())
        .pipe(cssmin()) // 压缩 css 代码
        .pipe(gulp.dest('./dist/css'))  // 压缩完毕的 css 代码放在 dist 目录下的 css 文件夹里面

}

//打包js
const jsHandler = () => {
    return gulp.src('./src/js/*.js') // 找到 src 目录下 js 目录下 所有后缀为 .js 的文件
        .pipe(babel({
            presets: ['@babel/env']
        })) // 转码 es6 转换成 es5 了, 就可以压缩了
        .pipe(uglify())  //压缩 js
        .pipe(gulp.dest('./dist/js'))  // 压缩完毕的 js 代码放在 dist 目录下的 js 文件夹里面
}

//打包html
const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            removeAttributeQuotes: true, // 移出属性上的双引号
            removeComments: true, // 移除注释
            collapseBooleanAttributes: true, // 把值为布尔值的属性简写
            collapseWhitespace: true, // 移除所有空格, 变成一行代码
            minifyCSS: true, // 把页面里面的 style 标签里面的 css 样式也去空格
            minifyJS: true, // 把页面里面的 script 标签里面的 js 代码给去空格
        })) //压缩  html
        .pipe(gulp.dest('./dist/pages')) // 压缩完毕的 html 代码放在 dist 目录下的 html 文件夹里面
}

//书写一个移动 image 文件的方法  因为图片我们尽量不进行压缩，UI设计师会给好。
const imgHandler = () => {
    //因为图片有jif jpg 等等 所以就用**拿里面 images 文件夹下的所有文件
    return gulp.src('./src/images/**')
        .pipe(gulp.dest('./dist/images'))  // 放到指定目录就可以了
}

//书写一个移动 lib 文件的方法 因为lib里存放的都是项目中的第三方 jquery/swiper/bootstrap 等等
//需要自己把 jquery/swiper/bootstrap 手动存放到lib 文件夹里面
//还有我们自己写的 cookie ajax 等等
const libHandler = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}

// 在打包的时候, 只是把你最新的 src 里面的所有内容给你压缩打包转移
//         不会把之前 dist 里面的文件删除
//         你把 abc.css 修改名字为 list.css 他就知道有一个 list.css 是新来的
//         并不知道是由 abc.css 重命名来的
// 最好就是在每次整体打包之前, 把 dist 目录删除了，用最新的 src 重新生成一遍内容
// 书写一个任务, 自动删除 dist目录,这个函数的目的就是为了删除 dist 目录使用的
const delHandler = () => {
    return del(['./dist'])
}

//书写一个配置服务器的任务
//    在开发过程中直接把我写的东西在服务器上打开
//    因为我要一边写一个修改, 一遍测试
//    因为 gulp 是基于 node 运行的
//    这里就是使用 node 给我们开启一个服务器, 不是 apache, 也不是 nginx
//自动刷新: 当 dist 目录里面的代码改变以后, 就会自动刷新浏览器
const serverHandler = () => {
    return gulp.src('./dist')// 找到我要打开的页面的文件夹, 把这个文件夹当作网站根目录
        .pipe(webserver({
            host: 'www.ouyangyi.com', // 域名, 这个域名可以自定义 
            port: 8080,// 端口号, 0 ~ 65535, 尽量不使用 0 ~ 1023
            open: './pages/index.html', // 你默认打开的首页, 从 dist 下面的目录开始书写
            livereload: true, // 自动刷新浏览器 - 热重启
            // 所有的代理配置都在 proxies 里面
            proxies: [
                // 每一个代理配置就是一个对象
                {
                    source: '/gx', // 源, 你的代理标识符
                    target: 'http://127.0.0.1/oyy.php' // 目标, 你要代理的地址
                },{
                    source: '/gx2', // 源, 你的代理标识符  可以配置多个代理
                    target: 'http://127.0.0.1/xxx.php' // 目标, 你要代理的地址
                }
            ]
        }))
}

//自动监控文件
//    监控 src 下下面的文件, 只要一修改, 就执行对应的任务
//    比如 src 下面的 css 文件夹, 只要里面的文件以修改, 我就执行以下 cssHandler 这个任务
const watchHandler = () => {
    // 监控着 src 下的 css 下的所有 .css 文件, 只要一发生变化, 就会自动执行一遍 cssHandler 任务
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./images/**', imgHandler)
    gulp.watch('./lib/**', libHandler)
}




// 导出一个默认任务
// 当我将来在命令行执行 gulp default 的时候, 就会自动把我写在 parallel 里面的五个任务给一起执行了
//   小细节: 当你在命令行执行 gulp default 的时候, 可以不写 default
//           你在命令行执行 gulp 这个指令, 就是在执行 gulp default
// 就应该在压缩 css/js/html 之前先把 dist 目录删除了
//   要在删除完毕 dist 以后, 在执行 css/js/html/... 之类的压缩转移任务
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, libHandler),
    serverHandler,
    watchHandler
)
