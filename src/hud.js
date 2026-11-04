const mx=$('mm').getContext('2d');
function updateHUD(){const s=160/(MAP*2),X=v=>(v+MAP)*s;
 mx.clearRect(0,0,160,160);mx.fillStyle='#4a7a3a88';mx.fillRect(0,0,160,160);
 mx.strokeStyle='#4af';mx.beginPath();mx.arc(X(zone.x),X(zone.z),zone.r*s,0,6.28);mx.stroke();
 mx.fillStyle='#f55';for(const a of actors)if(a.alive&&a.bot&&Math.hypot(a.x-player.x,a.z-player.z)<70)mx.fillRect(X(a.x)-1.5,X(a.z)-1.5,3,3);
 mx.fillStyle='#fc3';mx.beginPath();mx.arc(X(player.x),X(player.z),3.5,0,6.28);mx.fill();
 $('hp').style.width=Math.max(0,player.hp)+'%';$('ar').style.width=player.ar+'%';
 $('wep').textContent=player.w+' · Ammo '+player.ammo;$('alive').textContent='Alive: '+actors.filter(a=>a.alive).length;$('kills').textContent='Kills: '+player.kills;
 $('zoneinfo').textContent=(shrinking?'Zone shrinking: ':'Next shrink in: ')+Math.max(0,Math.ceil(phaseT))+'s'+(Math.hypot(player.x-zone.x,player.z-zone.z)>zone.r?'  ⚠ OUTSIDE ZONE':'')}
