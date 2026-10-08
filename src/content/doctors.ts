// Врачи — только те, кого пациенты называют в недавних отзывах.
// ⚠️ Состав проверить у клиники до публикации (CLAUDE.md).
// Марию Малевскую не ставим: по отзыву от ноября 2025 она работает в своей клинике.
// Фамилии и фото — у клиники. Фото класть в public/photos/team/ и указывать в `photo`.

import type { Lang } from './site';

export type Doctor = {
  id: 'dmitry' | 'javier' | 'lucila';
  name: Record<Lang, string>;
  role: Record<Lang, string>;
  reviewId: string;
  photo?: string;
};

export const doctors: Doctor[] = [
  {
    id: 'dmitry',
    name: { es: 'Dr. Dmitry', ru: 'Дмитрий' },
    role: {
      es: 'Cirugía oral, implantes, muelas del juicio',
      ru: 'Хирургия, имплантация, удаление зубов мудрости',
    },
    reviewId: 'daniel',
  },
  {
    id: 'javier',
    name: { es: 'Dr. Javier', ru: 'Хавьер' },
    role: { es: 'Endodoncia', ru: 'Лечение каналов' },
    reviewId: 'iglesia',
  },
  {
    id: 'lucila',
    name: { es: 'Dra. Lucila', ru: 'Лусила' },
    role: { es: 'Odontología general', ru: 'Стоматолог' },
    reviewId: 'magris',
  },
];
