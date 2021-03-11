import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base data
 */
const planeWidth = 20;
const grainHeight = 0.5;

/**
 * Debug
 */
const gui = new dat.GUI();
const debugObject = {
  color: 0x00ff00,
  i: planeWidth / 2,
  j: planeWidth / 2,
};
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

const dropFolder = gui.addFolder("drop point");
dropFolder.add(debugObject, "i").min(0).max(planeWidth).step(1);
dropFolder.add(debugObject, "j").min(0).max(planeWidth).step(1);
dropFolder.open();

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.PlaneGeometry(
  planeWidth,
  planeWidth,
  planeWidth,
  planeWidth
);
const material = new THREE.MeshStandardMaterial({ color: debugObject.color });
gui.add(material, "wireframe");
const terrain = new THREE.Mesh(geometry, material);

terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -planeWidth / 2 - 1;
sphere.position.z = -planeWidth / 2 - 1;
scene.add(sphere);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const vertices = terrain.geometry.attributes.position.array;

let lastUpdated = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  if (elapsedTime - lastUpdated > 1.5) {
    // addSand(planeWidth / 2, planeWidth / 2);
    addSand(debugObject.i, debugObject.j);
    // addSand(0, 0);
    lastUpdated = elapsedTime;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function getLinearIndex(i, j) {
  return (i * (planeWidth + 1) + j) * 3 + 2;
}

function addSand(i, j) {
  const index = getLinearIndex(i, j);
  const grains = vertices[index];
  if (grains < 3 * grainHeight) {
    vertices[index] += grainHeight;
  } else {
    vertices[index] = grains - 3 * grainHeight;
    if (i > 0) {
      addSand(i - 1, j);
    }
    if (i < planeWidth - 1) {
      addSand(i + 1, j);
    }
    if (j > 0) {
      addSand(i, j - 1);
    }
    if (j < planeWidth - 1) {
      addSand(i, j + 1);
    }
  }
  terrain.geometry.attributes.position.needsUpdate = true;
  terrain.geometry.computeVertexNormals();
}
