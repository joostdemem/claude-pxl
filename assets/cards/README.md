# Empty fantasy autobattler cards

Original 80x112 templates: Common (bronze), Rare (verdigris accents), Legendary (gilded carving).
No names, stat labels, values, art, or descriptions are baked into the game PNGs.
The stat order is ATK, HP, CD from left to right. Rarity labels in the comparison image are preview-only.

## Rebuild

From the repository root, with Node >=22.18 and Python/Pillow:

```sh
node bin/pxl.js build cards.px.js
python assets/cards/export.py
```

`cards.px.js` is the shared editable source for all variants. The export helper preserves every rendered pixel while producing RGBA PNGs and 6x nearest-neighbor previews.

## Content coordinates

Top-left origin; x, y, width, height. Positions are identical for every rarity.

| Content | x | y | width | height |
| --- | --- | --- | --- | --- |
| Name | 10 | 10 | 60 | 8 |
| Art (inside inner lip) | 12 | 26 | 56 | 31 |
| ATK | 10 | 66 | 16 | 6 |
| HP | 32 | 66 | 16 | 6 |
| CD | 54 | 66 | 16 | 6 |
| Effect text | 10 | 79 | 60 | 18 |
| Type / tribe / tags | 10 | 103 | 60 | 5 |

Use a 3x5 pixel font at native scale; effect box fits three lines with 1px line spacing. Name and type fields fit about 15 glyphs with 1px character spacing. Longer content needs abbreviations or a larger UI design. Keep 1px inset padding where possible. Use Nearest filtering and no mipmaps in Godot for pixel-perfect rendering.

## Visual refinement

The first pass had a 4px-high type field and a smaller effect area. The final layout increases these to 5px and 18px usable height, respectively, while keeping the artwork prominent. Carved scrolls, inset bronze edging, and a few wear marks reflect the supplied material references without copying their card shapes or layout. Decoration remains outside the empty content regions.

## Validation

The exporter checks exact dimensions, binary alpha (0/255), transparent corners, unchanged render pixels, and identical flat content regions across the three variants. Each final PNG uses 11 opaque colors plus transparency. All previews use nearest-neighbor scaling; the comparison adds a checkerboard only for display.
