// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist'
const srcFolder = './src'

export const path = {
  build: {
    markup: `${buildFolder}/`,
    styles: `${buildFolder}/css/`,
    scripts: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    markup: `${srcFolder}/*.pug`,
    styles: `${srcFolder}/scss/*.scss`,
    scripts: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    sprite: `${srcFolder}/icons/**/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: {
    markup: `${srcFolder}/**/*.pug`,
    styles: `${srcFolder}/scss/**/*.scss`,
    scripts: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.*`,
    sprite: `${srcFolder}/icons/**/*.*`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder
}