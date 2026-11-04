function start(){
 if(!scene)initWorld();
 actors.forEach(a=>scene.remove(a.mesh));loot.forEach(l=>scene.remove(l.mesh));actors=[];loot=[];
 player=makeActor('You',false);actors.push(player);for(let i=1;i<=20;i++)actors.push(makeActor('Bot'+i,true));
 for(let i=0;i<150;i++)spawnLoot();
 zoneInit();$('feed').innerHTML='';running=true;$('menu').style.display='none';
 renderer.domElement.requestPointerLock();last=performance.now();requestAnimationFrame(loop)}
function camUpdate(){const ty=player.y+1.6;
 camera.position.set(player.x+Math.sin(yaw)*4.5+Math.cos(yaw)*.8,Math.max(.4,ty+.8-pitch*3),player.z+Math.cos(yaw)*4.5-Math.sin(yaw)*.8);
 camera.rotation.set(pitch,yaw,0)}
function playerControl(dt){
 const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
 const f=(keys.w?1:0)-(keys.s?1:0),s=(keys.d?1:0)-(keys.a?1:0),L=Math.hypot(f,s)||1,sp=keys.shift?10:6.5;
 player.x+=(fx*f+rx*s)/L*sp*dt;player.z+=(fz*f+rz*s)/L*sp*dt;
 if(keys[' ']&&player.y<=0)player.vy=7;player.vy-=20*dt;player.y=Math.max(0,player.y+player.vy*dt);if(player.y===0&&player.vy<0)player.vy=0;
 player.yaw=yaw;collide(player,.5);camUpdate();
 if(mouseDown){const d=new THREE.Vector3();camera.getWorldDirection(d);shoot(player,d,keys.shift?.01:0)}}
function update(dt){zoneUpdate(dt);const dmg=1+phase*1.5;
 for(const a of actors){if(!a.alive)continue;a.cd-=dt;
  if(Math.hypot(a.x-zone.x,a.z-zone.z)>zone.r)hurt(a,dmg*dt,null);
  if(!a.alive)continue;if(a.bot){ai(a,dt);collide(a,.5)}pickups(a);
  a.mesh.position.set(a.x,a.y,a.z);a.mesh.rotation.y=a.yaw}
 if(!running)return;if(player.alive)playerControl(dt);
 for(let i=tracers.length-1;i>=0;i--){const t=tracers[i];t.t-=dt;if(t.t<=0){scene.remove(t.l);t.l.geometry.dispose();tracers.splice(i,1)}}
 for(const l of loot)l.mesh.rotation.y+=dt*2}
function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;if(running)update(dt);
 if(player){if(!player.alive)camUpdate();renderer.render(scene,camera);updateHUD()}if(running)requestAnimationFrame(loop)}
onkeydown=e=>keys[e.key.toLowerCase()]=true;onkeyup=e=>keys[e.key.toLowerCase()]=false;
onmousemove=e=>{if(document.pointerLockElement){yaw-=e.movementX*.0022;pitch=clamp(pitch-e.movementY*.0022,-.8,.9)}};
onmousedown=e=>{if(e.button===0&&running){mouseDown=true;if(!document.pointerLockElement)renderer.domElement.requestPointerLock()}};
onmouseup=()=>mouseDown=false;$('play').onclick=start;
