'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const templateDir = path.join(root, 'template');
const factsDir = path.join(root, 'data', 'facts');
const distDir = path.join(root, 'dist');

if (!fs.existsSync(templateDir)) {
  throw new Error('Папка template/ не найдена!');
}

const templateCss = fs.readFileSync(path.join(templateDir, 'styles.css'), 'utf8');
const assets = ['hero-enduro.png', 'product-enduro.jpg', 'product-pitbike.jpg', 'product-atv.jpg', 'rider.jpg', 'showroom.jpg'];

const leadExtrasCss = `
/* ==========================================================
   LEAD CONVERSION EXTENSIONS (Guide-Aligned, Anti-Slop)
   ========================================================== */
.hero h1 {
  white-space: normal;
  font-size: clamp(32px, 4.1vw, 56px);
  line-height: 1.02;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #d5d7d9;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.1;
}

.hero-badge .icon.small {
  width: 14px;
  height: 14px;
}

.hero-badge-rating {
  background: #fff3ec;
  border-color: rgba(255, 85, 0, 0.35);
  color: #cc4400;
}

.hero-phone {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  font-size: clamp(22px, 2.3vw, 29px);
  font-weight: 900;
  font-style: italic;
  color: var(--ink);
  letter-spacing: -0.5px;
  transition: color 0.2s ease;
}

.hero-phone:hover {
  color: var(--orange);
}

.hero-phone .icon {
  width: 24px;
  height: 24px;
  color: var(--orange);
}

.hero-actions {
  margin-top: 16px;
  flex-wrap: wrap;
}

/* Trust & Verified Facts Strip */
.trust-section {
  background: #ffffff;
  border-block: 1px solid var(--line-light);
  padding: 28px 0;
}

.trust-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 28px;
  align-items: center;
}

.trust-score {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: #cc4400;
  background: #fff3ec;
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.trust-copy h2 {
  font-size: clamp(26px, 2.8vw, 38px);
  margin-bottom: 8px;
}

.trust-copy p {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.35;
}

.trust-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.trust-fact-card {
  background: var(--paper);
  border: 1px solid var(--line-light);
  border-radius: 10px;
  padding: 12px 14px;
}

.trust-fact-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--muted);
  margin-bottom: 4px;
}

.trust-fact-val {
  font-size: 16px;
  font-weight: 750;
  color: var(--ink);
  line-height: 1.25;
}

.trust-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

/* Contacts + Embedded Map */
.contacts {
  overflow-x: hidden;
  padding-bottom: 28px;
}

.contacts-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0 18px;
  font-size: 15px;
  color: var(--muted);
}

.contacts-meta-row strong {
  color: var(--ink);
}

.map-frame {
  width: 100%;
  max-width: 100%;
  height: 290px;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  background: #eef0f2;
}

.map-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* Mobile Floating Bottom Dock */
.mobile-dock {
  display: none;
}

@media (max-width: 920px) {
  .trust-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

@media (max-width: 760px) {
  body {
    padding-bottom: 74px;
  }

  .hero-meta {
    justify-content: flex-start;
  }

  .hero-phone {
    font-size: 24px;
  }

  .trust-facts {
    grid-template-columns: 1fr;
  }

  .map-frame {
    height: 230px;
  }

  .mobile-dock {
    display: grid;
    grid-template-columns: 1.25fr 1fr 1fr;
    gap: 8px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 45;
    padding: 9px 12px calc(9px + env(safe-area-inset-bottom));
    background: rgba(248, 249, 250, 0.97);
    backdrop-filter: blur(8px);
    border-top: 1px solid var(--line);
    box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.08);
  }

  .mobile-dock a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 44px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  }

  .mobile-dock .dock-call {
    background: var(--orange);
    color: #fff;
  }

  .mobile-dock .dock-route {
    background: var(--ink);
    color: #fff;
  }

  .mobile-dock .dock-wa {
    background: #ffffff;
    color: var(--ink);
    border: 1px solid var(--line);
  }

  .mobile-dock .icon {
    width: 18px;
    height: 18px;
  }

  .watermark-badge {
    bottom: 74px; /* position above mobile dock */
    right: 12px;
    padding: 6px 11px;
    font-size: 12px;
  }
}
`;

