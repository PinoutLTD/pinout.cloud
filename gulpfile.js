const { src, dest, series, watch } = require('gulp');

const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');
const autoPrefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const shorthand = require('gulp-shorthand');
const mediaQueries = require('gulp-group-css-media-queries');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const clean = () =>  {
    return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
  .pipe(dest('dist/resources'))
}

const styles = () => {
    return src('src/assets/styles/**/*.css')
    .pipe(sourceMaps.init())
    .pipe(concat('main.css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(autoPrefixes({
        cascade: false
    }))
    .pipe(shorthand())
    .pipe(mediaQueries())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/styles/'))
    .pipe(browserSync.stream())
};

const htmlPages = () => {
    return src('src/pages/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const htmlInclude = () => {
    return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/assets/images'))
}

// const fonts = () => {
//     src('./src/fonts/**.woff2')
// 		.pipe(dest('dist/assets/fonts/'))
// }

const scripts = () => {
    return src([
      'src/js/vendor/*.js',
      'src/js/main.js',
      'src/js/**/*.js',
    ])
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel: true,
    }).on('error', notify.onError()))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream())
}

const images = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg',
    ])
    .pipe(dest('dist/img'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
            serveStaticOptions: {
              extensions: ['html']
          }
        }
    })
}

async function watchAll() {
  watch('src/**/*.html', htmlInclude);
  watch('src/**/*.html', htmlPages);
  watch('src/assets/styles/**/*.css', styles);
  watch('src/assets/img/svg/**/*.svg', svgSprites);
  watch('src/js/**/*.js', scripts);
  watch('.src/assets/img/*.{jpg,jpeg,png,svg}', images);
  watch('.src/assets/img/**/*.{jpg,jpeg,png,svg}', images);
  watch('src/resources/**', resources);
}

exports.clean = clean;
exports.styles = styles;
exports.htmlInclude = htmlInclude;
exports.scripts = scripts;
exports.default = series(clean,resources, htmlInclude, htmlPages, scripts, styles, images, svgSprites, watchAll, watchFiles)

const minImages = () => {
    return src([
        'src/assets/img/**/*.jpg',
        'src/assets/img/**/*.png',
        'src/assets/img/**/*.svg',
        'src/assets/img/**/*.jpeg',
    ])
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
            ]
        })
    ]))
    .pipe(dest('dist/img'))
}

const stylesBuild = () => {
    return src('src/assets/styles/**/*.css')
    .pipe(concat('main.css'))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(autoPrefixes({
        cascade: false
    }))
    .pipe(mediaQueries())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('dist/styles/'))
};

const scriptsBuild = () => {
    return src([
      'src/js/vendor/*.js',
      'src/js/**/*.js',
      'src/js/main.js',
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
        toplevel: true,
    }).on('error', notify.onError()))
    .pipe(dest('dist/js/'))
}

const htmlPagesMinify = () => {
  return src('src/pages/*.html')
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(htmlMin({
    collapseWhitespace: true,
  }))
  .pipe(dest('dist'))
};

const htmlMinify = () => {
    return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
};


exports.build = series(clean, resources, htmlMinify, htmlPagesMinify, scriptsBuild, stylesBuild, minImages, svgSprites)
