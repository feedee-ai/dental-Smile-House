# Smile House — сайт стоматологии в Валенсии

- **Прод:** https://smilehouse-valencia.vercel.app (ES `/`, RU `/ru/`)
- **v1 (исходная):** https://smilehouse-valencia-v1.vercel.app · **v2 (статическая):** https://smilehouse-valencia-v2.vercel.app

Демо для `Clínica dental Smile House` от 2BRO.LAB. Контекст и правила — в
[`CLAUDE.md`](CLAUDE.md) и [`docs/brief.md`](docs/brief.md). Что нужно от
клиники до запуска — [`docs/launch-checklist.md`](docs/launch-checklist.md).

## Запуск

```sh
npm install
npm run dev      # http://localhost:4321  (ES — /, RU — /ru/)
npm run build
npm run check    # типы
```

Форма заявки открывает WhatsApp клиники с готовым сообщением. Серверный путь
`/api/lead` → Telegram остался в коде (переменные из [`.env.example`](.env.example)),
но сейчас не используется.

## Где что лежит

| Путь | Что |
|---|---|
| `src/content/site.ts` | адрес, телефон, часы, ссылки; поля `null` — ждём от клиники |
| `src/content/copy.ts` | все тексты ES/RU |
| `src/content/reviews.ts` | отзывы Google: оригинал + перевод |
| `src/content/cases.ts` | сложные случаи из постов Instagram |
| `src/content/doctors.ts` | врачи (проверить состав!) |
| `src/content/photos.ts` | фото, когда появятся |
| `src/components/` | секции страницы |
| `src/pages/api/lead.ts` | приём заявки → Telegram |

## Дизайн

Взят из Instagram клиники: монограмма S|H, ч/б фотографии, коралловое
«выделение» фразы с точками по углам. Фон — фарфорово-белый, текст —
почти чёрный, акцент — один коралловый. Шрифты: Jost (заголовки), Onest
(текст), оба с кириллицей, раздаются с сайта. Иконки — Phosphor.
