const canvas=document.querySelector('#scene');
const fallback=document.querySelector('#fallback');
const button=document.querySelector('#play');
const speed=document.querySelector('#speed');
const speedValue=document.querySelector('#speed-value');
const dayOutput=document.querySelector('#day');
const status=document.querySelector('#status');
let day=0, playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
button.textContent=playing?'Pause':'Play';
button.addEventListener('click',()=>{playing=!playing;button.textContent=playing?'Pause':'Play';});
document.querySelector('#reset').addEventListener('click',()=>{day=0;dayOutput.textContent='0.0';});
speed.addEventListener('input',()=>{speedValue.textContent=speed.value;});
try {
 const T=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
 const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.1,100);
 camera.position.set(0,9,11);camera.lookAt(0,0,0);scene.add(new T.HemisphereLight(0xffffff,0x698c8b,2));
 function sphere(radius,color){const o=new T.Mesh(new T.SphereGeometry(radius,32,20),new T.MeshStandardMaterial({color}));scene.add(o);return o;}
 const a=sphere(.48,0xffc775),b=sphere(.23,0xdf8668),planet=sphere(.19,0x77b9c0);
 for(const radius of [.5,1.8,5]){const points=[];for(let i=0;i<=180;i++){const t=i*Math.PI*2/180;points.push(new T.Vector3(radius*Math.cos(t),0,radius*Math.sin(t)));}scene.add(new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color:radius===5?0x6ba7a8:0xbbad8f})));}
 canvas.style.display='block';fallback.style.display='none';
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;const zoomOut=Math.max(1,1.5/camera.aspect);camera.position.set(0,9*zoomOut,11*zoomOut);camera.lookAt(0,0,0);camera.updateProjectionMatrix();}
 new ResizeObserver(resize).observe(canvas.parentElement);resize();
 let last=null;
 function render(now){if(last!==null && playing){day+=Math.min((now-last)/1000,.1)*Number(speed.value);}last=now;const stars=day*2*Math.PI/41.08,orbit=day*2*Math.PI/228.8;a.position.set(.5*Math.cos(stars),0,.5*Math.sin(stars));b.position.set(-1.8*Math.cos(stars),0,-1.8*Math.sin(stars));planet.position.set(5*Math.cos(orbit),0,5*Math.sin(orbit));dayOutput.textContent=day.toFixed(1);renderer.render(scene,camera);requestAnimationFrame(render);}
 requestAnimationFrame(render);
} catch (error) {
 button.disabled=true;document.querySelector('#reset').disabled=true;speed.disabled=true;
 status.textContent='3D animation is unavailable. The diagram shows the orbit layout.';
}
