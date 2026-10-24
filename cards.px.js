// New template, rebuilt from the supplied black/white layout.
// Render: node bin/pxl.js build cards.px.js
// All colors come from assets/cards/palettes/meadowvale.hex.
// Coordinates describe the OUTSIDE of each single-pixel panel boundary.
pal({
  k:'#211f21', d:'#63342f', b:'#754030', m:'#8f5638',
  c:'#a46935', l:'#ba824a', h:'#f0c479',
  p:'#f0eabb', s:'#dfc986', i:'#4b3546',
  a:'#9f7953', A:'#d0b06e'
})

function inset(x,y,w,h,fill) {
  return [rect(x,y,w,h,'k'),rect(x+1,y+1,w-2,h-2,fill),
    hline(x,y,w,'h'),vline(x,y,h,'l')]
}
function statPair(x,valueX,valueWidth) {
  return [...inset(x,61,9,8,'s'),...inset(valueX,61,valueWidth,8,'p')]
}

sprite('card_common',{w:80,h:112},
  // One-pixel dark contour, transparent clipped corners.
  poly([3,0,77,0,80,3,80,109,77,112,3,112,0,109,0,3],'k'),
  poly([4,1,76,1,79,4,79,108,76,111,4,111,1,108,1,4],'b'),
  // Slim warm frame. Highlights follow the top/left; right/bottom are recessed.
  hline(4,1,72,'l'),vline(1,4,104,'m'),
  hline(4,110,72,'d'),vline(78,4,104,'d'),
  box(3,3,74,106,'d'),hline(4,3,72,'c'),vline(3,4,104,'c'),
  rect(5,5,70,104,'m'),
  // Blank name; blank art. No additional inner lip or bevel consumes space.
  ...inset(8,6,64,12,'p'),
  ...inset(8,20,64,39,'i'),
  // Three paired stat groups (icon/label, then value).
  ...statPair(8,18,10),...statPair(29,39,11),...statPair(51,61,11),
  // Effect area with the exact shallow header strip drawn in the template.
  ...inset(8,72,64,27,'p'),rect(9,73,62,3,'s'),hline(9,76,62,'d'),
  ...inset(8,102,64,6,'p'),
  // Modest corner fasteners stay outside the content footprint.
  px(3,3,'A'),px(76,3,'a'),px(3,108,'a'),px(76,108,'d'),
  hline(6,2,10,'h'),hline(62,109,10,'d'))

// Rarity decoration is restrained and does not move a single panel edge.
sprite('card_rare',{base:'card_common',swap:{a:'#486363',A:'#90bfa2'}},
  vline(4,28,24,'a'),vline(75,28,24,'a'),
  vline(4,28,7,'A'),
  hline(32,3,16,'a'),hline(36,2,8,'A'),
  hline(34,109,12,'a'))

sprite('card_legendary',{base:'card_common',swap:{a:'#dfa150',A:'#ffec8c'}},
  // Narrow gold inlay and tiny engraved chevrons, clear of all text boxes.
  vline(4,23,34,'a'),vline(75,23,34,'a'),vline(4,23,10,'A'),
  hline(27,3,26,'a'),hline(32,2,16,'A'),
  line(3,34,5,36,'A'),line(5,36,3,38,'a'),
  line(76,34,74,36,'a'),line(74,36,76,38,'a'),
  hline(29,109,22,'a'),hline(35,110,10,'d'))
