// GULP
const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// IMG
const webp = require("gulp-webp");
const imageMin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss") // Identify all SCSS
    .pipe(plumber())
    .pipe(sass()) // Compile
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

function javascript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.javascript = javascript;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.imagesMin = imagesMin;
exports.dev = parallel(imagesMin, webpVersion, javascript, dev);
