// 32x32 RPG slime. Deliberate stepped clusters; no antialiasing or noise.
// Render: node bin/pxl.js build slime.px.js
pal({ k: '#132b2b', d: '#20543f', s: '#28774a', g: '#48a84d',
      l: '#85ce59', h: '#cff28c', e: '#ffe09a', t: '#bc8245', m: '#5a3950' })

// Outline is generated around the organic silhouette before placement.
sprite('_body', { w: 28, h: 25, outline: 'k' },
  poly([2,22, 1,20, 2,16, 4,13, 5,9, 7,5, 10,2, 14,1,
        18,2, 21,5, 23,10, 24,14, 26,18, 26,21, 24,23,
        20,23, 17,22, 13,23, 8,23, 6,22], 'g'),
  // Lower-right transmitted shadow, scalloped folds and a bright front lip.
  poly([21,6, 23,10, 24,14, 26,18, 26,21, 24,23, 20,23,
        17,22, 13,23, 8,23, 6,22, 2,22, 1,20, 4,20,
        7,21, 11,20, 16,21, 20,20, 22,17, 23,13], 's'),
  poly([25,18, 26,20, 24,22, 20,22, 17,21, 13,22, 8,22,
        6,21, 3,21, 2,20, 6,20, 9,21, 13,20, 17,20, 20,21, 23,20], 'd'),
  grid(4,18, `
    llgg
    glll
    .ggl`),
  // Broad top-left reflection follows the dome; highlights are clustered.
  poly([6,10, 7,6, 10,3, 14,2, 17,3, 13,4, 10,6, 9,9, 8,11], 'l'),
  grid(8,4, `
    ...hhh
    .hhhh.
    hhh...
    hh....`),
  grid(18,6, `
    ll.
    lll
    .ll`),
  // Inward-sloping brows and amber eyes; shared colors keep palette small.
  grid(7,11, `
    kk.......kk
    kekk...kkek
    keekk.kteek
    kteek.keetk
    .kkk...kkk.`),
  // Crooked mouth with one small fang, set above the darker belly.
  grid(10,17, `
    k......k
    kkkkkkkk
    .kemmmk.
    ..kkkk..`),
  grid(21,17, `
    lg
    ll`))

// Fixed canvas preserves transparent padding and Godot's 32px cell size.
sprite('green_slime', { w: 32, h: 32 }, stamp('_body', 1, 2))
