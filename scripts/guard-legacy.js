'use strict';
const fs = require('fs');
const path = require('path');
const template = path.join(__dirname, '..', 'template', 'index.html');
if (fs.existsSync(template) && fs.readFileSync(template, 'utf8').includes('name="reference-template"')) {
  console.error('Массовый конвейер отключён для отдельного эталона. Используйте npm run build:reference. Генерация и запись content/dist не запускались.');
  process.exit(1);
}
