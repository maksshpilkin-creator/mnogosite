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
const assets = ['hero-enduro.jpg', 'product-enduro.jpg', 'product-pitbike.jpg', 'product-atv.jpg', 'rider.jpg', 'showroom.jpg'];

// Get all facts
const factFiles = fs.readdirSync(factsDir).filter(f => f.endsWith('.json'));
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

  // 2. CSS
  fs.writeFileSync(path.join(targetDir, 'styles.css'), templateCss, 'utf8');

  // 3. Products markup
  const cardsHtml = catalog.map(p => {
    return `<article class="product-card" data-category="${p.category}"><div class="product-image image-frame"><img src="${p.image}" alt="${p.name}"><span class="image-fallback">${p.name}</span></div><h3>${p.name}</h3><p class="product-spec">${p.spec}</p><p class="product-price">${p.price}</p><button type="button" class="button outline product-more" data-product="${p.id}">Подробнее <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></article>`;
  }).join('\n');

  // 4. HTML
  const encodedGreeting = encodeURIComponent(`Здравствуйте! Пишу с сайта ${facts.name} (${facts.city}), хочу уточнить наличие мототехники.`);
  const mapUrl = sources && sources[0] ? sources[0].url : `https://2gis.ru/search/${encodeURIComponent(facts.name + ' ' + facts.city)}`;

  const pageHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="reference-template" content="reference-hybrid-v1"><meta name="theme-color" content="#f8f9fa"><title>${facts.name} — мотосалон в г. ${facts.city}</title><meta name="description" content="Демонстрационный концепт для мотосалона ${facts.name} (${facts.city}). Модели и цены подобраны по данным 2ГИС."><link rel="preload" href="assets/fonts/RobotoCondensed-Variable.ttf" as="font" type="font/ttf" crossorigin><link rel="preload" href="assets/fonts/RobotoCondensed-Italic-Variable.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script>
