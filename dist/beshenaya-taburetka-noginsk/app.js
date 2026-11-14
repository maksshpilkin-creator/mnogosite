'use strict';
(() => {
  const products = {
  "enduro": {
    "name": "Эндуро Regulmoto Sport 250",
    "price": "от 145 000 ₽",
    "spec": "250 см³, надежный двигатель, колеса 21/18",
    "image": "assets/product-enduro.jpg",
    "category": "enduro"
  },
  "pitbike": {
    "name": "Питбайк Kayo Basic 125",
    "price": "от 84 000 ₽",
    "spec": "125 см³, усиленная стальная рама, колеса 17/14",
    "image": "assets/product-pitbike.jpg",
    "category": "pitbike"
  },
  "atv": {
    "name": "Квадроцикл Motoland Allroad 150",
    "price": "от 220 000 ₽",
    "spec": "150 см³, вариатор, защита рук, родительский контроль",
    "image": "assets/product-atv.jpg",
    "category": "atv"
  }
};
  const salon = {
  "name": "Бешеная Табуретка",
  "city": "Ногинск",
  "district": "Центральный р-н",
  "address": "Краснослободская ул., 4А/1",
  "phone": "+7 (926) 777-11-22",
  "phoneRaw": "+79267771122",
  "whatsapp": "79267771122",
  "hours": "Пн-Сб 10:00-19:00, Вс 10:00-17:00",
  "rating": 4.9,
  "mapUrl": "https://yandex.ru/maps/org/beshenaya_taburetka/1084291823/",
  "yandexUrl": "https://yandex.ru/maps/?text=%D0%91%D0%B5%D1%88%D0%B5%D0%BD%D0%B0%D1%8F%20%D0%A2%D0%B0%D0%B1%D1%83%D1%80%D0%B5%D1%82%D0%BA%D0%B0%20%D0%9D%D0%BE%D0%B3%D0%B8%D0%BD%D1%81%D0%BA%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D0%BB%D0%BE%D0%B1%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%204%D0%90%2F1"
};
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
