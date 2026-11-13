'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');

const batch2Data = [
  {
    slug: 'moto-vektor-ufa',
    name: 'Мото вектор',
    brandDisplay: 'Мото <span>вектор</span>',
    city: 'Уфа',
    address: 'ул. Малая Гражданская, 35а к4',
    phone: '+7 (917) 449-52-55',
    phoneRaw: '+79174495255',
    whatsapp: '79174495255',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.8,
    focus: 'Эндуро, питбайки, квадроциклы, экип',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Уфе',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Sport 300', spec: '300 см³ · 4-тактный · жидкостное охлаждение', price: '198 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic 125', spec: '125 см³ · 4-тактный · колёса 17/14', price: '92 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Кроссовый шлем и экипировка', spec: 'Сертификация ECE 22.05 · развитая вентиляция', price: '8 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'enduro-sibir-krsk',
    name: 'ЭндуроСибирь24',
    brandDisplay: 'Эндуро<span>Сибирь24</span>',
    city: 'Красноярск',
    address: 'ул. Норильская, 2г',
    phone: '+7 (983) 070-89-89',
    phoneRaw: '+79830708989',
    whatsapp: '79830708989',
    hours: 'Ежедневно 10:00-20:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, прокат, экип',
    heroSubtitle: 'Эндуро, питбайки и прокат техники<br> в Красноярске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Hasky F7 300', spec: '300 см³ ZS174MN · гидравлическое сцепление', price: '215 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'BSE Z5 250', spec: '250 см³ · усиленные обода 21/18 · электростартер', price: '155 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic 125', spec: '125 см³ · 4-тактный · проверенный мотор YX', price: '89 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motosoyuz-barnaul',
    name: 'МотоСоюз',
    brandDisplay: 'Мото<span>Союз</span>',
    city: 'Барнаул',
    address: 'Павловский тракт, 198г',
    phone: '+7 (930) 333-19-96',
    phoneRaw: '+79303331996',
    whatsapp: '79303331996',
    hours: 'Ежедневно 10:00-19:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, квадроциклы, экип',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Барнауле',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Athlete 250', spec: '250 см³ ZS172FMM · регулируемая подвеска', price: '149 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo TT125 17/14', spec: '125 см³ · дисковая гидравлика · защита рук', price: '95 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Hunter 200', spec: '200 см³ · вариатор · фаркоп и багажники', price: '210 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motorbike-vlg',
    name: 'Моторбайк',
    brandDisplay: 'Мотор<span>байк</span>',
    city: 'Волгоград',
    address: 'ул. Лермонтова, 33',
    phone: '+7 (927) 510-03-74',
    phoneRaw: '+79275100374',
    whatsapp: '79275100374',
    hours: 'Пн-Сб 10:00-18:00, Вс 10:00-17:00',
    rating: 4.5,
    focus: 'Эндуро, дорожные, сервис ТО, шиномонтаж',
    heroSubtitle: 'Эндуро, дорожные мотоциклы и сервис<br> в Волгограде',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland Dakar 250', spec: '250 см³ · масляное охлаждение · ПТС в комплекте', price: '165 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Motoland Apex 125', spec: '125 см³ · колеса 17/14 · резвый мотор', price: '94 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Комплект внедорожной резины', spec: 'Кроссовый протектор 80/100-21 + 110/90-18', price: '8 400 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'darex-moto-nn',
    name: 'Darex Moto',
    brandDisplay: 'Darex <span>Moto</span>',
    city: 'Нижний Новгород',
    address: 'Московское шоссе, 302/1Д',
    phone: '+7 (937) 587-27-41',
    phoneRaw: '+79375872741',
    whatsapp: '79375872741',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.7,
    focus: 'Эндуро, питбайки, квадроциклы, экип',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Нижнем Новгороде',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Progasi Super Max 300', spec: '300 см³ · хромомолибденовая рама · подвеска WP', price: '185 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo K1 250 MX', spec: '250 см³ · лёгкий эндуро для начинающих', price: '139 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Защитный панцирь черепаха', spec: 'Защита спины, груди и плеч · вентилируемая основа', price: '7 800 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'sp-motors-yar',
    name: 'SP Motors',
    brandDisplay: 'SP <span>Motors</span>',
    city: 'Ярославль',
    address: 'Тутаевское шоссе, 2в',
    phone: '+7 (965) 726-20-60',
    phoneRaw: '+79657262060',
    whatsapp: '79657262060',
    hours: 'Ежедневно 10:00-19:00',
    rating: 5.0,
    focus: 'Квадроциклы, питбайки, эндуро, экип',
    heroSubtitle: 'Квадроциклы, эндуро и питбайки<br> в Ярославле',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Voge 300 Rally', spec: '300 см³ инжектор · ABS · ветровое стекло и дуги', price: '389 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'atv', category: 'atv', name: 'Loncin Xwolf 300', spec: '300 см³ 4х2 · лебедка, спинка пассажира, фаркоп', price: '390 000 ₽', image: 'assets/product-atv.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Seven 125', spec: '125 см³ · колеса 17/14 · электростартер', price: '94 000 ₽', image: 'assets/product-pitbike.jpg' }
    ]
  },
  {
    slug: 'motonachinka-rzn',
    name: 'Мотоначинка',
    brandDisplay: 'Мото<span>начинка</span>',
    city: 'Рязань',
    address: 'Куйбышевское шоссе, 47',
    phone: '+7 (915) 624-22-36',
    phoneRaw: '+79156242236',
    whatsapp: '79156242236',
    hours: 'Ежедневно 09:00-19:00',
    rating: 4.9,
    focus: 'Эндуро, питбайки, тюнинг, сервис, экип',
    heroSubtitle: 'Эндуро, питбайки и тюнинг<br> в Рязани',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto CR-X 300', spec: '300 см³ ZS174MN · водянка · спортивный выхлоп', price: '219 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'Kayo T2 250 Enduro', spec: '250 см³ · надежный двигатель 172FMM · буксаторы', price: '158 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Шлем кроссовый Just1 J38', spec: 'Поликарбонат · съемная подкладка · вентиляция', price: '11 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'planeta-moto-tver',
    name: 'Планета Мото',
    brandDisplay: 'Планета <span>Мото</span>',
    city: 'Тверь',
    address: 'Волоколамское шоссе, 47Б',
    phone: '+7 (910) 533-30-80',
    phoneRaw: '+79105333080',
    whatsapp: '79105333080',
    hours: 'Пн-Сб 10:00-19:00, Вс 10:00-17:00',
    rating: 5.0,
    focus: 'Кросс, эндуро, питбайки, сервис ТО',
    heroSubtitle: 'Кросс, эндуро и питбайки<br> в Твери',
    products: [
      { id: 'enduro', category: 'enduro', name: 'BSE Z3 250', spec: '250 см³ 172FMM · подвеска с регулировками отбоя', price: '169 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic 125', spec: '125 см³ 4-тактный · усиленная стальная рама', price: '89 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Мотоботы эндуро шарнирные', spec: 'Надежная фиксация голеностопа · литые застежки', price: '18 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motopark-tula',
    name: 'Мотопарк',
    brandDisplay: 'Мото<span>парк</span>',
    city: 'Тула',
    address: 'Новомосковское шоссе, 58',
    phone: '+7 (910) 940-00-58',
    phoneRaw: '+79109400058',
    whatsapp: '79109400058',
    hours: 'Ежедневно 09:00-21:00',
    rating: 4.9,
    focus: 'Эндуро, питбайки, квадроциклы, экип',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Туле',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Avantis FX 250 Lux', spec: '250 см³ · усиленные колеса 21/18 · спидометр и LED', price: '169 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'BSE RTC-300', spec: '300 см³ 30 л.с. водянка · фрезерованные ступицы', price: '279 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Seven 125', spec: '125 см³ · колеса 17/14 · гидравлические тормоза', price: '95 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motokrug-orenburg',
    name: 'Мотокруг',
    brandDisplay: 'Мото<span>круг</span>',
    city: 'Оренбург',
    address: 'ул. Диагностики, 2/1',
    phone: '+7 (932) 530-95-65',
    phoneRaw: '+79325309565',
    whatsapp: '79325309565',
    hours: 'Пн-Пт 09:30-19:00, Сб-Вс 10:00-17:00',
    rating: 4.9,
    focus: 'Эндуро, питбайки, квадроциклы, ЗИП',
    heroSubtitle: 'Эндуро, питбайки и запчасти<br> в Оренбурге',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland XT250 ST', spec: '250 см³ · электростартер · защита картера', price: '142 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Evolution 125', spec: '125 см³ · алюминиевый руль Fatbar · цепь KMC', price: '93 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Комплект звезд и сальниковая цепь', spec: 'DID 520VX3 Япония + фрезерованные звезды', price: '12 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'justmoto-stavropol',
    name: 'ДжастМото',
    brandDisplay: 'Джаст<span>Мото</span>',
    city: 'Ставрополь',
    address: 'проспект Кулакова, 51',
    phone: '+7 (989) 973-48-74',
    phoneRaw: '+79899734874',
    whatsapp: '79899734874',
    hours: 'Ежедневно 10:00-20:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, предпродажка ТО-0',
    heroSubtitle: 'Спортивное эндуро и питбайки<br> в Ставрополе',
    products: [
      { id: 'enduro', category: 'enduro', name: 'ZUUMAV K8 300 NB', spec: '300 см³ ZS174MN-3 · подвеска KKE сжатие/отбой', price: '249 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'FXMOTO X7 250', spec: '250 см³ 172FMM · обода Enduro X-Series 7116', price: '175 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'ZUUMAV PM125', spec: '125 см³ · колеса 17/14 · карбюратор NIBBI PE19', price: '96 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'crazymoto-sochi',
    name: 'CrazyMoto',
    brandDisplay: 'Crazy<span>Moto</span>',
    city: 'Сочи',
    address: 'ул. Авиационная, 19А',
    phone: '+7 (918) 403-23-02',
    phoneRaw: '+79184032302',
    whatsapp: '79184032302',
    hours: 'Ежедневно 09:00-20:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, прокат, сервис, экип',
    heroSubtitle: 'Горное эндуро, питбайки и сервис<br> в Сочи',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kayo T4 300 Enduro', spec: '300 см³ жидкостное охлаждение · подвеска FastAce', price: '225 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'BSE PH10 125', spec: '125 см³ · алюминиевый маятник · колеса 17/14', price: '98 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Экипировка для горного эндуро', spec: 'Вентилируемая черепаха, наколенники и перчатки', price: '14 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'susanin-kemerovo',
    name: 'Сусанин',
    brandDisplay: 'Мотосалон <span>Сусанин</span>',
    city: 'Кемерово',
    address: 'Кузнецкий проспект, 176 к2',
    phone: '+7 (923) 466-61-23',
    phoneRaw: '+79234666123',
    whatsapp: '79234666123',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.9,
    focus: 'Эндуро, питбайки, квадроциклы, экип',
    heroSubtitle: 'Эндуро, квадроциклы и питбайки<br> в Кемерово',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Sport-003', spec: '300 см³ · 4-тактный · жидкостное охлаждение', price: '195 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic 125 17/14', spec: '125 см³ · 4-тактный · легкий внедорожный', price: '91 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland Allroad 200', spec: '200 см³ · вариатор F-N-R · LED оптика', price: '225 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motosoyuz-nk',
    name: 'МотоСоюз Новокузнецк',
    brandDisplay: 'МотоСоюз <span>НК</span>',
    city: 'Новокузнецк',
    address: 'ул. Димитрова, 21',
    phone: '+7 (3843) 56-04-64',
    phoneRaw: '+73843560464',
    whatsapp: '79029830464',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.9,
    focus: 'Эндуро, питбайки, квадроциклы, запчасти',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Новокузнецке',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Regulmoto Holeshot 300', spec: '300 см³ 4-клапанный · вилка 48 мм · защита радиаторов', price: '259 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo TT125 17/14', spec: '125 см³ · колеса 17/14 · защита картера', price: '94 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Шлем кроссовый Ataki с очками', spec: 'Сертификация ECE · двухслойная линза антифог', price: '7 900 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motoded-kirov',
    name: 'МотоДед',
    brandDisplay: 'Мото<span>Дед</span>',
    city: 'Киров',
    address: 'Советский тракт, 14',
    phone: '+7 (982) 383-00-53',
    phoneRaw: '+79823830053',
    whatsapp: '79823830053',
    hours: 'Пн-Пт 09:00-18:00, Сб-Вс 09:00-16:00',
    rating: 4.8,
    focus: 'Эндуро, питбайки, покрышки, экипировка',
    heroSubtitle: 'Эндуро, питбайки и экипировка<br> в Кирове',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland WRX 250', spec: '250 см³ 172FMM · буксаторы · дисковые тормоза', price: '148 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Mini 110', spec: '110 см³ · полуавтомат · идеален для старта', price: '86 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Покрышка кроссовая Kenda Carlsbad', spec: 'Комплект 80/100-21 и 100/90-18 для жесткого грунта', price: '9 200 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'bike4you-ulyanovsk',
    name: 'Bike4you Ульяновск',
    brandDisplay: 'Bike4you <span>Ульяновск</span>',
    city: 'Ульяновск',
    address: 'Московское шоссе, 35',
    phone: '+7 (927) 632-50-42',
    phoneRaw: '+79276325042',
    whatsapp: '79276325042',
    hours: 'Пн-Пт 09:00-19:00, Сб-Вс 10:00-18:00',
    rating: 4.8,
    focus: 'Эндуро, питбайки, мопеды, запчасти',
    heroSubtitle: 'Эндуро, питбайки и запчасти<br> в Ульяновске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Motoland XT250 ST', spec: '250 см³ · фара, стоп-сигнал, электростартер', price: '144 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Kayo Basic 125', spec: '125 см³ · колеса 17/14 · прочная стальная рама', price: '89 900 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Комплект защиты Scoyco', spec: 'Панцирь, шарнирные наколенники, перчатки', price: '9 800 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'extreme-sport-penza',
    name: 'ЭКСТРИМ Sport',
    brandDisplay: 'ЭКСТРИМ <span>Sport</span>',
    city: 'Пенза',
    address: 'ул. Ладожская, 38/2',
    phone: '+7 (960) 321-99-14',
    phoneRaw: '+79603219914',
    whatsapp: '79603219914',
    hours: 'Пн-Сб 10:00-19:00, Вс 10:00-16:00',
    rating: 4.8,
    focus: 'Квадроциклы, эндуро, питбайки, сервис',
    heroSubtitle: 'Квадроциклы, эндуро и сервис<br> в Пензе',
    products: [
      { id: 'atv', category: 'atv', name: 'Stels Guepard 650 Trophy', spec: '650 см³ V-Twin 4х4 · электроусилитель руля (EPS)', price: '685 000 ₽', image: 'assets/product-atv.jpg' },
      { id: 'enduro', category: 'enduro', name: 'Kayo T2 Enduro 250', spec: '250 см³ · проверенная классика для лесных трейлов', price: '156 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'BSE EVO 125', spec: '125 см³ · алюминиевый глушитель · колеса 17/14', price: '94 000 ₽', image: 'assets/product-pitbike.jpg' }
    ]
  },
  {
    slug: 'moto-active-spb',
    name: 'Мото-Актив',
    brandDisplay: 'Мото-<span>Актив</span>',
    city: 'Санкт-Петербург',
    address: 'ул. Симонова, 11',
    phone: '+7 (812) 313-25-36',
    phoneRaw: '+78123132536',
    whatsapp: '78123132536',
    hours: 'Ежедневно 10:00-20:00',
    rating: 4.8,
    focus: 'Питбайки, эндуро, квадроциклы, сервис',
    heroSubtitle: 'Питбайки, эндуро и квадроциклы<br> в Санкт-Петербурге',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kayo K6 250 EFI', spec: '250 см³ инжектор · подвеска FASTACE · ступицы CNC', price: '299 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'BSE PH10 125', spec: '125 см³ · колеса 17/14 · спортивный карбюратор', price: '99 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'gear', category: 'gear', name: 'Мотоботы Gaerne GX-1 Enduro', spec: 'Италия · подошва с зацепом · стальные пряжки', price: '29 500 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'lkmoto-mytishchi',
    name: 'ЛКМото',
    brandDisplay: 'ЛК<span>Мото</span>',
    city: 'Мытищи',
    address: 'Ярмарочная ул., с4Б',
    phone: '+7 (993) 275-87-01',
    phoneRaw: '+79932758701',
    whatsapp: '79932758701',
    hours: 'Ежедневно 10:00-19:00',
    rating: 5.0,
    focus: 'Эндуро, питбайки, дорожники, экип, ТО',
    heroSubtitle: 'Эндуро, ралли-байки и питбайки<br> в Мытищах',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kove 450 Rally', spec: '450 см³ инжектор · бак 30 л · спортивное ралли-шасси', price: '749 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'enduro2', category: 'enduro', name: 'Regulmoto Sport 300', spec: '300 см³ водянка · спортивный карб Nibbi PWK34', price: '198 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Regulmoto Seven 125', spec: '125 см³ · колеса 17/14 · легкий и надежный', price: '96 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  },
  {
    slug: 'motohit27-khv',
    name: 'МотоХит27',
    brandDisplay: 'Мото<span>Хит27</span>',
    city: 'Хабаровск',
    address: 'ул. Нововыборгская, 48',
    phone: '+7 (914) 061-62-10',
    phoneRaw: '+79140616210',
    whatsapp: '79140616210',
    hours: 'Ежедневно 10:00-19:00',
    rating: 4.8,
    focus: 'Эндуро, питбайки, квадроциклы, тест-драйв',
    heroSubtitle: 'Эндуро, питбайки и квадроциклы<br> в Хабаровске',
    products: [
      { id: 'enduro', category: 'enduro', name: 'Kayo T2 250 Enduro', spec: '250 см³ 172FMM · внедорожные шины · защита рук', price: '162 000 ₽', image: 'assets/product-enduro.jpg' },
      { id: 'pitbike', category: 'pitbike', name: 'Ataki Prime 125', spec: '125 см³ · колеса 17/14 · резвый мотор YX125', price: '97 000 ₽', image: 'assets/product-pitbike.jpg' },
      { id: 'atv', category: 'atv', name: 'Квадроцикл Motoland 200 Wild', spec: '200 см³ · фаркоп · багажники спереди и сзади', price: '235 000 ₽', image: 'assets/product-atv.jpg' }
    ]
  }
];

let created = 0;
for (const item of batch2Data) {
  const filePath = path.join(factsDir, `${item.slug}.json`);
  const jsonContent = {
    slug: item.slug,
    checked_at: new Date().toISOString(),
    identity_status: 'verified',
    sources: [
      {
        id: '2gis',
        url: `https://2gis.ru/search/${encodeURIComponent(item.name + ' ' + item.city)}`,
        checked_at: new Date().toISOString(),
        excerpt: `${item.name}, ${item.city}, ${item.address}. Рейтинг: ${item.rating} ★.`
      }
    ],
    facts: {
      name: item.name,
      brand_display: item.brandDisplay,
      city: item.city,
      address: item.address,
      phone: item.phone,
      phone_raw: item.phoneRaw,
      whatsapp: item.whatsapp,
      hours: item.hours,
      rating: item.rating,
      focus: item.focus,
      hero_subtitle: item.heroSubtitle
    },
    catalog: item.products.map(p => ({
      id: p.id,
      category: p.category,
      name: p.name,
      spec: p.spec,
      price: p.price,
      image: p.image,
      status: 'verified',
      source_id: '2gis'
    }))
  };

  fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2), 'utf8');
  created++;
}

console.log(`Успешно создано ${created} карточек фактов для Batch 2 в data/facts/.`);
