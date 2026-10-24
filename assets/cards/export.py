"""Run from repository root after: node bin/pxl.js build cards.px.js
Requires Pillow. Re-encodes unchanged pixels as RGBA; generates nearest previews.
"""
from pathlib import Path
from PIL import Image, ImageDraw
out = Path(__file__).resolve().parent
root = out.parent.parent
variants = ['common', 'rare', 'legendary']
for v in variants:
    with Image.open(root / 'out' / 'sprites' / f'card_{v}.png') as src:
        im = src.convert('RGBA')
        assert im.size == (80, 112)
        assert im.getchannel('A').getextrema() == (0, 255)
        assert set(im.getchannel('A').tobytes()) == {0, 255}
        im.save(out / f'{v}.png')
        with Image.open(out / f'{v}.png') as check:
            assert check.convert('RGBA').tobytes() == im.tobytes()
        im.resize((480, 672), Image.Resampling.NEAREST).save(out / 'previews' / f'{v}@6x.png')
        print(f'{v}: verified 80x112 RGBA, binary alpha, {len(im.getcolors())} colors including transparency')
canvas = Image.new('RGB', (1504,720), '#252730')
draw = ImageDraw.Draw(canvas)
for i,v in enumerate(variants):
    x = 16+i*496
    draw.text((x,10),v.upper(),fill='#edc382')
    for y in range(32,704,8):
        for xx in range(x,x+480,8):
            color = '#494951' if ((xx-x)//8+(y-32)//8)%2 else '#3b3b43'
            draw.rectangle((xx,y,xx+7,y+7),fill=color)
    with Image.open(out/'previews'/f'{v}@6x.png') as im:
        canvas.paste(im,(x,32),im)
canvas.save(out/'previews'/'comparison.png')
# Rarity decorations must never change content geometry or contaminate text fields.
regions=[(10,10,60,8),(12,26,56,31),(9,66,18,5),(31,66,18,5),
         (53,66,18,5),(10,79,60,18),(10,103,60,5)]
images=[Image.open(out/f'{v}.png').convert('RGBA') for v in variants]
for x,y,w,h in regions:
    crops=[im.crop((x,y,x+w,y+h)) for im in images]
    assert all(c.tobytes()==crops[0].tobytes() for c in crops)
    assert all(len(c.getcolors())==1 for c in crops)
assert all(im.getpixel((0,0))[3]==0 for im in images)
print('PASS: identical empty content regions across all three variants; transparent outer corners.')