// Clean obsolete legacy directories from dist/ (keep only data/facts slugs + motodrive54 reference)
const factFiles = fs.readdirSync(factsDir).filter(f => f.endsWith('.json'));
const validSlugs = new Set(factFiles.map(f => f.replace('.json', '')));
validSlugs.add('motodrive54');

if (fs.existsSync(distDir)) {
  for (const entry of fs.readdirSync(distDir)) {
    const full = path.join(distDir, entry);
    if (entry.startsWith('.')) continue;
    if (fs.statSync(full).isDirectory() && !validSlugs.has(entry)) {
      fs.rmSync(full, { recursive: true, force: true });
      console.log(`Удалена устаревшая папка: dist/${entry}/`);
    }
  }
  const leakedCallStation = path.join(distDir, 'CALL_STATION.html');
  if (fs.existsSync(leakedCallStation)) {
    fs.unlinkSync(leakedCallStation);
    console.log('Удалён публичный файл CRM из dist/: dist/CALL_STATION.html');
  }
}

console.log(`Найдено ${factFiles.length} карточек фактов для сборки.`);

let builtCount = 0;

for (const file of factFiles) {
  const factData = JSON.parse(fs.readFileSync(path.join(factsDir, file), 'utf8'));
  const { slug, facts, catalog, sources } = factData;
  const targetDir = path.join(distDir, slug);
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Assets
  const targetAssetsDir = path.join(targetDir, 'assets');
  fs.mkdirSync(targetAssetsDir, { recursive: true });
  for (const asset of assets) {
    fs.copyFileSync(path.join(templateDir, 'assets', asset), path.join(targetAssetsDir, asset));
  }
  for (const sub of ['fonts', 'icons']) {
    fs.cpSync(path.join(templateDir, 'assets', sub), path.join(targetAssetsDir, sub), { recursive: true });
  }

  // 2. CSS (Base reference CSS + Lead Conversion Extensions)
  fs.writeFileSync(path.join(targetDir, 'styles.css'), templateCss + '\n' + leadExtrasCss, 'utf8');

  // 3. Products markup
  const cardsHtml = catalog.map(p => {
    return `<article class="product-card" data-category="${p.category}"><div class="product-image image-frame"><img src="${p.image}" alt="${p.name}"><span class="image-fallback">${p.name}</span></div><h3>${p.name}</h3><p class="product-spec">${p.spec}</p><p class="product-price">${p.price}</p><button type="button" class="button outline product-more" data-product="${p.id}">Подробнее <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></article>`;
  }).join('\n');

  // 4. URLs & Maps
  const encodedGreeting = encodeURIComponent(`Здравствуйте! Пишу с демо-сайта ${facts.name} (${facts.city}), хочу уточнить наличие мототехники.`);
  const dgisUrl = sources && sources[0] ? sources[0].url : `https://2gis.ru/search/${encodeURIComponent(facts.name + ' ' + facts.city)}`;
  const yandexUrl = sources && sources[1] ? sources[1].url : `https://yandex.ru/maps/?text=${encodeURIComponent(facts.name + ' ' + facts.city + ' ' + facts.address)}`;
  const mapWidgetSrc = `https://yandex.ru/map-widget/v1/?mode=search&text=${encodeURIComponent(facts.city + ', ' + facts.address + ', ' + facts.name)}`;

  const pageHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="reference-template" content="reference-hybrid-v1"><meta name="theme-color" content="#f8f9fa"><title>${facts.name} — мотосалон в г. ${facts.city}</title><meta name="description" content="Демонстрационный концепт для мотосалона ${facts.name} (${facts.city}). Не официальный сайт, удалим по первой просьбе."><link rel="preload" href="assets/fonts/RobotoCondensed-Variable.ttf" as="font" type="font/ttf" crossorigin><link rel="preload" href="assets/fonts/RobotoCondensed-Italic-Variable.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script>
</head>
<body>
<a class="skip-link" href="#catalog">Перейти к каталогу</a>
<div class="demo-strip"><div class="container">Демо-концепт для «${facts.name}» · не является официальным сайтом · удалим по первой просьбе</div></div>
<header class="site-header"><div class="container header-inner"><a class="brand" href="#top" aria-label="${facts.name} — начало страницы"><span class="brand-name">${facts.brand_display}</span><span class="brand-city">${facts.city}</span></a><button class="menu-toggle icon-button" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-nav"><span class="icon" data-icon="menu-2" aria-hidden="true"></span></button><nav class="main-nav" id="main-nav" aria-label="Основная навигация"><a href="#catalog" data-filter-link="all">Техника <span class="icon small" data-icon="chevron-down" aria-hidden="true"></span></a><a href="#catalog" data-filter-link="gear">Экипировка</a><a href="#service">Сервис</a><a href="#contacts">Контакты</a></nav><a class="button orange header-call" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>Позвонить</a></div></header>
<main id="top">
<section class="hero" aria-labelledby="hero-title"><div class="container hero-inner"><div class="hero-copy"><div class="hero-meta"><span class="hero-badge"><span class="icon small" data-icon="map-pin" aria-hidden="true"></span>${facts.district || facts.city}</span><span class="hero-badge"><span class="icon small" data-icon="calendar" aria-hidden="true"></span>${facts.hours}</span><span class="hero-badge hero-badge-rating">★ ${facts.rating} в 2ГИС</span></div><h1 id="hero-title">${facts.name}</h1><div class="orange-rule" aria-hidden="true"></div><p>${facts.hero_subtitle}</p><a class="hero-phone" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>${facts.phone}</a><div class="hero-actions"><a class="button orange" href="tel:${facts.phone_raw}">Позвонить <span class="icon" data-icon="phone" aria-hidden="true"></span></a><a class="button outline" href="#contacts">Маршрут и карта</a></div></div><div class="hero-visual"><img src="assets/hero-enduro.png" alt="${facts.name} — мототехника в ${facts.city}" fetchpriority="high"><span class="image-fallback">Мототехника в ${facts.city}</span></div></div></section>
<div class="category-strip" aria-label="Категории техники"><div class="container category-inner"><a href="#catalog" data-filter-link="enduro"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Эндуро</a><a href="#catalog" data-filter-link="pitbike"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Питбайки</a><a href="#catalog" data-filter-link="atv"><span class="icon" data-icon="atv" aria-hidden="true"></span>Квадроциклы</a><a href="#catalog" data-filter-link="gear"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Экипировка</a></div></div>
<section class="catalog section container" id="catalog" aria-labelledby="catalog-title"><div class="section-heading"><h2 id="catalog-title">Выбери свою технику</h2><p>Основные категории и цены «от»</p></div><div class="catalog-layout"><div class="catalog-filters" role="group" aria-label="Фильтр каталога"><button type="button" class="filter active" data-filter="all" aria-pressed="true"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Вся техника<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="enduro" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Эндуро<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="pitbike" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Питбайки<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="atv" aria-pressed="false"><span class="icon" data-icon="atv" aria-hidden="true"></span>Квадроциклы<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="gear" aria-pressed="false"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Экипировка<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button></div><div class="catalog-results"><p class="visually-hidden" id="catalog-status" role="status" aria-live="polite">Показаны модели каталога</p><div class="product-grid" id="product-grid">
${cardsHtml}
</div><div class="empty-state" id="catalog-empty" hidden><span class="icon" data-icon="helmet" aria-hidden="true"></span><h3>Наличие уточняйте по телефону</h3><p>Актуальные позиции в этой категории уточняйте у консультантов салона «${facts.name}» по телефону ${facts.phone}.</p><button class="button outline" type="button" data-filter="all">Показать доступные позиции</button></div></div></div><noscript><p class="noscript-note">Включите JavaScript для фильтров, карточек и подбора.</p></noscript></section>
<section class="trust-section" aria-labelledby="trust-title"><div class="container trust-grid"><div class="trust-copy"><span class="trust-score">★ Рейтинг ${facts.rating} в 2ГИС / Картах</span><h2 id="trust-title">Карточка салона и отзывы клиентов</h2><p>Все отзывы и оценки доступны напрямую в официальных карточках организации на картах. Перед визитом уточните наличие нужной модели по телефону.</p><div class="trust-links"><a class="button outline orange-outline" href="${dgisUrl}" target="_blank" rel="noopener">Отзывы в 2ГИС <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></a><a class="button outline" href="${yandexUrl}" target="_blank" rel="noopener">Яндекс Карты <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></a></div></div><div class="trust-facts"><div class="trust-fact-card"><span class="trust-fact-label">Специализация</span><span class="trust-fact-val">${facts.focus}</span></div><div class="trust-fact-card"><span class="trust-fact-label">Основные бренды</span><span class="trust-fact-val">${facts.brands || 'Уточняйте в салоне'}</span></div><div class="trust-fact-card"><span class="trust-fact-label">Район города</span><span class="trust-fact-val">${facts.district || facts.city}</span></div><div class="trust-fact-card"><span class="trust-fact-label">График работы</span><span class="trust-fact-val">${facts.hours}</span></div></div></div></section>
<section class="selection" id="selection" aria-labelledby="selection-title"><div class="container selection-inner"><div class="selection-copy"><h2 id="selection-title">Подберём под рост и опыт</h2><p>Расскажем, какая техника подойдёт именно тебе:<br> для старта, активного бездорожья или для подростка.</p><div class="selection-chips" role="group" aria-label="Сценарий подбора"><button class="chip" type="button" data-scenario="first" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Первый байк</button><button class="chip" type="button" data-scenario="offroad" aria-pressed="false"><span class="icon" data-icon="mountain" aria-hidden="true"></span>Для бездорожья</button><button class="chip" type="button" data-scenario="teen" aria-pressed="false"><span class="icon" data-icon="users" aria-hidden="true"></span>Для подростка</button></div><p class="selection-result" id="selection-result" role="status" hidden></p><button class="button orange" type="button" data-request>Обсудить подбор <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></div><div class="selection-visual image-frame"><img src="assets/rider.jpg" alt="Райдер на природе — иллюстративное изображение" loading="lazy"><span class="image-fallback">Иллюстрация райдера</span></div></div></section>
<section class="service-strip" id="service" aria-labelledby="service-title"><div class="container service-inner"><h2 id="service-title">Сервис и экипировка</h2><button type="button" data-service="maintenance"><span class="icon" data-icon="tool" aria-hidden="true"></span>Обслуживание <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button><button type="button" data-service="parts"><span class="icon" data-icon="settings" aria-hidden="true"></span>Запчасти <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button><button type="button" data-service="gear"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Защита и шлемы <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button></div></section>
<section class="showroom" aria-labelledby="showroom-title"><div class="showroom-inner container"><div class="showroom-visual image-frame"><img src="assets/showroom.jpg" alt="Иллюстрация интерьера мотосалона, не реальное фото точки" loading="lazy"><span class="image-fallback">Мотосалон ${facts.name}</span></div><div class="showroom-copy"><h2 id="showroom-title">Посмотри технику<br> вживую</h2><p>Приезжай в салон (${facts.address}), чтобы оценить технику, примерить посадку и получить консультацию.</p><button class="button orange" type="button" data-contact="visit">Уточнить визит <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></div></div></section>
<section class="contacts" id="contacts" aria-label="Контакты и карта проезда"><div class="container"><div class="contacts-inner"><p class="contact-city"><span class="icon" data-icon="map-pin" aria-hidden="true"></span><strong>${facts.city}</strong></p><button class="address-button" type="button" data-contact="visit"><span class="icon" data-icon="calendar" aria-hidden="true"></span>${facts.address}</button><a class="button outline orange-outline" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>Позвонить</a><a class="button outline" href="https://wa.me/${facts.whatsapp}?text=${encodedGreeting}" target="_blank" rel="noopener"><span class="icon" data-icon="mail" aria-hidden="true"></span>Написать</a></div><div class="contacts-meta-row"><span><strong>Район:</strong> ${facts.district || facts.city} · <strong>Режим работы:</strong> ${facts.hours}</span><span><a href="${dgisUrl}" target="_blank" rel="noopener" style="text-decoration:underline;margin-right:14px;">Открыть в 2ГИС</a><a href="${yandexUrl}" target="_blank" rel="noopener" style="text-decoration:underline;">Маршрут в Яндексе</a></span></div><div class="map-frame"><iframe src="${mapWidgetSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Карта проезда в ${facts.name} (${facts.city})"></iframe></div></div></section>
</main>
<footer class="site-footer"><div class="container footer-inner"><a class="brand" href="#top" aria-label="${facts.name} — начало страницы"><span class="brand-name">${facts.brand_display}</span><span class="brand-city">${facts.city}</span></a><nav aria-label="Навигация в подвале"><a href="#catalog" data-filter-link="all">Техника</a><a href="#catalog" data-filter-link="gear">Экипировка</a><a href="#service">Сервис</a><a href="#contacts">Контакты</a></nav><p>Цены «от» ориентировочные · уточняйте по телефону</p></div><p class="container footer-disclaimer">«${facts.name}» (${facts.city}, ${facts.district || facts.city}) — демонстрационный концепт, не является официальным сайтом. Удалим по первой просьбе. Подготовлено по открытым данным (2ГИС / Яндекс Карты). Адрес: ${facts.address}. Телефон: ${facts.phone}. График: ${facts.hours}. Наличие и точные цены уточняйте по телефону. Изображения на странице иллюстративные.</p></footer>
<nav class="mobile-dock" aria-label="Быстрые действия с телефона"><a class="dock-call" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>Позвонить</a><a class="dock-route" href="${yandexUrl}" target="_blank" rel="noopener"><span class="icon" data-icon="map-pin" aria-hidden="true"></span>Маршрут</a><a class="dock-wa" href="https://wa.me/${facts.whatsapp}?text=${encodedGreeting}" target="_blank" rel="noopener"><span class="icon" data-icon="mail" aria-hidden="true"></span>WhatsApp</a></nav>
<dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close icon-button" type="button" data-close aria-label="Закрыть окно"><span class="icon" data-icon="x" aria-hidden="true"></span></button><div id="dialog-content"></div></dialog>
<a href="https://t.me/devbymax" target="_blank" rel="noopener" class="watermark-badge" aria-label="Разработка сайта в Telegram @devbymax"><span class="watermark-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg></span><span class="watermark-text">Разработка: <strong>@devbymax</strong></span></a>
</body></html>
`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');

  // 5. JavaScript (app.js)
  const productsObj = {};
  for (const item of catalog) {
    productsObj[item.id] = {
      name: item.name,
      price: item.price,
      spec: item.spec,
      image: item.image,
      category: item.category
    };
  }

  const salonObj = {
    name: facts.name,
    city: facts.city,
    district: facts.district,
    address: facts.address,
    phone: facts.phone,
    phoneRaw: facts.phone_raw,
    whatsapp: facts.whatsapp,
    hours: facts.hours,
    rating: facts.rating,
    mapUrl: dgisUrl,
    yandexUrl: yandexUrl
  };

  const appJsContent = `'use strict';
(() => {
  const products = ${JSON.stringify(productsObj, null, 2)};
  const salon = ${JSON.stringify(salonObj, null, 2)};
  const scenarios = {
    first: { label: 'Первый байк', text: 'Для первого байка важны умеренный вес, предсказуемый отклик на газ и удобная высота по седлу. Уточните доступные модели в салоне.' },
    offroad: { label: 'Для бездорожья', text: 'Для лесных маршрутов, бродов и косогоров решают энергоёмкая подвеска, охлаждение и клиренс. Расскажем о вариантах для вашего уровня.' },
    teen: { label: 'Для подростка', text: 'Для подростка подбираем технику по росту и физической форме, с учётом комплекта защиты.' }
  };
  const services = {
    maintenance: { title: 'Обслуживание и сервис', text: 'Сервис, предпродажная подготовка и обслуживание техники уточняются по графику работы салона ' + salon.name + '.', items: ['Регламентная замена масла и расходников.', 'Настройка и протяжка узлов перед выездом.', 'Запись и уточнение стоимости работ по телефону ' + salon.phone + '.'] },
    parts: { title: 'Запчасти и расходники', text: 'Подбор запчастей и расходных материалов в г. ' + salon.city + '.', items: ['Звёзды, цепи, тормозные колодки и камеры.', 'Моторные масла и мотохимия.', 'Уточнение наличия деталей по телефону салона.'] },
    gear: { title: 'Экипировка и защита', text: 'Подбор защитной экипировки по размеру в салоне.', items: ['Кроссовые шлемы и защитные очки.', 'Панцири (черепахи), наколенники и налокотники.', 'Мотоботы для эндуро и перчатки.'] }
  };
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#dialog-content');
  const menu = document.querySelector('#main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  let selectedScenario = '';
  let selectedProduct = '';
  let dialogOpener = null;
  const icon = (name) => '<span class="icon" data-icon="' + name + '" aria-hidden="true"></span>';

  function watchImages(scope = document) {
    scope.querySelectorAll('.image-frame img').forEach(img => {
      const failed = () => img.closest('.image-frame').classList.add('missing-image');
      img.addEventListener('error', failed, { once: true });
      if (img.complete && !img.naturalWidth) failed();
    });
  }
  function closeMenu() {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Открыть меню');
  }
  function openDialog(markup) {
    if (!dialog.open) dialogOpener = document.activeElement;
    closeMenu();
    content.innerHTML = markup;
    watchImages(content);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    dialog.querySelector('[data-close]').focus();
  }
  function closeDialog() { dialog.close(); }
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialogOpener && dialogOpener.isConnected) dialogOpener.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  });
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuToggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

  function filterCatalog(category) {
    let count = 0;
    document.querySelectorAll('.product-card').forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) count++;
    });
    document.querySelectorAll('.catalog-filters [data-filter]').forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#catalog-empty').hidden = count > 0;
    document.querySelector('#product-grid').hidden = count === 0;
    document.querySelector('#catalog-status').textContent = count ? 'Показано позиций: ' + count : 'В этой категории наличие уточняйте по телефону';
  }

  function showProduct(key) {
    const product = products[key];
    if (!product) return;
    selectedProduct = key;
    const waText = encodeURIComponent('Здравствуйте! Интересует ' + product.name + ' (' + product.price + ') в салоне ' + salon.name + '. Подскажите наличие и актуальную цену.');
    openDialog('<p class="dialog-kicker">Позиция каталога</p><h2 id="dialog-title">' + product.name + '</h2><div class="image-frame dialog-product-image"><img src="' + product.image + '" alt="' + product.name + '"><span class="image-fallback">' + product.name + '</span></div><p>' + product.spec + '</p><p class="dialog-price">' + product.price + '</p><p>Уточните наличие, комплектацию и точную стоимость напрямую в салоне ' + salon.name + '.</p><div class="dialog-actions"><a class="button orange" href="https://wa.me/' + salon.whatsapp + '?text=' + waText + '" target="_blank" rel="noopener">Уточнить в WhatsApp ' + icon('arrow-right') + '</a><a class="button outline orange-outline" href="tel:' + salon.phoneRaw + '">' + icon('phone') + 'Позвонить</a><button class="button outline" type="button" data-close>Закрыть</button></div><p class="dialog-note">Цены «от» приведены по открытым источникам салона ' + salon.name + ' и требуют уточнения по телефону.</p>');
  }

  function showContact(kind) {
    openDialog('<p class="dialog-kicker">Салон · ' + salon.city + ' (' + salon.district + ')</p><h2 id="dialog-title">' + salon.name + '</h2><p><strong>Адрес:</strong> ' + salon.address + '</p><p><strong>График работы:</strong> ' + salon.hours + '</p><p><strong>Телефон:</strong> <a href="tel:' + salon.phoneRaw + '">' + salon.phone + '</a></p><p><strong>Рейтинг на картах:</strong> ' + salon.rating + ' ★</p><div class="dialog-actions"><a class="button orange" href="' + salon.mapUrl + '" target="_blank" rel="noopener">Маршрут в 2ГИС ' + icon('arrow-right') + '</a><a class="button outline" href="' + salon.yandexUrl + '" target="_blank" rel="noopener">Яндекс Карты</a><a class="button outline orange-outline" href="tel:' + salon.phoneRaw + '">' + icon('phone') + 'Позвонить</a></div><p class="dialog-note">Демо-концепт, не является официальным сайтом. Удалим по первой просьбе.</p>');
  }

  function showRequest() {
    const options = Object.entries(products).map(([key, p]) => '<option value="' + key + '" ' + (selectedProduct === key ? 'selected' : '') + '>' + p.name + '</option>').join('');
    openDialog('<p class="dialog-kicker">Подбор · удобная отправка в WhatsApp</p><h2 id="dialog-title">Собери свой запрос</h2><div style="margin-bottom:14px;padding:10px 14px;border-radius:10px;background:#fff8f0;border:1px solid #ffd8a8;color:#d9480f;font-size:13px;line-height:1.4;">🚀 <strong>Демо-режим:</strong> в готовом сайте заявка с параметрами за 1 секунду поступает прямо в ваш личный Telegram или CRM.</div><p>Укажи рост и опыт — сайт сформирует готовое сообщение для консультанта салона.</p><form id="request-form" novalidate><label for="request-model">Категория / модель</label><select id="request-model"><option value="">Пока выбираю</option>' + options + '</select><div class="request-fields"><div><label for="request-height">Рост, см · необязательно</label><input id="request-height" type="number" min="80" max="230" inputmode="numeric" placeholder="Например, 175" aria-describedby="height-error"><p id="height-error" class="field-error" hidden>Укажи рост от 80 до 230 см или оставь пустым.</p></div><div><label for="request-experience">Опыт катания</label><select id="request-experience"><option>Пока нет опыта</option><option>Есть начальный опыт</option><option>Уверенно катаюсь</option><option>Хочу обсудить</option></select></div></div><label for="request-draft">Текст сообщения</label><textarea id="request-draft" rows="5" readonly aria-describedby="draft-note"></textarea><p id="draft-note" class="field-note">Сообщение можно отправить в WhatsApp в 1 клик или скопировать.</p><div class="dialog-actions"><a class="button orange" id="wa-send-btn" href="#" target="_blank" rel="noopener">Отправить в WhatsApp ' + icon('arrow-right') + '</a><button class="button outline" type="submit">' + icon('copy') + 'Скопировать</button><button class="button outline" type="button" data-close>Закрыть</button></div><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p></form>');
    const form = content.querySelector('#request-form');
    const height = content.querySelector('#request-height');
    const error = content.querySelector('#height-error');
    const draft = content.querySelector('#request-draft');
    const model = content.querySelector('#request-model');
    const experience = content.querySelector('#request-experience');
    const status = content.querySelector('#copy-status');
    const waBtn = content.querySelector('#wa-send-btn');

    function updateDraft() {
      const valid = height.value === '' || (Number.isFinite(height.valueAsNumber) && height.valueAsNumber >= 80 && height.valueAsNumber <= 230);
      error.hidden = valid; height.setAttribute('aria-invalid', String(!valid));
      const lines = ['Здравствуйте, ' + salon.name + '! Хочу проконсультироваться по подбору мототехники.'];
      if (model.value && products[model.value]) lines.push('Интересует: ' + products[model.value].name + ' (' + products[model.value].price + ').');
      if (selectedScenario && scenarios[selectedScenario]) lines.push('Сценарий: ' + scenarios[selectedScenario].label.toLowerCase() + '.');
      if (height.value && valid) lines.push('Мой рост: ' + height.value + ' см.');
      lines.push('Опыт катания: ' + experience.value.toLowerCase() + '.', 'Подскажите, что есть в наличии в салоне в г. ' + salon.city + '?');
      const text = lines.join('\\n');
      draft.value = text;
      waBtn.href = 'https://wa.me/' + salon.whatsapp + '?text=' + encodeURIComponent(text);
      status.textContent = '';
      return valid;
    }
    form.addEventListener('input', updateDraft);
    form.addEventListener('change', updateDraft);
    updateDraft();
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!updateDraft()) { height.focus(); return; }
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(draft.value); status.textContent = 'Текст скопирован в буфер обмена!'; return; } catch (_) {}
      }
      draft.focus(); draft.select(); draft.setSelectionRange(0, draft.value.length);
      status.textContent = 'Текст выделен — скопируйте через Ctrl+C.';
    });
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button,a'); if (!target) return;
    if (target.hasAttribute('data-close')) closeDialog();
    if (target.dataset.filter) filterCatalog(target.dataset.filter);
    if (target.dataset.filterLink) { filterCatalog(target.dataset.filterLink); closeMenu(); }
    if (target.dataset.product) showProduct(target.dataset.product);
    if (target.dataset.contact) showContact(target.dataset.contact);
    if (target.hasAttribute('data-request')) showRequest();
    if (target.dataset.scenario) {
      selectedScenario = target.dataset.scenario;
      document.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
      const result = document.querySelector('#selection-result'); result.textContent = scenarios[selectedScenario].text; result.hidden = false;
    }
    if (target.dataset.service) {
      const service = services[target.dataset.service];
      openDialog('<p class="dialog-kicker">Раздел сервиса</p><h2 id="dialog-title">' + service.title + '</h2><p>' + service.text + '</p><ul class="dialog-list">' + service.items.map(item => '<li>' + item + '</li>').join('') + '</ul><div class="dialog-actions"><button type="button" class="button orange" data-request>Собрать вопрос ' + icon('arrow-right') + '</button><button type="button" class="button outline" data-close>Закрыть</button></div>');
    }
    if (target.closest('.main-nav') && target.tagName === 'A') closeMenu();
  });
  watchImages();
})();
`;

  fs.writeFileSync(path.join(targetDir, 'app.js'), appJsContent, 'utf8');
  builtCount++;
  console.log(`[${builtCount}/${factFiles.length}] Собран сайт для «${facts.name}» (${facts.city}) -> dist/${slug}/`);
}

// Guide-compliant public deployment hygiene:
// 1. robots.txt disallowing indexing
fs.writeFileSync(path.join(distDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');

// 2. .nojekyll to disable Jekyll on GitVerse/GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

// 3. Neutral noindex root index.html so scraping root doesn't leak all client phone numbers & sales data
const neutralIndexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Демо-концепты</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; background: #f8f9fa; color: #17191c; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 24px; }
  .box { max-width: 460px; background: #fff; border: 1px solid #d5d7d9; border-radius: 12px; padding: 28px; text-align: center; }
  h1 { font-size: 20px; margin: 0 0 10px; }
  p { font-size: 14px; color: #53565a; margin: 0; line-height: 1.5; }
</style>
</head>
<body>
  <div class="box">
    <h1>Демонстрационные концепты</h1>
    <p>Для просмотра конкретного концепта откройте персональную ссылку, отправленную разработчиком. Индексация отключена.</p>
    <p style="margin-top: 18px;"><a href="https://t.me/devbymax" target="_blank" rel="noopener" style="color: #ff5500; font-weight: 700; text-decoration: none;">Разработка: @devbymax</a></p>
  </div>
</body>
</html>
`;
fs.writeFileSync(path.join(distDir, 'index.html'), neutralIndexHtml, 'utf8');

console.log(`\nВсе ${builtCount} сайтов успешно собраны в dist/<slug>/! Добавлен dist/robots.txt и нейтральный dist/index.html.`);
