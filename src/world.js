const blockMeshes=[],circles=[],rects=[];
function initWorld(){
 scene=new THREE.Scene();scene.background=new THREE.Color(0x87ceeb);scene.fog=new THREE.Fog(0x87ceeb,60,260);
 camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,500);camera.rotation.order='YXZ';
 renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.domElement.style.cssText='position:fixed;left:0;top:0';
 document.body.prepend(renderer.domElement);
 addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});
 scene.add(new THREE.HemisphereLight(0xffffff,0x446644,.9));const dl=new THREE.DirectionalLight(0xffffff,.6);dl.position.set(50,100,30);scene.add(dl);
 const g=new THREE.Mesh(new THREE.PlaneGeometry(MAP*2,MAP*2),new THREE.MeshLambertMaterial({color:0x4a7a3a}));g.rotation.x=-Math.PI/2;scene.add(g);
 const trunk=new THREE.MeshLambertMaterial({color:0x6b4a2a}),leaf=new THREE.MeshLambertMaterial({color:0x1f6a2a}),
  walls=[0xb0a090,0x9a8a7a,0xa0b0c0].map(c=>new THREE.MeshLambertMaterial({color:c}));
 for(let i=0;i<150;i++){const x=rnd(-MAP+5,MAP-5),z=rnd(-MAP+5,MAP-5);if(Math.hypot(x,z)<8)continue;
  const t=new THREE.Mesh(new THREE.CylinderGeometry(.4,.5,4,6),trunk);t.position.set(x,2,z);
  const l=new THREE.Mesh(new THREE.ConeGeometry(2.2,5,7),leaf);l.position.set(x,6,z);scene.add(t,l);blockMeshes.push(t);circles.push({x,z,r:.7})}
 for(let i=0;i<22;i++){const w=rnd(8,16),d=rnd(8,16),h=rnd(4,7),x=rnd(-MAP+20,MAP-20),z=rnd(-MAP+20,MAP-20);
  const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),walls[i%3]);b.position.set(x,h/2,z);scene.add(b);blockMeshes.push(b);rects.push({x,z,w,d})}
 zoneMesh=new THREE.Mesh(new THREE.CylinderGeometry(1,1,80,48,1,true),new THREE.MeshBasicMaterial({color:0x3399ff,transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false}));scene.add(zoneMesh)}
function collide(a,r){
 for(const c of circles){const dx=a.x-c.x,dz=a.z-c.z,d=Math.hypot(dx,dz);if(d<c.r+r&&d>0){const n=(c.r+r-d)/d;a.x+=dx*n;a.z+=dz*n}}
 for(const b of rects){const cx=clamp(a.x,b.x-b.w/2,b.x+b.w/2),cz=clamp(a.z,b.z-b.d/2,b.z+b.d/2),dx=a.x-cx,dz=a.z-cz,d=Math.hypot(dx,dz);
  if(d<r){if(d>0){const n=(r-d)/d;a.x+=dx*n;a.z+=dz*n}else a.x=b.x+b.w/2+r}}
 a.x=clamp(a.x,-MAP+1,MAP-1);a.z=clamp(a.z,-MAP+1,MAP-1)}
