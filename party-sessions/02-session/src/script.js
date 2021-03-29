import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Vector3 } from "three";

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
const gui = new dat.GUI({ width: 400 });

// Distances
const distances = {
  earth: 3,
  moon: 1,
  asteroids: 2,
};

// Light
const light = {
  sun: 5,
  color: 0xffffff,
};

// Planets sizes
const planetSizes = {
  sun: 1,
  earth: 0.5,
  moon: 0.2,
  asteroids: 0.05,
};

gui.add(light, "sun").min(1).max(20).step(0.1).name("Sun Light");
gui.add(distances, "earth").min(3).max(10).step(0.1).name("Earth distance");
gui.add(distances, "moon").min(1).max(5).step(0.1).name("Moon distance");
gui
  .add(distances, "asteroids")
  .min(1)
  .max(5)
  .step(0.1)
  .name("Asteroids distance");

const textureLoader = new THREE.TextureLoader();
// Sun textures
const lavaColorTexture = textureLoader.load(
  "/textures/lava/Lava_002_COLOR.png"
);
const lavaNormalTexture = textureLoader.load("/textures/lava/Lava_002_NRM.png");
const lavaHeightTexture = textureLoader.load(
  "/textures/lava/Lava_002_DISP.png"
);
const lavaAOTexture = textureLoader.load("/textures/lava/Lava_002_OCC.png");
// const lavaSpecTexture = textureLoader.load("/textures/lava/Lava_002_SPEC.png");

//Water textures
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

//Rock textures
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

//Stone textures
const stoneColorTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_BaseColor.jpg"
);
const stoneAOTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_AmbientOcclusion.jpg"
);
const stoneHeightTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_Height.jpg"
);
const stoneNormalTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_Normal.jpg"
);
const stoneRoughnessTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_Roughness.jpg"
);

/**
 * Objects
 */

// Sun
const geometrySun = new THREE.SphereGeometry(planetSizes.sun, 32, 32);
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

//Earth
const geometryEarth = new THREE.SphereGeometry(planetSizes.earth, 32, 32);
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
// Moon
const geometryMoon = new THREE.SphereGeometry(planetSizes.moon, 32, 32);
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

// Earth Group
const earthGroup = new THREE.Group();

earthGroup.position.x = distances.earth;
earthGroup.add(sphereMoon);
earthGroup.add(sphereEarth);
scene.add(earthGroup);

//Asteroids
const asteroidMaterial = new THREE.MeshStandardMaterial({
  map: stoneColorTexture,
});
asteroidMaterial.aoMap = stoneAOTexture;
asteroidMaterial.roughnessMap = stoneRoughnessTexture;
asteroidMaterial.normalMap = stoneNormalTexture;
asteroidMaterial.displacementMap = stoneHeightTexture;

const asteroidsGroup = new THREE.Group();

scene.add(asteroidsGroup);

const geometryAsteroid = new THREE.SphereGeometry(
  planetSizes.asteroids,
  32,
  32
);

const asteroids = [];
for (let i = 0; i < 20; i++) {
  const asteroid = new THREE.Mesh(geometryAsteroid, asteroidMaterial);
  asteroid.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphereMoon.geometry.attributes.uv.array, 2)
  );

  const randRadius = Math.random() * 1.5;
  const angle = Math.random() * Math.PI * 2;
  const radius =
    planetSizes.sun / 2 +
    distances.earth +
    planetSizes.earth +
    distances.asteroids +
    randRadius;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const y = Math.random() - 0.5 + Math.random();

  asteroid.scale.set(
    getRandomNumberBetween(0.8, 2),
    getRandomNumberBetween(0.8, 1.5),
    getRandomNumberBetween(0.8, 2)
  );

  asteroid.position.set(x, y, z);

  asteroids.push({
    asteroid,
    angle,
    randRadius,
  });
  asteroidsGroup.add(asteroid);
}

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

const sunLight = new THREE.PointLight(light.color, light.sun);
scene.add(sunLight);
gui.addColor(light, "color").onChange(() => {
  sunLight.color.set(light.color);
});

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
camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(new Vector3());
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
 * Shadows
 */

renderer.shadowMap.enabled = true;

sunLight.castShadow = true;

// sphereSun.castShadow = true;
// sphereSun.receiveShadow = true;

sphereEarth.castShadow = true;
sphereEarth.receiveShadow = true;

sphereMoon.castShadow = true;
sphereMoon.receiveShadow = true;

asteroids.forEach(({ asteroid }) => {
  asteroid.receiveShadow = true;
  // asteroid.castShadow = true;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sunLight.intensity = light.sun;

  // Rotations
  sphereSun.rotation.y = (elapsedTime * Math.PI) / 4;
  sphereEarth.rotation.y = (elapsedTime * Math.PI) / 6;
  sphereMoon.rotation.y = (elapsedTime * Math.PI) / 8;

  // Earth Group movement
  earthGroup.position.z =
    Math.sin(elapsedTime) *
    (distances.earth + planetSizes.sun / 2 + planetSizes.earth / 2);
  earthGroup.position.x =
    Math.cos(elapsedTime) *
    (distances.earth + planetSizes.sun / 2 + planetSizes.earth / 2) *
    0.8;

  // Moon movement
  sphereMoon.position.y =
    Math.sin(elapsedTime / 2) *
    (distances.moon + planetSizes.earth / 2 + planetSizes.moon / 2) *
    0.7;
  sphereMoon.position.x =
    Math.cos(elapsedTime / 2) *
    (distances.moon + planetSizes.earth / 2 + planetSizes.moon / 2);

  // Asteroids movement
  asteroids.forEach(({ asteroid, angle, randRadius }) => {
    const radius =
      planetSizes.sun / 2 +
      distances.earth +
      planetSizes.earth +
      distances.asteroids +
      randRadius;
    const x = Math.sin(angle + elapsedTime / 8) * radius;
    const z = Math.cos(angle + elapsedTime / 8) * radius;
    asteroid.position.set(x, asteroid.position.y, z);
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function getRandomNumberBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
}
