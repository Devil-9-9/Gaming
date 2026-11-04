function ai(a,dt){a.t-=dt;let tg=null,bd=45;
 for(const o of actors)if(o!==a&&o.alive){const d=Math.hypot(o.x-a.x,o.z-a.z);if(d<bd){bd=d;tg=o}}
 if(a.t<=0){a.t=rnd(1.5,4);
  if(Math.hypot(a.x-zone.x,a.z-zone.z)>zone.r*.8){a.tx=zone.x+rnd(-8,8);a.tz=zone.z+rnd(-8,8)}
  else{let nl=null,nd=60;for(const l of loot){const d=Math.hypot(l.x-a.x,l.z-a.z);if(d<nd&&(l.k!=='med'||a.hp<100)){nd=d;nl=l}}
   if(nl){a.tx=nl.x;a.tz=nl.z}else{a.tx=a.x+rnd(-30,30);a.tz=a.z+rnd(-30,30)}}}
 let mx=a.tx-a.x,mz=a.tz-a.z;
 if(tg){const dx=tg.x-a.x,dz=tg.z-a.z;a.yaw=Math.atan2(-dx,-dz);
  if(bd>20){mx=dx;mz=dz}else if(bd<10){mx=-dx;mz=-dz}else{mx=-dz;mz=dx}
  if(Math.random()<.8)shoot(a,new THREE.Vector3(dx,tg.y+1-(a.y+1.4),dz).normalize(),.03)}
 else if(Math.hypot(mx,mz)>1)a.yaw=Math.atan2(-mx,-mz);
 const L=Math.hypot(mx,mz);if(L>1){a.x+=mx/L*4*dt;a.z+=mz/L*4*dt}}
