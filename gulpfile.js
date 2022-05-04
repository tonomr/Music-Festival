// GULP
const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// JS
const terser = require("gulp-terser-js");

// IMG
const webp = require("gulp-webp");
const imageMin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss") // Identify all SCSS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) // Compile
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css")); // Save it

  done();
}

function webpVersion(done) {
  const options = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(webp(options)).pipe(dest("build/img"));
  done();
}

function avifVersion(done) {
  const options = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(avif(options)).pipe(dest("build/img"));
  done();
}

function imagesMin(done) {
  const options = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imageMin(options)))
    .pipe(dest("build/img"));
  done();
}

function videoToBuild(done) {
  src("src/video/**/*.{mp4,ogg,webm}").pipe(dest("build/video"));
  done();
}

function javascript(done) {
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.videoToBuild = videoToBuild;
exports.javascript = javascript;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.imagesMin = imagesMin;
exports.dev = dev;
