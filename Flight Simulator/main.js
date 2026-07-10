import { createAirplane } from "./js/airplane.js";
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
50000
);

camera.position.set(0,40,150);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled=true;

document.body.appendChild(renderer.domElement);

// Lighting
const ambient=new THREE.AmbientLight(0xffffff,.55);
scene.add(ambient);

const sun=new THREE.DirectionalLight(0xffffff,1.4);

sun.position.set(400,900,500);

sun.castShadow=true;

scene.add(sun);

// Ground
const ground=new THREE.Mesh(

new THREE.PlaneGeometry(30000,30000),

new THREE.MeshPhongMaterial({
color:0x3a9d23
})

);

ground.rotation.x=-Math.PI/2;
ground.receiveShadow=true;
scene.add(ground);

// Grid
scene.add(new THREE.GridHelper(30000,300));

// Mountains
for(let i=0;i<220;i++){

const height=Math.random()*180+70;

const mountain=new THREE.Mesh(

new THREE.ConeGeometry(

Math.random()*80+60,

height,

8

),

new THREE.MeshLambertMaterial({

color:0x777777

})

);

mountain.position.set(

(Math.random()-0.5)*28000,

height/2,

(Math.random()-0.5)*28000

);

scene.add(mountain);

}

// Clouds
for(let i=0;i<120;i++){

const cloud=new THREE.Group();

for(let j=0;j<6;j++){

const puff=new THREE.Mesh(

new THREE.SphereGeometry(

Math.random()*20+10,

16,

16

),

new THREE.MeshLambertMaterial({

color:0xffffff

})

);

puff.position.set(

Math.random()*25,

Math.random()*10,

Math.random()*25

);

cloud.add(puff);

}

cloud.position.set(

(Math.random()-0.5)*25000,

Math.random()*500+250,

(Math.random()-0.5)*25000

);

scene.add(cloud);

}

// Placeholder aircraft
const airplane=createAirplane();

airplane.position.y=20;

scene.add(airplane);

let throttle=0;
let speed=0;

const keys={};

window.addEventListener("keydown",(e)=>{
keys[e.key.toLowerCase()]=true;
});

window.addEventListener("keyup",(e)=>{
keys[e.key.toLowerCase()]=false;
});

function animate(airplane.translateZ(-speed)airplane.userData.propeller.rotation.x += speed*2;;){

requestAnimationFrame(animate);

// Throttle

if(keys["w"])
throttle=Math.min(1,throttle+0.005);

if(keys["s"])
throttle=Math.max(0,throttle-0.005);

speed+=(throttle*3-speed)*0.02;

airplane.translateZ(-speed);

// Camera follows aircraft

const target=new THREE.Vector3(

airplane.position.x,

airplane.position.y+25,

airplane.position.z+90

);

camera.position.lerp(target,0.05);

camera.lookAt(airplane.position);

// HUD

document.getElementById("hud").innerHTML=
`
<b>Indian Flight Simulator</b><br><br>

Throttle : ${(throttle*100).toFixed(0)}%<br>

Speed : ${(speed*60).toFixed(0)} kt
`;

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});