# Fantasy autobattler environments

Four original background-only environments made using **claude-pxl**, on a shared 640×360 pixel grid. The reference informed top/bottom composition, not traced artwork. No characters, cards, text, or gameplay slot rectangles are baked in.

| Environment | Final 1920×1080 PNG | Enlarged 2560×1440 preview |
|---|---|---|
| Crimson Covenant — dark ritual table | [PNG](png/01_crimson_covenant.png) | [Preview](previews/01_crimson_covenant.png) |
| Azure Bastion — stone fantasy arena | [PNG](png/02_azure_bastion.png) | [Preview](previews/02_azure_bastion.png) |
| Verdant Confluence — enchanted forest ruins | [PNG](png/03_verdant_confluence.png) | [Preview](previews/03_verdant_confluence.png) |
| Hollow Sanctum — underground dungeon | [PNG](png/04_hollow_sanctum.png) | [Preview](previews/04_hollow_sanctum.png) |

## Source and rebuild

The editable [battlefields.px.js](source/battlefields.px.js) contains all four theme palettes, reusable props, shared layout, and five named layers per environment. Native PNGs and transparent layer PNGs are included. Final and enlarged images use exact integer nearest-neighbor scaling without smoothing, gradients, or generated-image processing.

From the claude-pxl repository, using Node ≥22.18:

```sh
node assets/autobattler-battlefields/source/build.mjs
```

To use another engine checkout, pass its absolute path as the first argument. To edit and watch through pxl's live viewer:

```sh
node bin/pxl.js serve assets/autobattler-battlefields/source/battlefields.px.js
```

The exporter validates native dimensions and opacity and rebuilds native, final, preview, and individual layers.

## Shared Godot composition

Coordinates below use the **640×360 native grid**; multiply by 3 for the 1080p export. They are suggestions for future game entities, not drawn slot bounds.

- Five enemy anchors: x = 143, 231, 319, 407, 495; y = 112.
- Five player anchors: same x; y = 223.
- Enemy field hint: (573,111); player field hint: (66,222).
- Center separator: y ≈169; small center jewel at (320,168).
- Main open combat lanes: approximately y=70–151 and y=187–254.
- Bottom central hand/UI space: x=100–540, y=297–359. The edge decoration extends into the outer corners.

Use a 16:9 viewport or aspect-preserving letterboxing. For native PNGs, use Godot's Nearest texture filter and integer scaling. Add interactive slots and card/UI objects separately. The geometry intentionally stays fixed across environments.

## Review and refinement

Each first pass was rendered and visually inspected at 2×. The refined versions were inspected at 3× before packaging. See [review notes](review/REVIEW.md); first-pass PNGs are preserved there for comparison. This is a background-only review; runtime testing with your actual units and UI remains project-specific.
