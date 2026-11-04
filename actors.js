function makeActor(name,bot){const g=new THREE.Group(),M=c=>new THREE.MeshLambertMaterial({color:c});
 const body=new THREE.Mesh(new THREE.BoxGeometry(.8,1.1,.5),M(bot?0xcc4444:0xffcc33));body.position.y=.95;
 const head=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),M(0xf0c8a0));head.position.y=1.75;
 const legs=new THREE.Mesh(new THREE.BoxGeometry(.7,.8,.4),M(0x333355));legs.position.y=.4;
 const gun=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,.9),M(0x222222));gun.position.set(.4,1.2,-.5);
 g.add(body,head,legs,gun);scene.add(g);
 const p={x:0,z:0};for(let k=0;k<40;k++){p.x=rnd(-MAP+10,MAP-10);p.z=rnd(-MAP+10,MAP-10);const x=p.x,z=p.z;collide(p,1.5);if(Math.hypot(p.x-x,p.z-z)<.01)break}
 return{mesh:g,x:p.x,y:0,z:p.z,vy:0,hp:100,ar:0,w:'Pistol',ammo:40,cd:0,name,bot,alive:true,kills:0,t:0,tx:p.x,tz:p.z,yaw:0}}
function spawnLoot(){const p={x:rnd(-MAP+5,MAP-5),z:rnd(-MAP+5,MAP-5)};collide(p,1.5);const r=Math.random();
 const k=r<.3?'med':r<.5?'armor':r<.75?'ammo':'gun',w=WN[Math.floor(rnd(0,WN.length))];
 const col=k==='med'?0xff4444:k==='armor'?0x4499ff:k==='ammo'?0xffdd44:WEAPONS[w].c;
 const m=new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.6),new THREE.MeshLambertMaterial({color:col,emissive:col,emissiveIntensity:.4}));m.position.set(p.x,.8,p.z);scene.add(m);
 loot.push({x:p.x,z:p.z,k,w,mesh:m})}
function pickups(a){for(let i=loot.length-1;i>=0;i--){const l=loot[i];if(Math.hypot(l.x-a.x,l.z-a.z)>1.7)continue;
 if(l.k==='med'&&a.hp<100)a.hp=Math.min(100,a.hp+35);else if(l.k==='armor'&&a.ar<100)a.ar=Math.min(100,a.ar+40);
 else if(l.k==='ammo')a.ammo+=30;else if(l.k==='gun'){a.w=l.w;a.ammo+=20}else continue;
 if(a===player)log('Picked up '+(l.k==='gun'?l.w:l.k));scene.remove(l.mesh);loot.splice(i,1)}}
