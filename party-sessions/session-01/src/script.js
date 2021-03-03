import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Distances
const distances = {
    earth: 3,
    moon: 1
}

/**
 * Objects
 */
const geometrySun = new THREE.BoxGeometry(1, 1, 1);
const materialSun = new THREE.MeshBasicMaterial({ color: '#FFC300' });
const cubeSun = new THREE.Mesh(geometrySun, materialSun);
scene.add(cubeSun);

const geometryEarth = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const materialEarth = new THREE.MeshBasicMaterial({ color: '#3399FF' });
const cubeEarth = new THREE.Mesh(geometryEarth, materialEarth);

const geometryMoon = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const materialMoon = new THREE.MeshBasicMaterial({ color: '#C1C3C5' });
const cubeMoon = new THREE.Mesh(geometryMoon, materialMoon);
cubeMoon.position.y = distances.moon;

const earthGroup = new THREE.Group();
earthGroup.position.x = distances.earth;
earthGroup.add(cubeEarth);
earthGroup.add(cubeMoon);
scene.add(earthGroup);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullScreenElement) {
        if(canvas.requestFullscreen){
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
});


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 7;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    cubeSun.rotation.y = elapsedTime * Math.PI /4;
    cubeEarth.rotation.y = elapsedTime * Math.PI /6;
    cubeMoon.rotation.y = elapsedTime * Math.PI /8;

    earthGroup.position.z = Math.sin(elapsedTime) * distances.earth;
    earthGroup.position.x = Math.cos(elapsedTime) * distances.earth;

    cubeMoon.position.y = Math.sin(elapsedTime / 2) * distances.moon;
    cubeMoon.position.x = Math.cos(elapsedTime / 2) * distances.moon;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();