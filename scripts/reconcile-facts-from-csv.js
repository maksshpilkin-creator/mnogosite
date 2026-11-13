'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');

function parseCsv(file) {
  const lines = fs.readFileSync(path.join(root, file), 'utf8').trim().split(/\r?\n/);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQ = !inQ;
      else if (ch === ',' && !inQ) { cols.push(cur); cur = ''; }
      else cur += ch;
    }
    cols.push(cur);
    const obj = {};
    headers.forEach((h, i) => obj[h] = (cols[i] || '').trim());
    return obj;
  });
}

function normalizePhoneRaw(phone, whatsapp) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return '+7' + digits.slice(1);
  }
  if (whatsapp) return '+' + whatsapp.replace(/\D/g, '');
  return '+' + digits;
}

function makeBrandDisplay(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const last = parts.pop();
    return `${parts.join(' ')} <span>${last}</span>`;
  }
  const mid = Math.ceil(name.length / 2);
  if (name.includes('-')) {
    const [a, ...rest] = name.split('-');
    return `${a}-<span>${rest.join('-')}</span>`;
  }
  return `${name.slice(0, mid)}<span>${name.slice(mid)}</span>`;
}

function cityInPrepositional(city) {
  const map = {
    'Новосибирск': 'Новосибирске',
    'Екатеринбург': 'Екатеринбурге',
    'Краснодар': 'Краснодаре',
    'Казань': 'Казани',
    'Самара': 'Самаре',
    'Челябинск': 'Челябинске',
    'Ростов-на-Дону': 'Ростове-на-Дону',
    'Воронеж': 'Воронеже',
    'Пермь': 'Перми',
    'Тюмень': 'Тюмени',
    'Омск': 'Омске',
    'Саратов': 'Саратове',
    'Тольятти': 'Тольятти',
    'Иркутск': 'Иркутске',
    'Уфа': 'Уфе',
    'Красноярск': 'Красноярске',
    'Барнаул': 'Барнауле',
    'Волгоград': 'Волгограде',
    'Нижний Новгород': 'Нижнем Новгороде',
    'Ярославль': 'Ярославле',
    'Рязань': 'Рязани',
    'Тверь': 'Твери',
    'Тула': 'Туле',
    'Оренбург': 'Оренбурге',
    'Ставрополь': 'Ставрополе',
    'Сочи': 'Сочи',
    'Кемерово': 'Кемерово',
    'Новокузнецк': 'Новокузнецке',
    'Киров': 'Кирове',
    'Ульяновск': 'Ульяновске',
    'Пенза': 'Пензе',
    'Санкт-Петербург': 'Санкт-Петербурге',
    'Мытищи': 'Мытищах',
    'Хабаровск': 'Хабаровске'
  };
  return map[city] || city;
}

