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
  // Добавлено 08.10.2026 (tools/photos.py)
  'wear-before': [1280, 527],
  'wear-after': [1280, 527],
  'smile-before': [1280, 601],
  'smile-after': [1280, 601],
  'metal-before': [1080, 343],
  'metal-after': [1080, 343],
  'team-group': [552, 310],
  'entrance': [608, 1080],
  'operatory': [810, 1080],
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

// До/после — см. src/content/results.ts (галерея) и cases.ts (случаи).

// Рилсы клиники без текста (public/video/reel-<shortCode>.mp4 + .webp).
export const reels = [
  'DLFth6bNbgg', 'DXY8tOyjbG0', 'DLxCf6it33Y', 'Da5TFBjNEc9', 'DPjxos7jtvZ', 'DYhZa7-NoPX', 'DTdlk8vDpPL', 'DQZ-O5sDvoD',
];

// Видеоотзывы пациенток (на русском), public/video/story-<shortCode>.mp4.
export const stories = [
  { id: 'DNK75v2NLL_', url: 'https://www.instagram.com/p/DNK75v2NLL_/' },
  { id: 'DMsRk3gt8tm', url: 'https://www.instagram.com/p/DMsRk3gt8tm/' },
];
