"""Фото клиники из materials/instagram/media -> site/assets/img/*.webp.

Запуск из корня репо: python3 -I tools/images.py
Ч/б кадры приводятся к одному тону (лёгкая S-кривая, тёплый нейтральный ч/б).
До/после и КТ-снимки остаются в цвете, как их опубликовала клиника.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance

SRC = Path('materials/instagram/media')
OUT = Path('site/assets/img')
OUT.mkdir(parents=True, exist_ok=True)

# имя: (исходник, crop-box или None, ч/б?, ширины)
W = (640, 1080, 1600)
JOBS = {
    'hero':        ('DdOre5sDuo4-2.jpg', None, True, (720, 1200, 1800)),
    'explain':     ('DahnUVbjh6K-1.jpg', None, True, W),
    'microscope':  ('DUTNV6JDBv6-2.jpg', None, True, W),
    'eyepiece':    ('DTTIyiADZ_7-3.jpg', None, True, W),
    'operatory':   ('DTTIyiADZ_7-1.jpg', None, True, W),
    'scanner':     ('DTTIyiADZ_7-4.jpg', None, True, W),
    'lab':         ('DN21qRB2rmm-5.jpg', None, True, W),
    'xray':        ('DN21qRB2rmm-2.jpg', None, True, W),
    'loupes':      ('DWHZlAWDSf7-2.jpg', None, True, W),
    'shield':      ('DZPK7pyjjBj-3.jpg', None, True, W),
    'assistant':   ('DXEg_x3DVTy-2.jpg', None, True, W),
    'team-micro':  ('DTTIyiADZ_7-5.jpg', None, True, W),
    'mirror':      ('DYnPRtEDoqv-2.jpg', None, True, W),
    'calm':        ('DYnPRtEDoqv-3.jpg', None, True, W),
    'hands':       ('DWHZlAWDSf7-4.jpg', None, True, W),
    'harvard':     ('DZLL0EODru5-2.jpg', None, True, (640, 1080)),
    'cbct-before': ('DVt_z_YDooL-1.jpg', None, False, (640, 1080)),
    'cbct-after':  ('DVt_z_YDooL-2.jpg', None, False, (640, 1080)),
    'wear-before': ('DVWPIBHDI9u-1.jpg', (0, 41, 1440, 634), False, (640, 1080, 1440)),
    'wear-after':  ('DVWPIBHDI9u-1.jpg', (0, 640, 1440, 1233), False, (640, 1080, 1440)),
    'smile-before':('DVWPIBHDI9u-2.jpg', (0, 0, 1440, 676), False, (640, 1080, 1440)),
    'smile-after': ('DVWPIBHDI9u-2.jpg', (0, 694, 1440, 1370), False, (640, 1080, 1440)),
    'metal-before':('DQt68YPDfVY-2.jpg', (0, 323, 1080, 666), False, (640, 1080)),
    'metal-after': ('DQt68YPDfVY-2.jpg', (0, 683, 1080, 1026), False, (640, 1080)),
}

def tone(im):
    g = ImageOps.grayscale(im)
    g = ImageOps.autocontrast(g, cutoff=0.4)
    # мягкая S-кривая
    lut = [int(255 * (0.5 - 0.5 * __import__('math').cos(3.14159 * (i / 255)))) * 0.35 + i * 0.65 for i in range(256)]
    g = g.point([int(v) for v in lut])
    # тёплый нейтральный ч/б: чёрный чуть тёплый, белый — фарфор
    return ImageOps.colorize(g, black=(16, 15, 14), white=(246, 243, 238), mid=(128, 125, 121))

sizes = {}
for name, (src, box, bw, widths) in JOBS.items():
    im = ImageOps.exif_transpose(Image.open(SRC / src)).convert('RGB')
    if box:
        im = im.crop(box)
    if bw:
        im = tone(im)
    else:
        im = ImageEnhance.Contrast(im).enhance(1.03)
    for w in widths:
        if w > im.width:
            w = im.width
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(OUT / f'{name}-{w}.webp', 'WEBP', quality=74, method=6)
    sizes[name] = (im.width, im.height, [min(w, im.width) for w in widths])
    print(name, im.size)

import json
Path('tools/images.json').write_text(json.dumps(sizes, indent=1))
