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
| ATK | 9 | 65 | 18 | 6 |
| HP | 31 | 65 | 18 | 6 |
| CD | 53 | 65 | 18 | 6 |
| Effect text | 10 | 79 | 60 | 18 |
| Type / tribe / tags | 10 | 103 | 60 | 5 |

Use a 3x5 pixel font at native scale; effect box fits three lines with 1px line spacing. Name and type fields fit about 15 glyphs with 1px character spacing. Longer content needs abbreviations or a larger UI design. Keep 1px inset padding where possible. Use Nearest filtering and no mipmaps in Godot for pixel-perfect rendering.

## Visual refinement

The first pass had a 4px-high type field and a smaller effect area. The final layout increases these to 5px and 18px usable height, respectively, while keeping the artwork prominent. Carved scrolls, inset bronze edging, and a few wear marks reflect the supplied material references without copying their card shapes or layout. Decoration remains outside the empty content regions.

## Validation

The exporter checks exact dimensions, binary alpha (0/255), transparent corners, unchanged render pixels, and identical flat content regions across the three variants. Common and Rare use 11 opaque colors plus transparency; Legendary uses 13 opaque colors plus transparency. All previews use nearest-neighbor scaling; the comparison adds a checkerboard only for display.

## Outline and lighting revision

Continuous 2px black contour, upper-left rim highlights, and reduced right/bottom reflections establish a single light direction. The stat row spans its original x=8..71 (64px wide), with three 20px boxes and 2px gutters. Each box is only 8px high with a one-pixel rim, rather than the earlier 10px height with a two-pixel bevel. The empty 18x6 interiors retain room for native 3x5 pixel text; show ATK/HP/CD labels or icons separately in the game UI. No final values are baked in.

The annotated reference guides the aligned panel boundaries and continuous horizontal rails around the stat row. The frame uses a distinct copper-gold ramp with a true #000000 outer contour; white annotation lines are not exported.
