# Meadowvale card templates

Three empty 80x112 RGBA cards rebuilt from the user's replacement layout: Common, Rare and Legendary. All game pixels use the supplied `palettes/meadowvale.hex`; each variant uses 12 opaque colors plus transparency. The outline is Meadowvale's darkest shade, `#211f21`. Common has a bronze frame; Rare adds muted green inlay; Legendary adds gold inlay. Rarity decorations sit outside all content panels.

## Editable sources and export

`cards.px.js` is the complete editable artwork for all three rarities. `card-template.px.js` is the monochrome geometry guide, kept separately from game exports.

From the repository root (Node >=22.18 and Python/Pillow):

```sh
node bin/pxl.js build cards.px.js
python assets/cards/export.py
```

The helper produces native PNGs and 6x nearest-neighbor previews. The comparison labels and checkerboard are preview-only. It checks exact dimensions, palette membership, binary alpha, outline color, unchanged rendered pixels, and identical empty content areas across all variants.

## Layout

The one-pixel panel boundaries follow the replacement diagram. Outer bounds are x, y, width, height:

| Panel | x | y | width | height |
| --- | --- | --- | --- | --- |
| Name | 8 | 6 | 64 | 12 |
| Art | 8 | 20 | 64 | 39 |
| ATK icon / label | 8 | 61 | 9 | 8 |
| ATK value | 18 | 61 | 10 | 8 |
| HP icon / label | 29 | 61 | 9 | 8 |
| HP value | 39 | 61 | 11 | 8 |
| CD icon / label | 51 | 61 | 9 | 8 |
| CD value | 61 | 61 | 11 | 8 |
| Effect area, including header | 8 | 72 | 64 | 27 |
| Type / tags | 8 | 102 | 64 | 6 |

Each usable interior is inset one pixel. The effect header occupies y=73..75, its separator is y=76, and the main effect area is y=77..97. The bottom field has a 4px-high interior, as drawn in the new template; use a 4px microfont there. The main effect field supports three 5px text rows with spacing. Stat values have a 6px-high interior. All names, icons, values, artwork and text are supplied by the game, not baked in.

Use Nearest texture filtering and integer scale in Godot. Transparent clipped corners are preserved. Panel edges remain thin; they consume no extra space for stacked bevels. The inspected final pass strengthens the recessed edges using the palette's darkest shade.
