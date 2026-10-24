// Run from anywhere: node assets/autobattler-battlefields/source/build.mjs
// Optional first argument: absolute path to a different claude-pxl checkout.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
const here=dirname(fileURLToPath(import.meta.url));
const engine=resolve(process.argv[2] || join(here,'../../..'));
const {loadProject,writePng,Img}=await import(pathToFileURL(join(engine,'dist/index.js')));
const project=loadProject(join(here,'battlefields.px.js'));
const out=resolve(here,'..');
const scale=(img,s)=>{const dst=new Img(img.w*s,img.h*s);for(let y=0;y<dst.h;y++)for(let x=0;x<dst.w;x++)dst.data[y*dst.w+x]=img.data[Math.floor(y/s)*img.w+Math.floor(x/s)];return dst;};
for(const name of project.exported()){
 const built=project.build(name),img=built.img;
 if(img.w!==640||img.h!==360)throw Error('Unexpected dimensions');
 for(const px of img.data)if((px&255)!==255)throw Error('Background must be opaque');
 for(const [dir,s] of [['native',1],['png',3],['previews',4]]){
  mkdirSync(join(out,dir),{recursive:true});writePng(join(out,dir,name+'.png'),s===1?img:scale(img,s));
 }
 for(const l of built.layers){mkdirSync(join(out,'layers',name),{recursive:true});writePng(join(out,'layers',name,l.name+'.png'),l.img);}
 console.log(name+': 640x360 native; 1920x1080 final; 2560x1440 nearest-neighbor preview; '+built.layers.length+' layers');
}
