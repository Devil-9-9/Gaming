const $=id=>document.getElementById(id);
const MAP=200;
const WEAPONS={Pistol:{d:18,r:.35,sp:.01,p:1,c:0xdddddd},SMG:{d:9,r:.09,sp:.04,p:1,c:0x66ccff},Rifle:{d:22,r:.16,sp:.02,p:1,c:0xffcc66},Shotgun:{d:9,r:.8,sp:.09,p:6,c:0xff6666},Sniper:{d:75,r:1.2,sp:0,p:1,c:0xcc66ff}};
const WN=Object.keys(WEAPONS);
const PHASES=[[110,40],[70,35],[40,30],[20,25],[8,20],[3,15]];
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let scene,camera,renderer,player,actors=[],loot=[],zone,zoneMesh,running=false,keys={},yaw=0,pitch=.1,mouseDown=false;
let phase,phaseT,shrinking,last=0;
