import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';

export const markup = () => {
  return app.gulp.src(app.path.src.markup)
    .pipe(pug({
      // Сжатие HTML файла
      pretty: app.isBuild ? false : true,
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json '
      }
    })))
    .pipe(app.gulp.dest(app.path.build.markup))
    .pipe(app.plugins.browsersync.stream())
}

export const markupBackend = () => {
  return app.gulp.src(app.path.src.markup)
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(pug({
      // Сжатие HTML файла
      pretty: true
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json '
      }
    })))
    .pipe(app.gulp.dest(app.path.build.markup))
    .pipe(app.plugins.browsersync.stream())
}
