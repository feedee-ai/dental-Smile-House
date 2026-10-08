// Услуги — по темам, о которых клиника сама пишет в Instagram (@smilehouse_vlc).
// У каждой — ссылка на пост, где врачи это объясняют. Без обещаний результата.

import type { Lang } from './site';
import type { PhotoName } from './photos';

type L = Record<Lang, string>;

export type ServiceItem = { title: L; text: L; url: string };
export type ServiceGroup = { id: string; title: L; photo: PhotoName; items: ServiceItem[] };

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'aesthetic',
    title: { es: 'Estética y carillas', ru: 'Эстетика и виниры' },
    photo: 'eq-lab',
    items: [
      {
        title: { es: 'Carillas de cerámica', ru: 'Виниры из керамики' },
        text: { es: 'Los efectos se pintan a mano en el laboratorio de la clínica.', ru: 'Эффекты наносят вручную в лаборатории клиники.' },
        url: ig('DRFAKM8jAlF'),
      },
      {
        title: { es: 'Dientes desgastados: recuperar la sonrisa', ru: 'Стёртые зубы: восстановить улыбку' },
        text: { es: 'Rehabilitación completa con una nueva altura de mordida.', ru: 'Тотальная реставрация с новой высотой прикуса.' },
        url: ig('DVWPIBHDI9u'),
      },
      {
        title: { es: 'Carillas con fluorosis', ru: 'Виниры при флюорозе' },
        text: { es: 'Otro protocolo de adhesión y cerámica que tapa las manchas.', ru: 'Другой протокол сцепления и керамика, которая скрывает пятна.' },
        url: ig('DUVJ6vTDVpr'),
      },
      {
        title: { es: 'Dientes pequeños (microdoncia)', ru: 'Маленькие зубы (микродонтия)' },
        text: { es: 'Reconstrucciones, carillas, coronas u ortodoncia, según el caso.', ru: 'Реставрации, виниры, коронки или ортодонтия — по ситуации.' },
        url: ig('DWHZlAWDSf7'),
      },
      {
        title: { es: 'Blanqueamiento', ru: 'Отбеливание' },
        text: { es: 'En clínica o en casa: te explicamos qué conviene en tu caso.', ru: 'В клинике или дома — подскажем, что подойдёт именно вам.' },
        url: ig('DbBRabNjROW'),
      },
    ],
  },
  {
    id: 'surgery',
    title: { es: 'Implantes y cirugía', ru: 'Импланты и хирургия' },
    photo: 'strip-4',
    items: [
      {
        title: { es: 'Implantes dentales', ru: 'Имплантация' },
        text: { es: 'Planificación digital, cirugía y prótesis en la clínica.', ru: 'Цифровое планирование, операция и протезирование в клинике.' },
        url: ig('DVgv9tDjc-0'),
      },
      {
        title: { es: 'Elevación de seno', ru: 'Синус-лифтинг' },
        text: { es: 'Cuando falta hueso en el maxilar superior, también con implante en la misma cirugía.', ru: 'Когда в верхней челюсти не хватает кости, в том числе с имплантом за одну операцию.' },
        url: ig('DSLCWEfDQab'),
      },
      {
        title: { es: 'Rehacer trabajos sobre implantes', ru: 'Переделка работ на имплантах' },
        text: { es: 'Diagnóstico de trabajos antiguos de otras clínicas.', ru: 'Диагностика старых работ из других клиник.' },
        url: ig('DMrp0-DNHFj'),
      },
      {
        title: { es: 'Muelas del juicio', ru: 'Зубы мудрости' },
        text: { es: 'Extracción cuando hace falta, también en casos complicados.', ru: 'Удаление, когда это нужно, в том числе сложное.' },
        url: ig('DcOshPCOppT'),
      },
    ],
  },
  {
    id: 'treatment',
    title: { es: 'Tratamiento del diente', ru: 'Лечение зубов' },
    photo: 'eq-microscope',
    items: [
      {
        title: { es: 'Endodoncia', ru: 'Лечение каналов' },
        text: { es: 'Cuando el nervio está dañado, para conservar el diente. Trabajamos con microscopio.', ru: 'Когда нерв погиб, чтобы сохранить зуб. Работаем с микроскопом.' },
        url: ig('DdOre5sDuo4'),
      },
      {
        title: { es: 'Caries y empastes', ru: 'Кариес и пломбы' },
        text: { es: 'La caries no se cura sola: cuanto antes, más sencillo.', ru: 'Кариес сам не проходит: чем раньше, тем проще.' },
        url: ig('DdhA1iuOe_M'),
      },
      {
        title: { es: 'Corona rota o despegada', ru: 'Сломалась или выпала коронка' },
        text: { es: 'Aunque no duela, el diente queda desprotegido.', ru: 'Даже если не болит, зуб остаётся без защиты.' },
        url: ig('Dc0mOUKjnYO'),
      },
      {
        title: { es: 'Sensibilidad dental', ru: 'Чувствительность зубов' },
        text: { es: 'Molestias con el frío, el calor o lo ácido: buscamos la causa.', ru: 'Реакция на холодное, горячее и кислое — ищем причину.' },
        url: ig('DVJfxmqjbpD'),
      },
    ],
  },
  {
    id: 'hygiene',
    title: { es: 'Higiene y encías', ru: 'Гигиена и дёсны' },
    photo: 'strip-5',
    items: [
      {
        title: { es: 'Limpieza profesional', ru: 'Профессиональная чистка' },
        text: { es: 'Sarro y placa que el cepillo no quita.', ru: 'Камень и налёт, которые не убрать щёткой.' },
        url: ig('DPrD70nDP7O'),
      },
      {
        title: { es: 'Gingivitis y periodontitis', ru: 'Гингивит и пародонтит' },
        text: { es: 'Encías que sangran o se inflaman.', ru: 'Дёсны кровоточат или воспаляются.' },
        url: ig('DUD49N7jeQp'),
      },
      {
        title: { es: 'Bruxismo', ru: 'Бруксизм' },
        text: { es: 'Apretar o rechinar los dientes los desgasta y los rompe.', ru: 'Сжатие и скрежет стирают и откалывают зубы.' },
        url: ig('DSkjXYWDfDt'),
      },
    ],
  },
  {
    id: 'ortho',
    title: { es: 'Ortodoncia', ru: 'Ортодонтия' },
    photo: 'eq-scanner',
    items: [
      {
        title: { es: 'Brackets y alineadores', ru: 'Брекеты и элайнеры' },
        text: { es: 'Te explicamos qué opción encaja contigo.', ru: 'Объясним, какой вариант подходит именно вам.' },
        url: ig('DPEDnPPjRjt'),
      },
      {
        title: { es: 'Sobremordida', ru: 'Глубокий прикус' },
        text: { es: 'Más que estética: afecta a dientes y articulación.', ru: 'Это не только эстетика: страдают зубы и сустав.' },
        url: ig('DWRZnjTjffx'),
      },
      {
        title: { es: 'Expansor palatino', ru: 'Расширитель нёба' },
        text: { es: 'Para ensanchar el maxilar superior y corregir la mordida.', ru: 'Чтобы расширить верхнюю челюсть и исправить прикус.' },
        url: ig('DQEk4IVjGPS'),
      },
    ],
  },
];
