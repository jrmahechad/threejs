import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Debug
 */
const gui = new dat.GUI();

// Distances
const distances = {
  earth: 3,
  moon: 1,
};

const light = {
  sun: 5,
};
gui.add(distances, "earth").min(3).max(10).step(0.1).name("Earth distance");
gui.add(distances, "moon").min(1).max(5).step(0.1).name("Moon distance");
gui.add(light, "sun").min(1).max(20).step(0.1).name("Sun Light");

const textureLoader = new THREE.TextureLoader();
const lavaColorTexture = textureLoader.load(
  "/textures/lava/Lava_002_COLOR.png"
);
const lavaNormalTexture = textureLoader.load("/textures/lava/Lava_002_NRM.png");
const lavaHeightTexture = textureLoader.load(
  "/textures/lava/Lava_002_DISP.png"
);
const lavaAOTexture = textureLoader.load("/textures/lava/Lava_002_OCC.png");
// const lavaSpecTexture = textureLoader.load("/textures/lava/Lava_002_SPEC.png");

const waterColorTexture = textureLoader.load(
  "/textures/water/Water_001_COLOR.jpg"
);
const waterNormalTexture = textureLoader.load(
  "/textures/water/Water_001_NORM.jpg"
);
const waterHeightTexture = textureLoader.load(
  "/textures/water/Water_001_DISP.png"
);
const waterAOTexture = textureLoader.load("/textures/water/Water_001_OCC.jpg");
// const waterSpecTexture = textureLoader.load(
//   "/textures/water/Water_001_SPEC.jpg"
// );

const rockColorTexture = textureLoader.load(
  "/textures/rock/Stylized_Rocks_002_basecolor.jpg"
);
const rockNormalTexture = textureLoader.load(
  "/textures/rock/Stylized_Rocks_002_normal.jpg"
);
const rockHeightTexture = textureLoader.load(
  "/textures/rock/Stylized_Rocks_002_height.png"
);
const rockAOTexture = textureLoader.load(
  "/textures/rock/Stylized_Rocks_002_ambientOcclusion.jpg"
);
const rockRoughnessTexture = textureLoader.load(
  "/textures/rock/Stylized_Rocks_002_roughness.jpg"
);

/**
 * Objects
 */
const geometrySun = new THREE.SphereGeometry(1, 32, 32);
const materialSun = new THREE.MeshStandardMaterial({ map: lavaColorTexture });
materialSun.normalMap = lavaNormalTexture;
materialSun.aoMap = lavaAOTexture;
materialSun.displacementMap = lavaHeightTexture;
materialSun.displacementScale = 0.1;
const sphereSun = new THREE.Mesh(geometrySun, materialSun);
sphereSun.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereSun.geometry.attributes.uv.array, 2)
);
scene.add(sphereSun);

const geometryEarth = new THREE.SphereGeometry(0.5, 32, 32);
const materialEarth = new THREE.MeshStandardMaterial({
  map: waterColorTexture,
});
materialEarth.normalMap = waterNormalTexture;
materialEarth.aoMap = waterAOTexture;
materialEarth.displacementMap = waterHeightTexture;
materialEarth.displacementScale = 0.05;

const sphereEarth = new THREE.Mesh(geometryEarth, materialEarth);
sphereEarth.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereEarth.geometry.attributes.uv.array, 2)
);

const geometryMoon = new THREE.SphereGeometry(0.2, 32, 32);
const materialMoon = new THREE.MeshStandardMaterial({ map: rockColorTexture });
materialMoon.normalMap = rockNormalTexture;
materialMoon.aoMap = rockAOTexture;
materialMoon.displacementMap = rockHeightTexture;
materialMoon.displacementScale = 0.05;
materialMoon.roughnessMap = rockRoughnessTexture;

const sphereMoon = new THREE.Mesh(geometryMoon, materialMoon);
sphereMoon.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereMoon.geometry.attributes.uv.array, 2)
);
sphereMoon.position.y = distances.moon;

const earthGroup = new THREE.Group();
earthGroup.position.x = distances.earth;
earthGroup.add(sphereMoon);
earthGroup.add(sphereEarth);
scene.add(earthGroup);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

const sunLight = new THREE.PointLight(0xffffff, light.sun);
scene.add(sunLight);

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

window.addEventListener("dblclick", () => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
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
camera.position.z = 7;
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

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sunLight.intensity = light.sun;

  sphereSun.rotation.y = (elapsedTime * Math.PI) / 4;
  sphereEarth.rotation.y = (elapsedTime * Math.PI) / 6;
  sphereMoon.rotation.y = (elapsedTime * Math.PI) / 8;

  earthGroup.position.z = Math.sin(elapsedTime) * distances.earth;
  earthGroup.position.x = Math.cos(elapsedTime) * distances.earth;

  sphereMoon.position.y = Math.sin(elapsedTime / 2) * distances.moon;
  sphereMoon.position.x = Math.cos(elapsedTime / 2) * distances.moon;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
