// Факты о клинике и настройки сайта. Источник: docs/brief.md, materials/BRIEF.md.
// null — данных нет: на сайте поле скрыто или помечено «уточняется».
// Список того, что нужно от клиники, — docs/launch-checklist.md.

export const site = {
  url: 'https://smilehouse-valencia.vercel.app', // заменить на домен клиники
  name: 'Smile House',
  legalName: 'Clínica dental Smile House',
  since: 2018,
  phone: { display: '601 44 30 61', e164: '+34601443061' },
  // WhatsApp на этом номере не подтверждён — см. launch-checklist.
  whatsapp: '34601443061',
  instagram: 'https://www.instagram.com/smilehouse_vlc/',
  address: {
    street: 'C/ de la Visitació, 2, Bajo derecho',
    district: 'La Zaidía',
    postalCode: '46009',
    city: 'València',
    region: 'Comunitat Valenciana',
    country: 'ES',
  },
  geo: { lat: 39.4795, lng: -0.3762 }, // приблизительно, у Torres de Serranos; уточнить по карточке
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+dental+Smile+House+C%2F+de+la+Visitaci%C3%B3+2+46009+Val%C3%A8ncia',
  mapsEmbed:
    'https://www.google.com/maps?q=Cl%C3%ADnica+dental+Smile+House,+C%2F+de+la+Visitaci%C3%B3+2,+46009+Val%C3%A8ncia&output=embed',
  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+dental+Smile+House+Val%C3%A8ncia',
  timezone: 'Europe/Madrid',
  // Пн–пт 10:00–16:30. Праздники и отпуск (в 2026 — 1–16 августа) не учтены.
  hours: { days: [1, 2, 3, 4, 5], open: '10:00', close: '16:30' },
  googleRating: null, // { value: 4.9, count: 120 } — когда будут точные цифры
  registroSanitario: null,
  titular: null, // { name, nif }
  email: null,
};

// Цены. null → «по консультации». Пример: implant: 'desde 950 €'.
export const prices = {
  urgent: null,
  implant: null,
  wisdom: null,
  veneers: null,
  endo: null,
  ortho: null,
  hygiene: null,
  checkup: null,
};
