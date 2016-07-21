/**
 * Created by Skurt on 21/7/16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var pump = require('pump');

var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

gulp.task("default", ["concat-js", "compile-sass", 'compress'], function(){
    
    browserSync.init({
        proxy: "127.0.0.1:8000", 
        browser: "google chrome"
    });
    
    gulp.watch("src/scss/*.scss", ["compile-scss"]);
    
    gulp.watch("*.html").on("change", browserSync.reload);
    
    gulp.watch(jsFiles, ["concat-js"]);

});

gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss")
        .pipe(sass().on('error', sass.logError)) 
        .pipe(gulp.dest("./dist/css/")) 
        .pipe(notify({
            title: "SASS",
            message: "Compiled 🤘"
        }))
        .pipe(browserSync.stream());
});

gulp.task("concat-js", function(){
    gulp.src("src/js/app.js")
        .pipe(tap(function(file){ 
            file.contents = browserify(file.path, {debug:true}).bundle();
        }))
        .pipe(buffer()) 
        .pipe(gulp.dest("src/js/concatenated/"))
        .pipe(notify({
            title: "JS",
            message: "Concatenated 🤘"
        }))
        .pipe(browserSync.stream());
});

gulp.task('compress', function () {
   pump([
       gulp.src('src/js/concatenated/app.js'),
       uglify(),
       gulp.dest('dist/js/')
   ])
});
