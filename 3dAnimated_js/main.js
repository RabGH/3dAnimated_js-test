import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup Scene

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

// Random objects

const geometry1 = new THREE.TorusGeometry(5, 1, 16, 50);
const material1 = new THREE.MeshStandardMaterial({color: 0x5A5A5A});
// const geometry2 = new THREE.TorusGeometry(10, 3, 16, 100);
// const material2 = new THREE.MeshStandardMaterial({color: 0xFF6347});

const torus1 = new THREE.Mesh(geometry1, material1);
// const torus2 = new THREE.Mesh(geometry2, material2);
scene.add(torus1);
// scene.add(torus2);


// Adding light and grid helper

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)
scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper)
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
    const geometry3 = new THREE.SphereGeometry(0.25);
    const material3 = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry3, material3);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background Space

const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

// Avatar

const floofTexture = new THREE.TextureLoader().load('/floof.jpeg')

const floof = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({map: floofTexture})
);

floof.position.z = -1;
floof.position.x = 2;

scene.add(floof);

// Moon

const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon)

// Move Camera

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    floof.rotation.y += 0.01;
    floof.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera
moveCamera()


// Random Objects Animation Loop

function animate1() {
    requestAnimationFrame(animate1);

    torus1.rotation.x += 0.02;
    torus1.rotation.y += 0.01;
    torus1.rotation.z += 0.02;

    controls.update();

    renderer.render(scene, camera);
}

// function animate2() {
//     requestAnimationFrame(animate2);

//     torus2.rotation.x += 0.01;
//     torus2.rotation.y += 0.005;
//     torus2.rotation.z += 0.01;

//     controls.update();

//     renderer.render(scene, camera);
// }

animate1()
// animate2()
