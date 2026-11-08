'use strict';
(() => {
  const products = {
    enduro: { name: 'Эндуро 300', price: '189 000 ₽', spec: '300 см³ · 4-тактный · внедорожный', image: 'assets/product-enduro.jpg' },
    pitbike: { name: 'Питбайк 125', price: '89 900 ₽', spec: '125 см³ · 4-тактный · лёгкий', image: 'assets/product-pitbike.jpg' },
    atv: { name: 'Квадроцикл 200', price: '249 000 ₽', spec: '200 см³ · 4-тактный · утилитарный', image: 'assets/product-atv.jpg' }
  };
  const scenarios = {
    first: { label: 'Первый байк', text: 'Для первого байка сравни посадку, вес и управляемость. В демокаталоге можно начать знакомство с питбайка 125; подходящий объём выбирают после примерки и оценки опыта.' },
    offroad: { label: 'Для бездорожья', text: 'В демокаталоге есть Эндуро 300 и Квадроцикл 200. Для выбора важны маршрут, опыт и удобство управления: одного объёма двигателя недостаточно.' },
    teen: { label: 'Для подростка', text: 'Сначала уточни возраст, рост и опыт подростка. Питбайк 125 — пример формата, а не готовая рекомендация: нужны примерка, обучение и подходящая защита.' }
  };
  const services = {
    maintenance: { title: 'Обслуживание', text: 'В рабочей версии здесь можно выбрать технику и описать задачу для мастера.', items: ['Подготовь модель, год и описание неисправности.', 'Регламент, стоимость и время работ нужно согласовать с сервисом.', 'В этом демо запись и отправка заявок отключены.'] },
    parts: { title: 'Запчасти', text: 'Для поиска детали важна совместимость с конкретной техникой.', items: ['Подготовь модель и год выпуска.', 'Добавь артикул или фото нужной детали.', 'Наличие и цены в демо не заявлены; заказ не отправляется.'] },
    gear: { title: 'Защита и шлемы', text: 'Размер и посадку экипировки нужно проверять при примерке.', items: ['Для шлема важны размер головы, посадка и назначение.', 'Защиту подбирают под рост, посадку и сценарий катания.', 'Ассортимент, размеры и наличие экипировки пока не добавлены.'] }
  };
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#dialog-content');
  const menu = document.querySelector('#main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  let selectedScenario = '';
  let selectedProduct = '';
  let dialogOpener = null;
  const icon = (name) => `<span class="icon" data-icon="${name}" aria-hidden="true"></span>`;
  const note = '<p class="dialog-note">Демо-концепт: модели, характеристики, цены и изображения условные. Заявки не отправляются.</p>';
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
    document.querySelectorAll('.product-card').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; if (!card.hidden) count++; });
    document.querySelectorAll('.catalog-filters [data-filter]').forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    document.querySelector('#catalog-empty').hidden = count > 0;
    document.querySelector('#product-grid').hidden = count === 0;
    document.querySelector('#catalog-status').textContent = count ? `Показано демо-моделей: ${count}` : 'В этой категории пока нет демо-моделей';
  }
  function showProduct(key) {
    const product = products[key];
    if (!product) return;
    selectedProduct = key;
    openDialog(`<p class="dialog-kicker">Пример модели · демокаталог</p><h2 id="dialog-title">${product.name}</h2><div class="image-frame dialog-product-image"><img src="${product.image}" alt="Условное изображение ${product.name}"><span class="image-fallback">${product.name} · демо-модель</span></div><p>${product.spec}</p><p class="dialog-price">${product.price}</p><p>Наличие, документы, комплектацию и условия покупки нужно уточнить. В демо эти сведения не представлены.</p><div class="dialog-actions"><button class="button orange" type="button" data-request>Собрать запрос по модели ${icon('arrow-right')}</button><button class="button outline" type="button" data-close>Вернуться к каталогу</button></div>${note}`);
  }
  function showContact(kind) {
    const context = kind === 'visit' ? 'Адрес и график пока не указаны. Перед визитом их нужно подтвердить у салона.' : kind === 'call' ? 'Номер телефона пока не указан. Кнопка показывает сценарий связи в будущей рабочей версии.' : 'Мессенджер и почта пока не указаны. В демо сообщение никому не отправляется.';
    openDialog(`<p class="dialog-kicker">Демонстрационный режим</p><h2 id="dialog-title">Контакты подключим после уточнения</h2><p>${context}</p><p>Можно подготовить текст вопроса и сохранить его у себя.</p><div class="dialog-actions"><button class="button orange" type="button" data-request>Собрать черновик запроса ${icon('arrow-right')}</button><button class="button outline" type="button" data-close>Закрыть</button></div><p class="dialog-note">МотоДрайв54 — вымышленный демо-салон. Контакты не подключены, заявки не отправляются.</p>`);
  }
  function showRequest() {
    const options = Object.entries(products).map(([key,p]) => `<option value="${key}" ${selectedProduct === key ? 'selected' : ''}>${p.name}</option>`).join('');
    openDialog(`<p class="dialog-kicker">Подбор · черновик без отправки</p><h2 id="dialog-title">Собери свой запрос</h2><p>Укажи рост и опыт — получишь текст, который можно скопировать. Личные контакты не нужны.</p><form id="request-form" novalidate><label for="request-model">Модель для обсуждения</label><select id="request-model"><option value="">Пока выбираю</option>${options}</select><div class="request-fields"><div><label for="request-height">Рост, см · необязательно</label><input id="request-height" type="number" min="80" max="230" inputmode="numeric" placeholder="Например, 175" aria-describedby="height-error"><p id="height-error" class="field-error" hidden>Укажи рост от 80 до 230 см или оставь поле пустым.</p></div><div><label for="request-experience">Опыт катания</label><select id="request-experience"><option>Пока нет опыта</option><option>Есть начальный опыт</option><option>Уверенно катаюсь</option><option>Хочу обсудить</option></select></div></div><label for="request-draft">Текст запроса</label><textarea id="request-draft" rows="5" readonly aria-describedby="draft-note"></textarea><p id="draft-note" class="field-note">Это только черновик. Сайт не отправляет его в салон.</p><div class="dialog-actions"><button class="button orange" type="submit">${icon('copy')}Скопировать текст</button><button class="button outline" type="button" data-close>Закрыть</button></div><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p></form>`);
    const form = content.querySelector('#request-form');
    const height = content.querySelector('#request-height');
    const error = content.querySelector('#height-error');
    const draft = content.querySelector('#request-draft');
    const model = content.querySelector('#request-model');
    const experience = content.querySelector('#request-experience');
    const status = content.querySelector('#copy-status');
    function updateDraft() {
      const valid = height.value === '' || (Number.isFinite(height.valueAsNumber) && height.valueAsNumber >= 80 && height.valueAsNumber <= 230);
      error.hidden = valid; height.setAttribute('aria-invalid', String(!valid));
      const lines = ['Здравствуйте! Хочу обсудить подбор мототехники.'];
      if (model.value) lines.push(`Интересует ${products[model.value].name} (условный пример из демокаталога).`);
      if (selectedScenario) lines.push(`Сценарий: ${scenarios[selectedScenario].label.toLowerCase()}.`);
      if (height.value && valid) lines.push(`Мой рост: ${height.value} см.`);
      lines.push(`Опыт: ${experience.value.toLowerCase()}.`, 'Хочу уточнить подходящую посадку, характеристики и условия.');
      draft.value = lines.join('\n'); status.textContent = ''; return valid;
    }
    form.addEventListener('input', updateDraft); form.addEventListener('change', updateDraft); updateDraft();
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!updateDraft()) { height.focus(); return; }
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(draft.value); status.textContent = 'Текст скопирован. Отправки в салон не было.'; return; } catch (_) { /* Manual selection is the honest fallback. */ }
      }
      draft.focus(); draft.select(); draft.setSelectionRange(0, draft.value.length);
      status.textContent = 'Автокопирование недоступно. Текст выделен — скопируй его вручную через меню устройства или Ctrl+C.';
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
      openDialog(`<p class="dialog-kicker">Пример раздела · демо</p><h2 id="dialog-title">${service.title}</h2><p>${service.text}</p><ul class="dialog-list">${service.items.map(item => `<li>${item}</li>`).join('')}</ul><div class="dialog-actions"><button type="button" class="button orange" data-request>Подготовить вопрос ${icon('arrow-right')}</button><button type="button" class="button outline" data-close>Закрыть</button></div>${note}`);
    }
    if (target.closest('.main-nav') && target.tagName === 'A') closeMenu();
  });
  watchImages();
})();
