const tracers=[],rc=new THREE.Raycaster();
function log(t){const p=document.createElement('p');p.textContent=t;$('feed').prepend(p);setTimeout(()=>p.remove(),5000)}
function mkLine(a,b){const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints([a,b]),new THREE.LineBasicMaterial({color:0xffee66}));scene.add(l);return l}
function shoot(a,dir,extra){const w=WEAPONS[a.w];if(a.cd>0||a.ammo<=0)return;a.cd=w.r;a.ammo--;
 const o=a===player?camera.position.clone():new THREE.Vector3(a.x,a.y+1.4,a.z);
 for(let i=0;i<w.p;i++){const d=dir.clone(),s=w.sp+(extra||0);d.x+=rnd(-s,s);d.y+=rnd(-s,s);d.z+=rnd(-s,s);d.normalize();
  let best=null,bt=300;
  for(const t of actors){if(!t.alive||t===a)continue;const c=new THREE.Vector3(t.x,t.y+1,t.z).sub(o),tt=c.dot(d);if(tt<0||tt>bt)continue;
   if(c.sub(d.clone().multiplyScalar(tt)).length()<.65){best=t;bt=tt}}
  rc.set(o,d);rc.far=bt;const h=rc.intersectObjects(blockMeshes)[0];let end;
  if(h){end=h.point;best=null}else end=o.clone().add(d.clone().multiplyScalar(best?bt:80));
  const from=new THREE.Vector3(a.x,a.y+1.3,a.z).add(d.clone().multiplyScalar(1));
  tracers.push({l:mkLine(from,end),t:.06});
  if(best)hurt(best,w.d,a,a.w)}}
function hurt(t,d,by,wn){if(!t.alive)return;
 if(t.ar>0){const ab=Math.min(t.ar,d*.6);t.ar-=ab;d-=ab}
 t.hp-=d;if(t.hp>0)return;t.alive=false;t.mesh.rotation.z=Math.PI/2;t.mesh.position.y=.3;
 if(by&&by!==t){by.kills++;log(by.name+' ['+wn+'] eliminated '+t.name)}else log(t.name+' died in the zone');
 if(t===player)end(false);else if(actors.filter(x=>x.alive).length===1&&player.alive)end(true)}
function end(win){running=false;document.exitPointerLock();const place=actors.filter(a=>a.alive).length+(win?0:1);
 $('msg').textContent=win?'WINNER WINNER! You are the last one standing. Kills: '+player.kills:'You were eliminated. Placed #'+place+' with '+player.kills+' kills.';
 $('play').textContent='PLAY AGAIN';setTimeout(()=>$('menu').style.display='flex',1200)}
