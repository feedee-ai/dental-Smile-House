// Фото из Instagram клиники @smilehouse_vlc (выгрузка 01.10.2026).
// Лежат в public/photos/<name>-720.webp и <name>-1280.webp.
// Для боевой версии заменить на оригиналы от клиники (у Instagram сжатие).
//
// Кто на фото — по снимкам не установить. Поэтому к врачам по имени
// портреты не привязаны: показываем работу клиники, а не «вот это Хавьер».

export const photoSizes = {
  'hero-doctor': [1280, 1707],
  'ba-1': [1280, 1280],
  'ba-2': [1280, 1280],
  'ba-3': [1080, 706],
  'eq-microscope': [1280, 1707],
  'eq-scanner': [1280, 1707],
  'eq-digital': [1280, 1707],
  'eq-lab': [1280, 1707],
  'visit-explain': [1280, 1707],
  'team-microscope': [1280, 1707],
  'team-harvard': [1280, 1280],
  'strip-1': [1280, 1707],
  'strip-2': [1280, 1707],
  'strip-3': [1280, 1706],
  'strip-4': [1280, 1707],
  'strip-5': [1280, 1706],
  'strip-6': [1280, 1707],
  'strip-7': [1280, 1707],
  'strip-8': [1280, 1707],
  'strip-9': [1280, 1707],
} as const;

export type PhotoName = keyof typeof photoSizes;

export const photos = {
  // Врач за работой, ставится в первый экран за цитатой.
  hero: 'hero-doctor' as PhotoName | null,
};

// Ч/б лента работы клиники.
export const strip: PhotoName[] = [
  'strip-1', 'strip-3', 'strip-6', 'strip-4', 'strip-9', 'strip-2', 'strip-5', 'strip-8', 'strip-7',
];

// До/после — цветные, как опубликовала клиника.
export const beforeAfter: PhotoName[] = ['ba-1', 'ba-2', 'ba-3'];
