/**
 * build.js
 * Универсальный сборщик 19 демо-сайтов:
 * 1. Читает шаблон template/index.html (любой, который передаст пользователь)
 * 2. Читает content/*.json
 * 3. Использует smart_engine.js для внедрения Schema.org, плавающего демо-тулбара и QR-кода
 * 4. Собирает сайты в dist/{slug}/index.html
 * 5. Генерирует сводный дашборд dist/index.html
 */

const fs = require('fs');
const path = require('path');
const { generateSchemaOrg, generateDemoToolbar } = require('./smart_engine');

const contentDir = path.join(__dirname, '..', 'content');
const templatePath = path.join(__dirname, '..', 'template', 'index.html');
const distDir = path.join(__dirname, '..', 'dist');

// An explicitly authored reference must never be applied to the 19 legacy records.
// Check before creating directories or touching any output.
if (fs.existsSync(templatePath) && fs.readFileSync(templatePath, 'utf8').includes('name="reference-template"')) {
  console.error('Этот шаблон — отдельный эталон. Используйте npm run build:reference. Массовая сборка остановлена до изменений.');
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(templatePath)) {
  console.error("Шаблон не найден по пути: " + templatePath);
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

console.log(`Запуск умной сборки для ${files.length} мотосалонов...`);

const salonsList = [];

files.forEach(file => {
  const jsonPath = path.join(contentDir, file);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  salonsList.push(data);

  const salonDistDir = path.join(distDir, data.slug);
  if (!fs.existsSync(salonDistDir)) {
    fs.mkdirSync(salonDistDir, { recursive: true });
  }

  let outputHtml = templateHtml;

  // 1. Замена заголовка страницы
  outputHtml = outputHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${data.name} — Мотосалон в ${data.city} | ${data.focus || 'Эндуро, питбайки, квадроциклы'}</title>`
  );

  // 2. Интеллектуальная текстовая подстановка ключевых маркеров
  outputHtml = outputHtml.replace(/МотоДрайв 54/g, data.name);
  outputHtml = outputHtml.replace(/MotoDrive 54/g, data.name);
  outputHtml = outputHtml.replace(/Новосибирске/g, data.city);
  outputHtml = outputHtml.replace(/Новосибирск/g, data.city);
  outputHtml = outputHtml.replace(/\+7 \(383\) 299-14-88/g, data.phone);
  outputHtml = outputHtml.replace(/79132991488/g, data.whatsapp || data.phone_clean);
  outputHtml = outputHtml.replace(/ул\. Богдана Хмельницкого, 104/g, data.address);
  outputHtml = outputHtml.replace(/ул\. Б\. Хмельницкого 104/g, data.address);
  outputHtml = outputHtml.replace(/ул\. Б\. Хмельницкого, д\. 104/g, data.address);
  outputHtml = outputHtml.replace(/Калининский р-н/g, data.district || data.city);
  outputHtml = outputHtml.replace(/142 отзыва/g, `${data.reviews_count} отзывов`);
  outputHtml = outputHtml.replace(/142 подтвержденных/g, `${data.reviews_count} подтвержденных`);
  outputHtml = outputHtml.replace(/★ 4\.8/g, `★ ${data.rating}`);

  // 3. Внедрение Schema.org (JSON-LD)
  const schemaScript = generateSchemaOrg(data);
  outputHtml = outputHtml.replace('</head>', `${schemaScript}\n</head>`);

  // 4. Внедрение плавающей демо-панели и QR-кода перед закрывающим </body>
  const demoToolbar = generateDemoToolbar(data);
  outputHtml = outputHtml.replace('</body>', `${demoToolbar}\n</body>`);

  // 5. Внедрение данных сайта в window для клиентской гидратации
  const injectedDataScript = `
  <script>
    window.SITE_DATA = ${JSON.stringify(data)};
  </script>
  `;
  outputHtml = outputHtml.replace('</head>', `${injectedDataScript}\n</head>`);

  const destFile = path.join(salonDistDir, 'index.html');
  fs.writeFileSync(destFile, outputHtml, 'utf8');
  console.log(`✓ Собран сайт: dist/${data.slug}/index.html (${data.name}, г. ${data.city})`);
});

// 6. Сборка главного дашборда витрины (dist/index.html)
const dashboardHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Витрина 19 демо-сайтов мотосалонов | Vibe-Coding Pro</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: #0E1116; color: #E2E8F0; }
  </style>
</head>
<body class="p-4 sm:p-8 max-w-7xl mx-auto">
  <header class="mb-8 border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase mb-2">
        Вайбкодинг: Автоматизированная кампания
      </div>
      <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">19 Демо-сайтов для мотосалонов</h1>
      <p class="text-slate-400 text-sm mt-1">Все демо активны, оснащены Schema.org, QR-тестом для телефона и готовы к продаже.</p>
    </div>
    
    <div class="flex items-center gap-3">
      <a href="../sales/CALL_STATION.html" class="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-orange-600/30 transition flex items-center gap-2">
        <span>⚡ Открыть станцию обзвона</span>
      </a>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    ${salonsList.map((salon, i) => `
      <div class="bg-white/5 border border-white/10 hover:border-orange-500/50 rounded-2xl p-4 flex flex-col justify-between transition group">
        <div>
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-orange-400 font-bold">#${String(i + 1).padStart(2, '0')} • ${salon.city}</span>
            <span class="text-amber-400 font-bold">★ ${salon.rating} (${salon.reviews_count})</span>
          </div>
          <h3 class="text-lg font-bold text-white group-hover:text-orange-400 transition">${salon.name}</h3>
          <p class="text-xs text-slate-400 mt-1">${salon.address}</p>
          
          <div class="mt-3 p-2 bg-black/30 rounded-xl border border-white/5 text-[11px] font-mono space-y-1">
            <div class="text-slate-300">Фокус: <span class="text-white">${salon.focus}</span></div>
            <div class="text-slate-300">Бренды: <span class="text-orange-300">${salon.brands}</span></div>
            <div class="text-slate-400">Тел: <strong class="text-slate-200">${salon.phone}</strong></div>
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <a href="./${salon.slug}/index.html" target="_blank" class="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5">
            <span>Сайт салона →</span>
          </a>
          <a href="https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Подготовили для ${salon.name} готовое решение: http://localhost:3000/dist/${salon.slug}/index.html`)}" target="_blank" class="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white font-mono text-xs transition">
            WA
          </a>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), dashboardHtml, 'utf8');
console.log(`\n✓ Главный дашборд обновлен: dist/index.html`);
console.log(`Все 19 сайтов успешно пересобраны с умным тулбаром и Schema.org!`);
