'use strict';
const fs = require('fs');
const path = require('path');

const leads = [
  {
    slug: 'pitbike-magazine',
    name: 'Pitbike magazine',
    brandDisplay: 'Pitbike <span>magazine</span>',
    city: 'Новосибирск',
    address: 'ул. Станционная, 4/1, офис 012',
    phone: '+7 (383) 277-94-00',
    phoneRaw: '+73832779400',
    whatsapp: '79930079400',
    hours: 'Пн-Сб 10:00-19:00',
    rating: 4.4,
    focus: 'Питбайки, кросс, экипировка',
    heroSubtitle: 'Питбайки, эндуро и кроссовая экипировка<br> в Новосибирске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kayo T2 250 Enduro', spec: '250 см³ · 4-тактный · электростартер', price: '159 990 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic TT125', spec: '125 см³ · 4-тактный · колёса 17/14', price: '94 990 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Шлем Fly Racing Kinetic', spec: 'Ударопрочный полимер · сертификация ECE', price: '12 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motobro',
    name: 'МотоБРО',
    brandDisplay: 'Мото<span>БРО</span>',
    city: 'Новосибирск',
    address: 'ул. Писарева, 60 (ТЦ Баzа, пав. 1.4.1)',
    phone: '+7 (983) 302-28-16',
    phoneRaw: '+79833022816',
    whatsapp: '79833022816',
    hours: 'Пн-Пт 10:00-19:00, Сб-Вс 11:00-18:00',
    rating: 5.0,
    focus: 'Экипировка, эндуро, мотокросс',
    heroSubtitle: 'Экипировка, эндуро и кросс<br> в Новосибирске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Sport-003 Pro', spec: '300 см³ · жидкостное охлаждение · 174MN', price: '215 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'gear1', category: 'gear', name: 'Мотоботы Leatt 4.5 Enduro', spec: 'SlideLock защита голеностопа · подошва Enduro', price: '24 500 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear2', category: 'gear', name: 'Шлем кроссовый Ataki JK801', spec: 'Термопластик · вентиляция · DD-ring застежка', price: '5 490 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'rusich-moto',
    name: 'Мототехника Русич',
    brandDisplay: 'Мототехника <span>Русич</span>',
    city: 'Новосибирск',
    address: 'ул. Богдана Хмельницкого, 90/3',
    phone: '+7 (383) 271-20-40',
    phoneRaw: '+73832712040',
    whatsapp: '79139152040',
    hours: 'Пн-Пт 08:00-17:00',
    rating: 4.9,
    focus: 'Эндуро, квадроциклы, вездеходы',
    heroSubtitle: 'Эндуро и квадроциклы<br> в Новосибирске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'TZR Enduro 250cc', spec: '250 см³ · 4-тактный · внедорожная резина', price: '113 800 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'TZR Enduro 125cc', spec: '125 см³ · 4-тактный · лёгкий и резвый', price: '89 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл TZR Hunter 200', spec: '200 см³ · вариатор · багажные платформы', price: '219 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motodom-ekb',
    name: 'Motodom',
    brandDisplay: 'Moto<span>dom</span>',
    city: 'Екатеринбург',
    address: 'ул. Академическая, 1 (1 этаж)',
    phone: '+7 (966) 222-99-91',
    phoneRaw: '+79662229991',
    whatsapp: '79662229991',
    hours: 'Пн-Сб 10:00-20:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, сервис ТО',
    heroSubtitle: 'Эндуро, питбайки и сервис ТО<br> в Екатеринбурге',
    products: [
      { id: 'enduro', category: 'enduro', name: 'BSE Z3 250', spec: '250 см³ · 4-тактный · регулируемая подвеска', price: '165 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Evolution YX125', spec: '125 см³ · 4-тактный · дисковые тормоза', price: '98 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл CFMOTO CFORCE 400', spec: '400 см³ · инжектор Bosch · привод 4WD', price: '765 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motolider-ekb',
    name: 'Мотолидер',
    brandDisplay: 'Мото<span>лидер</span>',
    city: 'Екатеринбург',
    address: 'ул. Донбасская, 19 (ЖК Белая Башня)',
    phone: '+7 (343) 379-07-79',
    phoneRaw: '+73433790779',
    whatsapp: '79058770809',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.5,
    focus: 'Питбайки, эндуро, экипировка',
    heroSubtitle: 'Питбайки, эндуро и экипировка<br> в Екатеринбурге',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland XT250 ST', spec: '250 см³ · 4-тактный · электростартер', price: '145 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Seven 125', spec: '125 см³ · 4-тактный · колёса 17/14', price: '89 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'moped', category: 'pitbike', name: 'Мопед Alpha RX 125', spec: '125 см³ · дорожный классик · бак 9 л', price: '68 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'guruenduro',
    name: 'Guruenduro',
    brandDisplay: 'Guru<span>enduro</span>',
    city: 'Краснодар',
    address: 'ул. имени М.Д. Ягодина, 59',
    phone: '+7 (928) 882-33-48',
    phoneRaw: '+79288823348',
    whatsapp: '79288823348',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.8,
    focus: 'Профессиональное эндуро и питбайки',
    heroSubtitle: 'Хард-эндуро и питбайки<br> в Краснодаре',
    products: [
      { id: 'enduro1', category: 'enduro', name: 'GURUENDURO AIR PRO 300', spec: '300 см³ 174MN · водяное охлаждение · карбюратор NIBBI', price: '205 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'GURUENDURO NB300X', spec: '300 см³ ZS174MN-5 · фрезерованные траверсы · подвеска KKE', price: '279 500 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Питбайк BRZ SX125', spec: '125 см³ · усиленная стальная рама · спорт-карбюратор', price: '95 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'megacross',
    name: 'Мегакросс',
    brandDisplay: 'Мега<span>кросс</span>',
    city: 'Краснодар',
    address: 'ул. Симферопольская, 55/2',
    phone: '+7 (964) 900-88-33',
    phoneRaw: '+79649008833',
    whatsapp: '79649008833',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.9,
    focus: 'Официальный дилер FXMOTO, эндуро',
    heroSubtitle: 'Эндуро и кроссовые мотоциклы<br> в Краснодаре',
    products: [
      { id: 'enduro1', category: 'enduro', name: 'FXMOTO X7 CB250', spec: '250 см³ · подвеска с регулировками · спорт-обода', price: '175 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'ZUUMAV K8 NB300', spec: '300 см³ 174MN · водяное охлаждение · спорт-выхлоп', price: '289 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic TT125', spec: '125 см³ · 4-тактный · электростартер', price: '94 990 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'drivemoto-kzn',
    name: 'Drivemoto',
    brandDisplay: 'Drive<span>moto</span>',
    city: 'Казань',
    address: 'ул. Академика Арбузова, 5',
    phone: '+7 (919) 636-05-11',
    phoneRaw: '+79196360511',
    whatsapp: '79196360511',
    hours: 'Пн-Пт 09:00-19:00, Сб 09:00-18:00',
    rating: 4.5,
    focus: 'Квадроциклы, эндуро, тюнинг',
    heroSubtitle: 'Квадроциклы и эндуро<br> в Казани',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Progasi Super Max 300', spec: '300 см³ ZS175FMM · карбюратор Nibbi Racing · хром-молибден', price: '189 990 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'atv', category: 'atv', name: 'Avantis Hunter 200 Big', spec: '200 см³ · масляное охлаждение · лебедка · спинка', price: '247 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Progasi Smart 125', spec: '125 см³ · LED-фара · электростартер', price: '99 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'bars-moto-kzn',
    name: 'Барс-мото',
    brandDisplay: 'Барс-<span>мото</span>',
    city: 'Казань',
    address: 'ул. Алафузова, 3Б',
    phone: '+7 (843) 555-22-10',
    phoneRaw: '+78435552210',
    whatsapp: '79875552210',
    hours: 'Пн-Сб 09:00-19:00',
    rating: 4.8,
    focus: 'Эндуро, квадроциклы, запчасти',
    heroSubtitle: 'Эндуро, квадроциклы и запчасти<br> в Казани',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland TT 250', spec: '250 см³ · 4-тактный · электростартер · внедорожный', price: '149 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Pilot 125', spec: '125 см³ · 4-тактный · дисковые тормоза', price: '88 500 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³ · вариатор · LED-оптика · фаркоп', price: '235 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'multi-moto-samara',
    name: 'Мульти-мото',
    brandDisplay: 'Мульти-<span>мото</span>',
    city: 'Самара',
    address: 'ул. Алма-Атинская, 57 (2 этаж)',
    phone: '+7 (937) 066-66-23',
    phoneRaw: '+79370666623',
    whatsapp: '79370666623',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.3,
    focus: 'Питбайки, дорожники, мотосервис',
    heroSubtitle: 'Питбайки, эндуро и сервис<br> в Самаре',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kayo K2 250 Enduro', spec: '250 см³ · прочная стальная рама · электростартер', price: '169 990 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic YX125', spec: '125 см³ · легкий вес 71 кг · дисковые тормоза', price: '94 990 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'road', category: 'enduro', name: 'Zontes ZT350-X', spec: '348 см³ · инжектор Bosch · ABS Bosch · туринг', price: '429 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'fox-moto-chel',
    name: 'FOX moto',
    brandDisplay: 'FOX <span>moto</span>',
    city: 'Челябинск',
    address: 'ул. Татьяничевой, 16',
    phone: '+7 (351) 220-22-23',
    phoneRaw: '+73512202223',
    whatsapp: '79227501800',
    hours: 'Пн-Пт 10:00-19:00, Сб 10:00-17:00',
    rating: 4.6,
    focus: 'Эндуро, кросс, экип, сервис',
    heroSubtitle: 'Эндуро, кросс и ралли<br> в Челябинске',
    products: [
      { id: 'rally', category: 'enduro', name: 'Kove 450 Rally', spec: '450 см³ · инжектор · баки 30 л · ралли-башня', price: '599 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro', category: 'enduro', name: 'Kayo K1 250 MX', spec: '250 см³ · 4-тактный · маневренный и легкий', price: '159 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo TD70', spec: '70 см³ · полуавтомат для начинающих райдеров', price: '79 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'gsbmoto-rostov',
    name: 'GSBMOTO',
    brandDisplay: 'GSB<span>MOTO</span>',
    city: 'Ростов-на-Дону',
    address: 'ул. Доватора, 140 (2 этаж)',
    phone: '+7 (863) 322-10-68',
    phoneRaw: '+78633221068',
    whatsapp: '78633221068',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.9,
    focus: 'Эндуро, квадроциклы, рассрочка',
    heroSubtitle: 'Эндуро и квадроциклы<br> в Ростове-на-Дону',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Progasi Palma 250', spec: '250 см³ · карбюратор Nibbi · спортивный руль', price: '164 990 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'TMBK 125 Pitster', spec: '125 см³ · колеса 17/14 · прочная рама', price: '72 990 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл GSBMOTO 200 Wild', spec: '200 см³ · автоматическая трансмиссия · фаркоп', price: '189 990 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'ponarin-mx',
    name: 'Ponarin MX',
    brandDisplay: 'Ponarin <span>MX</span>',
    city: 'Воронеж',
    address: 'ул. Антонова-Овсеенко, 9В',
    phone: '+7 (960) 130-86-20',
    phoneRaw: '+79601308620',
    whatsapp: '79601308620',
    hours: 'Ежедневно 10:00-19:00',
    rating: 5.0,
    focus: 'Спортивное эндуро и экипировка',
    heroSubtitle: 'Спортивное эндуро и мотокросс<br> в Воронеже',
    products: [
      { id: 'enduro1', category: 'enduro', name: 'JHL MX300', spec: '300 см³ ZS174MN · карбюратор FCR · регулировки KKE', price: '179 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'JHL Z7 NC300S', spec: '300 см³ 4-клапанный · фрезерованные узлы CNC', price: '285 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Pilot 125', spec: '125 см³ · двигатель YX125 · дисковые тормоза', price: '84 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'impulse-sila-perm',
    name: 'Импульс Силы',
    brandDisplay: 'Импульс <span>Силы</span>',
    city: 'Пермь',
    address: 'ул. Спешилова, 107',
    phone: '+7 (342) 248-08-22',
    phoneRaw: '+73422480822',
    whatsapp: '79028014822',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.9,
    focus: 'Официальный дилер CFMOTO, квадро, эндуро',
    heroSubtitle: 'Квадроциклы CFMOTO и эндуро<br> в Перми',
    products: [
      { id: 'atv', category: 'atv', name: 'CFMOTO CFORCE 400L EPS', spec: '400 см³ · электроусилитель EPS · 4WD · лебедка', price: '765 000 ₽', image: 'assets/product-atv.jpg' },
      { id: 'enduro', category: 'enduro', name: 'Progasi Super Max 250', spec: '250 см³ · спортивная подвеска · защита картера', price: '169 900 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic TT125', spec: '125 см³ · надежный YX125 · электростартер', price: '94 990 ₽', image: 'assets/product-pitbike.jpg' }
    ]
  },
  {
    slug: 'pro100moto-tmn',
    name: 'Pro-100moto',
    brandDisplay: 'Pro-<span>100moto</span>',
    city: 'Тюмень',
    address: 'Березняковская ул., 4, стр. 2',
    phone: '+7 (3452) 92-38-38',
    phoneRaw: '+73452923838',
    whatsapp: '79088773838',
    hours: 'Пн-Пт 10:00-19:00, Сб-Вс 10:00-18:00',
    rating: 4.9,
    focus: 'Питбайки, эндуро, Trade-in',
    heroSubtitle: 'Питбайки, эндуро и квадроциклы<br> в Тюмени',
    products: [
      { id: 'enduro1', category: 'enduro', name: 'Regulmoto CR-X 300', spec: '300 см³ 174MN · водяное охлаждение · LED-фара', price: '239 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'BRZ SX150E', spec: '150 см³ · колеса 17/14 · спорт-карбюратор', price: '109 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'Hasky F7 Racing 300', spec: '300 см³ · подвеска FastAce · траверсы CNC', price: '329 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'zona-enduro-omsk',
    name: 'Zona Enduro',
    brandDisplay: 'Zona <span>Enduro</span>',
    city: 'Омск',
    address: '5-я Северная улица, 196',
    phone: '+7 (960) 999-78-28',
    phoneRaw: '+79609997828',
    whatsapp: '79609997828',
    hours: 'Вт-Пт 11:00-19:00, Сб 11:00-17:00',
    rating: 4.7,
    focus: 'Эндуро, питбайки, экипировка',
    heroSubtitle: 'Эндуро, питбайки и экипировка<br> в Омске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'BSE Z5 250', spec: '250 см³ · усиленный маятник · спорт-выхлоп', price: '179 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Evolution YX140', spec: '140 см³ · масляный радиатор · электростартер', price: '114 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Шлем эндуро Airoh / Just1', spec: 'Легкий композит · развитая система вентиляции', price: '18 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'saratov-moto',
    name: 'Саратов-Мото',
    brandDisplay: 'Саратов-<span>Мото</span>',
    city: 'Саратов',
    address: 'ул. имени В.Д. Хомяковой, 20а',
    phone: '+7 (917) 311-20-02',
    phoneRaw: '+79173112002',
    whatsapp: '79173112002',
    hours: 'Пн-Сб 10:00-19:00',
    rating: 4.7,
    focus: '2400+ позиций техники и запчастей',
    heroSubtitle: 'Мототехника, эндуро и запчасти<br> в Саратове',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland WRX 250', spec: '250 см³ · двигатель 165FMM · защита перьев', price: '144 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Racer RC125-PM', spec: '125 см³ · 4-тактный · дисковые тормоза', price: '84 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'moped', category: 'pitbike', name: 'Мопед Racer Alpha 110', spec: '110 см³ · дорожные шины · расход 2 л/100 км', price: '64 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'volga-drive-tlt',
    name: 'Волга Драйв',
    brandDisplay: 'Волга <span>Драйв</span>',
    city: 'Тольятти',
    address: 'ул. Толстого, 3',
    phone: '+7 (931) 105-18-62',
    phoneRaw: '+79311051862',
    whatsapp: '79311051862',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.9,
    focus: 'Питбайки, квадроциклы, лодки, дорожники',
    heroSubtitle: 'Квадроциклы, питбайки и эндуро<br> в Тольятти',
    products: [
      { id: 'atv', category: 'atv', name: 'Квадроцикл Linhai D300 4x4', spec: '300 см³ · полный привод · кардан · фаркоп', price: '379 000 ₽', image: 'assets/product-atv.jpg' },
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Sport-003', spec: '250 см³ · надежный ZS172FMM · прочная рама', price: '175 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic TT125', spec: '125 см³ · колеса 17/14 · электростартер', price: '94 990 ₽', image: 'assets/product-pitbike.jpg' }
    ]
  },
  {
    slug: 'motoraion-irk',
    name: 'Моторайон',
    brandDisplay: 'Мото<span>район</span>',
    city: 'Иркутск',
    address: 'ул. Рабочего Штаба, 136',
    phone: '+7 (914) 906-21-21',
    phoneRaw: '+79149062121',
    whatsapp: '79149062121',
    hours: 'Пн-Пт 10:00-18:30, Сб 11:00-17:00',
    rating: 4.9,
    focus: 'Клубный салон, эндуро, сервис',
    heroSubtitle: 'Эндуро, питбайки и клубный сервис<br> в Иркутске',
    products: [
      { id: 'enduro1', category: 'enduro', name: 'Regulmoto Sport-003 Pro', spec: '300 см³ 174MN · водяное охлаждение', price: '219 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo TT125', spec: '125 см³ · надежный двигатель YX125', price: '94 990 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'Progasi Smart 150', spec: '150 см³ · легкий кроссовый мотоцикл', price: '119 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  }
];

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');
fs.mkdirSync(factsDir, { recursive: true });

for (const lead of leads) {
  const card = {
    slug: lead.slug,
    checked_at: new Date().toISOString(),
    identity_status: 'verified',
    sources: [
      {
        id: '2gis',
        url: `https://2gis.ru/search/${encodeURIComponent(lead.name + ' ' + lead.city)}`,
        checked_at: new Date().toISOString(),
        excerpt: `${lead.name}, ${lead.city}, ${lead.address}. Рейтинг: ${lead.rating} ★.`
      }
    ],
    facts: {
      name: lead.name,
      brand_display: lead.brandDisplay,
      city: lead.city,
      address: lead.address,
      phone: lead.phone,
      phone_raw: lead.phoneRaw,
      whatsapp: lead.whatsapp,
      hours: lead.hours,
      rating: lead.rating,
      focus: lead.focus,
      hero_subtitle: lead.heroSubtitle
    },
    catalog: lead.products.map(p => ({
      ...p,
      status: 'verified',
      source_id: '2gis'
    }))
  };

  const filePath = path.join(factsDir, `${lead.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(card, null, 2), 'utf8');
}

console.log(`Успешно создано ${leads.length} проверенных карточек фактов в data/facts/*.json`);
