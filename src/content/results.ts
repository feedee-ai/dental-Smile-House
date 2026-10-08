// Галерея «До и после» — только работы, опубликованные клиникой в Instagram.
//
// local — пары кадров уже лежат в public/photos (режет tools/photos.py),
//         показываются слайдером.
// instagram — посты с результатами, фото которых ещё не скачаны в репозиторий
//         (сеть сборки не достаёт до CDN Instagram). На сайте они грузятся
//         встраиванием Instagram только по кнопке посетителя. Когда клиника
//         даст оригиналы — нарезать в tools/photos.py и перенести в local.

import type { Lang } from './site';
import type { PhotoName } from './photos';

type L = Record<Lang, string>;

export type LocalResult = {
  id: string;
  before: PhotoName;
  after: PhotoName;
  url: string;
  title: L;
  tag: L;
};

export type InstagramResult = {
  id: string;
  url: string;
  title: L;
  tag: L;
};

export const localResults: LocalResult[] = [
  {
    id: 'smile',
    before: 'smile-before',
    after: 'smile-after',
    url: 'https://www.instagram.com/p/DVWPIBHDI9u/',
    title: { es: 'Sonrisa completa con carillas', ru: 'Вся улыбка на винирах' },
    tag: { es: 'Carillas', ru: 'Виниры' },
  },
  {
    id: 'metal',
    before: 'metal-before',
    after: 'metal-after',
    url: 'https://www.instagram.com/p/DQt68YPDfVY/',
    title: { es: 'Restauraciones metálicas y dientes ausentes: carillas', ru: 'Металлические реставрации и нехватка зубов: виниры' },
    tag: { es: 'Trabajo integral', ru: 'Комплексная работа' },
  },
  {
    id: 'wear',
    before: 'wear-before',
    after: 'wear-after',
    url: 'https://www.instagram.com/p/DVWPIBHDI9u/',
    title: { es: 'Desgaste severo: toda la sonrisa de nuevo', ru: 'Сильная стираемость: вся улыбка заново' },
    tag: { es: 'Desgaste', ru: 'Стираемость' },
  },
];

export const instagramResults: InstagramResult[] = [
  {
    id: 'DLHRLWsNc4p',
    url: 'https://www.instagram.com/p/DLHRLWsNc4p/',
    title: { es: 'Carillas cerámicas pintadas a mano', ru: 'Керамические виниры с ручной росписью' },
    tag: { es: 'Carillas', ru: 'Виниры' },
  },
  {
    id: 'DLVqSVmNGEK',
    url: 'https://www.instagram.com/p/DLVqSVmNGEK/',
    title: { es: 'Carillas y coronas de cerámica sin tallar los dientes', ru: 'Виниры и коронки из керамики без обработки зубов' },
    tag: { es: 'Carillas', ru: 'Виниры' },
  },
  {
    id: 'DU6oVFqDaJV',
    url: 'https://www.instagram.com/p/DU6oVFqDaJV/',
    title: { es: 'Rehabilitación total en zirconio', ru: 'Тотальная работа на диоксиде циркония' },
    tag: { es: 'Rehabilitación', ru: 'Тотальная работа' },
  },
  {
    id: 'DUVJ6vTDVpr',
    url: 'https://www.instagram.com/p/DUVJ6vTDVpr/',
    title: { es: 'Carillas sobre esmalte con fluorosis', ru: 'Виниры при флюорозе' },
    tag: { es: 'Fluorosis', ru: 'Флюороз' },
  },
  {
    id: 'DWqe66cDXpE',
    url: 'https://www.instagram.com/p/DWqe66cDXpE/',
    title: { es: 'Prótesis con desgaste patológico', ru: 'Протезирование при патологической стираемости' },
    tag: { es: 'Desgaste', ru: 'Стираемость' },
  },
  {
    id: 'DRFAKM8jAlF',
    url: 'https://www.instagram.com/p/DRFAKM8jAlF/',
    title: { es: 'Carillas de cerámica con efectos a mano', ru: 'Виниры из керамики с эффектами вручную' },
    tag: { es: 'Carillas', ru: 'Виниры' },
  },
];
