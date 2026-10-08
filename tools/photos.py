"""Новые фото кейсов и команды -> public/photos/<name>-720.webp и -1280.webp (формат v1).
Запуск из корня репо: python3 -I tools/photos.py ; размеры печатает для src/content/photos.ts.
Источники: materials/instagram/media (посты клиники) и materials/google-maps/photos (карточка Google).
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance

IG, GM, OUT = Path('materials/instagram/media'), Path('materials/google-maps/photos'), Path('public/photos')
JOBS = {
    # до/после — пары одинакового кадра (для слайдера)
    'wear-before':  (IG / 'DVWPIBHDI9u-1.jpg', (0, 41, 1440, 634)),
    'wear-after':   (IG / 'DVWPIBHDI9u-1.jpg', (0, 640, 1440, 1233)),
    'smile-before': (IG / 'DVWPIBHDI9u-2.jpg', (0, 0, 1440, 676)),
    'smile-after':  (IG / 'DVWPIBHDI9u-2.jpg', (0, 694, 1440, 1370)),
    'metal-before': (IG / 'DQt68YPDfVY-2.jpg', (0, 323, 1080, 666)),
    'metal-after':  (IG / 'DQt68YPDfVY-2.jpg', (0, 683, 1080, 1026)),
    # команда и клиника (карточка Google)
    'team-group':   (GM / 'gm-16.jpg', None),
    'entrance':     (GM / 'gm-11.jpg', None),
    'operatory':    (GM / 'gm-07.jpg', None),
}
for name, (src, box) in JOBS.items():
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    if box: im = im.crop(box)
    im = ImageEnhance.Contrast(im).enhance(1.03)
    for w in (720, 1280):
        ww = min(w, im.width); h = round(im.height * ww / im.width)
        im.resize((ww, h), Image.LANCZOS).save(OUT / f'{name}-{w}.webp', 'WEBP', quality=76, method=6)
    print(f"  '{name}': [{min(1280, im.width)}, {round(im.height * min(1280, im.width) / im.width)}],")
