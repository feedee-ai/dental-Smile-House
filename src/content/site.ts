// Факты о клинике. Источник: docs/brief.md (Google Maps, Instagram, 01.10.2026).
// Всё, что помечено `null`, не выдумываем: поле скрывается или показывается как
// «уточняется», пока клиника не даст данные. Список — в docs/launch-checklist.md.

export const site = {
  name: 'Smile House',
  legalName: 'Clínica dental Smile House',
  since: 2018,

  phone: {
    display: '601 44 30 61',
    href: 'tel:+34601443061',
  },
  // Есть ли WhatsApp на этом номере — проверить у клиники.
  whatsapp: 'https://wa.me/34601443061',
  instagram: {
    handle: '@smilehouse_vlc',
    url: 'https://www.instagram.com/smilehouse_vlc/',
  },

  address: {
    street: 'C/ de la Visitació, 2, Bajo derecho',
    district: 'La Zaidía',
    postalCode: '46009',
    city: 'València',
    region: 'Comunitat Valenciana',
    country: 'ES',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+dental+Smile+House+C%2F+de+la+Visitaci%C3%B3+2+46009+Val%C3%A8ncia',
  mapsEmbed:
    'https://www.google.com/maps?q=Cl%C3%ADnica+dental+Smile+House,+C%2F+de+la+Visitaci%C3%B3+2,+46009+Val%C3%A8ncia&output=embed',
  // Карточка клиники в Google (place_id из выгрузки 08.10.2026).
  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20dental%20Smile%20House&query_place_id=ChIJg7lB_1RPYA0RTQ1EhgK_5DI',

  // Пн–пт 10:00–16:30, сб–вс закрыто. Время — Europe/Madrid.
  timezone: 'Europe/Madrid',
  hours: [
    { days: [1, 2, 3, 4, 5], open: '10:00', close: '16:30' },
  ] as { days: number[]; open: string; close: string }[],

  // Google Maps, выгрузка Apify 08.10.2026: 4,7 ★, 87 отзывов (80 × 5★, 7 × 1★).
  googleRating: { value: 4.7, count: 87 } as null | { value: number; count: number },
  // Обязателен в подвале по правилам рекламы медуслуг Валенсийского сообщества.
  registroSanitario: null as null | string,
  // Юрлицо и CIF/NIF для политики конфиденциальности и aviso legal.
  titular: null as null | { name: string; nif: string },
  email: null as null | string,
} as const;

export type Lang = 'es' | 'ru';
export const langs: Lang[] = ['es', 'ru'];

export function homePath(lang: Lang) {
  return lang === 'es' ? '/' : '/ru/';
}
export function legalPath(lang: Lang) {
  return lang === 'es' ? '/legal/' : '/ru/legal/';
}
