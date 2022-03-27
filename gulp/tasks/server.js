export const server = (done) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.markup}`
    },
    notify: false,
    port: 3000,
  })
}