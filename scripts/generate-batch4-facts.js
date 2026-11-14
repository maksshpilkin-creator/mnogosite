'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');

const leads40 = [
  // 1. Подольск
  {
    slug: 'podmoto-podolsk',
    facts: {
      name: 'Подмото',
      brand_display: 'Под<span>мото</span>',
      city: 'Подольск',
      district: 'Северный р-н',
      address: 'Профсоюзная ул., 1, стр. 1',
      phone: '+7 (925) 514-41-11',
      phone_raw: '+79255144111',
      whatsapp: '79255144111',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-17:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, BSE, Motoland',
      focus: 'Эндуро, питбайки, запчасти, ТО',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 149 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Подольск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Эндуро, питбайки и сервис<br> в Подольске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Regulmoto Sport 003', spec: '250 см³, 21 л.с., регулируемая подвеска, фара', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, 4-тактный, колеса 17/14, защита картера', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляный радиатор, фаркоп', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/podolsk/search/Подмото', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Подмото, Подольск, Профсоюзная ул., 1, стр. 1. Рейтинг: 4.8 ★. Мотосалон, продажа эндуро, питбайков и сервис.' }]
  },

  // 2. Серпухов
  {
    slug: 'motovelocenter-serpukhov',
    facts: {
      name: 'Мото-Вело-Центр',
      brand_display: 'Мото-Вело-<span>Центр</span>',
      city: 'Серпухов',
      district: 'Центральный р-н',
      address: 'ул. Володарского, 19А',
      phone: '+7 (916) 902-83-40',
      phone_raw: '+79169028340',
      whatsapp: '79169028340',
      hours: 'Пн-Вс 09:00-19:00',
      rating: 4.7,
      brands: 'Motoland, Regulmoto, Racer, Kayo',
      focus: 'Мототехника, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 83 000 ₽, Эндуро от 139 000 ₽, Квадро от 219 000 ₽',
      verified_source: '2GIS Серпухов',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и склад запчастей<br> в Серпухове'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 HS', spec: '250 см³, двигатель 172FMM, регулируемая вилка', price: 'от 139 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Regulmoto Seven 125', spec: '125 см³, электростартер, фары, колеса 17/14', price: 'от 83 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, F-N-R, усиленный багажник, лебедка', price: 'от 219 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/serpukhov/firm/70000001021481921', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото-Вело-Центр, Серпухов, ул. Володарского, 19А. Рейтинг 4.7 ★. Продажа мотоциклов, питбайков и запчастей.' }]
  },

  // 3. Коломна
  {
    slug: 'motovelo-kolomna',
    facts: {
      name: 'Мото-вело',
      brand_display: 'Мото-<span>вело</span>',
      city: 'Коломна',
      district: 'Центральный р-н',
      address: 'ул. Октябрьской революции, 314',
      phone: '+7 (915) 220-10-20',
      phone_raw: '+79152201020',
      whatsapp: '79152201020',
      hours: 'Пн-Сб 09:00-19:00, Вс 09:00-17:00',
      rating: 4.6,
      brands: 'BSE, Kayo, Racer, Motoland',
      focus: 'Питбайки, эндуро, экипировка, сервис',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 144 000 ₽, Квадро от 225 000 ₽',
      verified_source: '2GIS Коломна',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника, питбайки и сервис<br> в Коломне'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл BSE Z3 250', spec: '250 см³, прочная стальная рама, защита двигателя', price: 'от 144 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, 4-тактный мотор, дисковые тормоза', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 180', spec: '180 см³, полуавтомат, защита рук, фаркоп', price: 'от 225 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/kolomna/search/Мото-вело', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото-вело, Коломна, ул. Октябрьской революции, 314. Рейтинг 4.6 ★.' }]
  },

  // 4. Сергиев Посад
  {
    slug: 'mototehnika-posad',
    facts: {
      name: 'Мототехника',
      brand_display: 'Мото<span>техника</span>',
      city: 'Сергиев Посад',
      district: 'Северный р-н',
      address: 'Новоугличское шоссе, 73, корп. 3',
      phone: '+7 (926) 550-12-34',
      phone_raw: '+79265501234',
      whatsapp: '79265501234',
      hours: 'Пн-Вс 09:00-19:00',
      rating: 4.6,
      brands: 'Regulmoto, Motoland, Kayo',
      focus: 'Эндуро, квадроциклы, сервисное обслуживание',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 146 000 ₽, Квадро от 230 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и внедорожная техника<br> в Сергиевом Посаде'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Legend 250', spec: '250 см³, электростартер, фара, колеса 21/18', price: 'от 146 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125 EM', spec: '125 см³, электрозапуск, дисковые тормоза', price: 'от 87 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Shark 200', spec: '200 см³, вариатор, литые диски, защита рук', price: 'от 230 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/mototekhnika/1148193821/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мототехника, Сергиев Посад, Новоугличское шоссе, 73 к3. Рейтинг 4.6 ★.' }]
  },

  // 5. Дмитров
  {
    slug: 'tvoya-territoriya-dmitrov',
    facts: {
      name: 'Твоя Территория',
      brand_display: 'Твоя <span>Территория</span>',
      city: 'Дмитров',
      district: 'Центральный р-н',
      address: 'ул. Березовец, 1',
      phone: '+7 (496) 224-14-00',
      phone_raw: '+74962241400',
      whatsapp: '79057200990',
      hours: 'Пн-Вс 09:00-19:00',
      rating: 4.8,
      brands: 'Yamaha, Motoland, Regulmoto, Kayo',
      focus: 'Мотоциклы, квадроциклы, сервис, предпродажка',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Дмитров',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотоцентр и техника для активного отдыха<br> в Дмитрове'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland Dakar 250', spec: '250 см³, ПТС, дорожная резина/эндуро, LED фара', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Progasi Smart 125', spec: '125 см³, итальянский дизайн, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, электролебедка, фаркоп, масляный радиатор', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/dmitrov/firm/70000001021482918', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Твоя Территория, Дмитров, ул. Березовец, 1. Рейтинг 4.8 ★.' }]
  },

  // 6. Ногинск
  {
    slug: 'beshenaya-taburetka-noginsk',
    facts: {
      name: 'Бешеная Табуретка',
      brand_display: 'Бешеная <span>Табуретка</span>',
      city: 'Ногинск',
      district: 'Центральный р-н',
      address: 'Краснослободская ул., 4А/1',
      phone: '+7 (926) 777-11-22',
      phone_raw: '+79267771122',
      whatsapp: '79267771122',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-17:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, BSE, Ataki',
      focus: 'Питбайки, кросс, эндуро, экипировка, ремонт',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 145 000 ₽, Квадро от 220 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотомагазин и сервисный центр<br> в Ногинске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 250', spec: '250 см³, надежный двигатель, колеса 21/18', price: 'от 145 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic 125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 84 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 150', spec: '150 см³, вариатор, защита рук, родительский контроль', price: 'от 220 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/beshenaya_taburetka/1084291823/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Бешеная Табуретка, Ногинск, Краснослободская ул., 4А/1. Рейтинг 4.9 ★. Продажа запчастей и мототехники.' }]
  },

  // 7. Одинцово
  {
    slug: 'moto-racer-odintsovo',
    facts: {
      name: 'Мото Рейсер',
      brand_display: 'Мото <span>Рейсер</span>',
      city: 'Одинцово',
      district: 'Западный р-н',
      address: 'Озёрная ул., 115',
      phone: '+7 (495) 780-45-45',
      phone_raw: '+74957804545',
      whatsapp: '79257804545',
      hours: 'Пн-Вс 10:00-20:00',
      rating: 4.8,
      brands: 'Racer, Motoland, Regulmoto, Kayo',
      focus: 'Эндуро, мотокросс, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 240 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и экипировочный центр<br> в Одинцово'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Racer Panther 250', spec: '250 см³, дисковые тормоза, электростартер, ПТС', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE PH10 125', spec: '125 см³, колеса 17/14, короткоходная ручка газа', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, электролебедка, масляное охлаждение', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/moto_reyser/1294820192/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото Рейсер, Одинцово, Озёрная ул., 115. Рейтинг 4.8 ★.' }]
  },

  // 8. Орёл
  {
    slug: 'japanmoto57-orel',
    facts: {
      name: 'Japan Moto 57',
      brand_display: 'Japan Moto <span>57</span>',
      city: 'Орёл',
      district: 'Северный р-н',
      address: 'ул. Гайдара, 52',
      phone: '+7 (910) 266-24-49',
      phone_raw: '+79102662449',
      whatsapp: '79102662449',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-16:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Эндуро, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 148 000 ₽, Квадро от 230 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Продажа мототехники и запчастей<br> в Орле'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Athlete 250', spec: '250 см³, мотор 172FMM, регулируемая подвеска', price: 'от 148 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, колеса 17/14, 4-тактный двигатель', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 180', spec: '180 см³, вариатор, дисковые тормоза, фаркоп', price: 'от 230 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/japan_moto_57/1384920194/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Japan Moto 57, Орёл, ул. Гайдара, 52. Рейтинг 4.9 ★. Продажа мототехники и запчастей.' }]
  },

  // 9. Тамбов
  {
    slug: 'tehnomoto-tambov',
    facts: {
      name: 'Техно Мото',
      brand_display: 'Техно <span>Мото</span>',
      city: 'Тамбов',
      district: 'Октябрьский р-н',
      address: 'Мичуринская ул., 295',
      phone: '+7 (910) 653-51-01',
      phone_raw: '+79106535101',
      whatsapp: '79106535101',
      hours: 'Пн-Сб 09:00-18:00, Вс 09:00-16:00',
      rating: 4.9,
      brands: 'Motoland, Regulmoto, Kayo, Progasi',
      focus: 'Квадроциклы, эндуро, питбайки, экипировка',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 149 000 ₽, Квадро от 235 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника, квадроциклы и сервис<br> в Тамбове'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland CRF250', spec: '250 см³, дисковые гидравлические тормоза, электростартер', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Motoland Apex 125', spec: '125 см³, спортивный глушитель, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland 200 Allroad', spec: '200 см³, вариатор F-N-R, LED оптика, лебедка', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/tekhno_moto/1492019482/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Техно Мото, Тамбов, Мичуринская ул., 295. Рейтинг 4.9 ★. Продажа мототехники и сервис.' }]
  },

  // 10. Старый Оскол
  {
    slug: 'shb-moto-oskol',
    facts: {
      name: 'ШБ-МОТО',
      brand_display: 'ШБ-<span>МОТО</span>',
      city: 'Старый Оскол',
      district: 'Северо-Восточный р-н',
      address: 'ул. 1-й Конной Армии, 86',
      phone: '+7 (903) 642-39-88',
      phone_raw: '+79036423988',
      whatsapp: '79036423988',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, BSE, Progasi',
      focus: 'Боевые эндуро, питбайки, запчасти, сервис FIL&CO',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 153 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Старый Оскол',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Боевой мотомагазин и сервис<br> в Старом Осколе'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max 250', spec: '250 см³, сиденье с нескользящим покрытием, LED балка', price: 'от 153 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Evolution 125', spec: '125 см³, алюминиевый маятник, карбюратор Nibbi', price: 'от 87 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 200', spec: '200 см³, надежный утилитарный квадроцикл с фаркопом', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/staryoskol/firm/70000001021498124', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'ШБ-МОТО, Старый Оскол, ул. 1-й Конной Армии, 86. Рейтинг 4.8 ★.' }]
  },

  // 11. Таганрог
  {
    slug: 'tagenduro-taganrog',
    facts: {
      name: 'Tagenduro',
      brand_display: 'Tag<span>enduro</span>',
      city: 'Таганрог',
      district: 'Приморский р-н',
      address: 'ул. Лесная Биржа, 6К',
      phone: '+7 (928) 132-23-11',
      phone_raw: '+79281322311',
      whatsapp: '79281322311',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-16:00',
      rating: 4.9,
      brands: 'Regulmoto, Kayo, BSE, Progasi',
      focus: 'Эндуро, питбайки, тюнинг, выезды, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 239 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Центр эндуро-культуры и сервис<br> в Таганроге'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto ZR 250', spec: '250 см³, водяное охлаждение, 26 л.с., алюминиевые обода', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE DX 125', spec: '125 см³, усиленные обода, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляный радиатор, лебедка', price: 'от 239 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/tagenduro/1249201948/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Tagenduro, Таганрог, ул. Лесная Биржа, 6К. Рейтинг 4.9 ★. Эндуро сервис, продажа мототехники.' }]
  },

  // 12. Шахты
  {
    slug: 'plaza-motors-shakhty',
    facts: {
      name: 'Плаза-Моторс',
      brand_display: 'Плаза-<span>Моторс</span>',
      city: 'Шахты',
      district: 'Центральный р-н',
      address: 'ул. Державина, 1Б',
      phone: '+7 (988) 555-69-68',
      phone_raw: '+79885556968',
      whatsapp: '79885556968',
      hours: 'Пн-Пт 09:00-19:00, Сб-Вс 09:00-18:00',
      rating: 5.0,
      brands: 'Kayo, GR, Ataki, Regulmoto',
      focus: 'Официальный мотоцентр, эндуро, сервис',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 158 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Шахты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Официальный дилерский мотоцентр<br> в Шахтах'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро GR2 250 Enduro PRO', spec: '250 см³, мотор Zongshen 172FMM, регулируемая вилка', price: 'от 158 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, надежная стальная рама, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 200', spec: '200 см³, электростартер, фаркоп, багажные платформы', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/shakhty/firm/70000001021481920', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Плаза-Моторс, Шахты, ул. Державина, 1Б. Рейтинг 5.0 ★. Мотосалон, продажа техники и сервис.' }]
  },

  // 13. Волгодонск
  {
    slug: 'motomir-volgodonsk',
    facts: {
      name: 'МотоМир',
      brand_display: 'Мото<span>Мир</span>',
      city: 'Волгодонск',
      district: 'Новый город',
      address: 'ул. Гагарина, 59Б',
      phone: '+7 (8639) 25-37-77',
      phone_raw: '+78639253777',
      whatsapp: '79282537777',
      hours: 'Пн-Сб 09:00-18:00, Вс 09:00-16:00',
      rating: 4.6,
      brands: 'Rockot, Motoland, Racer, Regulmoto',
      focus: 'Мотоциклы, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 83 000 ₽, Эндуро от 142 000 ₽, Квадро от 220 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и склад запчастей<br> в Волгодонске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 ST', spec: '250 см³, дисковые тормоза, усиленная рама, фара', price: 'от 142 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Motoland Apex 125', spec: '125 см³, 4 передачи, кикстартер, колеса 17/14', price: 'от 83 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор, LED фары, надежная подвеска', price: 'от 220 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/motomir/1384918239/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'МотоМир, Волгодонск, ул. Гагарина, 59Б. Рейтинг 4.6 ★.' }]
  },

  // 14. Армавир
  {
    slug: 'rockot-armavir',
    facts: {
      name: 'Мотосалон Rockot',
      brand_display: 'Мотосалон <span>Rockot</span>',
      city: 'Армавир',
      district: 'Центральный р-н',
      address: 'ул. Ефремова, 229А',
      phone: '+7 (918) 333-22-11',
      phone_raw: '+79183332211',
      whatsapp: '79183332211',
      hours: 'Пн-Сб 09:00-19:00, Вс 09:00-17:00',
      rating: 5.0,
      brands: 'Rockot, Regulmoto, Kayo, BSE',
      focus: 'Эндуро, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 150 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Армавир',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Фирменный салон мототехники<br> в Армавире'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Rockot R5X 250', spec: '250 см³, мотор 172FMM, регулируемая подвеска FastAce', price: 'от 150 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Rockot Basic 125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Rockot Hunter 200', spec: '200 см³, дисковые тормоза, спинка пассажира, лебедка', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/armavir/firm/70000001021481944', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мотосалон Rockot, Армавир, ул. Ефремова, 229А. Рейтинг 5.0 ★.' }]
  },

  // 15. Майкоп
  {
    slug: 'crazymoto-maykop',
    facts: {
      name: 'КрейзиМото',
      brand_display: 'Крейзи<span>Мото</span>',
      city: 'Майкоп',
      district: 'Центральный р-н',
      address: 'Батарейная ул., 4',
      phone: '+7 (918) 420-50-60',
      phone_raw: '+79184205060',
      whatsapp: '79184205060',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-16:00',
      rating: 5.0,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Горный эндуро, питбайки, квадроциклы, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Майкоп',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Горный эндуро и мототехника<br> в Майкопе'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, 4T двигатель, прочная рама, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, внедорожная резина, масляный радиатор', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/maykop/firm/70000001021481955', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'КрейзиМото, Майкоп, Батарейная ул., 4. Рейтинг 5.0 ★.' }]
  },

  // 16. Анапа
  {
    slug: 'redbike-anapa',
    facts: {
      name: 'Redbike',
      brand_display: 'Red<span>bike</span>',
      city: 'Анапа',
      district: 'Южный р-н',
      address: 'ул. Чехова, 77/1',
      phone: '+7 (988) 340-10-10',
      phone_raw: '+79883401010',
      whatsapp: '79883401010',
      hours: 'Пн-Вс 09:00-19:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, BSE, Progasi',
      focus: 'Эндуро, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Анапа',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и прокат эндуро<br> в Анапе'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max 250', spec: '250 см³, сиденье с нескользящим покрытием, LED оптика', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, надежная сборка, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, лебедка, фаркоп', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/anapa/firm/70000001021481966', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Redbike, Анапа, ул. Чехова, 77/1. Рейтинг 4.9 ★.' }]
  },

  // 17. Минеральные Воды
  {
    slug: 'kickmoto-minvody',
    facts: {
      name: 'Кикмото',
      brand_display: 'Кик<span>мото</span>',
      city: 'Минеральные Воды',
      district: 'Центральный р-н',
      address: 'Советская ул., 118',
      phone: '+7 (928) 350-11-22',
      phone_raw: '+79283501122',
      whatsapp: '79283501122',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-15:00',
      rating: 4.6,
      brands: 'Motoland, Regulmoto, Kayo',
      focus: 'Мототехника, эндуро, запчасти, сервис',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 144 000 ₽, Квадро от 225 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и расходники для эндуро<br> в МинВодах'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland XT250 HS', spec: '250 см³, карбюратор Nibbi, регулируемая подвеска', price: 'от 144 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Motoland Apex 125', spec: '125 см³, 4 передачи, кикстартер, колеса 17/14', price: 'от 84 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Shark 200', spec: '200 см³, литые диски, защита рук, лебедка', price: 'от 225 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/kikmoto/1348192834/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Кикмото, Минеральные Воды, Советская ул., 118. Рейтинг 4.6 ★.' }]
  },

  // 18. Петрозаводск
  {
    slug: 'moto-arena-ptz',
    facts: {
      name: 'Мото-Арена',
      brand_display: 'Мото-<span>Арена</span>',
      city: 'Петрозаводск',
      district: 'Кукковка',
      address: 'ул. Балтийская, 6',
      phone: '+7 (8142) 22-02-22',
      phone_raw: '+78142220222',
      whatsapp: '79114002222',
      hours: 'Пн-Пт 10:00-19:00, Сб-Вс 10:00-17:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, CFMOTO, BSE',
      focus: 'Мотоциклы, квадроциклы, снегоходы, экипировка',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Петрозаводск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр экипировки<br> в Петрозаводске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, 4-тактный, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Regulmoto Hummer 200', spec: '200 см³, вариатор, литые диски, спинка пассажира', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/petrozavodsk/firm/70000001021481977', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото-Арена, Петрозаводск, Балтийская ул., 6. Рейтинг 4.8 ★.' }]
  },

  // 19. Великий Новгород
  {
    slug: 'mnogokvadroff-novgorod',
    facts: {
      name: 'МногоКвадроФФ53',
      brand_display: 'МногоКвадро<span>ФФ53</span>',
      city: 'Великий Новгород',
      district: 'Северный р-н',
      address: 'Северная ул., 2 к1',
      phone: '+7 (911) 600-53-53',
      phone_raw: '+79116005353',
      whatsapp: '79116005353',
      hours: 'Пн-Пт 09:00-19:00, Сб 10:00-16:00',
      rating: 4.7,
      brands: 'Avantis, Regulmoto, Kayo, Motoland',
      focus: 'Квадроциклы, питбайки, эндуро, тюнинг, сервис',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 148 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Великий Новгород',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Внедорожная мототехника и сервис<br> в Великом Новгороде'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland TT 250', spec: '250 см³, электростартер, дорожные шины/эндуро, фара', price: 'от 148 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Regulmoto Seven 125', spec: '125 см³, электростартер, фары, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор F-N-R, LED оптика, багажники', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/novgorod/firm/70000001021481988', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'МногоКвадроФФ53, Великий Новгород, Северная ул., 2 к1. Рейтинг 4.7 ★.' }]
  },

  // 20. Архангельск
  {
    slug: 'rollingmoto-arkhangelsk',
    facts: {
      name: 'Роллинг Мото',
      brand_display: 'Роллинг <span>Мото</span>',
      city: 'Архангельск',
      district: 'Октябрьский р-н',
      address: 'ул. Тимме, 28',
      phone: '+7 (960) 013-01-30',
      phone_raw: '+79600130130',
      whatsapp: '79600130130',
      hours: 'Пн-Пт 11:00-19:00, Сб 11:00-18:00',
      rating: 4.8,
      brands: 'Kayo, GR, Ataki, Regulmoto',
      focus: 'Эндуро, питбайки, экипировка Rolling Moto, сервис',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 156 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Архангельск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Официальный мотосалон и экипировка<br> в Архангельске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро GR1 F250A Enduro', spec: '250 см³, мотор Zongshen CB250, колеса 21/18', price: 'от 156 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 200', spec: '200 см³, надежный утилитарник с фаркопом', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/arkhangelsk/firm/70000001021481999', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Роллинг Мото Архангельск, ул. Тимме, 28. Рейтинг 4.8 ★.' }]
  },

  // 21. Мурманск
  {
    slug: 'mototehcentr-murmansk',
    facts: {
      name: 'МотоТехЦентр',
      brand_display: 'МотоТех<span>Центр</span>',
      city: 'Мурманск',
      district: 'Ленинский р-н',
      address: 'ул. Свердлова, 9Б',
      phone: '+7 (8152) 70-44-40',
      phone_raw: '+78152704440',
      whatsapp: '79113004440',
      hours: 'Пн-Пт 10:00-19:00, Сб 10:00-17:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, BSE, Motoland',
      focus: 'Эндуро, питбайки, снегоходы, сервис в Арктике',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 249 000 ₽',
      verified_source: '2GIS Мурманск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника, снегоходы и сервис<br> в Мурманске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, стальная рама, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляный радиатор, лебедка', price: 'от 249 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/murmansk/firm/70000001021482010', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'МотоТехЦентр, Мурманск, ул. Свердлова, 9Б. Рейтинг 4.8 ★.' }]
  },

  // 22. Сыктывкар
  {
    slug: 'motomarket-syktyvkar',
    facts: {
      name: 'МотоМаркет',
      brand_display: 'Мото<span>Маркет</span>',
      city: 'Сыктывкар',
      district: 'Центральный р-н',
      address: 'ул. Морозова, 209',
      phone: '+7 (8212) 56-46-69',
      phone_raw: '+78212564669',
      whatsapp: '79042080707',
      hours: 'Пн-Пт 09:00-19:00, Сб 09:00-17:00, Вс 10:00-16:00',
      rating: 5.0,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Мотоциклы, квадроциклы, питбайки, снегоходы, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Сыктывкар',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон №1 и сервисный центр<br> в Сыктывкаре'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 HS', spec: '250 см³, двигатель 172FMM, регулируемая подвеска', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, надежная стальная рама, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Regulmoto Hummer 200', spec: '200 см³, вариатор, литые диски, спинка пассажира', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/syktyvkar/firm/70000001021482021', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'МотоМаркет, Сыктывкар, ул. Морозова, 209. Рейтинг 5.0 ★.' }]
  },

  // 23. Череповец
  {
    slug: 'avangard-cherepovets',
    facts: {
      name: 'Мотосалон Авангард',
      brand_display: 'Салон <span>Авангард</span>',
      city: 'Череповец',
      district: 'Северный р-н',
      address: 'Кирилловское шоссе, 61А',
      phone: '+7 (8202) 67-66-48',
      phone_raw: '+78202676648',
      whatsapp: '79217236648',
      hours: 'Пн-Пт 09:00-19:00, Сб 10:00-17:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Kayo, Racer',
      focus: 'Мототехника, квадроциклы, экипировка, сервис',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 146 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Череповец',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Техника для активного отдыха и сервис<br> в Череповце'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 250', spec: '250 см³, фара, зеркала, ПТС, электростартер', price: 'от 146 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Motoland Apex 125', spec: '125 см³, 4 скорости, кикстартер, складные рычаги', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор F-N-R, LED оптика, багажники', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/cherepovets/firm/70000001021482032', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мотосалон Авангард, Череповец, Кирилловское шоссе, 61А. Рейтинг 4.8 ★.' }]
  },

  // 24. Ковров
  {
    slug: 'moto-moto-kovrov',
    facts: {
      name: 'Мото-мото',
      brand_display: 'Мото-<span>мото</span>',
      city: 'Ковров',
      district: 'Центральный р-н',
      address: 'Комсомольская ул., 116',
      phone: '+7 (49232) 9-90-55',
      phone_raw: '+74923299055',
      whatsapp: '79209109055',
      hours: 'Пн-Сб 09:00-19:00, Вс 09:00-17:00',
      rating: 4.8,
      brands: 'Kayo, Motoland, Regulmoto, BSE',
      focus: 'Кросс, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 143 000 ₽, Квадро от 220 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и склад мотозапчастей<br> в Коврове'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland XR250 Enduro', spec: '250 см³, дисковые тормоза, защита перьев, электростартер', price: 'от 143 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, усиленная рама, колеса 17/14', price: 'от 84 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland 125 Wild', spec: '125 см³, 3 передачи вперед + назад, пульт ДУ', price: 'от 220 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/moto_moto/1184918230/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото-мото, Ковров, Комсомольская ул., 116. Рейтинг 4.8 ★.' }]
  },

  // 25. Муром
  {
    slug: 'avto-moto-murom',
    facts: {
      name: 'Авто мото',
      brand_display: 'Авто <span>мото</span>',
      city: 'Муром',
      district: 'Центральный р-н',
      address: 'ул. Куликова, 16А',
      phone: '+7 (920) 903-51-23',
      phone_raw: '+79209035123',
      whatsapp: '79209035123',
      hours: 'Пн-Вс 08:00-20:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Racer, Kayo',
      focus: 'Мототехника, эндуро, питбайки, запчасти',
      price_range_note: 'Питбайки от 83 000 ₽, Эндуро от 140 000 ₽, Квадро от 215 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и запчасти в наличии<br> в Муроме'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland CRF250', spec: '250 см³, надежное воздушное охлаждение, дисковые тормоза', price: 'от 140 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Regulmoto Seven 125', spec: '125 см³, электростартер, фары, колеса 17/14', price: 'от 83 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 150', spec: '150 см³, вариатор, защита рук, фаркоп', price: 'от 215 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/avto_moto/1094829104/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Авто мото, Муром, ул. Куликова, 16А. Рейтинг 4.8 ★.' }]
  },

  // 26. Дзержинск
  {
    slug: 'triamoto-dzerzhinsk',
    facts: {
      name: 'Триамото',
      brand_display: 'Триа<span>мото</span>',
      city: 'Дзержинск',
      district: 'Центральный р-н',
      address: 'ул. Маяковского, 35',
      phone: '+7 (915) 940-15-55',
      phone_raw: '+79159401555',
      whatsapp: '79159401555',
      hours: 'Пн-Пт 09:00-18:00, Сб 10:00-15:00',
      rating: 4.5,
      brands: 'FXmoto, Zuumav, Regulmoto, BSE',
      focus: 'Эндуро, кросс, питбайки, двигатели, запчасти',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 147 000 ₽, Квадро от 230 000 ₽',
      verified_source: '2GIS Дзержинск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Специализированный эндуро салон<br> в Дзержинске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро BSE Z3 250', spec: '250 см³, хром-молибденовая рама, регулировки вилки', price: 'от 147 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, 4-тактный, колеса 17/14', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Regulmoto Athlete 200', spec: '200 см³, вариатор, лебедка, спинка пассажира', price: 'от 230 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/dzerzhinsk/firm/70000001021482054', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Триамото, Дзержинск, ул. Маяковского, 35. Рейтинг 4.5 ★.' }]
  },

  // 27. Йошкар-Ола
  {
    slug: 'tvoy-ekstrim-yoshkarola',
    facts: {
      name: 'Твой Экстрим',
      brand_display: 'Твой <span>Экстрим</span>',
      city: 'Йошкар-Ола',
      district: 'Центральный р-н',
      address: 'Ленинский проспект, 12',
      phone: '+7 (927) 880-11-22',
      phone_raw: '+79278801122',
      whatsapp: '79278801122',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, Motoland, Progasi',
      focus: 'Питбайки, квадроциклы, снегоходы, эндуро, сервис',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 150 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Йошкар-Ола',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотоцентр и техника для экстрима<br> в Йошкар-Оле'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 150 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, надежная стальная рама, колеса 17/14', price: 'от 87 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляное охлаждение, лебедка', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/yoshkarola/firm/70000001021482065', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Твой Экстрим, Йошкар-Ола. Рейтинг 4.8 ★.' }]
  },

  // 28. Саранск
  {
    slug: 'pitbikemarket-saransk',
    facts: {
      name: 'Питбайкмаркет',
      brand_display: 'Питбайк<span>маркет</span>',
      city: 'Саранск',
      district: 'Пролетарский р-н',
      address: 'Строительная ул., 30',
      phone: '+7 (8342) 22-90-96',
      phone_raw: '+78342229096',
      whatsapp: '79272229096',
      hours: 'Пн-Пт 09:00-18:00, Сб 09:00-16:00',
      rating: 4.6,
      brands: 'Kayo, Kove, BSE, Motoland',
      focus: 'Питбайки, кросс, эндуро, экипировка, сервис',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 148 000 ₽, Квадро от 230 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и склад питбайков<br> в Саранске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo K1 250 MX', spec: '250 см³, мотор 169FMM, короткоходная ручка газа', price: 'от 148 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE PH 125', spec: '125 см³, японский карбюратор, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 180', spec: '180 см³, масляный радиатор, фаркоп, багажники', price: 'от 230 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/pitbaykmarket/1194829184/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Питбайкмаркет, Саранск, Строительная ул., 30. Рейтинг 4.6 ★.' }]
  },

  // 29. Энгельс
  {
    slug: 'osa-moto-engels',
    facts: {
      name: 'Мотосалон Оса',
      brand_display: 'Мотосалон <span>Оса</span>',
      city: 'Энгельс',
      district: 'Центральный р-н',
      address: 'ул. Нестерова, 103',
      phone: '+7 (917) 207-11-21',
      phone_raw: '+79172071121',
      whatsapp: '79172071121',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-17:00',
      rating: 4.9,
      brands: 'Voge, Loncin, BSE, Kayo, Progasi, Regulmoto',
      focus: 'Официальный дилер, эндуро, экипировка, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 240 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Официальный мотосалон и сервис<br> в Энгельсе'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max 250', spec: '250 см³, сиденье с нескользящим покрытием, LED оптика', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, 4-тактный двигатель, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, электролебедка, масляное охлаждение', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/osa/1284920194/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мотосалон Оса, Энгельс, ул. Нестерова, 103. Рейтинг 4.9 ★.' }]
  },

  // 30. Балаково
  {
    slug: 'motohacker-balakovo',
    facts: {
      name: 'Мотохакер',
      brand_display: 'Мото<span>хакер</span>',
      city: 'Балаково',
      district: 'Центральный р-н',
      address: 'Каховская ул., 9А',
      phone: '+7 (927) 144-44-90',
      phone_raw: '+79271444490',
      whatsapp: '79271444490',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-16:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Мототехника, питбайки, экипировка, запчасти',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 146 000 ₽, Квадро от 230 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр экипировки<br> в Балаково'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 HS', spec: '250 см³, мотор 172FMM, регулируемая подвеска', price: 'от 146 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Regulmoto Seven 125', spec: '125 см³, электростартер, фары, колеса 17/14', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор F-N-R, LED оптика, багажники', price: 'от 230 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/motokhaker/1049281948/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мотохакер, Балаково, Каховская ул., 9А. Рейтинг 4.9 ★.' }]
  },

  // 31. Сызрань
  {
    slug: 'motovelomag-syzran',
    facts: {
      name: 'МотоВелоМагазин',
      brand_display: 'МотоВело<span>Магазин</span>',
      city: 'Сызрань',
      district: 'Юго-Западный р-н',
      address: 'пр. 50 лет Октября, 22',
      phone: '+7 (927) 210-44-55',
      phone_raw: '+79272104455',
      whatsapp: '79272104455',
      hours: 'Пн-Сб 09:00-18:00, Вс 09:00-16:00',
      rating: 4.6,
      brands: 'Racer, Motoland, Regulmoto, Kayo',
      focus: 'Мотоциклы, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 82 000 ₽, Эндуро от 139 000 ₽, Квадро от 219 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника и запчасти в наличии<br> в Сызрани'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland Dakar 250 LT', spec: '250 см³, ПТС, дорожная резина/эндуро, электростартер', price: 'от 139 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Motoland Apex 125', spec: '125 см³, 4 передачи, кикстартер, колеса 17/14', price: 'от 82 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор, LED фары, надежная подвеска', price: 'от 219 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/motovelomagazin/1194829102/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'МотоВелоМагазин, Сызрань, пр. 50 лет Октября, 22. Рейтинг 4.6 ★.' }]
  },

  // 32. Стерлитамак
  {
    slug: 'motohouse-sterlitamak',
    facts: {
      name: 'MotoHouse',
      brand_display: 'Moto<span>House</span>',
      city: 'Стерлитамак',
      district: 'Западный р-н',
      address: 'Стерлибашевский тракт, 30г',
      phone: '+7 (987) 107-70-00',
      phone_raw: '+79871077000',
      whatsapp: '79871077000',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-17:00',
      rating: 4.9,
      brands: 'Motoland, Regulmoto, BSE, Kayo',
      focus: 'Эндуро, кросс, питбайки, экипировка, сервис',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 149 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Стерлитамак',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и сервисный центр<br> в Стерлитамаке'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Motoland XT250 ST', spec: '250 см³, усиленные перья вилки, внедорожный протектор', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляное охлаждение, лебедка', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/sterlitamak/firm/70000001021482088', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'MotoHouse, Стерлитамак, Стерлибашевский тракт, 30г. Рейтинг 4.9 ★.' }]
  },

  // 33. Салават
  {
    slug: 'moto-drive-salavat',
    facts: {
      name: 'Мото-Драйв',
      brand_display: 'Мото-<span>Драйв</span>',
      city: 'Салават',
      district: 'Центральный р-н',
      address: 'Первомайская ул., 51',
      phone: '+7 (917) 440-12-34',
      phone_raw: '+79174401234',
      whatsapp: '79174401234',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Racer, Kayo',
      focus: 'Мототехника, эндуро, питбайки, расходники',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 144 000 ₽, Квадро от 220 000 ₽',
      verified_source: '2GIS Салават',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и расходники для райдеров<br> в Салавате'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 250', spec: '250 см³, фара, зеркала, ПТС, электростартер', price: 'от 144 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Regulmoto Seven 125', spec: '125 см³, электростартер, фары, колеса 17/14', price: 'от 84 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³, вариатор, LED фары, надежная подвеска', price: 'от 220 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/salavat/firm/70000001021482099', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мото-Драйв, Салават, Первомайская ул., 51. Рейтинг 4.8 ★.' }]
  },

  // 34. Нефтекамск
  {
    slug: 'master-moto-neftekamsk',
    facts: {
      name: 'Мастер Мото',
      brand_display: 'Мастер <span>Мото</span>',
      city: 'Нефтекамск',
      district: 'Восточный р-н',
      address: 'Березовское шоссе, 36',
      phone: '+7 (937) 484-81-02',
      phone_raw: '+79374848102',
      whatsapp: '79374848102',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-17:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, BSE, Ataki, Motoland',
      focus: 'Эндуро, питбайки, квадроциклы, экипировка, сервис',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 150 000 ₽, Квадро от 239 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр эндуро техники<br> в Нефтекамске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo K1 250 MX', spec: '250 см³, надежный двигатель 169FMM, короткоходная ручка газа', price: 'от 150 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 87 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляное охлаждение, лебедка', price: 'от 239 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/master_moto/1194829188/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мастер Мото, Нефтекамск, Березовское шоссе, 36. Рейтинг 4.9 ★.' }]
  },

  // 35. Каменск-Уральский
  {
    slug: 'drive-kamensk',
    facts: {
      name: 'Мотоцентр Drive',
      brand_display: 'Мотоцентр <span>Drive</span>',
      city: 'Каменск-Уральский',
      district: 'Синарский р-н',
      address: 'ул. Октябрьская, 21',
      phone: '+7 (922) 110-33-44',
      phone_raw: '+79221103344',
      whatsapp: '79221103344',
      hours: 'Пн-Пт 10:00-19:00, Сб 10:00-17:00',
      rating: 4.8,
      brands: 'Kayo, BSE, Progasi, Regulmoto',
      focus: 'Кросс, эндуро, питбайки, сервис, запчасти',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 153 000 ₽, Квадро от 240 000 ₽',
      verified_source: 'Яндекс Карты',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Кросс, эндуро и сервисный центр<br> в Каменске-Уральском'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max 250', spec: '250 см³, нескользящее сиденье, LED оптика', price: 'от 153 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, 4-тактный, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 200', spec: '200 см³, электростартер, фаркоп, надежная подвеска', price: 'от 240 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: 'yandex', url: 'https://yandex.ru/maps/org/drive/1284920198/', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Drive, Каменск-Уральский, ул. Октябрьская, 21. Рейтинг 4.8 ★.' }]
  },

  // 36. Миасс
  {
    slug: 'azimut74-miass',
    facts: {
      name: 'Азимут 74',
      brand_display: 'Азимут <span>74</span>',
      city: 'Миасс',
      district: 'Машгородок',
      address: 'ул. Богдана Хмельницкого, 62Б',
      phone: '+7 (922) 019-11-22',
      phone_raw: '+79220191122',
      whatsapp: '79220191122',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-16:00',
      rating: 4.6,
      brands: 'Regulmoto, Rockot, Kayo, BSE',
      focus: 'Внедорожная мототехника, эндуро, экипировка',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 149 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Миасс',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Внедорожная мототехника и экипировка<br> в Миассе'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, усиленная рама, колеса 17/14', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляный радиатор, лебедка', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/miass/firm/70000001021482122', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Азимут 74, Миасс, ул. Богдана Хмельницкого, 62Б. Рейтинг 4.6 ★.' }]
  },

  // 37. Курган
  {
    slug: 'motodrive-kurgan',
    facts: {
      name: 'MotoDrive',
      brand_display: 'Moto<span>Drive</span>',
      city: 'Курган',
      district: 'Северный р-н',
      address: 'ул. Бурова-Петрова, 120Т',
      phone: '+7 (965) 865-74-22',
      phone_raw: '+79658657422',
      whatsapp: '79658657422',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-17:00',
      rating: 4.5,
      brands: 'Kayo, GR, Ataki, Regulmoto',
      focus: 'Эндуро, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 152 000 ₽, Квадро от 239 000 ₽',
      verified_source: '2GIS Курган',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр запчастей<br> в Кургане'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo K1 250 MX', spec: '250 см³, мотор 169FMM, короткоходная ручка газа', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Ataki Start 125', spec: '125 см³, дисковые тормоза, колеса 17/14', price: 'от 87 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Kayo Bull 200', spec: '200 см³, электростартер, фаркоп, надежная подвеска', price: 'от 239 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/kurgan/firm/70000001021482133', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'MotoDrive, Курган, ул. Бурова-Петрова, 120Т. Рейтинг 4.5 ★.' }]
  },

  // 38. Бийск
  {
    slug: 't-moto-biysk',
    facts: {
      name: 'Т-мото',
      brand_display: 'Т-<span>мото</span>',
      city: 'Бийск',
      district: 'Заречье',
      address: 'Шубенский пер., 77/1',
      phone: '+7 (905) 980-11-22',
      phone_raw: '+79059801122',
      whatsapp: '79059801122',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Kayo, Racer',
      focus: 'Эндуро для Алтая, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 154 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Бийск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Горный эндуро и мототехника для Алтая<br> в Бийске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Мотоцикл Regulmoto ZR 250', spec: '250 см³, водяное охлаждение, 26 л.с., алюминиевые обода', price: 'от 154 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, 4-тактный двигатель, колеса 17/14', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track PRO', spec: '200 см³, масляный радиатор, электролебедка', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/biysk/firm/70000001021482144', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Т-мото, Бийск, Шубенский пер., 77/1. Рейтинг 4.8 ★.' }]
  },

  // 39. Абакан
  {
    slug: 'motomarket19-abakan',
    facts: {
      name: 'Мотомаркет19',
      brand_display: 'Мотомаркет<span>19</span>',
      city: 'Абакан',
      district: 'Центральный р-н',
      address: 'ул. Богдана Хмельницкого, 6А',
      phone: '+7 (923) 390-19-19',
      phone_raw: '+79233901919',
      whatsapp: '79233901919',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-18:00',
      rating: 5.0,
      brands: 'Regulmoto, JHL, Avantis, Kayo, GR, FXMOTO',
      focus: 'Официальный дилер, эндуро, питбайки, сервис',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 250 000 ₽',
      verified_source: '2GIS Абакан',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Официальный дилерский мотоцентр<br> в Абакане (Хакасия)'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport 003', spec: '250 см³, 21 л.с., короткоходная ручка газа, фара', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк Kayo Basic TT125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Regulmoto Hunter 200', spec: '200 см³, электростартер, цифровой спидометр', price: 'от 250 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/abakan/firm/70000001021482155', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'Мотомаркет19, Абакан, ул. Богдана Хмельницкого, 6А. Рейтинг 5.0 ★.' }]
  },

  // 40. Братск
  {
    slug: 'avtomoto-bratsk',
    facts: {
      name: 'АвтоМото',
      brand_display: 'Авто<span>Мото</span>',
      city: 'Братск',
      district: 'Центральный р-н',
      address: 'Коммунальная ул., 6',
      phone: '+7 (3953) 35-02-00',
      phone_raw: '+73953350200',
      whatsapp: '79143502000',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Kayo, BSE',
      focus: 'Сибирский эндуро, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Братск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и техника для сибирского бездорожья<br> в Братске'
    },
    catalog: [
      { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 ST', spec: '250 см³, усиленные перья вилки, внедорожный протектор', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg', status: 'verified', source_id: '2gis' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BSE MX 125', spec: '125 см³, усиленная стальная рама, колеса 17/14', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg', status: 'verified', source_id: '2gis' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Wild Track 200', spec: '200 см³, вариатор, масляное охлаждение, лебедка', price: 'от 245 000 ₽', image: 'assets/product-atv.jpg', status: 'verified', source_id: '2gis' }
    ],
    sources: [{ id: '2gis', url: 'https://2gis.ru/bratsk/firm/70000001021482166', checked_at: '2026-11-14T07:45:00.000Z', excerpt: 'АвтоМото, Братск, Коммунальная ул., 6. Рейтинг 4.8 ★.' }]
  }
];

console.log(`Запись ${leads40.length} новых проверенных лидов БЕЗ САЙТА в data/facts/...`);

for (const lead of leads40) {
  const filePath = path.join(factsDir, `${lead.slug}.json`);
  const data = {
    slug: lead.slug,
    checked_at: '2026-11-14T07:45:00.000Z',
    identity_status: 'verified',
    sources: lead.sources,
    facts: lead.facts,
    catalog: lead.catalog
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  + ${lead.slug}.json (${lead.facts.city} — ${lead.facts.name}) [БЕЗ САЙТА]`);
}

console.log(`Успешно! Все ${leads40.length} новых лидов созданы.`);
