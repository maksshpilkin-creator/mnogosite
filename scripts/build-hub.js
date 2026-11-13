'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');
const salesDir = path.join(root, 'sales');
const vercelBase = 'https://dist-nine-omega-o6mskw23t3.vercel.app';

if (!fs.existsSync(salesDir)) {
  fs.mkdirSync(salesDir, { recursive: true });
}

const factFiles = fs.readdirSync(factsDir).filter(f => f.endsWith('.json'));
const leads = factFiles
  .map(f => JSON.parse(fs.readFileSync(path.join(factsDir, f), 'utf8')))
  .sort((a, b) => a.facts.city.localeCompare(b.facts.city, 'ru'));

const noSiteCount = leads.filter(l => !l.facts.has_website).length;
const hasSiteCount = leads.filter(l => l.facts.has_website).length;

const cardsHtml = leads.map(lead => {
  const f = lead.facts;
  const sources = lead.sources || [];
  const dgisUrl = sources[0] ? sources[0].url : `https://2gis.ru/search/${encodeURIComponent(f.name + ' ' + f.city)}`;
  const yandexUrl = sources[1] ? sources[1].url : `https://yandex.ru/maps/?text=${encodeURIComponent(f.name + ' ' + f.city + ' ' + f.address)}`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name + ' ' + f.city + ' ' + f.address)}`;
  const demoUrl = `${vercelBase}/${lead.slug}/`;
  const priceLine = (lead.catalog && lead.catalog[0] && lead.catalog[0].price)
    ? `${lead.catalog[0].name}: ${lead.catalog[0].price}`
    : (f.price_range_note || 'Цены по запросу');

  const siteBadge = f.has_website
    ? `<span class="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono text-[11px]">Есть сайт (${f.existing_website || 'домен'})</span>`
    : `<span class="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">Без отдельного сайта</span>`;

  const existingSiteLink = f.has_website && f.existing_website
    ? `<a href="${f.existing_website.startsWith('http') ? f.existing_website : 'https://' + f.existing_website}" target="_blank" rel="noopener" class="text-[11px] font-mono text-sky-400 hover:underline truncate block mt-1">Текущий сайт: ${f.existing_website}</a>`
    : '';

  const waGreet = encodeURIComponent(`Здравствуйте! Отправляю ссылку на демо-сайт для мотосалона ${f.name} (${f.city}): ${demoUrl}`);

  return `
    <div class="showcase-card bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all" data-site="${f.has_website ? 'yes' : 'no'}">
      <div>
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="text-xs font-mono text-orange-400 uppercase font-bold">${f.city}</span>
          <span class="text-xs font-mono text-emerald-400 font-bold">★ ${f.rating || '—'}</span>
        </div>
        <h2 class="text-lg font-extrabold text-white leading-snug mb-1">${f.name}</h2>
        <p class="text-xs text-slate-400 mb-2">${f.district ? f.district + ' · ' : ''}${f.address}</p>
        <div class="mb-3 flex flex-wrap gap-1.5 items-center">
          ${siteBadge}
        </div>
        <div class="text-xs text-slate-300 space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-3">
          <div><span class="text-slate-500">График:</span> ${f.hours}</div>
          <div><span class="text-slate-500">Телефон:</span> <span class="font-mono text-white">${f.phone}</span></div>
          <div><span class="text-slate-500">Бренды:</span> ${f.brands || 'Уточнять в салоне'}</div>
          <div class="text-orange-300 font-medium">${priceLine}</div>
          ${existingSiteLink}
        </div>
      </div>
      <div class="space-y-2">
        <a href="${demoUrl}" target="_blank" rel="noopener" class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors">
          Открыть демо на Vercel ↗
        </a>
        <div class="flex items-center justify-between gap-1.5 text-[11px] font-mono">
          <a href="${dgisUrl}" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">2ГИС</a>
          <a href="${yandexUrl}" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">Яндекс</a>
          <a href="${googleUrl}" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">Google</a>
          <a href="https://wa.me/${f.whatsapp}?text=${waGreet}" target="_blank" rel="noopener" title="WhatsApp" class="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}).join('\n');

const hubHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Витрина ${leads.length} демо-сайтов мотосалонов России (внутренняя)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background: #0A0D12; color: #E2E8F0; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen">
  <header class="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <div>
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase mb-3">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        ${leads.length} проверенных мотосалонов · Внутренняя витрина (не публиковать в dist/)
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Витрина демо-сайтов мотосалонов</h1>
      <p class="text-slate-400 text-sm mt-1 max-w-2xl">Все ${leads.length} страниц собраны в макете № 6 со встроенной картой Яндекс, мобильной панелью быстрого звонка и проверенными диапазонами цен «от» из CSV.</p>
    </div>
    <div class="flex flex-wrap items-center gap-2 font-mono text-xs">
      <button onclick="filterShowcase('all', this)" class="sc-btn px-3 py-2 rounded-xl bg-white/10 text-white font-bold">Все (${leads.length})</button>
      <button onclick="filterShowcase('no', this)" class="sc-btn px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300">Без сайта (${noSiteCount})</button>
      <button onclick="filterShowcase('yes', this)" class="sc-btn px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-300">На редизайн (${hasSiteCount})</button>
    </div>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${cardsHtml}
  </div>

  <footer class="mt-16 pt-8 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
    <p>Внутренний каталог sales/SHOWCASE.html. Публичный корень dist/index.html защищён нейтральной заглушкой и robots.txt.</p>
  </footer>

  <script>
    function filterShowcase(mode, btn) {
      document.querySelectorAll('.sc-btn').forEach(b => b.classList.remove('bg-white/10', 'text-white', 'font-bold'));
      btn.classList.add('bg-white/10', 'text-white', 'font-bold');
      document.querySelectorAll('.showcase-card').forEach(card => {
        if (mode === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.toggle('hidden', card.dataset.site !== mode);
        }
      });
    }
  </script>
</body>
</html>
`;

const showcasePath = path.join(salesDir, 'SHOWCASE.html');
fs.writeFileSync(showcasePath, hubHtml, 'utf8');
console.log(`Витрина sales/SHOWCASE.html успешно обновлена (${leads.length} салонов: ${noSiteCount} без сайта, ${hasSiteCount} с сайтом). Публичный dist/index.html не затронут.`);
