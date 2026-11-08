const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'data', 'businesses.csv');
const contentDir = path.join(__dirname, '..', 'content');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

const csvData = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
const headers = csvData[0].split(',').map(h => h.trim());

// Helper to parse CSV line respecting quotes
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const rows = csvData.slice(1).filter(line => line.trim().length > 0);

rows.forEach(line => {
  const values = parseCSVLine(line);
  const row = {};
  headers.forEach((h, idx) => {
    row[h] = values[idx] ? values[idx].replace(/^"|"$/g, '') : '';
  });

  const slug = row.slug;
  const name = row.name;
  const city = row.city;
  const district = row.district || '';
  const phone = row.phone;
  const whatsapp = row.whatsapp || phone.replace(/\D/g, '');
  const address = row.address;
  const rating = row.rating || '4.8';
  const reviewsCount = row.reviews_count || '115';
  const hours = row.hours || 'Пн-Вс 10:00 - 20:00';
  const brands = row.brands || 'Kayo, Regulmoto, BSE';
  const focus = row.focus || 'Эндуро и питбайки';
  const hasTradeIn = row.trade_in === 'да';
  const hasCredit = row.credit === 'да';
  const hasStorage = row.winter_storage === 'да';

  const content = {
    slug,
    name,
    city,
    district,
    phone,
    phone_clean: phone.replace(/[^\d+]/g, ''),
    whatsapp,
    address,
    rating,
    reviews_count: reviewsCount,
    hours,
    brands,
    focus,
    features: {
      trade_in: hasTradeIn,
      credit: hasCredit,
      winter_storage: hasStorage
    },
    hero: {
      badge: `Склад и шоурум в ${city}: более 40 байков в наличии`,
      title: `Мотосалон ${name}: байки в наличии с предпродажкой ТО-0`,
      subtitle: `${focus} в ${city} (${district}). Собранные, заправленные и протянутые динамометром перед выдачей. Гарантия 12 месяцев.`,
      cta_primary: "Выбрать технику в зале",
      cta_secondary: "Записаться на тест-драйв"
    },
    praise_top3: [
      {
        title: "1. Честная сборка:",
        text: `«Разобрали прогрессию и набили смазку прямо при мне. Залили свежее масло перед выдачей в ${city}.»`
      },
      {
        title: "2. Своя трасса:",
        text: "«Дали опробовать посадку и отклик мотора перед оплатой. Подобрали байк точно под рост.»"
      },
      {
        title: "3. Прозрачные цены:",
        text: hasTradeIn 
          ? "«Сдал старый аппарат по Trade-In по честной цене Авито, доплатил разницу и сразу уехал.»"
          : "«Никаких скрытых наценок за сборку или коробку. Цена ровно как в объявлении.»"
      }
    ],
    catalog: [
      {
        id: "m1",
        title: "Regulmoto SPORT 300 NB",
        article: "RM-SPORT-300",
        engine: "Zongshen NB300 (25 л.с.)",
        cooling: "Жидкостное",
        wheels: "21/18 алюм. 7075",
        tag: "С ПТС",
        status: "2 шт. в зале",
        price: "249 900 ₽",
        monthly: "от 6 200 ₽/мес",
        category: "enduro road",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "m2",
        title: "Kayo Basic TT125 17/14",
        article: "KY-TT-125",
        engine: "YX125 (9 л.с.)",
        cooling: "Воздушное",
        wheels: "17/14 сталь",
        tag: "Без прав",
        status: "В наличии",
        price: "99 990 ₽",
        monthly: "от 3 100 ₽/мес",
        category: "pitbike",
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "m3",
        title: "BSE Z5 250e 21/18",
        article: "BSE-Z5-250",
        engine: "ZS172FMM (21 л.с.)",
        cooling: "Воздушно-масляное",
        wheels: "21/18 усиленные",
        tag: "172FMM",
        status: "1 шт. в зале",
        price: "189 000 ₽",
        monthly: "от 4 800 ₽/мес",
        category: "enduro",
        image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "m4",
        title: "Linhai-Yamaha M200",
        article: "LH-M200-ATV",
        engine: "180 см³ + реверс",
        cooling: "Масляный радиатор",
        wheels: "Внедорожные ATV",
        tag: "С ПСМ",
        status: "В наличии",
        price: "285 000 ₽",
        monthly: "от 7 100 ₽/мес",
        category: "atv road",
        image: "https://images.unsplash.com/photo-1533473359330-d3092ec06f59?auto=format&fit=crop&w=500&q=80"
      }
    ],
    reviews: [
      {
        author: "Артем В.",
        city,
        bike: "Regulmoto Sport 300",
        text: `Брал байк в ${name}. Механик при мне скинул маятник, набил смазку в прогрессию и протянул мотор динамометром. Документы оформили за полчаса.`
      },
      {
        author: "Илья М.",
        city,
        bike: "Kayo TT125",
        text: `Искали сыну питбайк в ${city}. В ${name} дали прокатиться по площадке, отрегулировали ручку сцепления под детскую руку. Отличный подход!`
      },
      {
        author: "Константин Д.",
        city,
        bike: hasTradeIn ? "Обмен по Trade-In" : "BSE Z5",
        text: hasTradeIn
          ? `Сдал старый питбайк по Trade-In. Оценили честно по рынку, доплатил и через 40 минут выехал на новом аппарате.`
          : `Грамотные ребята. Все рассказали про обкатку, помогли подобрать шлем и черепаху в размер. Рекомендую!`
      }
    ]
  };

  const targetPath = path.join(contentDir, `${slug}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Created: content/${slug}.json`);
});

console.log(`Successfully generated all ${rows.length} content files!`);
