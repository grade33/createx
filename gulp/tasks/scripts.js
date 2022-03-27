import webpackStream from 'webpack-stream';

export const scripts = () => {
  return app.gulp.src(app.path.src.scripts)
    .pipe(webpackStream({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js'
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: app.isDev ? 'source-map' : false
    }))
    .pipe(app.gulp.dest(app.path.build.scripts))
    .pipe(app.plugins.browsersync.stream())
}

export const scriptsBackend = () => {
  return app.gulp.src(app.path.src.scripts)
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'app.min.js'
      },
      optimization: {
        minimize: false,
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: false
    }))
    .pipe(app.gulp.dest(app.path.build.scripts))
    .pipe(app.plugins.browsersync.stream())
}