'use strict';
(() => {
  const products = {
  "enduro": {
    "name": "Motoland TT 250",
    "price": "149 000 ₽",
    "spec": "250 см³ · 4-тактный · электростартер · внедорожный",
    "image": "assets/product-enduro.jpg",
    "category": "enduro"
  },
  "pitbike": {
    "name": "Regulmoto Pilot 125",
    "price": "88 500 ₽",
    "spec": "125 см³ · 4-тактный · дисковые тормоза",
    "image": "assets/product-pitbike.jpg",
    "category": "pitbike"
  },
  "atv": {
    "name": "Квадроцикл Motoland Allroad 200",
    "price": "235 000 ₽",
    "spec": "200 см³ · вариатор · LED-оптика · фаркоп",
    "image": "assets/product-atv.jpg",
    "category": "atv"
  }
};
  const salon = {
  "name": "Барс-мото",
  "city": "Казань",
  "address": "ул. Алафузова, 3Б",
  "phone": "+7 (843) 555-22-10",
  "phoneRaw": "+78435552210",
  "whatsapp": "79875552210",
  "hours": "Пн-Сб 09:00-19:00",
  "rating": 4.8,
  "mapUrl": "https://2gis.ru/search/%D0%91%D0%B0%D1%80%D1%81-%D0%BC%D0%BE%D1%82%D0%BE%20%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C"
};
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
      const text = lines.join('\n');
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
