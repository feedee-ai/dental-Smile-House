// Случаи, за которые берутся не все, — пересказ постов клиники в Instagram
// человеческим языком. Цифры — из самих постов. Фото — только кадры клиники:
// `ba` — до/после из того же поста, `photo` — фото работы клиники (не снимки КТ:
// пациенту они непонятны). `quote` — отзыв пациента на ту же тему (reviews.ts).

import type { Lang } from './site';
import type { PhotoName } from './photos';

type L = Record<Lang, string>;

export type Case = {
  id: string;
  url: string;
  tag: L;
  title: L;
  text: L;
  ba?: [PhotoName, PhotoName];
  photo?: PhotoName;
  quote?: string;
};

export const cases: Case[] = [
  {
    id: 'wear',
    url: 'https://www.instagram.com/p/DVWPIBHDI9u/',
    ba: ['wear-before', 'wear-after'],
    tag: { es: 'Desgaste patológico', ru: 'Патологическая стираемость' },
    title: {
      es: 'Dientes desgastados: rehacer toda la sonrisa',
      ru: 'Стёртые зубы: восстановить всю улыбку',
    },
    text: {
      es: 'Con un desgaste patológico no basta con poner carillas. Hay que rediseñar cómo cierran los maxilares y elegir un material que aguante la carga: disilicato de litio o zirconio.',
      ru: 'При патологической стираемости мало просто поставить виниры. Нужно заново спроектировать, как смыкаются челюсти, и выбрать материал, который выдержит нагрузку: дисиликат лития или диоксид циркония.',
    },
  },
  {
    id: 'metal',
    url: 'https://www.instagram.com/p/DQt68YPDfVY/',
    ba: ['metal-before', 'metal-after'],
    tag: { es: 'Trabajo integral', ru: 'Комплексная работа' },
    title: {
      es: 'Faltaban dientes y había restauraciones metálicas',
      ru: 'Не хватало зубов, стояли металлические реставрации',
    },
    text: {
      es: 'Tras el diagnóstico y la planificación, la clínica colocó carillas y devolvió a los dientes su forma, simetría y un color natural.',
      ru: 'После диагностики и планирования клиника поставила виниры и вернула зубам форму, симметрию и естественный оттенок.',
    },
  },
  {
    id: 'wisdom',
    url: 'https://www.instagram.com/p/DcOshPCOppT/',
    photo: 'strip-7',
    quote: 'pod',
    tag: { es: 'Cirugía', ru: 'Хирургия' },
    title: {
      es: 'Muelas del juicio que otros no quisieron sacar',
      ru: 'Восьмёрки, которые не взялись удалять в других клиниках',
    },
    text: {
      es: 'Muelas que crecen mal, empujan al diente vecino o se inflaman. Se extraen cuando de verdad hace falta, no todas por sistema.',
      ru: 'Зубы мудрости, которые растут неправильно, давят на соседний зуб или воспаляются. Удаляют, когда это действительно нужно, а не все подряд.',
    },
  },
  {
    id: 'sinus',
    url: 'https://www.instagram.com/p/DVt_z_YDooL/',
    photo: 'strip-1',
    tag: { es: 'Implantes', ru: 'Импланты' },
    title: {
      es: 'Implante cuando casi no queda hueso',
      ru: 'Имплант, когда кости почти не осталось',
    },
    text: {
      es: 'En un caso publicado por la clínica quedaban 2,5 mm de hueso bajo el seno maxilar. Para un implante de 10 mm se elevó el suelo del seno: una elevación de seno extrema.',
      ru: 'В одном из случаев клиники под гайморовой пазухой оставалось 2,5 мм кости. Чтобы поставить имплант длиной 10 мм, подняли дно пазухи — экстремальный синус-лифтинг.',
    },
  },
  {
    id: 'redo',
    url: 'https://www.instagram.com/p/DMrp0-DNHFj/',
    photo: 'eq-digital',
    tag: { es: 'Implantes', ru: 'Импланты' },
    title: {
      es: 'Rehacer un trabajo sobre implantes de otra clínica',
      ru: 'Переделать чужую работу на имплантах',
    },
    text: {
      es: 'No se sabe qué implantes hay, a qué profundidad ni con qué ángulo, y el hueso puede haberse perdido. Primero un diagnóstico a fondo (TAC, fotos, modelos) y una respuesta honesta: si vale la pena conservar los implantes antiguos.',
      ru: 'Неизвестно, какие стоят импланты, на какой глубине и под каким углом, кость могла уйти. Сначала тщательная диагностика (КТ, фото, модели) и честный ответ, есть ли смысл сохранять старые импланты.',
    },
  },
  {
    id: 'fluorosis',
    url: 'https://www.instagram.com/p/DUVJ6vTDVpr/',
    photo: 'strip-9',
    tag: { es: 'Estética', ru: 'Эстетика' },
    title: {
      es: 'Carillas sobre esmalte con fluorosis',
      ru: 'Виниры при флюорозе',
    },
    text: {
      es: 'El esmalte con fluorosis adhiere mal y las manchas cuestan de tapar con carillas finas. Se cambia el protocolo: grabado más largo y cerámica más opaca.',
      ru: 'Эмаль при флюорозе плохо держит сцепление, а пятна трудно скрыть тонкими винирами. Протокол меняют: дольше травление, плотнее керамика.',
    },
  },
];
