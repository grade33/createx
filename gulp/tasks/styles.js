import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import shorthand from 'gulp-shorthand';

const sass = gulpSass(dartSass)

export const styles = () => {
  return app.gulp.src(app.path.src.styles, { sourcemaps: app.isDev })
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'expanded'
    }))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.if(app.isBuild, webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    })))
    .pipe(app.plugins.if(app.isBuild, autoprefixer({
      cascade: false,
      overrideBrowserslist: ["last 5 versions"],
    })))
    .pipe(app.plugins.if(app.isBuild, cleanCss({
      level: 2
    })))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.styles, {
      sourcemaps: app.isDev
    }))
    .pipe(app.plugins.browsersync.stream())
}

export const stylesBackend = () => {
  return app.gulp.src(app.path.src.styles)
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'expanded'
    }))
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.if(app.isBuild, webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    })))
    .pipe(app.plugins.if(app.isBuild, autoprefixer({
      grid: true,
      cascade: false,
      overrideBrowserslist: ["last 5 versions"],
    })))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream())
}
