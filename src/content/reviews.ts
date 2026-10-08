// Отзывы с Google Maps — дословно. Оригиналы сверены с выгрузкой страницы
// отзывов 01.10.2026 (испанский интерфейс Google). Обрезанные места помечены «…».
//
// lang — язык оригинала.
// translation — перевод на второй язык сайта:
//   • с испанского на русский — перевод Google из docs/reviews.md;
//   • с русского на испанский — наш перевод, на сайте подписан «Traducido del ruso».
// Даты не показываем: «год назад» на сайте быстро устаревает.
// ⚠️ Звёзды: в выгрузке их нет, на сайте у всех положительных пока 5 (Stars.astro). Сверить с Google.

import type { Lang } from './site';

export type Review = {
  id: string;
  author: string;
  lang: Lang;
  text: string;
  translation: string;
  // Тема — чтобы подбирать отзывы к секциям.
  topic: 'complex' | 'fear' | 'explain' | 'urgent' | 'family' | 'tech';
  doctor?: 'dmitry' | 'javier' | 'lucila';
};

export const reviews: Review[] = [
  {
    id: 'shein',
    author: 'Наталия Шеин',
    lang: 'ru',
    text: 'Мне в Валенсии все отказывались рвать этот зуб, отправляли в госпиталь. Дмитрий взялся и сделал свое дело качественно, терпеливо и быстро',
    translation:
      'En Valencia todos se negaban a sacarme esta muela y me mandaban al hospital. Dmitry se encargó e hizo su trabajo bien, con paciencia y rápido',
    topic: 'complex',
    doctor: 'dmitry',
  },
  {
    id: 'daniel',
    author: 'Daniel',
    lang: 'ru',
    text: 'Очень приятный и грамотный стоматолог, всё подробно объясняет, аккуратно проводит лечение и действительно заботится о комфорте пациента.',
    translation:
      'Un dentista muy agradable y competente: lo explica todo con detalle, trabaja con cuidado y de verdad se preocupa por la comodidad del paciente.',
    topic: 'explain',
    doctor: 'dmitry',
  },
  {
    id: 'fatyuk',
    author: 'Ирина Фатюк',
    lang: 'ru',
    text: 'Было острое состояние и зуб под удаление, Меня приняли на следующий день после обращения, доктор Дмитрий остался после своего рабочего дня, чтобы принять меня.',
    translation:
      'Tenía un dolor agudo y una muela para extraer. Me atendieron al día siguiente de llamar; el doctor Dmitry se quedó después de su jornada para atenderme.',
    topic: 'urgent',
    doctor: 'dmitry',
  },
  {
    id: 'khairova',
    author: 'Anna Khairova',
    lang: 'ru',
    text: '…меня экстренно приняли с острой болью и спасли зуб после неудачного лечения в другом месте, все объяснили и показали на снимках.',
    translation:
      'Me atendieron de urgencia con dolor agudo y salvaron el diente tras un mal tratamiento en otro sitio; me lo explicaron todo y me lo enseñaron en las radiografías.',
    topic: 'complex',
  },
  {
    id: 'pod',
    author: 'Artemiy Pod',
    lang: 'ru',
    text: '2 из 4 зубов были очень проблемные и сложные в удалении (нервы близко к зубам и 8ка росла в сторону 7ки), но Дмитрий справился прекрасно',
    translation:
      '2 de las 4 muelas eran muy problemáticas y difíciles de extraer (nervios cerca y la muela del juicio crecía hacia el segundo molar), pero Dmitry lo hizo de maravilla',
    topic: 'complex',
    doctor: 'dmitry',
  },
  {
    id: 'anders',
    author: 'Georg Anders',
    lang: 'ru',
    text: 'Жена моя, которая панически боится дантистов, первый раз в жизни была довольна, а ей много чего сделали.',
    translation:
      'Mi mujer, que tiene pánico a los dentistas, salió contenta por primera vez en su vida, y eso que le hicieron bastantes cosas.',
    topic: 'fear',
    doctor: 'dmitry',
  },
  {
    id: 'bynkalo',
    author: 'Ivan Bynkalo',
    lang: 'ru',
    text: 'В Валенсии мы прошли через нескольких врачей и клиник, и только в Smile House нам оказали настоящую профессиональную помощь.',
    translation:
      'En Valencia pasamos por varios médicos y clínicas, y solo en Smile House nos dieron una ayuda profesional de verdad.',
    topic: 'complex',
  },
  {
    id: 'iglesia',
    author: 'Marcelino Iglesia',
    lang: 'es',
    text: 'Me atendió el Doctor Javier. Todos mis miedos se desvanecieron a los pocos minutos.',
    translation: 'Меня осмотрел доктор Хавьер. Все мои страхи исчезли за считанные минуты.',
    topic: 'fear',
    doctor: 'javier',
  },
  {
    id: 'garcia',
    author: 'Juanita Garcia',
    lang: 'es',
    text: 'Venía traumatizada con mis tratamientos de nervios anteriores. Y encontrar a alguien que te explica Todo, te trata con sumo cuidado y te transmite Seguridad y Paz.',
    translation:
      'Предыдущие процедуры лечения нервов меня травмировали. И найти человека, который всё объясняет, относится ко мне с такой заботой и вселяет уверенность и спокойствие…',
    topic: 'fear',
    doctor: 'javier',
  },
  {
    id: 'magris',
    author: 'Brune Magris',
    lang: 'es',
    text: 'Lucila una odontóloga excepcional, estoy muy contenta con el trato y con la profesionalidad con la que me atendió.',
    translation: 'Лусила — исключительный стоматолог. Я очень довольна её заботой и профессионализмом.',
    topic: 'explain',
    doctor: 'lucila',
  },
  {
    id: 'cotua',
    author: 'Esthefanya Cotua',
    lang: 'es',
    text: 'Excelente experiencia, explican todo el tratamiento, y trabajan con equipos de última tecnología (microscopio y scaner 3D).',
    translation:
      'Превосходный опыт. Они подробно объясняют весь процесс лечения и работают с самым современным оборудованием (микроскоп и 3D-сканер).',
    topic: 'tech',
  },
  {
    id: 'rl',
    author: 'RL Consulting',
    lang: 'es',
    text: 'El dentista fue muy profesional, amable y atento en todo momento. Me explicó el tratamiento con claridad y me hizo sentir muy cómodo.',
    translation:
      'Стоматолог был очень профессиональным, дружелюбным и внимательным на протяжении всего лечения. Он четко объяснил процедуру и создал очень комфортную атмосферу.',
    topic: 'explain',
  },
  {
    id: 'almudena',
    author: 'Almudena Garcia Marco',
    lang: 'es',
    text: 'Empecé llevando a mis hijos y ahora vamos toda la familia, super profesionales con aparatos modernísimos y a la ultima',
    translation:
      'Я начала водить туда своих детей, и теперь вся семья. Они невероятно профессиональны и используют самое современное оборудование.',
    topic: 'family',
  },
  {
    id: 'barrera',
    author: 'Joge Barrera Royo',
    lang: 'es',
    text: 'A destacar el Dr Javier que me atendió, tanto en explicaciones como en actuación. Me ha ganado como paciente',
    translation:
      'Я должен особо отметить доктора Хавьера, который меня лечил, как за его объяснения, так и за его работу. Он завоевал мое доверие как пациента.',
    topic: 'explain',
    doctor: 'javier',
  },
  {
    id: 'medina',
    author: 'José Medina Montoro',
    lang: 'es',
    text: 'Tratan al paciente como si fuese de su familia y con una delicadeza impresionante.',
    translation: 'Они относятся к пациентам как к членам семьи, с невероятной заботой и состраданием.',
    topic: 'family',
  },
];

export const reviewById = (id: string) => {
  const r = reviews.find((x) => x.id === id);
  if (!r) throw new Error(`review ${id} not found`);
  return r;
};

// Текст отзыва для страницы на языке `lang` + пометка, если это перевод.
export function quoteFor(r: Review, lang: Lang) {
  if (r.lang === lang) return { text: r.text, note: null as string | null };
  return {
    text: r.translation,
    note: lang === 'es' ? 'Traducido del ruso' : 'Перевод с испанского',
  };
}
