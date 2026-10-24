// New card layout traced from the user's replacement template.
// This monochrome geometry guide is separate from the Meadowvale game assets in cards.px.js.
// Render: node bin/pxl.js build card-template.px.js
// Coordinates are outer bounds. One-pixel strokes are deliberate.
pal({ k: '#000000', w: '#ffffff' })

sprite('card_template_layout', { w: 80, h: 112 },
  rect(0, 0, 80, 112, 'k'),
  // Name and artwork.
  box(8, 6, 64, 12, 'w'),
  box(8, 20, 64, 39, 'w'),
  // Three paired stat fields: a small icon/label cell and a value cell.
  box(8, 61, 9, 8, 'w'), box(18, 61, 10, 8, 'w'),
  box(29, 61, 9, 8, 'w'), box(39, 61, 11, 8, 'w'),
  box(51, 61, 9, 8, 'w'), box(61, 61, 11, 8, 'w'),
  // Effect area with a shallow header strip, then bottom type field.
  box(8, 72, 64, 27, 'w'), hline(9, 76, 62, 'w'),
  box(8, 102, 64, 6, 'w'))
