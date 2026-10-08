# Smile House — сайт стоматологии в Валенсии

Демо для `Clínica dental Smile House` от 2BRO.LAB. Контекст и правила — в
[`CLAUDE.md`](CLAUDE.md), бриф — [`materials/BRIEF.md`](materials/BRIEF.md),
что нужно от клиники — [`docs/launch-checklist.md`](docs/launch-checklist.md).

- **Прод:** https://smilehouse-valencia.vercel.app (ES `/`, RU `/ru/`, EN `/en/`)
- **Старая версия (Astro, до 07.10.2026):** ветка `v1`, https://smilehouse-valencia-v1.vercel.app

## Как устроено

Статический сайт без сборки на Vercel: Vercel раздаёт `site/` как есть
(`vercel.json`). HTML генерируется локально и коммитится.

```sh
node tools/build.mjs          # тексты/конфиг → site/**/index.html, sitemap, robots
python3 -I tools/images.py    # фото из materials/instagram/media → site/assets/img/*.webp
cd site && python3 -m http.server 4321   # посмотреть локально
```

| Путь | Что |
|---|---|
| `tools/config.mjs` | адрес, телефон, WhatsApp, часы, **цены** (`null` → «по консультации»), реквизиты |
| `tools/content.mjs` | все тексты ES/RU/EN |
| `tools/reviews.mjs` | отзывы Google дословно + переводы |
| `tools/sections.mjs` | разметка секций |
| `tools/legal.mjs` | aviso legal / privacidad / cookies |
| `site/assets/css/main.css`, `site/assets/js/main.js` | стили и поведение |

Запись: шторка «повод → день → время → врач → имя» собирает сообщение и
открывает WhatsApp клиники (`wa.me/34601443061`). На сервер ничего не уходит.