</head>
<body>
<a class="skip-link" href="#catalog">Перейти к каталогу</a>
<div class="demo-strip"><div class="container">Демо-концепт для «${facts.name}» · данные подобраны из 2ГИС · рейтинг ${facts.rating} ★</div></div>
<header class="site-header"><div class="container header-inner"><a class="brand" href="#top" aria-label="${facts.name} — начало страницы"><span class="brand-name">${facts.brand_display}</span><span class="brand-city">${facts.city}</span></a><button class="menu-toggle icon-button" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-nav"><span class="icon" data-icon="menu-2" aria-hidden="true"></span></button><nav class="main-nav" id="main-nav" aria-label="Основная навигация"><a href="#catalog" data-filter-link="all">Техника <span class="icon small" data-icon="chevron-down" aria-hidden="true"></span></a><a href="#catalog" data-filter-link="gear">Экипировка</a><a href="#service">Сервис</a><a href="#contacts">Контакты</a></nav><a class="button orange header-call" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>Позвонить</a></div></header>
<main id="top">
<section class="hero" aria-labelledby="hero-title"><div class="container hero-inner"><div class="hero-copy"><h1 id="hero-title">Твой первый байк.<br> Или следующий.</h1><div class="orange-rule" aria-hidden="true"></div><p>${facts.hero_subtitle}</p><div class="hero-actions"><a class="button orange" href="#catalog">Смотреть технику <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></a><a class="button outline" href="#selection">Помочь с выбором</a></div></div><div class="hero-visual image-frame"><img src="assets/hero-enduro.jpg" alt="${facts.name} — мототехника в ${facts.city}" fetchpriority="high"><span class="image-fallback">Мототехника в ${facts.city}</span></div></div></section>
<div class="category-strip" aria-label="Категории техники"><div class="container category-inner"><a href="#catalog" data-filter-link="enduro"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Эндуро</a><a href="#catalog" data-filter-link="pitbike"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Питбайки</a><a href="#catalog" data-filter-link="atv"><span class="icon" data-icon="atv" aria-hidden="true"></span>Квадроциклы</a><a href="#catalog" data-filter-link="gear"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Экипировка</a></div></div>
<section class="catalog section container" id="catalog" aria-labelledby="catalog-title"><div class="section-heading"><h2 id="catalog-title">Выбери свою технику</h2><p>Популярные модели и подтверждённые цены</p></div><div class="catalog-layout"><div class="catalog-filters" role="group" aria-label="Фильтр каталога"><button type="button" class="filter active" data-filter="all" aria-pressed="true"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Вся техника<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="enduro" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Эндуро<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="pitbike" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Питбайки<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="atv" aria-pressed="false"><span class="icon" data-icon="atv" aria-hidden="true"></span>Квадроциклы<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button><button type="button" class="filter" data-filter="gear" aria-pressed="false"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Экипировка<span class="icon chevron" data-icon="chevron-right" aria-hidden="true"></span></button></div><div class="catalog-results"><p class="visually-hidden" id="catalog-status" role="status" aria-live="polite">Показаны модели каталога</p><div class="product-grid" id="product-grid">
${cardsHtml}
</div><div class="empty-state" id="catalog-empty" hidden><span class="icon" data-icon="helmet" aria-hidden="true"></span><h3>Позиции под заказ</h3><p>В этой категории техника поставляется под заказ. Уточняйте актуальные сроки и варианты у консультантов салона.</p><button class="button outline" type="button" data-filter="all">Показать всю технику</button></div></div></div><noscript><p class="noscript-note">Включите JavaScript для фильтров, карточек и подбора.</p></noscript></section>
<section class="selection" id="selection" aria-labelledby="selection-title"><div class="container selection-inner"><div class="selection-copy"><h2 id="selection-title">Подберём под рост и опыт</h2><p>Расскажем, какая техника подойдёт именно тебе:<br> для старта, активного бездорожья или для подростка.</p><div class="selection-chips" role="group" aria-label="Сценарий подбора"><button class="chip" type="button" data-scenario="first" aria-pressed="false"><span class="icon" data-icon="motorbike" aria-hidden="true"></span>Первый байк</button><button class="chip" type="button" data-scenario="offroad" aria-pressed="false"><span class="icon" data-icon="mountain" aria-hidden="true"></span>Для бездорожья</button><button class="chip" type="button" data-scenario="teen" aria-pressed="false"><span class="icon" data-icon="users" aria-hidden="true"></span>Для подростка</button></div><p class="selection-result" id="selection-result" role="status" hidden></p><button class="button orange" type="button" data-request>Обсудить подбор <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></div><div class="selection-visual image-frame"><img src="assets/rider.jpg" alt="Райдер на природе — иллюстрация сценария катания" loading="lazy"><span class="image-fallback">Иллюстрация райдера</span></div></div></section>
<section class="service-strip" id="service" aria-labelledby="service-title"><div class="container service-inner"><h2 id="service-title">Сервис и экипировка</h2><button type="button" data-service="maintenance"><span class="icon" data-icon="tool" aria-hidden="true"></span>Обслуживание <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button><button type="button" data-service="parts"><span class="icon" data-icon="settings" aria-hidden="true"></span>Запчасти <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button><button type="button" data-service="gear"><span class="icon" data-icon="helmet" aria-hidden="true"></span>Защита и шлемы <span class="icon small" data-icon="arrow-right" aria-hidden="true"></span></button></div></section>
<section class="showroom" aria-labelledby="showroom-title"><div class="showroom-inner container"><div class="showroom-visual image-frame"><img src="assets/showroom.jpg" alt="Интерьер мотосалона" loading="lazy"><span class="image-fallback">Мотосалон ${facts.name}</span></div><div class="showroom-copy"><h2 id="showroom-title">Посмотри технику<br> вживую</h2><p>Приезжай в салон (${facts.address}), чтобы оценить технику, примерить посадку и получить подробную консультацию.</p><button class="button orange" type="button" data-contact="visit">Уточнить визит <span class="icon" data-icon="arrow-right" aria-hidden="true"></span></button></div></div></section>
<section class="contacts" id="contacts" aria-label="Контакты мотосалона"><div class="container contacts-inner"><p class="contact-city"><span class="icon" data-icon="map-pin" aria-hidden="true"></span><strong>${facts.city}</strong></p><button class="address-button" type="button" data-contact="visit"><span class="icon" data-icon="calendar" aria-hidden="true"></span>${facts.address}</button><a class="button outline orange-outline" href="tel:${facts.phone_raw}"><span class="icon" data-icon="phone" aria-hidden="true"></span>Позвонить</a><a class="button outline" href="https://wa.me/${facts.whatsapp}?text=${encodedGreeting}" target="_blank" rel="noopener"><span class="icon" data-icon="mail" aria-hidden="true"></span>Написать</a></div></section>
</main>
<footer class="site-footer"><div class="container footer-inner"><a class="brand" href="#top" aria-label="${facts.name} — начало страницы"><span class="brand-name">${facts.brand_display}</span><span class="brand-city">${facts.city}</span></a><nav aria-label="Навигация в подвале"><a href="#catalog" data-filter-link="all">Техника</a><a href="#catalog" data-filter-link="gear">Экипировка</a><a href="#service">Сервис</a><a href="#contacts">Контакты</a></nav><p>Цены и позиции согласованы по каталогам</p></div><p class="container footer-disclaimer">«${facts.name}» (${facts.city}) — демонстрационный концепт сайта. Разработан для презентации салону на основе открытых данных 2ГИС. Адрес: ${facts.address}. Телефон: ${facts.phone}. График: ${facts.hours}.</p></footer>
<dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close icon-button" type="button" data-close aria-label="Закрыть окно"><span class="icon" data-icon="x" aria-hidden="true"></span></button><div id="dialog-content"></div></dialog>
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
    address: facts.address,
    phone: facts.phone,
    phoneRaw: facts.phone_raw,
    whatsapp: facts.whatsapp,
    hours: facts.hours,
    rating: facts.rating,
    mapUrl: mapUrl
  };

  const appJsContent = `'use strict';
(() => {
  const products = ${JSON.stringify(productsObj, null, 2)};
  const salon = ${JSON.stringify(salonObj, null, 2)};
  const scenarios = {
    first: { label: 'Первый байк', text: 'Для первого байка важны умеренный вес, предсказуемый отклик на газ и удобная высота по седлу. Подберем оптимальный вариант с тест-посадкой в салоне.' },
    offroad: { label: 'Для бездорожья', text: 'Для лесных маршрутов, бродов и косогоров решают энергоемкая подвеска, надежное охлаждение и клиренс. Расскажем о вариантах для вашего уровня.' },
    teen: { label: 'Для подростка', text: 'Для подростка подбираем технику строго под рост и физическую форму, с регулировкой хода ручки газа и полным комплектом защиты.' }
  };
  const services = {
    maintenance: { title: 'Обслуживание и ТО', text: 'Сервисные работы и подготовка техники к сезону в салоне ' + salon.name + '.', items: ['Плановое регламентное ТО (замена масла, фильтров, регулировка клапанов).', 'Протяжка спиц, настройка карбюратора и смазка подвески.', 'Диагностика перед покупкой и сезонная консервация.'] },
    parts: { title: 'Запчасти и расходники', text: 'Склад расходных материалов и запчастей в наличии в г. ' + salon.city + '.', items: ['Звезды, приводные цепи, тормозные колодки, тросы.', 'Масла и химия (Motul, Maxima, Lavr).', 'Быстрый подбор запчастей по марке и модели вашего байка.'] },
    gear: { title: 'Экипировка и защита', text: 'Подбор правильной защитной экипировки под рост и размер.', items: ['Кроссовые шлемы с сертификацией ECE / DOT.', 'Защитные панцири (черепахи), наколенники и налокотники.', 'Мотоботы эндуро с фиксацией голеностопа и защитные очки.'] }
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
    document.querySelector('#catalog-status').textContent = count ? 'Показано моделей: ' + count : 'В этой категории техника под заказ';
  }

  function showProduct(key) {
    const product = products[key];
    if (!product) return;
    selectedProduct = key;
    const waText = encodeURIComponent('Здравствуйте! Интересует ' + product.name + ' (' + product.price + ') в салоне ' + salon.name + '. Подскажите наличие и условия покупки.');
    openDialog('<p class="dialog-kicker">Модель каталога</p><h2 id="dialog-title">' + product.name + '</h2><div class="image-frame dialog-product-image"><img src="' + product.image + '" alt="' + product.name + '"><span class="image-fallback">' + product.name + '</span></div><p>' + product.spec + '</p><p class="dialog-price">' + product.price + '</p><p>Уточните наличие, комплектацию и бронирование напрямую в салоне ' + salon.name + '.</p><div class="dialog-actions"><a class="button orange" href="https://wa.me/' + salon.whatsapp + '?text=' + waText + '" target="_blank" rel="noopener">Уточнить в WhatsApp ' + icon('arrow-right') + '</a><button class="button outline" type="button" data-close>Вернуться к каталогу</button></div><p class="dialog-note">Данные по ценам сверены по открытым каталогам салона ' + salon.name + '.</p>');
  }

  function showContact(kind) {
    openDialog('<p class="dialog-kicker">Салон в г. ' + salon.city + '</p><h2 id="dialog-title">' + salon.name + '</h2><p><strong>Адрес:</strong> ' + salon.address + '</p><p><strong>График работы:</strong> ' + salon.hours + '</p><p><strong>Телефон:</strong> <a href="tel:' + salon.phoneRaw + '">' + salon.phone + '</a></p><p><strong>Рейтинг в 2ГИС:</strong> ' + salon.rating + ' ★</p><div class="dialog-actions"><a class="button orange" href="' + salon.mapUrl + '" target="_blank" rel="noopener">Маршрут в 2ГИС ' + icon('arrow-right') + '</a><a class="button outline orange-outline" href="tel:' + salon.phoneRaw + '">' + icon('phone') + 'Позвонить</a><button class="button outline" type="button" data-close>Закрыть</button></div><p class="dialog-note">Демо-концепт подготовлен на основе открытых данных.</p>');
  }

  function showRequest() {
    const options = Object.entries(products).map(([key, p]) => '<option value="' + key + '" ' + (selectedProduct === key ? 'selected' : '') + '>' + p.name + '</option>').join('');
    openDialog('<p class="dialog-kicker">Подбор · удобная отправка в WhatsApp</p><h2 id="dialog-title">Собери свой запрос</h2><p>Укажи рост и опыт — сайт сформирует готовое сообщение для консультанта салона.</p><form id="request-form" novalidate><label for="request-model">Модель для обсуждения</label><select id="request-model"><option value="">Пока выбираю</option>' + options + '</select><div class="request-fields"><div><label for="request-height">Рост, см · необязательно</label><input id="request-height" type="number" min="80" max="230" inputmode="numeric" placeholder="Например, 175" aria-describedby="height-error"><p id="height-error" class="field-error" hidden>Укажи рост от 80 до 230 см или оставь пустым.</p></div><div><label for="request-experience">Опыт катания</label><select id="request-experience"><option>Пока нет опыта</option><option>Есть начальный опыт</option><option>Уверенно катаюсь</option><option>Хочу обсудить</option></select></div></div><label for="request-draft">Текст сообщения</label><textarea id="request-draft" rows="5" readonly aria-describedby="draft-note"></textarea><p id="draft-note" class="field-note">Сообщение можно отправить в WhatsApp в 1 клик или скопировать.</p><div class="dialog-actions"><a class="button orange" id="wa-send-btn" href="#" target="_blank" rel="noopener">Отправить в WhatsApp ' + icon('arrow-right') + '</a><button class="button outline" type="submit">' + icon('copy') + 'Скопировать</button><button class="button outline" type="button" data-close>Закрыть</button></div><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p></form>');
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
      if (model.value && products[model.value]) lines.push('Интересует модель: ' + products[model.value].name + ' (' + products[model.value].price + ').');
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
  console.log(`[${builtCount}/19] Собран сайт для «${facts.name}» (${facts.city}) -> dist/${slug}/`);
}

console.log(`\nВсе ${builtCount} сайтов успешно собраны в dist/<slug>/ на базе эталона!`);
