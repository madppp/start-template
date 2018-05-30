var gulp = require('gulp'); // gulpプラグインの読み込み
var sass = require('gulp-sass'); // Sassをコンパイルするプラグインの読み込み
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// style.scssをタスクを作成する
gulp.task('sass', function () {
    gulp.watch('./develop/assets/sass/**/*.scss', function() {
        gulp.src('./develop/assets/sass/**/*.scss') // style.scssファイルを取得
        .pipe(sourcemaps.init())
          .pipe(sass()) // Sassのコンパイルを実行
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write('../maps')) // マップファイルを出力するパスを指定します
          .pipe(gulp.dest('./develop/assets/css')); // cssフォルダー以下に保存
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "./develop/html/index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// src 配下の *.html, *.css ファイルが変更されたリロード。
gulp.task('default', ['sass','browser-sync'], function () {
    gulp.watch("./develop/assets/*.html", ['bs-reload']);
    gulp.watch("./develop/assets/css/*.css", ['bs-reload']);
});
