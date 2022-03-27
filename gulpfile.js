// Основной модуль
import gulp from "gulp";

// Импорт путей и общих плагинов
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную перемнную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Импор задачa
import { server } from "./gulp/tasks/server.js";
import { clean } from "./gulp/tasks/clean.js";
import { files } from "./gulp/tasks/files.js";
import { markup } from "./gulp/tasks/markup.js";
import { markupBackend } from "./gulp/tasks/markup.js";
import { styles } from "./gulp/tasks/styles.js";
import { stylesBackend } from "./gulp/tasks/styles.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { scriptsBackend } from "./gulp/tasks/scripts.js";
import { images } from "./gulp/tasks/images.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { otfToTtf, ttfToWoff, fontDrag, fontStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";

// Наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(path.watch.files, files)
  gulp.watch(path.watch.markup, markup)
  gulp.watch(path.watch.styles, styles)
  gulp.watch(path.watch.scripts, scripts)
  gulp.watch(path.watch.images, images)
  gulp.watch(path.watch.sprite, sprite)
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontDrag, fontStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(files, markup, styles, scripts, images, sprite))
const mainTasksBackend = gulp.series(fonts, gulp.parallel(files, markupBackend, stylesBackend, scriptsBackend, images, sprite))

// Построение сценариев для выполнения задач
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, mainTasks);
const backend = gulp.series(clean, mainTasksBackend);
const deployZIP = gulp.series(clean, mainTasks, zip);

// Экспорт сценариев
export { dev }
export { build }
export { backend }
export { deployZIP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
