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
  // Язык оригинала. Отзывы на английском переводим на оба языка сайта (tr).
  lang: Lang | 'en';
  text: string;
  translation?: string;
  tr?: Partial<Record<Lang, string>>;
  // Дополнительные отзывы (выгрузка Google 08.10.2026) — показываются по кнопке «ещё».
  more?: boolean;
  // Тема — чтобы подбирать отзывы к секциям.
  topic: 'complex' | 'fear' | 'explain' | 'urgent' | 'family' | 'tech' | 'care';
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
// ─── Добавлено 08.10.2026 из выгрузки Google Maps (Apify): все 5★, дословно. ───
  // Не берём отзывы, где хвалят Марию (CLAUDE.md), и слова «безболезненно».
  {
    id: 'svietlieisha', author: 'Nataliia Svietlieisha', lang: 'es', topic: 'complex', more: false,
    text: 'Llegué después de una mala experiencia en otra clínica, donde me puse brackets y quedé completamente insatisfecha. Aqui solucionaron mi problema y me ofrecieron todo lo que necesitaba',
    translation: 'Я пришла после неудачного опыта в другой клинике, где мне поставили брекеты и я осталась совершенно недовольна. Здесь решили мою проблему и предложили всё, что мне было нужно.',
  },
  {
    id: 'nabilkova', author: 'Olga Nabilkova', lang: 'ru', topic: 'complex',
    text: 'Чтобы достичь идеального результата доктор даже связывался с моей предыдущей клиникой, чтобы согласовать установку недоделанного там импланта. Вся работа по восстановлению была четко распланирована…',
    translation: 'Para conseguir un resultado perfecto, el doctor incluso se puso en contacto con mi clínica anterior para coordinar el implante que habían dejado a medias. Todo el trabajo de rehabilitación estuvo planificado al detalle…',
  },
  {
    id: 'androsova', author: 'Nadezda Androsova', lang: 'ru', topic: 'explain',
    text: 'Другие врачи напугали меня, неверно оценив ситуацию. Здесь же ответили адекватно на все вопросы, ссылаясь на реальные источники.',
    translation: 'Otros médicos me asustaron al valorar mal la situación. Aquí respondieron con sensatez a todas mis preguntas, basándose en fuentes reales.',
  },
  {
    id: 'afanasieva', author: 'Лариса Афанасьева', lang: 'ru', topic: 'complex', more: true,
    text: 'И единственные врачи, которые смогли мне помочь и не остались безразличны к моим проблемам- это сотрудники этой клиники. Теперь и я и мои близкие все лечимся только там, хотя ездить приходится из Барселоны.',
    translation: 'Los únicos médicos que pudieron ayudarme y a los que no les dieron igual mis problemas son los de esta clínica. Ahora mi familia y yo solo nos tratamos allí, aunque tengamos que venir desde Barcelona.',
  },
  {
    id: 'shurigin', author: 'Alexandr Shurigin', lang: 'en', topic: 'care', more: true,
    text: 'The very best clinic I know. I have living experience in four countries and the doctors there are the most professional people I’ve met in my life!',
    tr: {
      es: 'La mejor clínica que conozco. He vivido en cuatro países y estos doctores son las personas más profesionales que he conocido en mi vida.',
      ru: 'Лучшая клиника, которую я знаю. Я жил в четырёх странах, и здешние врачи — самые профессиональные люди, которых я встречал.',
    },
  },
  {
    id: 'elenad', author: 'Елена Д', lang: 'ru', topic: 'explain', more: true,
    text: 'Обратилась в клинику со сломанным зубом. Описали лечение и сразу обозначили сумму. … В итоге получилось вылечить зуб более щадящим способом и за меньшие деньги.',
    translation: 'Fui a la clínica con un diente roto. Me describieron el tratamiento y me dijeron el precio desde el principio. … Al final pudieron tratar el diente de una forma más conservadora y por menos dinero.',
  },
  {
    id: 'cristina', author: 'Sh. Cristina', lang: 'es', topic: 'urgent', more: true,
    text: 'Desde hace cuatro años confío en ellos y siempre estoy satisfecho con el resultado. En caso de emergencia, siempre te ayudará.',
    translation: 'Я доверяю им уже четыре года и всегда довольна результатом. В экстренной ситуации здесь всегда помогут.',
  },
  {
    id: 'tokareva', author: 'Dominika Tokareva', lang: 'es', topic: 'care', more: true,
    text: 'Me ha encantado, el servicio es muy bueno y avanzado. Se nota que son especialistas, un servicio de 10 y súper personalizado.',
    translation: 'Мне очень понравилось, сервис отличный и современный. Сразу видно, что это специалисты: обслуживание на 10 из 10 и очень индивидуальное.',
  },
  {
    id: 'chikina', author: 'Ирина Чикина', lang: 'ru', topic: 'complex', doctor: 'dmitry', more: true,
    text: 'Лучшая стоматология!!! Огромная благодарность Дмитрию за имплант! Тут работают профи!',
    translation: '¡La mejor clínica dental! ¡Muchísimas gracias a Dmitry por el implante! ¡Aquí trabajan profesionales!',
  },
  {
    id: 'linares', author: 'Clàudia Linares Torres', lang: 'es', topic: 'family', more: true,
    text: '¡Los mejores profesionales de toda Valencia! La atención es súper agradable y cercana por parte de todos los trabajadores, se nota en el ambiente que son una gran familia.',
    translation: 'Лучшие профессионалы во всей Валенсии! Все сотрудники очень приветливы и внимательны, по атмосфере видно, что это одна большая семья.',
  },
  {
    id: 'ffuta', author: 'ffuta nnata', lang: 'en', topic: 'care', more: true,
    text: 'I really liked this clinic! The doctors are very attentive, and the clinic itself looks beautiful and clean',
    tr: {
      es: '¡Me ha gustado mucho esta clínica! Los doctores son muy atentos y la clínica es bonita y está limpia.',
      ru: 'Мне очень понравилась эта клиника! Врачи очень внимательные, а сама клиника красивая и чистая.',
    },
  },
  {
    id: 'laura', author: 'Laura B', lang: 'es', topic: 'care', doctor: 'javier', more: true,
    text: 'Un trato excelente, en especial gracias al Doctor Javier por su profesionalidad y buena atención.',
    translation: 'Отличное обслуживание, особая благодарность доктору Хавьеру за профессионализм и внимание.',
  },
  {
    id: 'tikhonova', author: 'Валентина Тихонова', lang: 'ru', topic: 'care', more: true,
    text: 'Сначала сняли брекеты, всё прошло быстро, капы изготовили в тот же день, ортодонт Марибель проконсультировала по капам и ретейнеру.',
    translation: 'Primero me quitaron los brackets, todo fue rápido, las férulas me las hicieron el mismo día y la ortodoncista Maribel me explicó cómo usar las férulas y el retenedor.',
  },
  {
    id: 'sitnikova', author: 'Nataly Sitnikova', lang: 'es', topic: 'care', more: true,
    text: 'Excelente servicio y el personal muy amable. La mejor experiencia que he tenido para limpieza dental profunda!',
    translation: 'Отличный сервис и очень приветливый персонал. Лучшая глубокая чистка зубов, которая у меня была!',
  },
  {
    id: 'golubitsky', author: 'Роман Голубицкий', lang: 'ru', topic: 'complex', more: true,
    text: 'Самая лучшая клиника в Валенсии по реабилитации лицевой хирургии !!!!',
    translation: '¡La mejor clínica de Valencia para la rehabilitación tras cirugía facial!',
  },
  {
    id: 'tulba', author: 'Maxim Tulba', lang: 'es', topic: 'care', more: true,
    text: 'Vale la pena esperar la cita, excepcional servicio',
    translation: 'Запись того стоит, обслуживание исключительное.',
  },
  {
    id: 'skrypka', author: 'Semen Skrypka', lang: 'ru', topic: 'explain', more: true,
    text: 'Отличная клиника. Врачи не просто берут деньги, а выполняют свою работу.',
    translation: 'Una clínica excelente. Los médicos no solo cobran: hacen su trabajo de verdad.',
  },
  {
    id: 'afanasev', author: 'Oleg Afanasev', lang: 'ru', topic: 'tech', more: true,
    text: 'Лучшая клиника Валенсии с русскоговорящими Врачами. Прекрасное оборудование и отношение к пациентам.',
    translation: 'La mejor clínica de Valencia con doctores que hablan ruso. Un equipamiento excelente y un gran trato a los pacientes.',
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
  const notes: Record<Lang, Record<string, string>> = {
    es: { ru: 'Traducido del ruso', en: 'Traducido del inglés' },
    ru: { es: 'Перевод с испанского', en: 'Перевод с английского' },
  };
  return { text: r.tr?.[lang] ?? r.translation ?? r.text, note: notes[lang][r.lang] ?? null };
}
