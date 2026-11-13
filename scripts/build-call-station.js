'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');
const salesFile = path.join(root, 'sales', 'CALL_STATION.html');

const factFiles = fs.readdirSync(factsDir).filter(f => f.endsWith('.json'));
const leads = factFiles.map(f => JSON.parse(fs.readFileSync(path.join(factsDir, f), 'utf8')));

// Timezone offset relative to MSK (UTC+3)
const cityOffsets = {
  'Москва': 0,
  'Мытищи': 0,
  'Санкт-Петербург': 0,
  'Казань': 0,
  'Нижний Новгород': 0,
  'Краснодар': 0,
  'Ростов-на-Дону': 0,
  'Воронеж': 0,
  'Волгоград': 0,
  'Тверь': 0,
  'Тула': 0,
  'Рязань': 0,
  'Ярославль': 0,
  'Киров': 0,
  'Пенза': 0,
  'Ставрополь': 0,
  'Сочи': 0,
  'Самара': 1,
  'Тольятти': 1,
  'Саратов': 1,
  'Ульяновск': 1,
  'Екатеринбург': 2,
  'Челябинск': 2,
  'Уфа': 2,
  'Пермь': 2,
  'Тюмень': 2,
  'Оренбург': 2,
  'Омск': 3,
  'Новосибирск': 4,
  'Красноярск': 4,
  'Барнаул': 4,
  'Кемерово': 4,
  'Новокузнецк': 4,
  'Иркутск': 5,
  'Хабаровск': 7
};

// Sort leads by offset (earliest timezone first for practical morning calling), then by city
leads.sort((a, b) => {
  const offA = cityOffsets[a.facts.city] || 0;
  const offB = cityOffsets[b.facts.city] || 0;
  if (offB !== offA) return offB - offA; // +7 first, then +5, +4, +2, +1, +0
  return a.facts.city.localeCompare(b.facts.city, 'ru');
});

const noSiteCount = leads.filter(l => !l.facts.has_website).length;
const hasSiteCount = leads.filter(l => l.facts.has_website).length;

