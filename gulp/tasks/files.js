export const files = () => {
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
    .pipe(app.plugins.browsersync.stream())
}