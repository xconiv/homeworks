import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';


// --- Scene & Camera ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Lights ---
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10,10,10);
scene.add(directionalLight);

// --- Variables ---
let car, track;
const bots = [];
const totalBots = 3;

// --- GLTF Loader ---
const loader = new GLTFLoader();

// --- Load Track ---
loader.load(
    'assets/track.glb',
    function(gltf){
        track = gltf.scene;
        track.scale.set(0.5,0.5,0.5);
        track.position.set(0,0,0);
        scene.add(track);
        console.log("Track yükləndi!");
    },
    function(xhr){
        console.log("Track yüklənir: "+ (xhr.loaded / xhr.total * 100) +"%");
    },
    function(error){
        console.error("Track yüklənmədi:", error);
    }
);

// --- Load Car ---
loader.load(
    'assets/car.glb',
    function(gltf){
        car = gltf.scene;
        car.scale.set(0.01,0.01,0.01);
        car.position.set(0,0.25,5);
        scene.add(car);
        console.log("Car yükləndi!");
    },
    function(xhr){
        console.log("Car yüklənir: "+ (xhr.loaded / xhr.total * 100) +"%");
    },
    function(error){
        console.error("Car yüklənmədi:", error);
    }
);

// --- Load Bots ---
for(let i=0;i<totalBots;i++){
    loader.load(
        'assets/bot.glb',
        function(gltf){
            const bot = gltf.scene;
            bot.scale.set(0.01,0.01,0.01);
            bot.position.set((i-1)*2,0.25,0);
            bot.speed = 0.15 + Math.random()*0.05;
            scene.add(bot);
            bots.push(bot);
            console.log("Bot "+i+" yükləndi!");
        },
        function(xhr){
            console.log("Bot "+i+" yüklənir: "+ (xhr.loaded / xhr.total * 100) +"%");
        },
        function(error){
            console.error("Bot "+i+" yüklənmədi:", error);
        }
    );
}

// --- Controls ---
let moveForward=false, moveBackward=false, turnLeft=false, turnRight=false;
document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp') moveForward=true;
    if(e.key==='ArrowDown') moveBackward=true;
    if(e.key==='ArrowLeft') turnLeft=true;
    if(e.key==='ArrowRight') turnRight=true;
});
document.addEventListener('keyup',(e)=>{
    if(e.key==='ArrowUp') moveForward=false;
    if(e.key==='ArrowDown') moveBackward=false;
    if(e.key==='ArrowLeft') turnLeft=false;
    if(e.key==='ArrowRight') turnRight=false;
});

// --- Leaderboard & Speedometer ---
const speedDiv = document.getElementById('speed');
const leaderboard = document.getElementById('raceList');

// --- Wait for all models to load ---
function startGame(){
    if(car && track && bots.length===totalBots){
        console.log("Bütün modellər yükləndi, oyun başlayır!");
        animate();
    } else {
        setTimeout(startGame, 100);
    }
}
startGame();

// --- Animate ---
function animate(){
    requestAnimationFrame(animate);

    if(car){
        // Movement
        let speed=0;
        if(moveForward) speed=-0.3;
        if(moveBackward) speed=0.15;

        const direction = new THREE.Vector3(Math.sin(car.rotation.y),0,Math.cos(car.rotation.y));
        car.position.addScaledVector(direction,speed);

        if(turnLeft) car.rotation.y += 0.03;
        if(turnRight) car.rotation.y -= 0.03;

        // Camera
        camera.position.x = car.position.x;
        camera.position.z = car.position.z + 10;
        camera.position.y = car.position.y + 5;
        camera.lookAt(car.position);

        speedDiv.innerText = "Sürət: "+(speed*100).toFixed(0)+" km/h";
    }

    // Bots
    bots.forEach(bot=>{
        const direction = new THREE.Vector3(Math.sin(bot.rotation.y),0,Math.cos(bot.rotation.y));
        bot.position.addScaledVector(direction, bot.speed);
        bot.position.x += (Math.random()-0.5)*0.02;
    });

    // Leaderboard
    const allCars = [car,...bots];
    const results = allCars.map((c,i)=>({name:c===car?"Siz":"Bot "+i, z:c.position.z}));
    results.sort((a,b)=>a.z-b.z);
    leaderboard.innerHTML = "";
    results.forEach(r=>{
        const li = document.createElement('li'); 
        li.textContent = r.name;
        leaderboard.appendChild(li);
    });

    renderer.render(scene,camera);
}
