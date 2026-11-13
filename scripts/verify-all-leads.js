'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');
const distDir = path.join(root, 'dist');
const reportPath = path.join(root, 'reports', 'site-check', 'summary-19-leads.md');

const factFiles = fs.readdirSync(factsDir).filter(f => f.endsWith('.json'));

let totalChecks = 0;
let passedChecks = 0;
const results = [];

console.log(`Запуск независимой проверки 19 сайтов (роль business_verifier)...`);

for (const file of factFiles) {
  const factData = JSON.parse(fs.readFileSync(path.join(factsDir, file), 'utf8'));
  const { slug, facts, catalog } = factData;
  const siteDir = path.join(distDir, slug);

  const siteResult = {
    slug,
    name: facts.name,
    city: facts.city,
    checks: [],
    status: 'PASS'
  };

  function check(name, condition, errorMsg) {
    totalChecks++;
    if (condition) {
      passedChecks++;
      siteResult.checks.push({ name, pass: true });
    } else {
      siteResult.status = 'FAIL';
      siteResult.checks.push({ name, pass: false, error: errorMsg });
    }
  }

  // Check 1: Files existence
  const htmlPath = path.join(siteDir, 'index.html');
  const cssPath = path.join(siteDir, 'styles.css');
  const jsPath = path.join(siteDir, 'app.js');
  check('Файлы index.html, styles.css, app.js существуют', fs.existsSync(htmlPath) && fs.existsSync(cssPath) && fs.existsSync(jsPath), 'Не найдены основные файлы');

  if (fs.existsSync(htmlPath) && fs.existsSync(jsPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const js = fs.readFileSync(jsPath, 'utf8');

    // Check 2: NoIndex
    check('Наличие meta noindex, nofollow', html.includes('content="noindex, nofollow"'), 'Отсутствует метатег noindex');

    // Check 3: Brand name in header and title
    check('Название бренда в Title и Header', html.includes(facts.name), 'Название бренда не найдено в HTML');

    // Check 4: City correct
    check('Город указан верно', html.includes(facts.city), 'Город не найден в HTML');

    // Check 5: No leaked Motodrive54
    check('Отсутствуют следы чужого демо МотоДрайв54', !html.includes('МотоДрайв54'), 'Обнаружен остаток МотоДрайв54');

    // Check 6: No leaked Novosibirsk on non-Novosibirsk sites
    if (facts.city !== 'Новосибирск') {
      check('Отсутствуют утечки Новосибирска', !html.includes('Новосибирск'), 'Обнаружено упоминание Новосибирска на чужом сайте');
    }

    // Check 7: Correct Phone in tel: link
    check('Корректный tel: телефон', html.includes(`href="tel:${facts.phone_raw}"`), `Не найден href="tel:${facts.phone_raw}"`);

    // Check 8: Correct WhatsApp in messenger link
    check('Корректный WhatsApp', html.includes(`https://wa.me/${facts.whatsapp}`) && js.includes(facts.whatsapp), `Неверный WhatsApp ${facts.whatsapp}`);

    // Check 9: Correct Address in contacts
    check('Корректный физический адрес', html.includes(facts.address) && js.includes(facts.address), 'Адрес не совпадает с фактами');

    // Check 10: Catalog products and prices match
    for (const item of catalog) {
      check(`Товар ${item.name} (${item.price})`, html.includes(item.name) && html.includes(item.price), `Товар ${item.name} или цена ${item.price} не найдены`);
    }

    // Check 11: Assets presence
    const assets = ['hero-enduro.png', 'product-enduro.jpg', 'product-pitbike.jpg', 'product-atv.jpg', 'rider.jpg', 'showroom.jpg'];
    let allAssets = true;
    for (const a of assets) {
      if (!fs.existsSync(path.join(siteDir, 'assets', a))) allAssets = false;
    }
    check('Все 6 визуальных ассетов на месте', allAssets, 'Не хватает картинок в assets');
  }

  results.push(siteResult);
}

// Generate report
let report = `# 📋 Отчёт независимой приёмки 19 сайтов (business_verifier)

> **Дата проверки:** ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Novosibirsk' })} (НСК)  
> **Всего сайтов проверено:** ${results.length}  
> **Всего проверок пройдено:** ${passedChecks} из ${totalChecks} (${Math.round(passedChecks / totalChecks * 100)}%)  
> **Общий вердикт:** ${passedChecks === totalChecks ? '🟢 PASS (Все 19 сайтов полностью верифицированы)' : '🔴 NEEDS CHANGES'}

---

## Сводная таблица по всем 19 салонам

| № | Город | Салон (slug) | Рейтинг | Телефон | WhatsApp | Проверенный адрес | Каталог (3 товара) | Статус QA |
|---|---|---|:---:|---|---|---|---|:---:|
`;

results.forEach((r, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const factData = JSON.parse(fs.readFileSync(path.join(factsDir, `${r.slug}.json`), 'utf8'));
  const goods = factData.catalog.map(c => `${c.name} (${c.price})`).join('; ');
  report += `| ${num} | **${r.city}** | [${r.name}](http://127.0.0.1:3000/dist/${r.slug}/) | **${factData.facts.rating} ★** | \`${factData.facts.phone}\` | \`${factData.facts.whatsapp}\` | ${factData.facts.address} | ${goods} | **${r.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}** |\n`;
});

report += `\n---

## Детали проверок по каждому сайту
`;

for (const r of results) {
  report += `\n### 🏢 ${r.name} (${r.city}) — \`dist/${r.slug}/\`
- **Вердикт:** ${r.status === 'PASS' ? '✅ Проверен (PASS)' : '❌ Есть замечания'}
- **Выполненные тесты:**
`;
  for (const c of r.checks) {
    if (c.pass) {
      report += `  - ✅ ${c.name}\n`;
    } else {
      report += `  - ❌ ${c.name}: ${c.error}\n`;
    }
  }
}

fs.writeFileSync(reportPath, report, 'utf8');
console.log(`\nОтчёт верификации сохранён в: reports/site-check/summary-19-leads.md`);
console.log(`Пройдено проверок: ${passedChecks}/${totalChecks} (${Math.round(passedChecks / totalChecks * 100)}%)`);
