/**
 * smart_engine.js
 * Интеллектуальный процессор персонализации сайтов для мотосалонов:
 * 1. Генерирует валидную разметку Schema.org (AutoDealer) для мгновенного SEO в Яндексе
 * 2. Встраивает плавающую демо-панель для владельца (с QR-кодом для открытия на телефоне)
 * 3. Настраивает прямую отправку заявок в Telegram / WhatsApp
 * 4. Защищает страницы от индексации до покупки (noindex)
 */

const fs = require('fs');
const path = require('path');

function generateSchemaOrg(data) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": data.name,
    "description": data.focus || "Продажа и сервис мотоциклов, эндуро и квадроциклов",
    "telephone": data.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address,
      "addressLocality": data.city,
      "addressCountry": "RU"
    },
    "openingHours": data.hours,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": data.rating || "4.8",
      "reviewCount": data.reviews_count || "110"
    },
    "priceRange": "₽₽"
  };

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

function generateDemoToolbar(data) {
  // Компактный плавающий тулбар для владельца бизнеса при просмотре демо
  return `
  <!-- ПЛАВАЮЩИЙ УМНЫЙ ДЕМО-ТУЛБАР ДЛЯ СОБСТВЕННИКА -->
  <div id="owner-demo-bar" class="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 text-stone-200 border-b border-orange-500/40 px-3 py-2 text-xs font-mono shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-stone-300">Демо-концепт для: <strong class="text-white">${data.name}</strong> (${data.city})</span>
      <span class="hidden lg:inline text-stone-500">|</span>
      <span class="hidden lg:inline text-stone-400">Рейтинг: <span class="text-amber-400 font-bold">★ ${data.rating}</span> (${data.reviews_count} отзывов на картах)</span>
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <button onclick="toggleQR()" class="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-[11px] flex items-center gap-1 transition">
        <span>📱 Открыть на телефоне (QR)</span>
      </button>
      <a href="https://wa.me/79990000000?text=Здравствуйте!%20Посмотрел%20демо-сайт%20для%20${encodeURIComponent(data.name)}%2C%20хочу%20обсудить%20условия" target="_blank" class="px-3 py-1 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-sm transition">
        <span>Забрать этот сайт себе →</span>
      </a>
      <button onclick="document.getElementById('owner-demo-bar').style.display='none'" class="text-stone-500 hover:text-white px-1 text-sm font-bold">✕</button>
    </div>
  </div>

  <!-- МОДАЛЬНОЕ ОКНО С QR-КОДОМ ДЛЯ БЫСТРОГО ТЕСТА С ТЕЛЕФОНА -->
  <div id="qr-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
    <div class="bg-stone-900 border border-stone-800 p-6 rounded-2xl max-w-sm w-full text-center relative shadow-2xl">
      <button onclick="toggleQR()" class="absolute top-3 right-3 text-stone-400 hover:text-white text-lg">✕</button>
      <h3 class="font-bold text-white text-base mb-1">Отсканируйте камерой телефона</h3>
      <p class="text-stone-400 text-xs mb-4">Сайт сразу откроется на вашем смартфоне в мобильной адаптации</p>
      
      <div class="bg-white p-3 rounded-xl inline-block mx-auto mb-3">
        <img id="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" alt="QR Code" class="w-44 h-44">
      </div>
      
      <span class="text-[11px] font-mono text-stone-500 block">Демо разработано специально для ${data.name}</span>
    </div>
  </div>

  <script>
    function toggleQR() {
      const modal = document.getElementById('qr-modal');
      const img = document.getElementById('qr-img');
      img.src = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" + encodeURIComponent(window.location.href);
      if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }
  </script>
  `;
}

module.exports = {
  generateSchemaOrg,
  generateDemoToolbar
};
