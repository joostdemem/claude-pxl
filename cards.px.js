// Original empty autobattler cards. Render: node bin/pxl.js build cards.px.js
// All variants share panel bounds. Coordinates are documented in assets/cards/README.md.
pal({ k:'#000000', d:'#513226', b:'#88552f', c:'#b17942', l:'#e0ad62',
      h:'#f5d28b', p:'#c4a477', q:'#c8aa7d', i:'#3a302e', j:'#51433a',
      a:'#ae8259', A:'#e1b987' })

// The inset bevel always leaves a flat, untextured writing surface.
function panel(x,y,w,h,fill) {
  return [rect(x,y,w,h,'k'), rect(x+1,y+1,w-2,h-2,'l'),
    hline(x+1,y+h-2,w-2,'d'), vline(x+w-2,y+1,h-2,'d'),
    rect(x+2,y+2,w-4,h-4,fill)]
}
// Boundaries follow the annotated reference: thin full-width stat row.
function statPanel(x) {
  return [rect(x,64,20,8,'k'),rect(x+1,65,18,6,'p')]
}
function corner(x,y,flip) {
  return stamp('_corner',x,y,{flip})
}
sprite('_corner', {w:7,h:7}, grid(0,0,`
  .llllll
  lcdddd.
  ldklll.
  ldld...
  ldld...
  l..d...
  l......`))
// Repeated angular scroll, inspired by carved metal rather than copied tracery.
sprite('_scroll',{w:7,h:9},grid(0,0,`
  ..cc...
  .cllc..
  clddlc.
  cl.dlc.
  .cllc..
  ..cl...
  .cl....
  cl.....
  .c.....`))
sprite('_gem',{w:5,h:5},grid(0,0,`
  ..k..
  .kAk.
  kAaak
  .kak.
  ..k..`))

sprite('_common',{w:80,h:112},
  // Chamfered silhouette and laminated bronze edge.
  poly([5,0,75,0,80,5,80,107,75,112,5,112,0,107,0,5],'k'),
  poly([6,2,74,2,78,6,78,106,74,110,6,110,2,106,2,6],'b'),
  hline(6,2,68,'h'),vline(2,6,100,'l'),hline(6,109,68,'d'),vline(77,6,100,'d'),
  box(4,4,72,104,'d'),box(5,5,70,102,'c'),
  // Recessed vertical channels: carved material, not random noise.
  vline(3,17,78,'d'),vline(76,17,78,'d'),
  // Engraved scrolls and short edge nicks stay outside the usable panels.
  stamp('_scroll',1,21),stamp('_scroll',72,21,{flip:'x'}),
  stamp('_scroll',1,88,{flip:'y'}),stamp('_scroll',72,88,{flip:'xy'}),
  hline(14,4,7,'l'),hline(59,4,7,'l'),
  vline(2,42,3,'h'),vline(77,92,3,'c'),
  hline(18,109,4,'c'),hline(59,2,3,'l'),
  corner(5,5),corner(68,5,'x'),corner(5,100,'y'),corner(68,100,'xy'),
  ...panel(8,8,64,12,'p'),
  ...panel(8,22,64,39,'i'),
  // A shallow inner edge makes the art aperture read as a distinct window.
  box(11,25,58,33,'j'),
  hline(8,62,64,'l'),...statPanel(8),...statPanel(30),...statPanel(52),hline(8,73,64,'l'),
  ...panel(8,77,64,22,'p'),
  ...panel(8,101,64,9,'p'),
  // A small, structural bronze clasp. No labels or game content baked in.
  rect(36,2,8,3,'d'),hline(37,2,6,'a'),hline(38,3,4,'A'),
  hline(13,108,12,'b'),hline(55,108,12,'b'))

sprite('_rare',{base:'_common',swap:{a:'#488b93',A:'#a9e0d4'}},
  stamp('_gem',2,53),stamp('_gem',73,53),
  vline(5,35,13,'a'),vline(74,35,13,'a'),
  grid(35,3,'aaAAAAaa'),hline(34,108,12,'a'))
sprite('_legendary',{base:'_common',swap:{a:'#bd7c38',A:'#ffe1a0',c:'#a47342',l:'#d5a65d'}},
  stamp('_gem',2,53),stamp('_gem',73,53),
  // Raised leaf carving stays entirely outside the content panels.
  line(4,30,6,34,'a'),line(6,34,4,38,'A'),line(4,40,6,44,'a'),
  line(75,30,73,34,'a'),line(73,34,75,38,'A'),line(75,40,73,44,'a'),
  grid(32,2,`
    ...A..A...
    .aaAAAAaa.
    aAAaaaaAAa`),
  hline(29,108,22,'a'),px(27,108,'c'),px(52,108,'c'),
  hline(11,5,15,'A'),hline(54,5,15,'A'))

// Finish all rarities under one upper-left light source. Recessed writing
// surfaces are deliberately excluded, so lighting never reduces text contrast.
for (const rarity of ['common','rare','legendary']) {
  sprite('card_'+rarity, {base:'_'+rarity},
    recolor({h:'l',l:'c',c:'b',b:'d',A:'a'}, (x,y) => x>=72 || y>=107),
    recolor({h:'l',l:'c',A:'a'}, (x,y) => x>=40 && y<8),
    // Two-pixel near-black silhouette; ornament cannot break the outline.
    hline(5,0,70,'k'),hline(5,1,70,'k'),
    hline(5,110,70,'k'),hline(5,111,70,'k'),
    vline(0,5,102,'k'),vline(1,5,102,'k'),
    vline(78,5,102,'k'),vline(79,5,102,'k'),
    line(0,5,5,0,'k'),line(1,5,5,1,'k'),
    line(74,0,79,5,'k'),line(74,1,78,5,'k'),
    line(0,106,5,111,'k'),line(1,106,5,110,'k'),
    line(74,111,79,106,'k'),line(74,110,78,106,'k'),
    // The illuminated rim stays inside the contour, away from the shadow edge.
    hline(7,2,28,'h'),hline(7,3,16,'l'),vline(2,8,25,'l'))
}
