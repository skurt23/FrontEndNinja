// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');

// variables de patrones de archivos
var jsFiles = ["src/js/*.js", "src/js/**/*.js"];
var imgDir = ["src/img/*.png", "src/img/*.jpg", "src/img/*.jpeg",];

// definimos tarea por defecto
gulp.task("default", ["concat-js", "compile-sass"], function(){

    // iniciar BrowserSync
    browserSync.init({
        // server: "./", // levanta servidor web en carpeta actual
        proxy: "127.0.0.1:8000",  // actúa como proxy enviando las peticiones a sparrest
        browser: "google chrome"
    });

    // observa cambios en archivos SASS y ejecuta la tarea de compilación
    gulp.watch("src/scss/*.scss", ["compile-sass"]);

    // observa cambios en archivos HTML y recargue el navegador
    gulp.watch("*.html").on("change", browserSync.reload);

    // observar cambios en archivos JS para concatenar
    gulp.watch(jsFiles, ["concat-js"]);

});

// definimos la tarea para compilar SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // cargamos le archivo
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS
        .pipe(postcss([
            autoprefixer(), // autoprefija automáticamente el CSS
            cssnano() // minifica el CSS
        ]))
        .pipe(sourcemaps.write('./')) // escribimos los sourcemaps
        .pipe(gulp.dest("./dist/css/")) // guardamos el archivo en dist/css
        .pipe(notify({
            title: "SASS",
            message: "Compiled 🤘"
        }))
        .pipe(browserSync.stream());
});

// definimos la tarea para concatenar JS
gulp.task("concat-js", function(){
    gulp.src("src/js/app.js")
        .pipe(sourcemaps.init()) // comenzamos la captura de sourcemaps
        .pipe(tap(function(file){ // tap nos permite ejecutar un código por cada fichero seleccionado en el paso anterior
            file.contents = browserify(file.path, {debug:true}).bundle(); // pasamos el archivo por browserify para importar los require
        }))
        .pipe(buffer()) // convertir cada archivo en un stream
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // escribimos los sourcemaps
        .pipe(gulp.dest("dist/js/"))
        .pipe(notify({
            title: "JS",
            message: "Concatenated 🤘"
        }))
        .pipe(browserSync.stream());
});

gulp.task("images-optimization", function(){
    gulp.src(imgDir)
        .pipe(imagemin())
        .pipe(gulp.dest('./src/img/min/'));
});