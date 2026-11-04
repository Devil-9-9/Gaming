function zoneInit(){zone={x:0,z:0,r:MAP*.9,fx:0,fz:0,fr:PHASES[0][0],sx:0,sz:0,sr:0,tot:1};phase=0;phaseT=PHASES[0][1];shrinking=false}
function zoneUpdate(dt){phaseT-=dt;
 if(!shrinking&&phaseT<=0&&phase<PHASES.length-1){shrinking=true;phaseT=zone.tot=PHASES[phase+1][1];
  zone.sx=zone.x;zone.sz=zone.z;zone.sr=zone.r;zone.fr=PHASES[phase+1][0];const a=rnd(0,6.28),m=Math.max(0,zone.r-zone.fr)*.7;
  zone.fx=clamp(zone.x+Math.cos(a)*m,-MAP+zone.fr,MAP-zone.fr);zone.fz=clamp(zone.z+Math.sin(a)*m,-MAP+zone.fr,MAP-zone.fr)}
 else if(shrinking){const k=1-Math.max(0,phaseT)/zone.tot;zone.r=zone.sr+(zone.fr-zone.sr)*k;zone.x=zone.sx+(zone.fx-zone.sx)*k;zone.z=zone.sz+(zone.fz-zone.sz)*k;
  if(phaseT<=0){shrinking=false;phase++;phaseT=PHASES[Math.min(phase,PHASES.length-1)][1]}}
 zoneMesh.scale.set(zone.r,1,zone.r);zoneMesh.position.set(zone.x,40,zone.z)}
