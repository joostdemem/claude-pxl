// Four original environments. Native grid 640x360. All geometry in native pixels.
// Edit palettes, layout, or individual named layers; build with claude-pxl.
const REFINED = true;
const W=640,H=360;
const themes=[
 {name:'01_crimson_covenant',kind:'table',bg:'#13131c',deep:'#191923',shadow:'#20202a',floor:'#2b252d',floor2:'#302931',wear:'#352d34',seam:'#27232c',stone:'#403842',edge:'#65515a',hi:'#8c7170',gold:'#a58558',goldD:'#584534',red:'#873745',redD:'#4c2935',blue:'#873745',blueD:'#4c2935'},
 {name:'02_azure_bastion',kind:'castle',bg:'#121e33',deep:'#1c2b3e',shadow:'#233546',floor:'#354b58',floor2:'#384f5b',wear:'#3c535f',seam:'#304651',stone:'#486270',edge:'#6a8790',hi:'#a4b5ad',gold:'#b9a778',goldD:'#6a6b59',red:'#a95146',redD:'#623b42',blue:'#3d78a0',blueD:'#2c4967'},
 {name:'03_verdant_confluence',kind:'forest',bg:'#102824',deep:'#173730',shadow:'#204139',floor:'#304b43',floor2:'#334e46',wear:'#39554b',seam:'#2b463e',stone:'#4d6757',edge:'#71856a',hi:'#a3ac7c',gold:'#9cab70',goldD:'#536743',red:'#548d73',redD:'#2d5b4d',blue:'#4d9a8e',blueD:'#2c625c'},
 {name:'04_hollow_sanctum',kind:'dungeon',bg:'#121923',deep:'#1b2531',shadow:'#222e3c',floor:'#333e4b',floor2:'#36424f',wear:'#3b4653',seam:'#2e3946',stone:'#465361',edge:'#657582',hi:'#95a2a5',gold:'#8a8474',goldD:'#535758',red:'#9b694b',redD:'#59443c',blue:'#4188a0',blueD:'#2b5268'}
];
function rand(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function diamond(c,x,y,rx,ry,col){c.poly([x,y-ry,x+rx,y,x,y+ry,x-rx,y],col)}
function block(c,x,y,w,h,t){c.rect(x,y,w,h,t.shadow);c.rect(x+1,y+1,w-2,h-4,t.stone);c.hline(x+2,y+1,w-4,t.edge);c.vline(x+1,y+2,h-6,t.edge);c.hline(x+3,y+h-4,w-5,t.deep)}
function leaf(c,x,y,s,col){c.poly([x-s,y,x-2,y-s/2,x+s,y-1,x+3,y+3,x-s,y+4],col)}
function arch(c,x,y,w,h,t){c.rect(x,y+9,w,h-9,t.shadow);c.poly([x,y+10,x+5,y+3,x+w/2,y,x+w-5,y+3,x+w,y+10],t.edge);c.poly([x+4,y+12,x+8,y+6,x+w/2,y+4,x+w-8,y+6,x+w-4,y+12,x+w-4,y+h,x+4,y+h],t.bg);c.vline(x+3,y+12,h-12,t.stone);for(let k=8;k<w-5;k+=6)c.vline(x+k,y+12,h-12,t.shadow);c.hline(x+5,y+h-12,w-10,t.stone)}
function flame(c,x,y,cool){const a=cool?'#34798e':'#a34c3f',b=cool?'#65c1c4':'#ed9b57',d=cool?'#c0efcf':'#ffe0a0';c.poly([x-7,y+1,x-9,y-5,x-5,y-10,x-4,y-17,x,y-12,x+3,y-25,x+5,y-13,x+8,y-7,x+6,y+1],a);c.poly([x-4,y,x-5,y-6,x,y-15,x+1,y-8,x+4,y-5,x+3,y+1],b);c.poly([x-1,y,x-2,y-5,x+1,y-10,x+3,y-3,x+1,y+1],d);c.rect(x+5,y-23,1,2,b)}
function brazier(c,x,y,t,cool=false){c.ellipse(x+4,y+15,18,6,t.deep);block(c,x-11,y+2,22,16,t);c.rect(x-7,y-9,14,14,t.deep);c.vline(x-6,y-9,14,t.edge);c.vline(x+5,y-9,14,t.stone);flame(c,x,y-9,cool);c.poly([x-12,y-9,x+12,y-9,x+8,y-3,x-8,y-3],t.shadow);c.hline(x-11,y-9,22,t.gold);c.hline(x-7,y-4,14,t.edge);diamond(c,x,y+8,3,4,t.goldD)}
function banner(c,x,y,t,lower=false){const a=lower?t.blue:t.red,b=lower?t.blueD:t.redD;c.rect(x-15,y-3,30,3,t.deep);c.hline(x-15,y-3,30,t.gold);c.poly([x-12,y,x+12,y,x+12,y+30,x,y+39,x-12,y+30],b);c.poly([x-9,y,x+9,y,x+9,y+28,x,y+35,x-9,y+28],a);c.vline(x-8,y,27,t.goldD);c.vline(x+9,y,28,t.goldD);diamond(c,x,y+17,4,6,t.gold);c.hline(x-6,y+17,13,t.gold);c.vline(x,y+8,18,t.gold)}
function commonFloor(c,t){
 c.poly([62,52,578,52,620,282,20,282],t.deep);
 c.poly([65,56,575,56,606,279,34,279],t.floor);
 // Large staggered masonry courses, no slot-sized tiled grid.
 for(let row=0;row<8;row++){let y=60+row*28;let x=38-(row%2)*49;for(;x<610;x+=93){let xx=Math.max(58-row*3,x);let ww=Math.min(x+91,582+row*3)-xx;if(ww>0){c.rect(xx,y,ww,27,(row+Math.floor(x/93))%3===0?t.floor2:t.floor);c.hline(xx+1,y+27,ww-1,t.seam);c.vline(xx,y+3,24,t.seam)}}}
 c.rect(0,287,640,73,t.deep);for(let y=306;y<360;y+=28){c.hline(20,y,600,t.shadow);for(let x=55+(y%3)*70;x<640;x+=143)c.vline(x,y-25,24,t.shadow)}
}
function placement(c,t){
 // Small discontinuous worn strokes, never a closed perimeter.
 const rng=rand(756);
 for(const y of [112,223])for(let i=0;i<5;i++){
  let x=143+i*88;
  for(let k=0;k<9;k++){let dx=Math.floor(rng()*42)-21,dy=Math.floor(rng()*15)-6;
   c.hline(x+dx,y+dy,4+Math.floor(rng()*10),k%3?t.floor2:t.wear);
  }
  if(t.kind==='forest'){c.hline(x-18,y+10,6,t.seam);c.hline(x-15,y+11,9,t.seam)}
  if(t.kind==='dungeon'){c.line(x-14,y+9,x-18,y+5,t.floor2);c.hline(x-12,y+10,11,t.wear)}
 }
 for(const [x,y] of [[573,111],[66,222]]){
  c.hline(x-7,y+5,11,t.wear);c.hline(x-9,y+2,5,t.floor2);c.hline(x+1,y-4,7,t.floor2);
 }
}
function mix(a,b,f){let h='#';for(let i=1;i<7;i+=2)h+=Math.round(parseInt(a.slice(i,i+2),16)*(1-f)+parseInt(b.slice(i,i+2),16)*f).toString(16).padStart(2,'0');return h}
function atmosphere(c,t){
 const colors=[t.floor,t.floor2,t.seam];
 // Discrete palette bands: a gentle central pool, shade under raised walls.
 for(let n=0;n<5;n++){
  let m={};for(let col of colors)m[col]=mix(col,t.deep,(5-n)*.035);
  c.recolor(m,(x,y)=>x>38&&x<603&&y>57&&y<279&&(x<65+n*8||x>575-n*8||y<61+n*3||y>277-n*2));
 }
 for(const [x,y,cool] of [[51,67,false],[589,67,false],[42,265,true],[598,265,true]]){
  let tint=t.kind==='forest'?'#85b590':cool&&t.kind!=='table'?'#74b4bf':'#bb8660';
  for(let band=3;band>=1;band--){let m={};for(let col of colors)m[col]=mix(col,tint,(4-band)*.025);c.recolor(m,(xx,yy)=>(xx-x)**2/1.6+(yy-y)**2<Math.pow(band*15,2));}
 }
}
function edgeArchitecture(c,t){
 // Recessed back wall with physically raised capstones.
 c.rect(0,18,640,40,t.deep);
 for(let y=24;y<53;y+=12)for(let x=-(y%24?20:0);x<640;x+=42)block(c,x,y,41,12,t);
 c.rect(0,52,640,8,t.shadow);c.hline(0,51,640,t.hi);c.hline(0,53,640,t.edge);
 for(const flip of [false,true]){let X=x=>flip?640-x:x;
 c.poly([X(0),58,X(58),56,X(29),281,X(0),296],t.shadow);
 c.poly([X(0),59,X(51),58,X(23),278,X(0),289],t.stone);
 c.line(X(49),59,X(21),278,t.edge,2);
 for(let y=74;y<280;y+=23){let x=48-(y-58)*.13;c.line(X(0),y+4,X(x),y,t.deep);c.line(X(0),y+6,X(x-1),y+2,t.edge)}
 }
 c.poly([22,278,618,278,627,289,13,289],t.shadow);c.hline(24,278,592,t.edge);c.hline(17,286,606,t.stone);
 for(let x=31;x<620;x+=39){c.vline(x,280,6,t.deep);c.hline(x+2,280,29,t.stone)}
}
function divide(c,t){
 c.hline(39,166,562,t.deep);c.hline(38,168,564,t.stone);c.hline(38,169,564,t.edge);c.hline(38,171,564,t.shadow);
 diamond(c,320,169,15,10,t.deep);diamond(c,320,168,12,8,t.goldD);diamond(c,320,168,9,6,t.edge);diamond(c,320,168,4,4,t.gold);
 for(let x of [65,575]){diamond(c,x,169,7,4,t.shadow);c.hline(x-4,168,9,t.goldD)}
}
function castle(c,t){
 for(const x of [94,224,416,546]){block(c,x-17,0,34,54,t);block(c,x-20,0,40,9,t);arch(c,x-10,12,20,31,t)}
 banner(c,157,11,t);banner(c,483,11,t);
 // Small skyline visible above crenellated parapet.
 for(let x=268;x<377;x+=22){block(c,x,9,15,14,t)}
 for(const [x,y] of [[38,71],[602,71],[32,276],[608,276]])brazier(c,x,y,t,y>100);
 banner(c,81,263,t,true);banner(c,559,263,t,true);
 for(const x of [15,625]){block(c,x-15,144,30,42,t);diamond(c,x,162,6,9,t.goldD)}
}
function tableFloor(c,t){
 c.rect(28,46,584,244,t.deep);c.rect(35,51,570,230,t.floor);
 for(let y=52;y<282;y+=23){c.hline(36,y,568,t.seam);c.hline(36,y+1,568,t.floor2);for(let k=0;k<5;k++){let x=53+k*121+(y%7)*3;c.hline(x,y+8,30+(k*7)%35,t.floor2);c.hline(x+18,y+12,21,t.seam)}}
 // Broad, subdued felt inset; no repeated hard panels.
 c.poly([89,65,551,65,579,260,61,260],t.shadow);
 c.poly([91,67,549,67,577,258,63,258],t.floor);
 c.rect(0,293,640,67,t.bg);for(let y=310;y<360;y+=20)c.hline(0,y,640,t.deep);
}
function table(c,t){
 for(let y of [39,281]){c.rect(18,y,604,13,t.deep);c.hline(20,y,600,t.edge);c.hline(23,y+3,594,t.goldD);c.hline(20,y+10,600,t.stone);for(let x=30;x<620;x+=29){diamond(c,x,y+6,3,2,t.goldD)}}
 for(const x of [19,599]){c.rect(x,43,22,248,t.deep);c.vline(x+2,48,234,t.edge);c.vline(x+16,49,233,t.goldD);for(let y=67;y<280;y+=36){c.rect(x+5,y,9,21,t.shadow);diamond(c,x+9,y+10,3,6,t.goldD)}}
 // Folded crimson drapery hangs away from standing areas.
 for(const x of [110,530]){c.poly([x-38,0,x+38,0,x+31,39,x,52,x-31,39],t.redD);c.poly([x-29,0,x+23,0,x+19,35,x,46,x-23,36],t.red);c.line(x-20,3,x-17,32,t.redD,3);c.line(x+12,2,x+9,36,t.redD,4);c.line(x-30,39,x,51,t.goldD);c.line(x,51,x+31,39,t.goldD);diamond(c,x,24,6,8,t.gold)}
 for(const [x,y] of [[49,63],[591,63],[47,273],[593,273]]){c.ellipse(x,y+4,20,7,t.bg);c.ellipse(x,y+2,17,5,t.goldD);c.ellipse(x,y,15,4,t.stone);for(let k=-1;k<=1;k++){let xx=x+k*9,yy=y-6-Math.abs(k)*5;c.rect(xx-2,yy-10,4,14,t.gold);c.vline(xx-2,yy-10,14,t.hi);c.rect(xx-2,yy+1,1,4,t.goldD);c.poly([xx-2,yy-12,xx,yy-20,xx+2,yy-13,xx+1,yy-10,xx-1,yy-10],'#efb86e');c.px(xx,yy-14,'#ffe6ac')}}
 for(const x of [28,612]){c.ellipse(x,168,16,20,t.bg);c.ellipse(x,166,13,18,t.goldD);c.ellipse(x,165,10,15,t.shadow);diamond(c,x,165,5,9,t.red)}
}
function forest(c,t){const r=rand(431);
 // Roots and canopies remain outside the combat lanes.
 for(const flip of [false,true]){const X=x=>flip?639-x:x;
 c.poly([X(0),0,X(75),0,X(61),36,X(40),66,X(37),130,X(26),192,X(34),264,X(70),290,X(0),312],t.deep);
 for(let j=0;j<4;j++){let x=7+j*11;c.line(X(x),0,X(x-8),95,'#394a38',7);c.line(X(x-8),95,X(18+j*3),192,'#394a38',5);c.line(X(18+j*3),192,X(39+j*9),282,'#394a38',4);c.line(X(x-2),0,X(x-11),93,'#526044',2)}
 for(let k=0;k<100;k++){let y=r()*340,x=r()*(y<57?110:29);leaf(c,X(x),y,4+r()*8,[t.shadow,'#2c5442','#3d6750','#50795a'][k%4])}
 for(let y of [92,250,311]){let x=X(28+r()*9);c.line(x,y+8,x+1,y-7,'#437e6a',1);leaf(c,x-3,y-3,5,'#509981');leaf(c,x+4,y-9,4,'#72b99c');c.rect(x,y-11,2,2,'#bcdb9b')}
 }
 for(const x of [116,220,420,524]){block(c,x-12,16,24,36,t);block(c,x-16,11,32,9,t);c.poly([x-5,16,x+7,16,x+4,47,x-1,47],t.shadow);c.hline(x-14,11,22,'#789566');c.rect(x-12,13,14,4,'#4d7953');c.line(x+10,13,x+7,31,t.deep);for(let j=0;j<5;j++)leaf(c,x-12+j*5,10-(j%2)*3,5,'#416e4e')}
 for(let x=70;x<580;x+=18){leaf(c,x,51+(x%7),7,'#3a6249');if(x%3===0)leaf(c,x,55,4,'#5c8059')}
 for(let x of [80,560]){c.ellipse(x,272,20,7,t.deep);block(c,x-12,251,24,20,t);c.poly([x-6,252,x-9,238,x-1,223,x+6,230,x+8,245,x+3,253],'#387f78');c.poly([x-2,226,x+3,232,x+3,246,x-1,250],'#78c3a5');c.hline(x-8,267,15,t.edge)}
 // A quiet moonpool in the far background, outside the battlefield.
 c.ellipse(320,30,59,15,t.shadow);c.ellipse(320,29,51,11,'#2b5650');c.hline(296,28,47,'#548579');c.hline(307,32,25,'#76a18a');
}
function dungeon(c,t){
 for(const x of [103,212,428,537]){block(c,x-20,0,40,56,t);block(c,x-23,0,46,9,t);arch(c,x-12,12,24,39,t);c.line(x+13,4,x+7,11,t.deep);c.line(x+7,11,x+10,16,t.deep)}
 arch(c,282,-13,76,65,t);for(let x=291;x<352;x+=10){c.vline(x,6,42,t.stone);c.vline(x+1,6,42,t.shadow)}
 for(const x of [49,591])for(let y=1;y<67;y+=7){c.ellipse(x+(y%3),y,2,4,t.edge,true);c.px(x-1,y-2,t.hi)}
 for(const [x,y] of [[47,72],[593,72],[37,274],[603,274]])brazier(c,x,y,t,y>100);
 for(const x of [16,624]){block(c,x-16,136,32,53,t);arch(c,x-9,144,18,31,t);diamond(c,x,163,3,5,t.blue)}
 for(const [x,y] of [[87,74],[543,80],[96,265],[526,263]]){c.line(x,y,x+7,y+5,t.shadow);c.line(x+7,y+5,x+5,y+12,t.shadow);c.line(x+5,y+12,x+13,y+17,t.shadow);c.line(x+8,y+6,x+15,y+4,t.shadow);c.hline(x+9,y+7,6,t.edge)}
}
function refinement(c,t){
 const rng=rand(8319);
 // Material wear follows masonry corners, not random filler dots.
 if(t.kind!=='table'){
  for(let row=0;row<8;row++){
   const y=60+row*28;
   for(let x=132-(row%2)*49;x<560;x+=93){
    if((row+x)%4===0){c.hline(x+1,y+26,7,t.floor2);c.hline(x+3,y+25,3,t.floor2)}
   }
  }
  for(let x=70;x<580;x+=47){c.hline(x,54,12,t.stone);c.hline(x+3,55,6,t.shadow)}
 }
 if(t.kind==='table'){
  // Engraved brass filigree at the corners of the physical wooden rim.
  for(let x of [69,571])for(let y of [62,265]){
   let sx=x<320?1:-1,sy=y<170?1:-1;
   c.line(x,y,x+sx*26,y,t.goldD);c.line(x,y,x,y+sy*21,t.goldD);
   c.line(x+sx*6,y+sy*3,x+sx*17,y+sy*3,t.goldD);
   c.line(x+sx*3,y+sy*6,x+sx*3,y+sy*15,t.goldD);
   diamond(c,x+sx*7,y+sy*7,2,2,t.gold);
  }
  // Crimson velvet valance with folds and embroidered hem in upper frame.
  c.poly([211,0,429,0,420,18,391,28,249,28,220,18],t.redD);
  c.poly([226,0,414,0,407,14,387,23,253,23,233,14],t.red);
  for(let x=239;x<412;x+=17)c.line(x,0,x+(x<320?4:-4),18,t.redD,2);
  c.hline(258,25,124,t.goldD);c.hline(278,27,84,t.goldD);
  diamond(c,320,20,11,13,t.goldD);diamond(c,320,20,8,10,t.deep);diamond(c,320,20,4,6,t.red);
  for(let x=85;x<560;x+=23){c.hline(x,46,9,t.goldD);c.px(x,47,t.gold);c.hline(x,285,9,t.goldD)}
  // Scuffs are confined to exposed wood beside the felt.
  for(let j=0;j<20;j++){let x=j%2?573:49,y=83+j*8;c.hline(x,y,9+(j%5),t.stone);c.hline(x+3,y+1,5,t.floor2)}
  for(let x of [20,600])for(let y of [48,280]){c.rect(x,y,17,8,t.stone);c.hline(x+2,y+1,13,t.goldD);c.px(x+3,y+3,t.gold);c.px(x+13,y+3,t.gold)}
 }
 if(t.kind==='castle'){
  // Carved small vaults and cornices, far above the standing lanes.
  for(let x of [94,224,416,546]){c.hline(x-15,9,30,t.goldD);c.hline(x-13,10,26,t.edge);c.hline(x-13,47,26,t.edge);for(let xx of [x-14,x+13]){c.vline(xx,18,27,t.edge);c.px(xx,20,t.hi)}diamond(c,x,7,3,2,t.gold)}
  for(let x of [157,483]){c.line(x-10,16,x-8,35,t.redD);c.vline(x+7,13,21,t.redD);c.hline(x-7,15,5,t.red)}
  for(let x=280;x<370;x+=14){c.hline(x,42,8,t.edge);c.px(x+3,44,t.goldD)}
  for(const [x,y] of [[38,71],[602,71],[32,276],[608,276]]){c.hline(x-7,y+3,14,t.edge);c.vline(x-7,y+5,8,t.stone);c.hline(x-6,y+14,12,t.deep)}
  for(let x of [18,622]){c.line(x-7,157,x,151,t.edge);c.line(x,151,x+7,157,t.edge);c.hline(x-6,176,13,t.goldD)}
 }
 if(t.kind==='forest'){
  // Replace straight dividers with a weathered stone seam and small root bridges.
  c.hline(40,169,266,t.stone);c.hline(335,169,266,t.stone);
  for(let x=51;x<600;x+=31){c.hline(x,169,9,t.shadow);c.hline(x+5,168,6,t.edge)}
  for(const flip of [false,true]){const X=x=>flip?639-x:x;
   // Twisting bark limbs frame the top corners.
   c.line(X(10),18,X(64),6,'#3d503b',9);c.line(X(64),6,X(108),0,'#3d503b',6);
   c.line(X(12),16,X(62),4,'#61704a',2);
   c.line(X(16),171,X(53),165,'#3b523d',5);c.line(X(53),165,X(76),170,'#3b523d',3);
   c.line(X(17),169,X(52),164,'#637551',1);
   // Clustered fern fans and broad leaves, highlights only on exposed tips.
   for(const [xx,y] of [[17,76],[24,197],[40,294],[73,30],[16,334]]){
    let x=X(xx);c.line(x,y+9,x,y-13,'#456c4d');
    for(let k=0;k<5;k++)for(let side of [-1,1]){
      c.line(x,y+5-k*4,x+side*(13-k*2),y-k*5,'#416e4b',2);
      c.line(x+side,y+4-k*4,x+side*(12-k*2),y-k*5-1,'#73935e');
    }
   }
   for(let j=0;j<19;j++){let x=X(5+rng()*31),y=10+rng()*328;
    leaf(c,x,y,7,'#244a3b');leaf(c,x-1,y-2,5,'#3d7051');c.hline(x-3,y-3,4,'#679064');
   }
   for(let [xx,y] of [[42,102],[28,236],[52,301]]){let x=X(xx);c.vline(x,y,5,'#90ae8b');c.ellipse(x,y,4,2,'#4b9f8c');c.hline(x-2,y-1,4,'#9cceb0');c.px(x+8,y-9,'#d2d69a')}
  }
  // Lily pads make the quiet pool read as water, not a panel.
  for(const [x,y] of [[287,28],[341,33],[321,24]]){c.ellipse(x,y,6,2,'#47765a');c.hline(x-4,y-1,5,'#6c936a');c.line(x,y,x+5,y+2,'#2b5650')}
  for(const x of [116,220,420,524]){c.line(x+9,20,x+4,24,t.deep);c.line(x+4,24,x+6,32,t.deep);leaf(c,x+9,17,5,'#527951')}
 }
 if(t.kind==='dungeon'){
  // Incised ward symbols on peripheral buttresses, away from unit positions.
  for(const x of [103,212,428,537]){c.hline(x-17,53,34,t.deep);c.hline(x-16,8,32,t.edge);for(let k=0;k<4;k++)c.hline(x-17,15+k*9,4,t.edge);c.line(x+15,34,x+10,39,t.deep);c.line(x+10,39,x+12,47,t.deep)}
  // Broken architectural debris sits only at the apron edges.
  for(const [x,y] of [[20,316],[601,307],[15,111],[606,211]]){
   c.poly([x-6,y+8,x+19,y+9,x+24,y+3,x+9,y-1],t.bg);
   c.poly([x-7,y,x+3,y-7,x+16,y-4,x+19,y+2,x+7,y+5,x-7,y+3],t.stone);
   c.line(x-6,y,x+4,y-6,t.edge);c.line(x+4,y-6,x+15,y-3,t.edge);c.line(x+3,y-5,x+7,y+3,t.shadow);
  }
  for(const [x,y] of [[47,72],[593,72],[37,274],[603,274]]){c.vline(x-7,y+4,9,t.edge);c.vline(x+7,y+4,9,t.shadow);c.hline(x-8,y+1,16,t.goldD)}
  c.hline(282,50,76,t.deep);c.hline(287,49,66,t.edge);
  // Floor inscriptions are shallow and fragmented beside the center, not slots.
  for(let x of [105,535]){c.line(x-9,158,x-5,154,t.seam);c.hline(x-4,154,7,t.seam);c.line(x+7,156,x+9,159,t.seam);c.hline(x-3,158,4,t.floor2)}
 }
}
for(const t of themes){
 scene(t.name,{w:W,h:H,bg:t.bg,layers:true},
 layer('01_ground',c=>{t.kind==='table'?tableFloor(c,t):commonFloor(c,t);atmosphere(c,t);}),
 layer('02_worn_placement_hints',c=>placement(c,t)),
 layer('03_arena_structure',c=>{if(t.kind!=='table')edgeArchitecture(c,t);divide(c,t)}),
 layer('04_theme_props',c=>({table,castle,forest,dungeon}[t.kind])(c,t)),
 layer('05_refinement',c=>{if(REFINED)refinement(c,t);}));
}
