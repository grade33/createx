import replace from "gulp-replace"; // Поиск и замена
import notify from "gulp-notify" // Сообщения (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; // Проверка обновления
import ifPlugin from "gulp-if"; // Условное ветвление

// Экспортируем объект
export const plugins = {
  replace: replace,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin
}