const cardsHtml = leads.map((lead, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const f = lead.facts;
  const offset = cityOffsets[f.city] ?? 0;
  const offsetLabel = offset === 0 ? 'МСК' : (offset > 0 ? `+${offset} от МСК` : `${offset} от МСК`);
  const offsetColor = offset >= 4 ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                      offset >= 2 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                      offset >= 1 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                    'bg-sky-500/20 text-sky-300 border-sky-500/30';

  const modelsSample = lead.catalog.map(c => c.name).slice(0, 2).join(', ');
  const demoUrl = `https://dist-nine-omega-o6mskw23t3.vercel.app/${lead.slug}/`;
  const yandexUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(f.name + ' ' + f.city + ' ' + f.address)}`;
  const dgisUrl = `https://2gis.ru/search/${encodeURIComponent(f.name + ' ' + f.city)}`;
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name + ' ' + f.city + ' ' + f.address)}`;
  const hasSite = Boolean(f.has_website);
  const existingHref = f.existing_website
    ? (f.existing_website.startsWith('http') ? f.existing_website : 'https://' + f.existing_website)
    : '';
  const siteBadgeHtml = hasSite
    ? `<div class="mt-1.5 flex items-center justify-between gap-2 text-[11px] font-mono"><span class="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold truncate">🔵 Есть сайт: ${f.existing_website || 'домен'}</span>${existingHref ? `<a href="${existingHref}" target="_blank" rel="noopener" class="text-sky-400 hover:underline shrink-0">сайт ↗</a>` : ''}</div>`
    : `<div class="mt-1.5 flex items-center gap-2 text-[11px] font-mono"><span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">🟢 Сайта нет (без сайта)</span></div>`;

  return `
    <div class="lead-card bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:border-orange-500/50 shadow-md" id="card-${lead.slug}" data-slug="${lead.slug}" data-status="new" data-has-website="${hasSite ? 'yes' : 'no'}">
      <div>
        <div class="flex items-center justify-between text-xs font-mono mb-2">
          <div class="flex items-center gap-2">
            <span class="text-orange-400 font-bold">#${num} · ${f.city}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${offsetColor}">${offsetLabel}</span>
          </div>
          <span class="text-amber-400 font-bold">★ ${f.rating}</span>
        </div>

        <h3 class="font-extrabold text-base text-white leading-tight">${f.name}</h3>
        ${siteBadgeHtml}
        
        <div class="flex items-center justify-between mt-1.5 text-xs text-slate-400">
          <span class="truncate flex items-center gap-1" title="${f.address}">📍 ${f.address}</span>
          <span class="flex items-center gap-1 shrink-0 ml-2 font-mono text-[10px]">
            <a href="${yandexUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500 hover:text-black transition border border-yellow-500/25" title="Яндекс Карты">Яндекс</a>
            <a href="${dgisUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500 hover:text-white transition border border-emerald-500/25" title="2ГИС">2ГИС</a>
            <a href="${googleUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 hover:bg-blue-500 hover:text-white transition border border-blue-500/25" title="Google Maps">Google</a>
          </span>
        </div>

        <div class="mt-2.5 p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
          <div class="flex justify-between items-center text-slate-400">
            <span>График: <strong class="text-slate-300 font-sans">${f.hours}</strong></span>
            <span class="local-time font-bold text-sky-400" data-offset="${offset}">--:--</span>
          </div>
          <div class="text-slate-400 truncate">Модели: <span class="text-slate-200 font-sans">${modelsSample}</span></div>
        </div>

        <!-- Phone & Demo Links -->
        <div class="mt-3 grid grid-cols-2 gap-2 text-xs font-bold font-mono">
          <a href="tel:${f.phone_raw}" class="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 flex items-center justify-center gap-1.5 transition">
            <span>📞 ${f.phone}</span>
          </a>
          <a href="${demoUrl}" target="_blank" class="py-2 px-2.5 rounded-lg bg-orange-600/90 hover:bg-orange-500 text-white flex items-center justify-center gap-1.5 transition shadow">
            <span>🌐 Демо-сайт</span>
          </a>
        </div>

        <!-- WhatsApp Quick Copy Action -->
        <div class="mt-2">
          <button type="button" class="w-full py-1.5 px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition" onclick="copyWhatsAppMessage('${lead.slug}')">
            <span>📋 Скопировать сообщение для WhatsApp</span>
          </button>
        </div>

        <!-- Call Notes Input -->
        <div class="mt-2.5">
          <input type="text" id="note-${lead.slug}" class="w-full px-2.5 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-orange-500/50 font-sans" placeholder="Заметка (имя директора, дата перезвона...)" onchange="saveNote('${lead.slug}', this.value)">
        </div>
      </div>

      <!-- Status Footer -->
      <div class="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <label for="select-${lead.slug}" class="text-[10px] font-mono text-slate-500 uppercase">Статус:</label>
        <select id="select-${lead.slug}" class="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-orange-500 transition font-mono" onchange="updateStatus('${lead.slug}', this.value)">
          <option value="new">⚪ Новый</option>
          <option value="sent">🟡 Скинул в WhatsApp</option>
          <option value="call_later">🔵 Перезвонить</option>
          <option value="thinking">🟣 Думает / смотрит</option>
          <option value="deal">🟢 СДЕЛКА 15 000 ₽</option>
          <option value="reject">🔴 Отказ / спам</option>
        </select>
      </div>
    </div>
  `;
}).join('\n');

const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Станция обзвона: 39 мотосалонов (CRM)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #0B0F14; color: #E2E8F0; }
    .status-deal { border-color: rgba(16, 185, 129, 0.6) !important; background-color: rgba(16, 185, 129, 0.08) !important; }
    .status-sent { border-color: rgba(245, 158, 11, 0.6) !important; background-color: rgba(245, 158, 11, 0.08) !important; }
    .status-call_later { border-color: rgba(59, 130, 246, 0.6) !important; background-color: rgba(59, 130, 246, 0.06) !important; }
    .status-thinking { border-color: rgba(168, 85, 247, 0.6) !important; background-color: rgba(168, 85, 247, 0.06) !important; }
    .status-reject { opacity: 0.45; border-color: rgba(239, 68, 68, 0.3) !important; }
  </style>
