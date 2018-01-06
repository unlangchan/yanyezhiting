const path = require('path');
const os = require('os');

const gulp = require('gulp');

const gutil = require('gulp-util');
const inject = require('gulp-inject');
const connect = require('gulp-connect');
const gulpOpen = require('gulp-open');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const md5 = require('gulp-md5-assets');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const size = require('gulp-size');
const dateFormat = require('dateformat');

const uglifySaveLicense = require('uglify-save-license');

const webpack = require('webpack');

/**=== 注释格式    ===**/
var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ` * @buildTime ${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}`,
    ' */',
    ''
].join('\n');

/**=== 公共任务模块    ===**/

//引用webpack转译typescript脚本
gulp.task('tsc', (next) => {
    let config = require('./webpack.config');
    webpack(config).run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        next();
    });
});

//注入js脚本
gulp.task('inject:js', ['tsc'], () => {
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src('./dist/vendor.js', {
            read: false
        }), {
            starttag: '<!-- inject:head:{{ext}} -->',
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(inject(gulp.src(['./dist/*.js', '!./dist/vendor.js'], {
            read: false
        }), {
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', () => {
    return gulp.src(['dist'])
        .pipe(clean());
});

/**=== 开发所需任务模块    ===**/

//注入依赖文件
gulp.task('inject', ['inject:js']);

//本地服务器配置

let host = {
    path: ['dist','./'],
    port: 3000,
    index: 'index.html'
};

//mac chrome: "Google chrome" 使用设备, 
let browser = os.platform() === 'linux' ? 'Google chrome' : (
    os.platform() === 'darwin' ? 'Google chrome' : (os.platform() === 'win32' ? 'chrome' : 'firefox'));

//开启本地服务器
gulp.task('connect', () => {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

//打开浏览器
gulp.task('open', () => {
    return gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: `http://localhost:${host.port}/${host.index}`
        }));
})

//主程序重载
gulp.task('reload-js', ['tsc'], () => {
    return gulp.src('./dist/**/*').pipe(connect.reload());
});

//监听文件改动
gulp.task('watch', () => {
    //主程序改动
    gulp.watch('src/**/*.ts', ['reload-js']);
    //资源变动
    //gulp.watch('resources',[]);
});

/**== 发布所需任务模块 ===**/

//将js加上10位md5，该动作依赖tsc编译任务
gulp.task('md5:js', ['inject:js'], () => {
    return gulp.src('dist/*.js')
        .pipe(md5(10, 'dist/index.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('pack:js', ['md5:js'], () => {
    return gulp.src('dist/*.js')
        .pipe(uglify({
                output: {
                    comments: uglifySaveLicense
                }
            })
            .on('error', function (err) {
                gutil.log(gutil.colors.red('[Error]'), err.toString());
                this.emit('end');
            })
        ) //压缩代码
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('www'))
        .pipe(size({
            title: '[www]',
            showFiles: true
        }));
});

gulp.task('pack:resources', () => {
    return gulp.src('resources/**/*')
        .pipe(gulp.dest('www/resources'));
});

gulp.task('pack', ['pack:js', 'pack:resources'], () => {
    return gulp.src('dist/index.html')
        .pipe(gulp.dest('www'));
});


gulp.task('clean:build', ['clean'], () => {
    return gulp.src(['www'])
        .pipe(clean());
})

//开启本地服务器指向发布目录
gulp.task('connect:www', () => {
    console.log('connect------------');
    connect.server({
        root: 'www',
        port: host.port,
        livereload: true
    });
});
/**== 任务流 ===**/


//发布并查看效果
gulp.task('default', ['build'], (next) => {
    runSequence('connect:www', 'open', next)
});

//发布
gulp.task('build', (next) => {
    runSequence('clean:build', 'pack', next);
});

//开发
gulp.task('dev', (next) => {
    runSequence('clean', ['inject', 'connect', 'watch'], 'open', next);
});