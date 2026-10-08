// Сложные случаи — пересказ постов клиники в Instagram человеческим языком.
// Цифры взяты из самих постов. Фото до/после — только из материалов клиники:
// `photos` — кадры из того же поста (src/content/photos.ts).

import type { Lang } from './site';
import type { PhotoName } from './photos';

export type Case = {
  id: string;
  url: string;
  // Крупная цифра из поста, если она есть.
  figure?: Record<Lang, string>;
  figureNote?: Record<Lang, string>;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  photos?: PhotoName[];
};

export const cases: Case[] = [
  {
    id: 'sinus',
    url: 'https://www.instagram.com/p/DVt_z_YDooL/',
    photos: ['cbct-before', 'cbct-after'],
    figure: { es: '2,5 mm', ru: '2,5 мм' },
    figureNote: { es: 'de hueso para un implante de 10 mm', ru: 'кости под имплант длиной 10 мм' },
    title: {
      es: 'Implante casi sin hueso',
      ru: 'Имплант, когда кости почти нет',
    },
    text: {
      es: 'Bajo el seno maxilar quedaban 2,5 mm de hueso. Para colocar un implante de 10 mm hay que elevar el suelo del seno 7,5 mm. Los doctores lo llaman elevación de seno extrema.',
      ru: 'Под гайморовой пазухой оставалось 2,5 мм кости. Чтобы поставить имплант длиной 10 мм, дно пазухи поднимают на 7,5 мм. Врачи называют это экстремальным синус-лифтингом.',
    },
  },
  {
    id: 'wear',
    url: 'https://www.instagram.com/p/DVWPIBHDI9u/',
    title: {
      es: 'Desgaste severo: rehabilitar toda la sonrisa',
      ru: 'Стёртые зубы: восстановить всю улыбку',
    },
    text: {
      es: 'Con un desgaste patológico no basta con poner carillas. Hay que rediseñar cómo cierran los maxilares y elegir un material que aguante la carga.',
      ru: 'При патологической стираемости мало просто поставить виниры. Нужно заново спроектировать, как смыкаются челюсти, и выбрать материал, который выдержит нагрузку.',
    },
  },
  {
    id: 'fluorosis',
    url: 'https://www.instagram.com/p/DUVJ6vTDVpr/',
    title: {
      es: 'Carillas sobre esmalte con fluorosis',
      ru: 'Виниры при флюорозе',
    },
    text: {
      es: 'El esmalte con fluorosis adhiere mal y las manchas cuestan de tapar con carillas finas. Se cambia el protocolo: grabado más largo y cerámica más opaca.',
      ru: 'Эмаль при флюорозе плохо держит сцепление, а пятна трудно скрыть тонкими винирами. Протокол меняют: дольше травление, плотнее керамика.',
    },
  },
  {
    id: 'lab',
    url: 'https://www.instagram.com/p/DU6oVFqDaJV/',
    photos: ['eq-lab'],
    title: {
      es: 'Rehabilitación total en zirconio',
      ru: 'Тотальная работа на диоксиде циркония',
    },
    text: {
      es: 'Protocolo digital de principio a fin y trabajo de varias especialidades. Los efectos de la cerámica se pintan a mano en el laboratorio propio de la clínica.',
      ru: 'Цифровой протокол от начала до конца и работа нескольких специалистов. Эффекты на керамике наносят вручную в авторской лаборатории клиники.',
    },
  },
  // Добавлено 08.10.2026 — из постов DYkbX6lDiAG (20.05.2026) и DSLCWEfDQab (12.12.2025).
  {
    id: 'sinus-closed',
    url: 'https://www.instagram.com/p/DYkbX6lDiAG/',
    photos: ['sinus-closed'],
    title: {
      es: 'Implante con elevación de seno cerrada',
      ru: 'Имплант с закрытым синус-лифтингом',
    },
    text: {
      es: 'Cuando el hueso no basta, una elevación de seno cerrada prepara la zona para colocar el implante con seguridad. Se recupera el diente perdido: estética y función.',
      ru: 'Если кости не хватает, закрытый синус-лифтинг бережно готовит зону под имплант. Утраченный зуб восстанавливается полностью: и эстетика, и функция.',
    },
  },
  {
    id: 'sinus-immediate',
    url: 'https://www.instagram.com/p/DSLCWEfDQab/',
    photos: ['sinus-plan'],
    title: {
      es: 'Elevación de seno e implante en la misma cirugía',
      ru: 'Синус-лифтинг и имплант за одну операцию',
    },
    text: {
      es: 'Es más exigente que hacerlo por etapas: con 1–4 mm de hueso bajo el seno cuesta lograr la estabilidad primaria del implante (20–25 N·cm). Por eso se mide todo antes en la tomografía.',
      ru: 'Это сложнее, чем поэтапно: при 1–4 мм кости под пазухой трудно добиться первичной стабильности импланта (20–25 Н·см). Поэтому всё измеряют заранее на томограмме.',
    },
  },
];