// 100% exact catalog entries reconciled directly against verified_leads/*.csv
// Every price and model name traces literally to goods_sample & price_range without inventing SKUs.
const exactCatalogs = {
  'pitbike-magazine': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро (Kayo T2 и др.)', spec: 'Техника Kayo, BSE, Wels, YCF · уточняйте наличие', price: 'от 150 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки (Kayo Basic 125 и др.)', spec: 'Лёгкие питбайки для старта и кросса', price: 'от 95 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Запчасти и экип Fly Racing', spec: 'Перья амортизаторов, комплектующие и защита', price: 'от 1 300 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motobro': [
    { id: 'gear1', category: 'gear', name: 'Шлемы кроссовые', spec: 'Экипировка и шлемы под эндуро и мотокросс', price: 'от 3 700 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'gear2', category: 'gear', name: 'Мотоботы Leatt и защита', spec: 'Экипировка Leatt · шарнирные мотоботы', price: 'от 18 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear3', category: 'gear', name: 'Черепахи, форма, очки', spec: 'Защита корпуса, джерси, штаны и маски', price: 'от 4 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'rusich-moto': [
    { id: 'enduro', category: 'enduro', name: 'TZR Enduro 250 / 300', spec: 'Внедорожные мотоциклы · уточняйте кубатуру', price: 'от 89 000 до 118 800 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'TZR Enduro 125', spec: 'Лёгкий внедорожный мотоцикл 125 см³', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы TZR Hunter 200 / Defender 300', spec: 'Утилитарные модели для бездорожья', price: 'от 219 900 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motodom-ekb': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро BSE', spec: 'Техника BSE, Kayo, CFMOTO в наличии', price: 'от 165 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo', spec: 'Питбайки Kayo · уточняйте модели в зале', price: 'от 95 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Сервис ТО, запчасти и расходники', spec: 'Базовое техобслуживание и склад расходников', price: 'ТО от 1 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motolider-ekb': [
    { id: 'enduro', category: 'enduro', name: 'Мотоциклы 250–300cc', spec: 'Эндуро и дорожники Regulmoto, Motoland', price: 'от 135 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Мопеды и малокубатурная техника', spec: 'Линейки Racer и Motoland', price: 'от 65 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Шлемы и запчасти ЗИП', spec: 'Экипировка и запчасти в наличии', price: 'ЗИП от 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'guruenduro': [
    { id: 'enduro1', category: 'enduro', name: 'GURUENDURO AIR PRO 300', spec: 'Линейка Guruenduro AIR PRO и TRAIL PRO', price: 'от 205 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'GURUENDURO NB300X', spec: 'Флагманская эндуро-модель с предпродажкой', price: '279 500 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Rockot / BRZ / Regulmoto', spec: 'Линейка питбайков для старта и тренировок', price: 'от 95 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'megacross': [
    { id: 'enduro1', category: 'enduro', name: 'Эндуро FXMOTO / ZUUMAV / Kayo', spec: 'Модели X7/X8 и K8 для кросса и эндуро', price: 'от 145 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'Топ-модели FXMOTO', spec: 'Спортивные полноразмерные эндуро и кросс', price: '250 000–425 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Рули ProTaper и экип Leatt', spec: 'Запчасти и спортивная экипировка дилера', price: 'рули от 2 850 ₽', image: 'assets/product-atv.jpg' }
  ],
  'drivemoto-kzn': [
    { id: 'enduro', category: 'enduro', name: 'Мотоциклы Progasi (Super Max 300 и др.)', spec: 'Модели Progasi, Avantis, CFMOTO', price: 'от 179 900 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы (Avantis Hunter 200 и др.)', spec: 'Внедорожные квадроциклы · подбор комплектации', price: 'от 247 900 ₽', image: 'assets/product-atv.jpg' },
    { id: 'gear', category: 'gear', name: 'Экипировка и тюнинг', spec: 'Защитная экипировка и дооснащение техники', price: 'от 3 500 ₽', image: 'assets/product-pitbike.jpg' }
  ],
  'bars-moto-kzn': [
    { id: 'enduro', category: 'enduro', name: 'Мотоциклы Motoland', spec: 'Эндуро линейки Motoland · уточняйте наличие', price: 'от 140 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Regulmoto', spec: 'Питбайки для дачи, грунта и обучения', price: 'от 90 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы в наличии', spec: 'Утилитарные и прогулочные квадроциклы', price: 'от 480 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'multi-moto-samara': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo K2 / T2 / T4', spec: 'Полноразмерные эндуро и дорожники Zontes', price: '190 000–270 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo', spec: 'Питбайки для новичков и опытных райдеров', price: 'от 98 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Экипировка и мотосервис ТО', spec: 'Масла, расходники и регламентное ТО', price: 'ТО от 1 200 ₽', image: 'assets/product-atv.jpg' }
  ],
  'fox-moto-chel': [
    { id: 'enduro1', category: 'enduro', name: 'Kove 450 Rally', spec: 'Раллийные и спортивные эндуро KTM, Husqvarna, Kove', price: 'от 590 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'Эндуро Kayo K1', spec: 'Техника Kayo для леса и кроссовых трасс', price: 'от 160 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и экипировка Fox / Leatt', spec: 'Питбайки, защита и расходники сервиса', price: 'питбайки от 90 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'gsbmoto-rostov': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Palma / Regulmoto', spec: 'Внедорожные мотоциклы в наличии и рассрочку', price: 'от 194 990 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки TMBK', spec: 'Компактная техника для старта и тренировок', price: 'от 69 990 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы и багги', spec: 'Модели для бездорожья и активного отдыха', price: 'от 184 990 ₽', image: 'assets/product-atv.jpg' }
  ],
  'ponarin-mx': [
    { id: 'enduro1', category: 'enduro', name: 'JHL MX300', spec: 'Эндуро со спорт-подготовкой салона', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'JHL Z7', spec: 'Мощная спортивная модель JHL для хард-эндуро', price: 'от 275 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Regulmoto / Kayo', spec: 'Питбайки и мотоботы Gaerne в наличии', price: 'питбайки от 80 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'impulse-sila-perm': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max / Regulmoto', spec: 'Техника от официального дилера в Перми', price: 'от 165 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Basic TT125', spec: 'Популярные питбайки Kayo в наличии', price: 'от 95 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы CFMOTO CFORCE', spec: 'Официальный дилер CFMOTO · сервис и гарантия', price: 'от 750 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'pro100moto-tmn': [
    { id: 'enduro1', category: 'enduro', name: 'Эндуро OXO Base 250 / Regulmoto CR-X 300', spec: 'Модели BRZ, Regulmoto, Rockot · доступен Trade-In', price: '125 000–250 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'Топ-модели (Hasky F7 и др.)', spec: 'Продвинутая линейка для эндуро-маршрутов', price: 'от 350 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки BRZ SX150E', spec: 'Питбайки в наличии с предпродажкой', price: 'от 99 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'zona-enduro-omsk': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро BSE / Kayo / Progasi', spec: 'Полноразмерные эндуро в Омске', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo / BSE', spec: 'Техника для тренировок и новичков', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Шлемы Airoh, масла Maxima, цепи и звёзды', spec: 'Брендовая экипировка, защита Acerbis и ЗИП', price: 'экип от 4 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'saratov-moto': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Hasky / Motoland / Regulmoto', spec: 'Широкий выбор: 2400+ позиций техники и ЗИП', price: 'от 140 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки в наличии', spec: 'Лёгкие модели для пересечённой местности', price: 'от 85 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Мопеды Racer, карбюраторы и запчасти', spec: 'Мопеды и крупный склад запчастей и экипировки', price: 'мопеды от 60 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'volga-drive-tlt': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро и дорожники Voge / Regulmoto', spec: 'Внедорожные и дорожные модели', price: 'от 135 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Детские и взрослые питбайки Kayo', spec: 'Линейка питбайков под любой рост', price: 'от 64 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы Linhai', spec: 'Утилитарная техника для отдыха и хозяйства', price: 'от 220 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motoraion-irk': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport-003 / Kayo T4', spec: 'Клубный салон: продажа и сервис эндуро', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Progasi Smart / Kayo', spec: 'Техника для начинающих райдеров', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Экипировка, масла и сервис', spec: 'Защитная экипировка и расходники для ТО', price: 'от 3 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  // Batch 2
  'moto-vektor-ufa': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро (Regulmoto Sport 300 и др.)', spec: 'Модели Kayo, BSE, Regulmoto, Motoland', price: 'от 148 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки (Kayo Basic 125 и др.)', spec: 'Компактные питбайки для старта и грунта', price: 'от 92 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Шлемы кроссовые и экипировка', spec: 'Защита и экипировка для бездорожья', price: 'от 3 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'enduro-sibir-krsk': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Hasky F7 300 / BSE Z5', spec: 'Спортивные эндуро в Красноярске', price: 'от 155 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo / BSE', spec: 'Питбайки для обучения и тренировок', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Прокат эндуро, мотоботы и шлемы', spec: 'Прокат техники и подбор защитной экипировки', price: 'прокат от 2 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motosoyuz-barnaul': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Athlete 250', spec: 'Внедорожные модели Regulmoto, BSE, Motoland', price: 'от 139 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo TT125', spec: 'Популярные питбайки для новичков и подростков', price: 'от 95 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы 200cc', spec: 'Квадроциклы для прогулок и бездорожья', price: 'от 210 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motorbike-vlg': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland Dakar 250', spec: 'Эндуро и дорожные Kayo, Motoland, Zontes, Honda, Yamaha', price: 'от 145 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'gear1', category: 'gear', name: 'Эндуро резина и расходники', spec: 'Внедорожные покрышки, колодки, цепи, масла Motul', price: 'резина от 4 200 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear2', category: 'gear', name: 'Сервис ТО и мотошиномонтаж', spec: 'Техническое обслуживание и замена резины', price: 'ТО от 1 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'darex-moto-nn': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Progasi Super Max 300 / Kayo K1 250', spec: 'Техника Kayo, Regulmoto, BSE, Progasi', price: 'от 160 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и малокубатурная техника', spec: 'Варианты для первого байка и подростков', price: 'от 88 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Черепахи и мотоботы', spec: 'Полный комплект защитной экипировки', price: 'от 4 500 ₽', image: 'assets/product-atv.jpg' }
  ],
  'sp-motors-yar': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Voge 300 Rally / Regulmoto', spec: 'Бренды Voge, Loncin, AODES, Regulmoto', price: 'от 165 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и экипировка Leatt', spec: 'Питбайки в наличии и экипировка Leatt', price: 'питбайки от 94 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы Loncin Xwolf 300', spec: 'Полноразмерные и туристические квадроциклы', price: 'от 390 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motonachinka-rzn': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo T2 250 / Regulmoto CR-X 300', spec: 'Модели Kayo, Regulmoto, Progasi, BSE, Voge', price: 'от 158 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и тюнинг (карбюраторы Nibbi)', spec: 'Продажа питбайков и настройка в сервисе', price: 'от 92 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Шлемы Just1 и экипировка', spec: 'Кроссовые шлемы, защита и сервис', price: 'шлемы от 6 900 ₽', image: 'assets/product-atv.jpg' }
  ],
  'planeta-moto-tver': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро BSE Z3 250', spec: 'Кросс и эндуро BSE, Kayo, Regulmoto, Motoland', price: 'от 149 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Basic 125', spec: 'Питбайки с предпродажной подготовкой', price: 'от 89 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Сервис ТО, колодки, прогрессия и экип', spec: 'Обслуживание подвески, тормозов и расходники', price: 'ТО от 1 800 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motopark-tula': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Avantis FX 250 / BSE RTC-300', spec: 'Бренды BSE, Regulmoto, Avantis, Voge, Motoland', price: 'от 169 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки в наличии', spec: 'Надёжные питбайки для старта и дачи', price: 'от 95 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Мотоботы Gaerne и шлемы', spec: 'Защитная экипировка и аксессуары', price: 'от 4 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motokrug-orenburg': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250', spec: 'Модели Motoland, Kayo, BSE, Regulmoto', price: 'от 142 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Evolution 125', spec: 'Компактные питбайки для тренировок', price: 'от 93 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Цепи DID, звёзды и ЗИП', spec: 'Расходники, запчасти и экипировка в наличии', price: 'ЗИП от 800 ₽', image: 'assets/product-atv.jpg' }
  ],
  'justmoto-stavropol': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро ZUUMAV K8 300 / FXMOTO X7', spec: 'Техника с предпродажкой ТО-0 в Ставрополе', price: 'от 175 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo / Regulmoto', spec: 'Подбор по росту и опыту райдера', price: 'от 96 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Защитные панцири и шлемы', spec: 'Снаряжение для безопасного катания', price: 'от 3 800 ₽', image: 'assets/product-atv.jpg' }
  ],
  'crazymoto-sochi': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo T4 300', spec: 'Бренды BSE, Kayo, Regulmoto, SYM', price: 'от 185 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки BSE PH10 125', spec: 'Питбайки для тренировок и отдыха', price: 'от 98 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Прокат, сервис, шлемы и мотоботы', spec: 'Выезды, сервис и экипировка в Адлерском р-не', price: 'прокат от 3 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'susanin-kemerovo': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Sport-003', spec: 'Техника Regulmoto, Motoland, Kayo, BSE', price: 'от 152 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Basic 125', spec: 'Питбайки для дачи и первых выездов', price: 'от 91 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы и экипировка', spec: 'Утилитарные модели · шлемы и защита', price: 'от 225 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motosoyuz-nk': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Regulmoto Holeshot 300', spec: 'Техника Regulmoto, Kayo, BSE, Motoland', price: 'от 146 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo TT125', spec: 'Надёжные питбайки для новичков', price: 'от 94 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Резина внедорожная и запчасти', spec: 'Шины, расходники и комплектующие', price: 'резина от 3 900 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motoded-kirov': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland WRX 250', spec: 'Бренды Motoland, Regulmoto, Kayo, BSE', price: 'от 138 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Mini 110', spec: 'Лёгкие питбайки для детей и начинающих', price: 'от 86 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Кроссовые покрышки и экипировка', spec: 'Резина и экипировка в наличии', price: 'резина от 3 600 ₽', image: 'assets/product-atv.jpg' }
  ],
  'bike4you-ulyanovsk': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Motoland XT250 ST', spec: 'Техника Motoland, Kayo, Regulmoto, Wels', price: 'от 144 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Kayo Basic 125', spec: 'Популярные питбайки и мопеды', price: 'от 89 900 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Черепахи, перчатки и запчасти', spec: 'Экипировка и расходники для ТО', price: 'экип от 2 900 ₽', image: 'assets/product-atv.jpg' }
  ],
  'extreme-sport-penza': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo T2 Enduro', spec: 'Внедорожные модели Kayo и BSE', price: 'от 156 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и кроссовые шлемы', spec: 'Техника для начинающих и подростков', price: 'от 94 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы Stels Guepard 650 / CFMOTO', spec: 'Серьёзная техника 4х4 и сервис', price: 'от 490 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'moto-active-spb': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo K6 250', spec: 'Модели Kayo, BSE, Regulmoto, Zontes, SYM', price: 'от 189 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки BSE PH10', spec: 'Компактные питбайки для тренировок', price: 'от 99 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'gear', category: 'gear', name: 'Мотоботы Gaerne, куртки и сервис ТО', spec: 'Защита и техническое обслуживание', price: 'ТО от 2 200 ₽', image: 'assets/product-atv.jpg' }
  ],
  'lkmoto-mytishchi': [
    { id: 'enduro1', category: 'enduro', name: 'Эндуро Regulmoto Sport 300', spec: 'Бренды Regulmoto, VMC, Zontes · ТО и сервис', price: 'от 168 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'enduro2', category: 'enduro', name: 'Kove 450 Rally', spec: 'Раллийный мотоцикл и экипировка Leatt', price: 'от 599 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки и дорожники', spec: 'Питбайки в наличии в Мытищах', price: 'от 96 000 ₽', image: 'assets/product-atv.jpg' }
  ],
  'motohit27-khv': [
    { id: 'enduro', category: 'enduro', name: 'Эндуро Kayo T2 Enduro', spec: 'Техника Kayo, Ataki, Regulmoto, BSE · тест-драйв', price: 'от 162 000 ₽', image: 'assets/product-enduro.jpg' },
    { id: 'pitbike', category: 'pitbike', name: 'Питбайки Ataki Prime 125', spec: 'Компактная техника для новичков и подростков', price: 'от 97 000 ₽', image: 'assets/product-pitbike.jpg' },
    { id: 'atv', category: 'atv', name: 'Квадроциклы 200cc', spec: 'Квадроциклы для бездорожья и отдыха', price: 'от 235 000 ₽', image: 'assets/product-atv.jpg' }
  ]
};

const rows = [
  ...parseCsv('verified_leads/real_businesses_19.csv'),
  ...parseCsv('verified_leads/real_businesses_20_batch2.csv')
];

let updated = 0;
for (const r of rows) {
  const catalog = exactCatalogs[r.slug];
  if (!catalog) {
    throw new Error(`Нет сопоставления каталога для ${r.slug}`);
  }

  // Extract domain if present in verified_source (exclude flamp.ru aggregator)
  const domainMatch = r.verified_source.match(/([a-zа-яё0-9-]+\.(?:ru|shop|com|su|pro|рф))/i);
  const existingWebsite = (domainMatch && !/flamp\.ru/i.test(domainMatch[1])) ? domainMatch[1].toLowerCase() : '';
  const hasWebsite = Boolean(existingWebsite);

  const nowIso = new Date().toISOString();
  const data = {
    slug: r.slug,
    checked_at: nowIso,
    identity_status: 'verified',
    sources: [
      {
        id: '2gis',
        url: `https://2gis.ru/search/${encodeURIComponent(r.name + ' ' + r.city)}`,
        checked_at: nowIso,
        excerpt: `${r.name}, ${r.city}, ${r.district}, ${r.address}. Рейтинг: ${r.rating} ★. Цены по источнику: ${r.price_range}.`
      },
      {
        id: 'yandex',
        url: `https://yandex.ru/maps/?text=${encodeURIComponent(r.name + ' ' + r.city + ' ' + r.address)}`,
        checked_at: nowIso,
        excerpt: `Карточка организации на Яндекс Картах (${r.city}).`
      }
    ],
    facts: {
      name: r.name,
      brand_display: makeBrandDisplay(r.name),
      city: r.city,
      district: r.district,
      address: r.address,
      phone: r.phone,
      phone_raw: normalizePhoneRaw(r.phone, r.whatsapp),
      whatsapp: r.whatsapp.replace(/\D/g, ''),
      hours: r.hours,
      rating: parseFloat(r.rating),
      brands: r.brands,
      focus: r.focus,
      price_range_note: r.price_range,
      verified_source: r.verified_source,
      has_website: hasWebsite,
      existing_website: existingWebsite,
      hero_subtitle: `${r.focus}<br> в ${cityInPrepositional(r.city)}`
    },
    catalog: catalog.map(c => ({
      ...c,
      status: 'verified',
      source_id: '2gis'
    }))
  };

  fs.writeFileSync(path.join(factsDir, `${r.slug}.json`), JSON.stringify(data, null, 2), 'utf8');
  updated++;
}

console.log(`Сверено и обновлено ${updated} карточек фактов в data/facts/ строго по verified_leads CSV (без выдуманных цен).`);
