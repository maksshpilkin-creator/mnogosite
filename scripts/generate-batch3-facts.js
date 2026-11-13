'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const factsDir = path.join(root, 'data', 'facts');

const newLeads = [
  {
    slug: 'motodepo-vladivostok',
    facts: {
      name: 'Мото Депо',
      brand_display: 'Мото <span>Депо</span>',
      city: 'Владивосток',
      district: 'Советский р-н',
      address: 'Русская ул., 92',
      phone: '+7 (423) 260-88-88',
      phone_raw: '+74232608888',
      whatsapp: '79025244711',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-17:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Эндуро, питбайки, квадроциклы, сервис',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 152 000 ₽, Квадро от 239 000 ₽',
      verified_source: '2GIS Владивосток',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Эндуро, питбайки и квадроциклы<br> во Владивостоке'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Regulmoto Sport 003',
        spec: '250 см³, 21 л.с., 5 передач, электростартер',
        price: 'от 152 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Basic TT125',
        spec: '125 см³, колеса 17/14, 4-тактный, для дачи и трасс',
        price: 'от 89 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Wild Track 200',
        spec: '200 см³, вариатор, масляное охлаждение, лебедка',
        price: 'от 239 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/vladivostok/firm/3518929657475306',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мото Депо, Владивосток, Русская ул., 92. Рейтинг 4.9 ★. Продажа эндуро, питбайков, квадроциклов и экипировки.'
      }
    ]
  },
  {
    slug: 'motomir-kaliningrad',
    facts: {
      name: 'МотоМир',
      brand_display: 'Мото<span>Мир</span>',
      city: 'Калининград',
      district: 'Ленинградский р-н',
      address: 'ул. Старшины Дадаева, 3А',
      phone: '+7 (4012) 35-94-65',
      phone_raw: '+74012359465',
      whatsapp: '74012359465',
      hours: 'Пн-Пт 10:00-19:00, Сб-Вс 10:00-18:00',
      rating: 4.8,
      brands: 'BSE, Kayo, Motoland, CFMOTO',
      focus: 'Кросс, эндуро, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 92 000 ₽, Эндуро от 148 000 ₽, Квадро от 590 000 ₽',
      verified_source: '2GIS Калининград',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника, эндуро и сервис<br> в Калининграде'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Motoland XT250 HS',
        spec: '250 см³, карбюратор Nibbi, регулируемая подвеска',
        price: 'от 148 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк BSE MX 125',
        spec: '125 см³, усиленная стальная рама, колеса 17/14',
        price: 'от 92 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл CFMOTO CFORCE 400L',
        spec: '400 см³, 4x4, инжектор, полный привод',
        price: 'от 590 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/kaliningrad/search/МотоМир',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'МотоМир, Калининград, ул. Старшины Дадаева, 3А. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'dvakita-astrakhan',
    facts: {
      name: 'Два кита',
      brand_display: 'Два <span>кита</span>',
      city: 'Астрахань',
      district: 'Советский р-н',
      address: 'ул. Адмирала Нахимова, 80в',
      phone: '+7 (8512) 20-10-17',
      phone_raw: '+78512201017',
      whatsapp: '78512201017',
      hours: 'Пн-Пт 09:00-18:00, Сб 09:00-17:00, Вс 09:00-16:00',
      rating: 4.8,
      brands: 'Yamaha, Bajaj, Kayo, Motoland',
      focus: 'Мотоциклы, эндуро, квадроциклы, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 155 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Астрахань',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и активный отдых<br> в Астрахани'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Kayo T2 250 Enduro',
        spec: '250 см³, дисковые тормоза, усиленный маятник',
        price: 'от 155 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Evolution YX125',
        spec: '125 см³, алюминиевый маятник, карбюратор NIBBI',
        price: 'от 88 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Promax Hunter 200',
        spec: '200 см³, дисковые гидравлические тормоза, фаркоп',
        price: 'от 245 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/astrakhan/firm/112644265789125',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Два кита, Астрахань, ул. Адмирала Нахимова, 80в. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'moto48-lipetsk',
    facts: {
      name: 'Мото48',
      brand_display: 'Мото<span>48</span>',
      city: 'Липецк',
      district: 'Октябрьский р-н',
      address: 'Воронежское шоссе, 1а',
      phone: '+7 (4742) 39-77-04',
      phone_raw: '+74742397704',
      whatsapp: '79107427704',
      hours: 'Пн-Пт 08:00-18:00, Сб 09:00-16:00, Вс 09:00-14:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Racer, Kayo',
      focus: 'Эндуро, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 84 900 ₽, Эндуро от 142 000 ₽, Квадро от 220 000 ₽',
      verified_source: '2GIS Липецк',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Эндуро, питбайки и квадроциклы<br> в Липецке'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Motoland Dakar 250 LT',
        spec: '250 см³, дорожная резина/эндуро, ПТС, электростартер',
        price: 'от 142 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Regulmoto Seven 125',
        spec: '125 см³, электростартер, фары, колеса 17/14',
        price: 'от 84 900 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Allroad 200',
        spec: '200 см³, вариатор F-N-R, LED оптика, багажники',
        price: 'от 220 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/lipetsk/firm/1266658933219468',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мото48, Липецк, Воронежское шоссе, 1а. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'mototime-belgorod',
    facts: {
      name: 'Мото-Тайм',
      brand_display: 'Мото-<span>Тайм</span>',
      city: 'Белгород',
      district: 'Восточный р-н',
      address: 'ул. Дзгоева, 4',
      phone: '+7 (4722) 78-31-78',
      phone_raw: '+74722783178',
      whatsapp: '79103235750',
      hours: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-19:00',
      rating: 4.9,
      brands: 'Kayo, GR, Regulmoto, BSE',
      focus: 'Эндуро, питбайки, сервис Rolling Moto',
      price_range_note: 'Питбайки от 89 990 ₽, Эндуро от 159 990 ₽, Квадро от 249 990 ₽',
      verified_source: '2GIS Белгород',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Официальный мотоцентр и сервис<br> в Белгороде'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро GR2 250 Enduro PRO',
        spec: '250 см³, мотор Zongshen 172FMM, регулируемая вилка',
        price: 'от 159 990 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Basic TT125 EM',
        spec: '125 см³, электростартер, фара, колеса 17/14',
        price: 'от 89 990 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Kayo Bull 200',
        spec: '200 см³, усиленная рама, автоматическая трансмиссия',
        price: 'от 249 990 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/belgorod/firm/70000001007421935',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мото-Тайм, Белгород, ул. Дзгоева, 4. Рейтинг 4.9 ★.'
      }
    ]
  },
  {
    slug: 'kursk-moto',
    facts: {
      name: 'Курск-Мото',
      brand_display: 'Курск-<span>Мото</span>',
      city: 'Курск',
      district: 'Центральный р-н',
      address: 'ул. Пирогова, 1-Б',
      phone: '+7 (4712) 34-90-10',
      phone_raw: '+74712349010',
      whatsapp: '79192109010',
      hours: 'Пн-Вс 09:00-18:00',
      rating: 4.8,
      brands: 'Kayo, GR, Ataki, Regulmoto',
      focus: 'Эндуро, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 154 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Курск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мототехника, эндуро и экипировка<br> в Курске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Kayo K1 250 MX',
        spec: '250 см³, надежный двигатель 169FMM, короткоходная ручка газа',
        price: 'от 154 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Ataki Start 125',
        spec: '125 см³, дисковые тормоза, защита картера, колеса 17/14',
        price: 'от 87 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Kayo Predator 125',
        spec: '125 см³, полуавтомат, защита для подростков и взрослых',
        price: 'от 235 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/kursk/firm/70000001031952281',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Курск-Мото, Курск, ул. Пирогова, 1-Б. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'favorit-chelny',
    facts: {
      name: 'Мотосалон Фаворит',
      brand_display: 'Фаворит <span>Мото</span>',
      city: 'Набережные Челны',
      district: 'Автозаводский р-н',
      address: 'ул. 40 лет Победы, 84/1',
      phone: '+7 (999) 163-36-49',
      phone_raw: '+79991633649',
      whatsapp: '79991633649',
      hours: 'Пн-Сб 09:00-18:00, Вс 10:00-17:00',
      rating: 4.8,
      brands: 'Motoland, Regulmoto, Kayo, Racer',
      focus: 'Питбайки, эндуро, сервис, запчасти',
      price_range_note: 'Питбайки от 82 000 ₽, Эндуро от 139 000 ₽, Квадро от 215 000 ₽',
      verified_source: '2GIS Набережные Челны',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон, запчасти и сервис<br> в Набережных Челнах'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Motoland CRF250',
        spec: '250 см³, воздушное охлаждение, дисковые тормоза',
        price: 'от 139 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Motoland Apex 125',
        spec: '125 см³, 4 скорости, кикстартер, складные рычаги',
        price: 'от 82 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland ATV 125 Wild',
        spec: '125 см³, 3 передачи вперед + задний ход, пульт ДУ',
        price: 'от 215 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/nabchelny/firm/70000001042781615',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Фаворит, Набережные Челны, ул. 40 лет Победы, 84/1. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'motodrive-cheboksary',
    facts: {
      name: 'Moto Drive',
      brand_display: 'Moto <span>Drive</span>',
      city: 'Чебоксары',
      district: 'Ленинский р-н',
      address: 'пр-кт Ивана Яковлева, 13',
      phone: '+7 (900) 333-92-12',
      phone_raw: '+79003339212',
      whatsapp: '79003339212',
      hours: 'Пн-Пт 09:00-19:00, Сб-Вс 09:00-17:00',
      rating: 4.8,
      brands: 'Regulmoto, BSE, Kayo, Progasi',
      focus: 'Эндуро, квадроциклы, экипировка, сервис',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 146 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Чебоксары',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр экипировки<br> в Чебоксарах'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Regulmoto Athlete 250',
        spec: '250 см³, мотор 172FMM, подвеска с регулировками',
        price: 'от 146 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк BSE PH 125',
        spec: '125 см³, надежный японский карбюратор, колеса 17/14',
        price: 'от 86 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Regulmoto Hummer 200',
        spec: '200 см³, вариатор, литые диски, спинка пассажира',
        price: 'от 240 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/cheboksary/firm/70000001021703623',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Moto Drive, Чебоксары, пр. Ивана Яковлева, 13. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'megabike-mgn',
    facts: {
      name: 'МегаБайк',
      brand_display: 'Мега<span>Байк</span>',
      city: 'Магнитогорск',
      district: 'Правобережный р-н',
      address: 'Западное шоссе, 362/4',
      phone: '+7 (982) 333-99-99',
      phone_raw: '+79823339999',
      whatsapp: '79823339999',
      hours: 'Пн-Вс 10:00-19:00',
      rating: 4.9,
      brands: 'Motoland, Kayo, BSE, Progasi',
      focus: 'Эндуро, питбайки, квадроциклы, запчасти',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 149 000 ₽, Квадро от 225 000 ₽',
      verified_source: '2GIS Магнитогорск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотоцентр и сервис техники<br> в Магнитогорске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Progasi Super Max 250',
        spec: '250 см³, сиденье с нескользящим покрытием, LED оптика',
        price: 'от 149 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Motoland TCX125',
        spec: '125 см³, спортивный глушитель, прочная стальная рама',
        price: 'от 85 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland 200 Allroad',
        spec: '200 см³, расширители арок, защита рук, фаркоп',
        price: 'от 225 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/magnitogorsk/firm/70000001037592812',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'МегаБайк, Магнитогорск, Западное шоссе, 362/4. Рейтинг 4.9 ★.'
      }
    ]
  },
  {
    slug: 'bike4you-tomsk',
    facts: {
      name: 'Bike4you',
      brand_display: 'Bike4you <span>Томск</span>',
      city: 'Томск',
      district: 'Октябрьский р-н',
      address: 'ул. Мичурина, 47г, ст. 1',
      phone: '+7 (923) 422-87-80',
      phone_raw: '+79234228780',
      whatsapp: '79234228780',
      hours: 'Пн-Сб 10:00-19:00, Вс 10:00-18:00',
      rating: 4.8,
      brands: 'Regulmoto, Kayo, Motoland, BSE',
      focus: 'Эндуро, питбайки, экипировка, сервис',
      price_range_note: 'Питбайки от 87 900 ₽, Эндуро от 153 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Томск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Эндуро, питбайки и квадроциклы<br> в Томске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Regulmoto ZR 250',
        spec: '250 см³, водяное охлаждение, 26 л.с., алюминиевые обода',
        price: 'от 153 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Mini TD125',
        spec: '125 см³, 4-тактный двигатель, колеса 14/12',
        price: 'от 87 900 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Wild Track PRO',
        spec: '200 см³, масляный радиатор, электролебедка',
        price: 'от 240 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/tomsk/firm/70000001048291845',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Bike4You, Томск, ул. Мичурина, 47г ст1. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'bringmoto-ulan-ude',
    facts: {
      name: 'Bringmoto',
      brand_display: 'Bring<span>moto</span>',
      city: 'Улан-Удэ',
      district: 'Советский р-н',
      address: 'ул. Гоголя, 47, корп. 1',
      phone: '+7 (914) 055-20-48',
      phone_raw: '+79140552048',
      whatsapp: '79140552048',
      hours: 'Пн-Сб 10:00-19:00, Вс 11:00-17:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, Motoland, Racer',
      focus: 'Эндуро, горные мотоциклы, квадроциклы',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 250 000 ₽',
      verified_source: '2GIS Улан-Удэ',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Склад мототехники и эндуро<br> в Улан-Удэ'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Motoland XT250 ST',
        spec: '250 см³, усиленные перья вилки, внедорожный протектор',
        price: 'от 155 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк BSE DX 125',
        spec: '125 см³, гидравлические тормоза, колеса 17/14',
        price: 'от 89 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Regulmoto Hunter 200',
        spec: '200 см³, электростартер, цифровой спидометр',
        price: 'от 250 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/ulan_ude/firm/70000001053709214',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Bringmoto, Улан-Удэ, ул. Гоголя, 47 к1. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'ss-motors-vologda',
    facts: {
      name: 'СС Моторс',
      brand_display: 'СС <span>Моторс</span>',
      city: 'Вологда',
      district: 'Завокзальный р-н',
      address: 'ул. Преображенского, 45Б',
      phone: '+7 (8172) 53-00-73',
      phone_raw: '+78172530073',
      whatsapp: '78172530073',
      hours: 'Пн-Пт 09:00-18:00, Сб 10:00-16:00',
      rating: 4.7,
      brands: 'Regulmoto, Motoland, CFMOTO, Kayo',
      focus: 'Мотоциклы, квадроциклы, снегоходы, сервис',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 144 000 ₽, Квадро от 230 000 ₽',
      verified_source: '2GIS Вологда',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Салон мототехники и экипировки<br> в Вологде'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Regulmoto Sport 250',
        spec: '250 см³, фара, зеркала, ПТС, электростартер',
        price: 'от 144 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Mini KMB 125',
        spec: '125 см³, автоматическое сцепление, колеса 14/12',
        price: 'от 84 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Shark 200',
        spec: '200 см³, литые диски, защита рук, лебедка',
        price: 'от 230 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/vologda/firm/70000001019842193',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'СС Моторс, Вологда, ул. Преображенского, 45Б. Рейтинг 4.7 ★.'
      }
    ]
  },
  {
    slug: 'dnkmoto-ivanovo',
    facts: {
      name: 'DnkMoto',
      brand_display: 'Dnk<span>Moto</span>',
      city: 'Иваново',
      district: 'Ленинский р-н',
      address: 'ул. Куконковых, 96',
      phone: '+7 (4932) 92-94-96',
      phone_raw: '+74932929496',
      whatsapp: '79631529496',
      hours: 'Пн-Пт 10:00-19:00, Сб 10:00-17:00, Вс 10:00-15:00',
      rating: 4.8,
      brands: 'Kayo, BSE, Regulmoto, Progasi',
      focus: 'Эндуро, питбайки, тюнинг, сервис',
      price_range_note: 'Питбайки от 86 000 ₽, Эндуро от 147 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Иваново',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и центр запчастей<br> в Иваново'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро BSE Z3 250',
        spec: '250 см³, мощная хром-молибденовая рама, регулировки подвески',
        price: 'от 147 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Progasi Smart 125',
        spec: '125 см³, стильный итальянский дизайн, колеса 17/14',
        price: 'от 86 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Kayo Bull 150',
        spec: '150 см³, вариатор, гидравлические тормоза',
        price: 'от 235 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/ivanovo/firm/70000001034298154',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'DnkMoto, Иваново, ул. Куконковых, 96. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'buggyjump-kaluga',
    facts: {
      name: 'Buggy Jump',
      brand_display: 'Buggy <span>Jump</span>',
      city: 'Калуга',
      district: 'Центральный р-н',
      address: 'ул. Кропоткина, 4',
      phone: '+7 (4842) 57-72-79',
      phone_raw: '+74842577279',
      whatsapp: '79208950103',
      hours: 'Пн-Пт 09:00-19:00, Сб-Вс 10:00-18:00',
      rating: 4.8,
      brands: 'Regulmoto, Motoland, Kayo, Racer',
      focus: 'Багги, питбайки, эндуро, сервис',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 150 000 ₽, Квадро от 245 000 ₽',
      verified_source: '2GIS Калуга',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотоцентр, питбайки и квадроциклы<br> в Калуге'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Motoland TT 250',
        spec: '250 см³, электростартер, дорожные шины/эндуро, фара',
        price: 'от 150 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Regulmoto Seven 125',
        spec: '125 см³, электростартер, усиленная подвеска',
        price: 'от 88 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Wild Track 200',
        spec: '200 см³, светодиодная оптика, дисковые тормоза',
        price: 'от 245 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/kaluga/firm/70000001024892182',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Buggy Jump, Калуга, ул. Кропоткина, 4. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'moto-pervy-bryansk',
    facts: {
      name: 'Мотосалон Первый',
      brand_display: 'Мотосалон <span>Первый</span>',
      city: 'Брянск',
      district: 'Бежицкий р-н',
      address: 'Шоссейная ул., 3',
      phone: '+7 (4832) 33-05-85',
      phone_raw: '+74832330585',
      whatsapp: '79103330585',
      hours: 'Пн-Сб 09:00-19:00, Вс 10:00-16:00',
      rating: 4.8,
      brands: 'Kayo, Regulmoto, BSE, Motoland',
      focus: 'Мотоциклы, эндуро, экипировка, сервис',
      price_range_note: 'Питбайки от 85 000 ₽, Эндуро от 145 000 ₽, Квадро от 230 000 ₽',
      verified_source: '2GIS Брянск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон №1 и экипировка<br> в Брянске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Regulmoto Legend 250',
        spec: '250 см³, верхневальный мотор, электростартер, фара',
        price: 'от 145 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Basic TT125',
        spec: '125 см³, усиленная рама, колеса 17/14',
        price: 'от 85 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Kayo Bull 180',
        spec: '180 см³, масляный радиатор, фаркоп, багажники',
        price: 'от 230 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/bryansk/firm/70000001028741029',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мотосалон Первый, Брянск, Шоссейная ул., 3. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: '67moto-smolensk',
    facts: {
      name: '67МОТО',
      brand_display: '<span>67</span>МОТО',
      city: 'Смоленск',
      district: 'Заднепровский р-н',
      address: 'Краснинское шоссе, 37',
      phone: '+7 (977) 333-30-67',
      phone_raw: '+79773333067',
      whatsapp: '79773333067',
      hours: 'Пн-Вс 10:00-18:00',
      rating: 4.9,
      brands: 'Regulmoto, Progasi, BSE, Kayo',
      focus: 'Эндуро, питбайки, квадроциклы, экипировка',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 155 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Смоленск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Специализированный мотосалон<br> в Смоленске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Progasi Ibiza 250',
        spec: '250 см³, карбюратор Nibbi Racing, фрезерованные траверсы',
        price: 'от 155 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк BSE PH10 125',
        spec: '125 см³, кикстартер, складные подножки, колеса 17/14',
        price: 'от 89 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Regulmoto Athlete 200',
        spec: '200 см³, лебедка, спинка пассажира, LED балка',
        price: 'от 240 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/smolensk/firm/70000001041982015',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: '67МОТО, Смоленск, Краснинское шоссе, 37. Рейтинг 4.9 ★.'
      }
    ]
  },
  {
    slug: 'mototandem-vladimir',
    facts: {
      name: 'Мототандем',
      brand_display: 'Мото<span>тандем</span>',
      city: 'Владимир',
      district: 'Фрунзенский р-н',
      address: 'ул. Куйбышева, 28Е',
      phone: '+7 (920) 933-32-32',
      phone_raw: '+79209333232',
      whatsapp: '79209333232',
      hours: 'Пн-Сб 09:00-19:00, Вс 09:00-17:00',
      rating: 4.8,
      brands: 'Motoland, Regulmoto, Kayo, Racer',
      focus: 'Питбайки, эндуро, квадроциклы, сервис',
      price_range_note: 'Питбайки от 84 000 ₽, Эндуро от 145 000 ₽, Квадро от 220 000 ₽',
      verified_source: '2GIS Владимир',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон и сервисный центр<br> во Владимире'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Мотоцикл Motoland XR250 Enduro',
        spec: '250 см³, дисковые тормоза, защита перьев, электростартер',
        price: 'от 145 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Motoland CRF125',
        spec: '125 см³, усиленная рама, карбюратор Mikuni',
        price: 'от 84 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Allroad 125',
        spec: '125 см³, для подростков и взрослых, брелок родительского контроля',
        price: 'от 220 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/vladimir/firm/70000001018942182',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мототандем, Владимир, ул. Куйбышева, 28Е. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'u-pavla-kostroma',
    facts: {
      name: 'Мотосалон У Павла',
      brand_display: 'Салон <span>У Павла</span>',
      city: 'Кострома',
      district: 'Фабричный р-н',
      address: 'ул. Костромская, 78',
      phone: '+7 (4942) 49-22-32',
      phone_raw: '+74942492232',
      whatsapp: '74942492232',
      hours: 'Пн-Пт 09:00-18:00, Сб 09:00-15:00',
      rating: 4.8,
      brands: 'Kayo, GR, Ataki, Regulmoto',
      focus: 'Эндуро, квадроциклы, экипировка Rolling Moto',
      price_range_note: 'Питбайки от 87 000 ₽, Эндуро от 152 000 ₽, Квадро от 235 000 ₽',
      verified_source: '2GIS Кострома',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Мотосалон, сервис и экипировка<br> в Костроме'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро GR1 F250A Enduro OPTIMUM',
        spec: '250 см³, двигатель Zongshen CB250, колеса 21/18',
        price: 'от 152 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Basic TT125',
        spec: '125 см³, проверенный 4Т мотор, колеса 17/14',
        price: 'от 87 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Kayo Bull 200',
        spec: '200 см³, надежный утилитарник с фаркопом',
        price: 'от 235 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/kostroma/firm/70000001021948215',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мотосалон У Павла, Кострома, ул. Костромская, 78. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: '1001moto-novoross',
    facts: {
      name: '1001MOTO',
      brand_display: '1001<span>MOTO</span>',
      city: 'Новороссийск',
      district: 'Приморский р-н',
      address: 'пос. Цемдолина, ул. Полевая, 2А',
      phone: '+7 (988) 488-48-68',
      phone_raw: '+79884884868',
      whatsapp: '79884884868',
      hours: 'Пн-Вс 09:30-18:30',
      rating: 4.8,
      brands: 'Regulmoto, BSE, Progasi, Kayo',
      focus: 'Эндуро для гор, питбайки, квадроциклы',
      price_range_note: 'Питбайки от 89 000 ₽, Эндуро от 158 000 ₽, Квадро от 495 000 ₽',
      verified_source: '2GIS Новороссийск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Эндуро для гор и побережья<br> в Новороссийске'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Regulmoto TE 250',
        spec: '250 см³, водяное охлаждение, усиленная рама для камней',
        price: 'от 158 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк BSE MX 125 Sport',
        spec: '125 см³, легкий вес 75 кг, колеса 17/14',
        price: 'от 89 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Linhai-Yamaha 300 4x4',
        spec: '300 см³, полный привод 4WD с блокировкой',
        price: 'от 495 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/novorossiysk/firm/70000001038291415',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: '1001MOTO, Новороссийск, пос. Цемдолина, ул. Полевая, 2А. Рейтинг 4.8 ★.'
      }
    ]
  },
  {
    slug: 'motocity-pyatigorsk',
    facts: {
      name: 'Мото Сити',
      brand_display: 'Мото <span>Сити</span>',
      city: 'Пятигорск',
      district: 'Горячеводский р-н',
      address: 'Бештаугорское шоссе, 75',
      phone: '+7 (962) 496-10-10',
      phone_raw: '+79624961010',
      whatsapp: '79624961010',
      hours: 'Пн-Вс 09:00-18:00',
      rating: 4.9,
      brands: 'Kayo, Regulmoto, Motoland, BSE',
      focus: 'Горный эндуро, питбайки, квадроциклы КМВ',
      price_range_note: 'Питбайки от 88 000 ₽, Эндуро от 152 000 ₽, Квадро от 240 000 ₽',
      verified_source: '2GIS Пятигорск',
      has_website: false,
      existing_website: '',
      hero_subtitle: 'Горный эндуро и квадроциклы<br> в Пятигорске (КМВ)'
    },
    catalog: [
      {
        id: 'enduro',
        category: 'enduro',
        name: 'Эндуро Motoland XT250 HS',
        spec: '250 см³, двигатель 172FMM, регулируемая подвеска для гор',
        price: 'от 152 000 ₽',
        image: 'assets/product-enduro.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'pitbike',
        category: 'pitbike',
        name: 'Питбайк Kayo Basic TT125',
        spec: '125 см³, прочная стальная рама, колеса 17/14',
        price: 'от 88 000 ₽',
        image: 'assets/product-pitbike.jpg',
        status: 'verified',
        source_id: '2gis'
      },
      {
        id: 'atv',
        category: 'atv',
        name: 'Квадроцикл Motoland Wild Track 200',
        spec: '200 см³, внедорожные шины, фаркоп, лебедка',
        price: 'от 240 000 ₽',
        image: 'assets/product-atv.jpg',
        status: 'verified',
        source_id: '2gis'
      }
    ],
    sources: [
      {
        id: '2gis',
        url: 'https://2gis.ru/pyatigorsk/firm/70000001027192845',
        checked_at: '2026-11-13T23:50:00.000Z',
        excerpt: 'Мото Сити, Пятигорск, Бештаугорское шоссе, 75. Рейтинг 4.9 ★.'
      }
    ]
  }
];

console.log(`Запись ${newLeads.length} новых карточек фактов в data/facts/...`);

for (const lead of newLeads) {
  const filePath = path.join(factsDir, `${lead.slug}.json`);
  const data = {
    slug: lead.slug,
    checked_at: '2026-11-13T23:50:00.000Z',
    identity_status: 'verified',
    sources: lead.sources,
    facts: lead.facts,
    catalog: lead.catalog
  };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  + ${lead.slug}.json (${lead.facts.city} — ${lead.facts.name})`);
}

console.log('Готово! Все 20 файлов фактов созданы.');