</head>
<body class="p-4 sm:p-6 max-w-7xl mx-auto pb-20">

  <!-- Toast Notification -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-mono text-xs px-4 py-2.5 rounded-xl shadow-xl transition-all duration-300 opacity-0 pointer-events-none translate-y-2">
    Текст скопирован!
  </div>

  <!-- Header -->
  <header class="mb-6 pb-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase mb-1.5">
        🔥 ВОРКСТЕЙШН ПРОДАЖ · МОТОСАЛОНЫ РФ
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Станция обзвона: 39 проверенных салонов</h1>
      <p class="text-xs text-slate-400 mt-0.5">Реальные телефоны, часовые пояса от МСК, готовые ссылки на Vercel и скрипты звонка.</p>
    </div>

    <!-- Quick Stats & Clock -->
    <div class="flex flex-wrap items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs font-mono shadow-md">
      <div>
        <span class="text-slate-400 block text-[10px]">ВСЕГО БАЗА:</span>
        <span class="text-base font-bold text-white">${leads.length}</span>
      </div>
      <div class="h-6 w-px bg-slate-800"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">В WHATSAPP:</span>
        <span id="stat-sent" class="text-base font-bold text-amber-400">0</span>
      </div>
      <div class="h-6 w-px bg-slate-800"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">ПЕРЕЗВОНИТЬ:</span>
        <span id="stat-call" class="text-base font-bold text-sky-400">0</span>
      </div>
      <div class="h-6 w-px bg-slate-800"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">СДЕЛКИ (15k):</span>
        <span id="stat-deal" class="text-base font-bold text-emerald-400">0</span>
      </div>
      <div class="h-6 w-px bg-slate-800"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">ВРЕМЯ МСК:</span>
        <span id="moscow-clock" class="text-base font-bold text-orange-400">--:--</span>
      </div>
    </div>
  </header>

  <!-- Controls Bar: Script Toggle + Filters -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
    <div class="flex flex-wrap items-center gap-2">
      <button type="button" onclick="toggleCheatSheet()" class="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs font-mono transition flex items-center gap-1.5 shadow">
        <span>📖 Шпаргалка звонящего и возражения</span>
      </button>
      <button type="button" onclick="toggleFollowUp()" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs font-mono transition flex items-center gap-1.5 border border-slate-700">
        <span>💬 Скрипты дожима (День 2 и 3)</span>
      </button>
      <button type="button" onclick="exportData()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition border border-slate-700">
        <span>📥 Экспорт заметок</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-1 font-mono text-xs" id="filter-buttons">
      <button type="button" onclick="setFilter('all', this)" class="filter-btn active px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold">Все (${leads.length})</button>
      <button type="button" onclick="setFilter('no_site', this)" class="filter-btn px-2.5 py-1 rounded-lg text-emerald-300 hover:text-white border border-emerald-500/30">Без сайта (${noSiteCount})</button>
      <button type="button" onclick="setFilter('has_site', this)" class="filter-btn px-2.5 py-1 rounded-lg text-sky-300 hover:text-white border border-sky-500/30">Редизайн (${hasSiteCount})</button>
      <button type="button" onclick="setFilter('new', this)" class="filter-btn px-2.5 py-1 rounded-lg text-slate-400 hover:text-white">Новые</button>
      <button type="button" onclick="setFilter('sent', this)" class="filter-btn px-2.5 py-1 rounded-lg text-slate-400 hover:text-amber-400">В WhatsApp</button>
      <button type="button" onclick="setFilter('call_later', this)" class="filter-btn px-2.5 py-1 rounded-lg text-slate-400 hover:text-sky-400">Перезвонить</button>
      <button type="button" onclick="setFilter('deal', this)" class="filter-btn px-2.5 py-1 rounded-lg text-slate-400 hover:text-emerald-400">Сделки</button>
    </div>
  </div>

  <!-- Collapsible Cheat Sheet: Objections and Calling Script -->
  <div id="cheatsheet" class="hidden mb-6 p-5 bg-slate-900 border border-orange-500/40 rounded-2xl shadow-2xl text-xs space-y-4">
    <div class="flex items-center justify-between pb-3 border-b border-slate-800">
      <h2 class="text-sm font-extrabold text-orange-400 uppercase tracking-wider font-mono">🎯 Шпаргалка звонка и отработка возражений (по гайду)</h2>
      <button type="button" onclick="toggleCheatSheet()" class="text-slate-400 hover:text-white font-mono text-xs">✕ Закрыть</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/30 space-y-2">
        <h3 class="font-bold text-xs uppercase font-mono text-emerald-300">🟢 Скрипт А: Салон БЕЗ отдельного сайта (${noSiteCount} шт.):</h3>
        <p class="text-slate-300 leading-relaxed">
          «— Здравствуйте! Это мотосалон <strong>[Название]</strong>?<br>
          — Меня зовут Максим, я разработчик. Смотрел вашу карточку в <strong>[Городе]</strong>: хороший рейтинг на картах, техника в наличии, но увидел, что отдельного современного сайта пока нет.<br>
          Я бесплатно собрал готовую демо-версию под ваш салон — с категориями и ценами «от», встроенной Яндекс Картой, подбором техники и кнопкой мгновенного звонка с телефона. Денег не прошу, сайт уже открывается. <strong>Куда в WhatsApp скинуть ссылку взглянуть за минуту?</strong>»
        </p>
      </div>

      <div class="bg-slate-950/80 p-3.5 rounded-xl border border-sky-500/30 space-y-2">
        <h3 class="font-bold text-xs uppercase font-mono text-sky-300">🔵 Скрипт Б: У салона УЖЕ ЕСТЬ сайт (${hasSiteCount} шт. на редизайн):</h3>
        <p class="text-slate-300 leading-relaxed">
          «— Здравствуйте! Это мотосалон <strong>[Название]</strong>?<br>
          — Меня зовут Максим, я разработчик. Заходил на ваш сайт с телефона и увидел, что первый экран и мобильное обращение можно заметно упростить для покупателя.<br>
          Чтобы не объяснять на словах, я собрал альтернативный демо-концепт именно под ваш салон — с телефоном и маршрутом в 1 клик, каталогом «от» и нижней мобильной панелью. Денег не беру, <strong>куда в WhatsApp скинуть ссылку для оценки с телефона?</strong>»
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-emerald-300">💰 «Сколько это стоит?» (Правило №9: цену НЕ называем!)</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«Смотреть и тестировать демо абсолютно бесплатно, это ни к чему не обязывает. Стоимость переноса на ваш домен и доработки обсудим уже после того, как вы откроете сайт с телефона и скажете, нравится ли подача. Куда удобнее отправить ссылку — в WhatsApp или Telegram?»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-amber-300">📍 «Нам хватает Яндекс Карт / 2ГИС»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«Карты приводят людей, но прямо внутри вашей карточки снизу крутится реклама и похожие салоны конкурентов. Личный сайт забирает человека из поиска к вам напрямую — только ваша техника, маршрут и прямой звонок.»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-amber-300">🛒 «У нас всё на Авито»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«На Авито под каждым вашим объявлением блок конкурентов с ценой ниже на пару тысяч, плюс комиссия за продвижение. На своём сайте покупатель видит только ваш ассортимент и сразу звонит или строит маршрут.»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-rose-300">🤨 «Это не развод? Зачем бесплатно?»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«Никаких паролей и предоплат не прошу: ссылка на демо уже работает, это готовый пример моей работы под ваш город. Если концепт не зайдёт — удаляю по первой просьбе, в подвале так и написано.»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-sky-300">✉️ «Скиньте на почту»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«На почте коммерческие обычно теряются в папке со счетами, а сайт лучше глянуть прямо с экрана телефона. Давайте я за 5 секунд отправлю в WhatsApp — проверим, что ссылка открывается?»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-sky-300">🧑‍💼 «Владельца нет, я администратор»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«Отлично, подскажите, пожалуйста, как зовут руководителя и в какое время удобнее набрать ему лично? А вам могу закинуть ссылку в WhatsApp, чтобы сразу передали посмотреть.»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-purple-300">📱 «У нас есть страница ВК / группа»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«ВК отлично работает на постоянников, но из поиска Яндекса люди без авторизации часто уходят со страницы. Сайт открывается мгновенно без входа в аккаунт и ведёт сразу на звонок.»</em>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
        <h3 class="font-bold text-xs uppercase font-mono text-sky-300">❄️ «Сейчас не сезон»:</h3>
        <p class="text-slate-300 leading-relaxed">
          <em>«Межсезонье — самое спокойное время выверить каталог и дать домену проиндексироваться в Яндексе, чтобы к старту спроса сайт уже стабильно ловил звонки без спешки.»</em>
        </p>
      </div>
    </div>
  </div>

  <!-- Collapsible Follow-up Templates -->
  <div id="followup" class="hidden mb-6 p-5 bg-slate-900 border border-sky-500/40 rounded-2xl shadow-2xl text-xs space-y-4">
    <div class="flex items-center justify-between pb-3 border-b border-slate-800">
      <h2 class="text-sm font-extrabold text-sky-400 uppercase tracking-wider font-mono">📞 Дожим по гайду (§12): сначала голос, не спам в мессенджере</h2>
      <button type="button" onclick="toggleFollowUp()" class="text-slate-400 hover:text-white font-mono text-xs">✕ Закрыть</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/30 space-y-2">
        <h3 class="font-bold text-emerald-300 font-mono">Шаг 1 · Пока не повесили трубку:</h3>
        <p class="text-slate-300 leading-relaxed">
          Отправляй ссылку в WhatsApp <strong>во время звонка</strong> и дождись устного подтверждения: <em>«Да, вижу сообщение, ссылка открывается»</em>. Не прощайся «скину потом».
        </p>
      </div>

      <div class="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/30 space-y-2">
        <h3 class="font-bold text-amber-300 font-mono">Шаг 2 · На следующий день: ЗВОНОК ПЕРВЫМ!</h3>
        <p class="text-slate-300 leading-relaxed">
          Сначала <strong>перезвони голосом</strong>: <em>«[Имя], здравствуйте! Максим, вчера скидывал демо-концепт для [Название]. Получилось глянуть с телефона? Всё ли верно по категориям и адресу?»</em><br>
          <span class="text-slate-400">Только если не взяли трубку — пиши короткий вопрос в WhatsApp по реальной технике из их карточки (без выдуманных моделей).</span>
        </p>
      </div>

      <div class="bg-slate-950/80 p-3.5 rounded-xl border border-sky-500/30 space-y-2">
        <h3 class="font-bold text-sky-300 font-mono">Шаг 3 · После просмотра демо (переход к цене):</h3>
        <p class="text-slate-300 leading-relaxed">
          Когда человек открыл сайт и оценил подачу — презентуй условия запуска (от <strong>15 000 ₽</strong> перенос на ваш домен + настройка заявок в WhatsApp/Telegram) и согласуй мелкие правки цен/фото.
        </p>
      </div>
    </div>
  </div>

  <!-- Leads Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="cards-container">
    ${cardsHtml}
  </div>

  <script>
    const leadsData = ${JSON.stringify(leads.map(l => ({
      slug: l.slug,
      name: l.facts.name,
      city: l.facts.city,
      address: l.facts.address,
      phone: l.facts.phone,
      whatsapp: l.facts.whatsapp,
      hasWebsite: Boolean(l.facts.has_website),
      existingWebsite: l.facts.existing_website || '',
      catalog: l.catalog.slice(0, 2).map(c => c.name + ' (' + c.price + ')').join(', ')
    })), null, 2)};

    const STORAGE_KEY = 'motosalon_crm_statuses_v2';
    const NOTES_KEY = 'motosalon_crm_notes_v2';

    function getStatuses() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) { return {}; }
    }

    function saveStatuses(data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function getNotes() {
      try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {}; } catch(e) { return {}; }
    }

    function saveNote(slug, text) {
      const notes = getNotes();
      notes[slug] = text;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }

    function updateStatus(slug, status) {
      const statuses = getStatuses();
      statuses[slug] = status;
      saveStatuses(statuses);
      applyCardColor(slug, status);
      updateStats();
    }

    function applyCardColor(slug, status) {
      const card = document.getElementById('card-' + slug);
      if (!card) return;
      card.dataset.status = status;
      card.classList.remove('status-deal', 'status-sent', 'status-call_later', 'status-thinking', 'status-reject');
      if (status !== 'new') card.classList.add('status-' + status);
    }

    function updateStats() {
      const statuses = getStatuses();
      let sent = 0, call = 0, deal = 0;
      for (const slug in statuses) {
        if (statuses[slug] === 'sent') sent++;
        if (statuses[slug] === 'call_later') call++;
        if (statuses[slug] === 'deal') deal++;
      }
      document.getElementById('stat-sent').textContent = sent;
      document.getElementById('stat-call').textContent = call;
      document.getElementById('stat-deal').textContent = deal;
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      setTimeout(() => {
        t.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      }, 2500);
    }

    function copyWhatsAppMessage(slug) {
      const lead = leadsData.find(l => l.slug === slug);
      if (!lead) return;
      const demoUrl = 'https://dist-nine-omega-o6mskw23t3.vercel.app/' + slug + '/';
      const text = lead.hasWebsite
        ? 'Здравствуйте! Это Максим, только что созванивались по поводу мотосалона ' + lead.name + ' (' + lead.city + ').\\n\\n' +
          'Как и договаривались, скидываю бесплатный концепт обновления сайта под ваш салон (удобный мобильный экран, сравнимо с ' + (lead.existingWebsite || 'текущим сайтом') + '):\\n👉 ' + demoUrl + '\\n\\n' +
          'Что уже собрано в концепте:\\n' +
          '1. Первый экран для телефона: рейтинг, адрес, график, телефон и кнопка маршрута на первом касании\\n' +
          '2. Каталог категорий с ориентировочными ценами «от» (' + lead.catalog + ')\\n' +
          '3. Подбор техники под рост и опыт с быстрым вопросом в ваш WhatsApp и встроенная Яндекс Карта\\n' +
          '4. Нижняя липкая панель со смартфона (Позвонить / Маршрут / WhatsApp)\\n\\n' +
          'Посмотрите, пожалуйста, с телефона за 1-2 минуты. Буду рад короткой обратной связи!'
        : 'Здравствуйте! Это Максим, только что созванивались по поводу мотосалона ' + lead.name + ' (' + lead.city + ').\\n\\n' +
          'Вот ссылка на готовую бесплатную демо-версию сайта под ваш салон:\\n👉 ' + demoUrl + '\\n\\n' +
          'Что внутри:\\n' +
          '1. Каталог с ориентировочными ценами «от» (' + lead.catalog + ')\\n' +
          '2. Кнопка звонка и маршрут на встроенной Яндекс Карте\\n' +
          '3. Интерактивный подбор техники под рост и опыт с выводом клиента к вам в WhatsApp\\n' +
          '4. Нижняя закреплённая панель для смартфонов (Позвонить / Маршрут / WhatsApp)\\n\\n' +
          'Посмотрите, пожалуйста, с телефона, как будет 1-2 минуты. Буду рад обратной связи!';

      navigator.clipboard.writeText(text).then(() => {
        showToast('✓ Сообщение для WhatsApp скопировано в буфер!');
      }).catch(() => {
        prompt('Скопируйте текст:', text);
      });
    }

    function toggleCheatSheet() {
      document.getElementById('cheatsheet').classList.toggle('hidden');
    }

    function toggleFollowUp() {
      document.getElementById('followup').classList.toggle('hidden');
    }

    function setFilter(status, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-white/10', 'text-white', 'font-bold'));
      if (btn) {
        btn.classList.add('active', 'bg-white/10', 'text-white', 'font-bold');
      }

      document.querySelectorAll('.lead-card').forEach(card => {
        if (status === 'all') {
          card.classList.remove('hidden');
        } else if (status === 'no_site') {
          card.classList.toggle('hidden', card.dataset.hasWebsite !== 'no');
        } else if (status === 'has_site') {
          card.classList.toggle('hidden', card.dataset.hasWebsite !== 'yes');
        } else {
          const cardStatus = card.dataset.status || 'new';
          card.classList.toggle('hidden', cardStatus !== status);
        }
      });
    }

    function exportData() {
      const statuses = getStatuses();
      const notes = getNotes();
      const rows = [['Номер', 'Slug', 'Название', 'Город', 'Телефон', 'Статус', 'Заметка']];
      leadsData.forEach((l, i) => {
        rows.push([
          i + 1,
          l.slug,
          '"' + l.name + '"',
          '"' + l.city + '"',
          '"' + l.phone + '"',
          statuses[l.slug] || 'new',
          '"' + (notes[l.slug] || '').replace(/"/g, '""') + '"'
        ]);
      });
      const csv = '\\uFEFF' + rows.map(r => r.join(';')).join('\\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'motosalon_calls_' + new Date().toISOString().slice(0, 10) + '.csv';
      a.click();
    }

    function updateLiveClocks() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const mskTime = new Date(utc + (3600000 * 3));
      
      const formatTime = (d) => {
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return hh + ':' + mm;
      };

      const mskEl = document.getElementById('moscow-clock');
      if (mskEl) mskEl.textContent = formatTime(mskTime);

      document.querySelectorAll('.local-time[data-offset]').forEach(el => {
        const offset = parseInt(el.getAttribute('data-offset'), 10);
        const local = new Date(mskTime.getTime() + (offset * 3600000));
        el.textContent = 'Местное: ' + formatTime(local);
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const statuses = getStatuses();
      const notes = getNotes();

      for (const slug in statuses) {
        const select = document.getElementById('select-' + slug);
        if (select) {
          select.value = statuses[slug];
          applyCardColor(slug, statuses[slug]);
        }
      }

      for (const slug in notes) {
        const input = document.getElementById('note-' + slug);
        if (input) input.value = notes[slug];
      }

      updateStats();
      updateLiveClocks();
      setInterval(updateLiveClocks, 10000);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(salesFile, fullHtml, 'utf8');

console.log(`CALL_STATION.html успешно собран для ${leads.length} мотосалонов (${noSiteCount} без сайта, ${hasSiteCount} с сайтом):`);
console.log(`- ${salesFile} (публичный dist/CALL_STATION.html не создаётся)`);
