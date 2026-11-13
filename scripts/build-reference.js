'use strict';
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'template');
const output = path.join(root, 'dist', 'motodrive54');
const html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
if (!html.includes('content="motodrive54-demo-v1"')) throw new Error('Не найден маркер изолированного эталона. Сборка остановлена.');
const assets = ['hero-enduro.png', 'product-enduro.jpg', 'product-pitbike.jpg', 'product-atv.jpg', 'rider.jpg', 'showroom.jpg'];
for (const file of ['index.html', 'styles.css', 'app.js', ...assets.map(name => `assets/${name}`)]) {
  if (!fs.existsSync(path.join(source, file))) throw new Error(`Нет обязательного файла: template/${file}`);
}
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) fs.copyFileSync(path.join(source, file), path.join(output, file));
fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
for (const file of assets) fs.copyFileSync(path.join(source, 'assets', file), path.join(output, 'assets', file));
for (const dir of ['fonts', 'icons']) fs.cpSync(path.join(source, 'assets', dir), path.join(output, 'assets', dir), { recursive: true });
console.log('Собран только условный эталон: dist/motodrive54/');
console.log('Другие демо и content/*.json не изменены. Публикация не выполнялась.');
