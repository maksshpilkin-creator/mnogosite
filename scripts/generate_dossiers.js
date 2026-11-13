/**
 * generate_dossiers.js
 * Генерирует персональные досье (боевые карточки) для каждого из 19 мотосалонов:
 * 1. Индивидуальный скрипт первых 15 секунд под конкретный город и адрес
 * 2. Точка давления (почему без сайта они теряют клиентов прямо сейчас)
 * 3. Готовая ссылка на демо и шаблон для WhatsApp
 * 4. Интерактивная веб-станция обзвона (CALL_STATION.html) с CRM в localStorage
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');
const dossiersDir = path.join(__dirname, '..', 'sales', 'dossiers');
const callStationPath = path.join(__dirname, '..', 'sales', 'CALL_STATION.html');

if (!fs.existsSync(dossiersDir)) {
  fs.mkdirSync(dossiersDir, { recursive: true });
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
const salons = files.map(file => JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8')));

const cityTimezones = {
  'Барнаул': { offset: '+4', num: 4, desc: 'когда в МСК 16:00, там 20:00' },
  'Тольятти': { offset: '+1', num: 1, desc: 'когда в МСК 16:00, там 17:00' },
  'Иркутск': { offset: '+5', num: 5, desc: 'когда в МСК 16:00, там 21:00' },
  'Уфа': { offset: '+2', num: 2, desc: 'когда в МСК 16:00, там 18:00' },
  'Екатеринбург': { offset: '+2', num: 2, desc: 'когда в МСК 16:00, там 18:00' },
  'Воронеж': { offset: '0', num: 0, desc: 'время как в Москве' },
  'Ростов-на-Дону': { offset: '0', num: 0, desc: 'время как в Москве' },
  'Краснодар': { offset: '0', num: 0, desc: 'время как в Москве' },
  'Красноярск': { offset: '+4', num: 4, desc: 'когда в МСК 16:00, там 20:00' },
  'Новосибирск': { offset: '+4', num: 4, desc: 'когда в МСК 16:00, там 20:00' },
  'Казань': { offset: '0', num: 0, desc: 'время как в Москве' },
  'Омск': { offset: '+3', num: 3, desc: 'когда в МСК 16:00, там 19:00' },
  'Пермь': { offset: '+2', num: 2, desc: 'когда в МСК 16:00, там 18:00' },
  'Самара': { offset: '+1', num: 1, desc: 'когда в МСК 16:00, там 17:00' },
  'Саратов': { offset: '+1', num: 1, desc: 'когда в МСК 16:00, там 17:00' },
  'Волгоград': { offset: '0', num: 0, desc: 'время как в Москве' },
  'Тюмень': { offset: '+2', num: 2, desc: 'когда в МСК 16:00, там 18:00' },
  'Челябинск': { offset: '+2', num: 2, desc: 'когда в МСК 16:00, там 18:00' },
  'Нижний Новгород': { offset: '0', num: 0, desc: 'время как в Москве' }
};

console.log(`Генерация досье для ${salons.length} мотосалонов...`);

salons.forEach((salon, idx) => {
  const tz = cityTimezones[salon.city] || { offset: '0', num: 0, desc: 'МСК' };
  const tzLabel = tz.num === 0 ? 'МСК (0)' : `${tz.offset} от МСК`;
  const dossier = `# 🎯 Боевая карточка: ${salon.name} (${salon.city})

## 📌 Паспорт объекта
- **Салон:** ${salon.name}
- **Город / Район:** ${salon.city}, ${salon.district || 'Центральный район'}
- **Часовой пояс:** ${tzLabel}
- **Адрес:** ${salon.address}
- **Яндекс Карты:** [Открыть на Яндекс Картах](https://yandex.ru/maps/?text=${encodeURIComponent(salon.name + ' ' + salon.city + ' ' + salon.address)})
- **2ГИС:** [Открыть в 2ГИС](https://2gis.ru/search/${encodeURIComponent(salon.name + ' ' + salon.city)})
- **Google Maps:** [Открыть в Google Maps](https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.name + ' ' + salon.city + ' ' + salon.address)})
- **Телефон:** ${salon.phone}
- **WhatsApp:** ${salon.whatsapp}
- **Рейтинг 2ГИС:** ${salon.rating} ★ (${salon.reviews_count} отзывов)
- **Фокус:** ${salon.focus}
- **Бренды:** ${salon.brands}
- **Ссылка на демо:** \`https://dist-nine-omega-o6mskw23t3.vercel.app/${salon.slug}/\`

---

## ⚡ Индивидуальный хук (первые 15 секунд звонка)

> *«Здравствуйте! Это мотосалон ${salon.name} в ${salon.city}?*  
> *Меня зовут [Имя], я веб-разработчик. Смотрел вашу карточку на картах на ${salon.address}: у вас шикарный рейтинг ${salon.rating} и отличный выбор техники (${salon.brands}), но заметил, что у вас нет своего сайта — клиенты находят только профиль на Авито.*  
>  
> *Я бесплатно собрал готовый демо-сайт именно под ${salon.name}: с каталогом ваших моделей, калькулятором Trade-In и записью на тест-драйв.*  
>  
> *Денег не прошу, проект уже работает. Куда в WhatsApp скинуть ссылку посмотреть с телефона?»*

---

## 🎯 Точка давления (Почему им нужен сайт)
1. **Зависимость от Авито:** При рейтинге ${salon.rating} и ${salon.reviews_count} отзывах они отдают до 40% лидов конкурентам, чьи объявления висят рядом в выдаче Авито.
2. **Сезонный Trade-In:** На личном сайте есть интерактивный калькулятор зачета старого байка, чего нет в стандартных карточках объявлений.
3. **Локальное SEO в ${salon.city}:** По запросу «купить питбайк в ${salon.city}» их сайт встанет на первые строчки поиска Яндекса, перехватывая клиентов у федеральных сетей.

---

## 💬 Сообщение для WhatsApp (отправлять прямо во время звонка)

\`\`\`text
Здравствуйте! Это [Ваше имя], программист, только что созванивались по поводу мотосалона ${salon.name}.

Вот ссылка на готовый демо-сайт, собранный под ваш салон в ${salon.city}:
👉 https://dist-nine-omega-o6mskw23t3.vercel.app/${salon.slug}/

Что внутри:
1. Каталог моделей (${salon.brands}) с ценами и фильтрами
2. Калькулятор Trade-In и рассрочки под ваш салон
3. Регламент сборки ТО-0 (протяжка динамометром, смазка прогрессии)
4. Кнопки мгновенной записи на тест-драйв

Посмотрите, пожалуйста, с телефона (занимает 1 минуту). Буду рад вашей обратной связи!
\`\`\`
`;

  fs.writeFileSync(path.join(dossiersDir, `${salon.slug}.md`), dossier, 'utf8');
});

// Генерируем интерактивную веб-станцию обзвона с CRM в localStorage
const callStationHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Станция обзвона: 19 мотосалонов (CRM)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #0F1318; color: #E2E8F0; }
  </style>
</head>
<body class="p-4 sm:p-6 max-w-7xl mx-auto">
  
  <header class="mb-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs uppercase mb-1.5">
        Интерактивная станция продаж
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Рабочее место для обзвона 19 мотосалонов</h1>
      <p class="text-xs text-slate-400 mt-0.5">Встроенные скрипты, досье, ссылки в WhatsApp и сохранение статусов в браузере.</p>
    </div>

    <!-- Счетчик прогресса -->
    <div class="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 text-xs font-mono">
      <div>
        <span class="text-slate-400 block text-[10px]">Всего точек:</span>
        <span class="text-base font-bold text-white">${salons.length}</span>
      </div>
      <div class="h-6 w-px bg-white/10"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">Отправлено демо:</span>
        <span id="stat-sent" class="text-base font-bold text-orange-400">0</span>
      </div>
      <div class="h-6 w-px bg-white/10"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">В интересе / Сделки:</span>
        <span id="stat-deal" class="text-base font-bold text-emerald-400">0</span>
      </div>
      <div class="h-6 w-px bg-white/10"></div>
      <div>
        <span class="text-slate-400 block text-[10px]">Время в Москве:</span>
        <span id="moscow-clock" class="text-base font-bold text-sky-400">--:--</span>
      </div>
    </div>
  </header>

  <!-- Сетка салонов -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="cards-container">
    ${salons.map((salon, i) => {
      const tz = cityTimezones[salon.city] || { offset: '0', num: 0, desc: 'время как в Москве' };
      const badgeText = tz.num === 0 ? 'МСК (0)' : `${tz.offset} от МСК`;
      const badgeClass = tz.num === 0
        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        : 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      const yandexUrl = 'https://yandex.ru/maps/?text=' + encodeURIComponent(salon.name + ' ' + salon.city + ' ' + salon.address);
      const dgisUrl = 'https://2gis.ru/search/' + encodeURIComponent(salon.name + ' ' + salon.city);
      const googleUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(salon.name + ' ' + salon.city + ' ' + salon.address);
      return `
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between transition hover:border-orange-500/40" id="card-${salon.slug}">
        
        <div>
          <!-- Шапка карточки -->
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-orange-400 font-bold">#${String(i + 1).padStart(2, '0')} • ${salon.city}</span> <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeClass}">${badgeText}</span>
            <span class="text-amber-400 font-bold">★ ${salon.rating} (${salon.reviews_count})</span>
          </div>

          <h3 class="font-extrabold text-base text-white leading-tight">${salon.name}</h3>
          
          <div class="flex items-center justify-between mt-1.5 text-xs text-slate-400">
            <span class="truncate flex items-center gap-1" title="${salon.address}">📍 ${salon.address}</span>
            <span class="flex items-center gap-1 shrink-0 ml-2 font-mono text-[10px]">
              <a href="${yandexUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500 hover:text-black transition border border-yellow-500/25" title="Открыть в Яндекс Картах">Яндекс</a>
              <a href="${dgisUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500 hover:text-white transition border border-emerald-500/25" title="Открыть в 2ГИС">2ГИС</a>
              <a href="${googleUrl}" target="_blank" rel="noopener" class="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 hover:bg-blue-500 hover:text-white transition border border-blue-500/25" title="Открыть в Google Maps">Google</a>
            </span>
          </div>

          <div class="mt-2.5 p-2.5 bg-black/30 rounded-xl border border-white/5 text-[11px] font-mono space-y-1">
            <div class="text-slate-300">Фокус: <span class="text-white font-sans">${salon.focus}</span></div>
            <div class="text-slate-300">Бренды: <span class="text-orange-300 font-sans">${salon.brands}</span></div>
            <div class="text-slate-300">Тел: <strong class="text-white">${salon.phone}</strong></div>
            <div class="text-slate-300 flex items-center justify-between"><span>Время: <strong class="${tz.num === 0 ? 'text-blue-300' : 'text-orange-300'} font-bold">${badgeText}</strong></span> <span class="local-time font-mono font-bold text-emerald-400" data-offset="${tz.num}"></span></div>
          </div>

          <!-- Скрипт первых 15 секунд (шпаргалка) -->
          <div class="mt-2.5 p-2 bg-orange-500/5 rounded-lg border border-orange-500/20 text-[11px] text-slate-300 leading-snug">
            <strong class="text-orange-400 font-mono block text-[10px] uppercase mb-0.5">Скрипт открытия:</strong>
            «Здравствуйте! Смотрел карточку ${salon.name} на картах в ${salon.city}: рейтинг ${salon.rating}, техника в наличии, но нет своего сайта. Бесплатно собрал демо-версию под вас. Куда в WhatsApp скинуть ссылку?»
          </div>
        </div>

        <!-- Управление статусом звонка -->
        <div class="pt-3 mt-3 border-t border-white/10 space-y-2">
          
          <div class="flex items-center gap-1.5">
            <select onchange="updateStatus('${salon.slug}', this.value)" id="select-${salon.slug}" class="flex-1 bg-white/10 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500 font-mono">
              <option value="new">⚪ Новый (не звонили)</option>
              <option value="sent">🟡 Отправил демо в WhatsApp</option>
              <option value="call_later">🔵 Перезвонить</option>
              <option value="reject">🔴 Отказ / Нет интереса</option>
              <option value="deal">🟢 Сделка / Интерес к покупке</option>
            </select>
          </div>

          <!-- Кнопки действий -->
          <div class="grid grid-cols-4 gap-1.5">
            <a href="tel:${salon.phone_clean}" class="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold text-center transition flex items-center justify-center gap-1">
              📞 Звонок
            </a>
            <a href="https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(`Здравствуйте! Это по поводу мотосалона ${salon.name}. Сделали для вас демо-сайт: https://dist-nine-omega-o6mskw23t3.vercel.app/${salon.slug}/`)}" target="_blank" class="py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-mono font-bold text-center transition flex items-center justify-center gap-1">
              💬 WA
            </a>
            <a href="${yandexUrl}" target="_blank" rel="noopener" class="py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black text-xs font-mono font-bold text-center transition flex items-center justify-center gap-1" title="Открыть в Яндекс Картах">
              🗺️ Карты
            </a>
            <a href="https://dist-nine-omega-o6mskw23t3.vercel.app/${salon.slug}/" target="_blank" class="py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-bold text-center transition flex items-center justify-center gap-1">
              🌐 Демо
            </a>
          </div>

        </div>

      </div>
    `;
    }).join('')}
  </div>

  <script>
    const STORAGE_KEY = 'motosalon_crm_statuses';

    function getStatuses() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch(e) {
        return {};
      }
    }

    function saveStatuses(statuses) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
      updateStats();
    }

    function updateStatus(slug, status) {
      const statuses = getStatuses();
      statuses[slug] = status;
      saveStatuses(statuses);
      applyCardColor(slug, status);
    }

    function applyCardColor(slug, status) {
      const card = document.getElementById('card-' + slug);
      if (!card) return;
      card.classList.remove('border-emerald-500/50', 'border-orange-500/50', 'border-blue-500/50', 'border-red-500/50');
      
      if (status === 'deal') card.classList.add('border-emerald-500/50', 'bg-emerald-500/5');
      if (status === 'sent') card.classList.add('border-orange-500/50', 'bg-orange-500/5');
      if (status === 'call_later') card.classList.add('border-blue-500/50');
      if (status === 'reject') card.classList.add('border-red-500/30', 'opacity-60');
    }

    function updateStats() {
      const statuses = getStatuses();
      let sentCount = 0;
      let dealCount = 0;

      for (const slug in statuses) {
        if (statuses[slug] === 'sent') sentCount++;
        if (statuses[slug] === 'deal') dealCount++;
      }

      document.getElementById('stat-sent').textContent = sentCount;
      document.getElementById('stat-deal').textContent = dealCount;
    }

    // Инициализация при загрузке
    document.addEventListener('DOMContentLoaded', () => {
      const statuses = getStatuses();
      for (const slug in statuses) {
        const select = document.getElementById('select-' + slug);
        if (select) {
          select.value = statuses[slug];
          applyCardColor(slug, statuses[slug]);
        }
      }
      updateStats();
      updateLiveClocks();
    });

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
        el.textContent = 'сейчас ' + formatTime(local);
      });
    }

    setInterval(updateLiveClocks, 10000);
  </script>
</body>
</html>`;

fs.writeFileSync(callStationPath, callStationHtml, 'utf8');
const distCallStationPath = path.join(__dirname, '..', 'dist', 'CALL_STATION.html');
fs.writeFileSync(distCallStationPath, callStationHtml, 'utf8');
console.log(`Интерактивная станция обзвона сгенерирована: sales/CALL_STATION.html`);
console.log(`Все 19 боевых карточек успешно созданы в sales/dossiers/!`);
