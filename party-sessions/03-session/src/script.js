import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Group, Vector3 } from "three";
import gsap from "gsap";

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
gui.close();

/**
 * Objects
 */
// Solar System
const solarSystem = {
  visible: false,
  animated: false,
  animationStartsAt: 0,
};

const cameraPosition = {
  text: { x: 0, y: -1, z: 3 },
  solarSystem: { x: 0, y: 5, z: 10 },
};

// Distances
const distances = {
  earth: 3,
  moon: 1,
  asteroids: 2,
};

// Light
const light = {
  sun: 5,
  color: 0xf0c13d,
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
  "/textures/stone/Stone_Path_005_Height.png"
);
const stoneNormalTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_Normal.jpg"
);
const stoneRoughnessTexture = textureLoader.load(
  "/textures/stone/Stone_Path_005_Roughness.jpg"
);

const particleTexture = textureLoader.load("/textures/particles/5.png");

const matcapTexture = textureLoader.load("/textures/matcaps/3.png");

const textGroup = new THREE.Group();
scene.add(textGroup);

/**
 * Fonts
 */
let text = null;
let clickMeText = null;
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("font loaded");
  const textGeometry = new THREE.TextBufferGeometry(
    "Welcome to my\n  Solar System",
    {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    }
  );

  const clickMeTextGeometry = new THREE.TextBufferGeometry("Click Me", {
    font: font,
    size: 0.2,
    height: 0.05,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();
  clickMeTextGeometry.center();

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;
  text = new THREE.Mesh(textGeometry, material);
  clickMeText = new THREE.Mesh(clickMeTextGeometry, material);
  textGroup.add(clickMeText);
  textGroup.add(text);
});

// Solar System Group

const solarSystemGroup = new THREE.Group();
solarSystemGroup.position.y = -30;

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

solarSystemGroup.add(sphereSun);

// Earth
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
solarSystemGroup.add(earthGroup);

// Asteroids
const asteroidMaterial = new THREE.MeshStandardMaterial({
  map: stoneColorTexture,
});
asteroidMaterial.aoMap = stoneAOTexture;
asteroidMaterial.roughnessMap = stoneRoughnessTexture;
asteroidMaterial.normalMap = stoneNormalTexture;
asteroidMaterial.displacementMap = stoneHeightTexture;
asteroidMaterial.displacementScale = 0.02;

const asteroidsGroup = new THREE.Group();

solarSystemGroup.add(asteroidsGroup);

// Asteroids
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
 * Particles
 */
const particlesGeometry = new THREE.BufferGeometry();
const totalParticles = 500;
const positions = new Float32Array(totalParticles * 3);
const colors = new Float32Array(totalParticles * 3);

for (let i = 0; i < totalParticles * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
});
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
solarSystemGroup.add(particles);

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
// Global lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Sun light
const sunLight = new THREE.PointLight(light.color, light.sun);
solarSystemGroup.add(sunLight);
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
camera.position.set(
  cameraPosition.text.x,
  cameraPosition.text.y,
  cameraPosition.text.z
);
camera.lookAt(new Vector3());
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = false;

/**
 * Mouse
 */
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", clickHandler);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

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

sphereEarth.castShadow = true;
sphereEarth.receiveShadow = true;

sphereMoon.castShadow = true;
sphereMoon.receiveShadow = true;

asteroids.forEach(({ asteroid }) => {
  asteroid.receiveShadow = true;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

let intersects = [];

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (!solarSystem.visible) {
    camera.position.x = Math.sin(elapsedTime) - 0.5;
    camera.position.y = Math.cos(elapsedTime) - 0.5;

    if (clickMeText) {
      clickMeText.position.y = Math.sin(elapsedTime * 0.7);
      clickMeText.position.z = Math.cos(elapsedTime * 0.7);
      clickMeText.position.x = Math.cos(elapsedTime * 0.5) - 0.5;
      raycaster.setFromCamera(mouse, camera);

      intersects = raycaster.intersectObject(clickMeText);
    }
  } else {
    if (solarSystem.animated) {
      const newElapsedTime = elapsedTime - solarSystem.animationStartsAt;
      sunLight.intensity = light.sun;

      // Rotations
      sphereSun.rotation.y = (newElapsedTime * Math.PI) / 4;
      sphereEarth.rotation.y = (newElapsedTime * Math.PI) / 6;
      sphereMoon.rotation.y = (newElapsedTime * Math.PI) / 8;

      // Earth Group movement
      earthGroup.position.z =
        Math.sin(newElapsedTime) *
        (distances.earth + planetSizes.sun / 2 + planetSizes.earth / 2);
      earthGroup.position.x =
        Math.cos(newElapsedTime) *
        (distances.earth + planetSizes.sun / 2 + planetSizes.earth / 2) *
        0.8;

      // Moon movement
      sphereMoon.position.y =
        Math.sin(newElapsedTime / 2) *
        (distances.moon + planetSizes.earth / 2 + planetSizes.moon / 2) *
        0.7;
      sphereMoon.position.x =
        Math.cos(newElapsedTime / 2) *
        (distances.moon + planetSizes.earth / 2 + planetSizes.moon / 2);

      // Asteroids movement
      asteroids.forEach(({ asteroid, angle, randRadius }) => {
        const radius =
          planetSizes.sun / 2 +
          distances.earth +
          planetSizes.earth +
          distances.asteroids +
          randRadius;
        const x = Math.sin(angle + newElapsedTime / 8) * radius;
        const z = Math.cos(angle + newElapsedTime / 8) * radius;
        asteroid.position.set(x, asteroid.position.y, z);
      });
    }
  }

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

function getRandomNumberBetweenInterval(min, max) {
  const number = getRandomNumberBetween(min, max);
  return Math.random() > 0.5 ? number : -number;
}

function clickHandler(event) {
  if (intersects.length && !solarSystem.visible) {
    showSolarSystem();
  }
}

function showSolarSystem() {
  solarSystem.visible = true;
  scene.add(solarSystemGroup);
  const timeline = gsap.timeline();
  timeline.add("start", 0);
  timeline.to(textGroup.position, { duration: 4, y: 10 });
  timeline.call(() => {
    scene.remove(textGroup);
  });
  timeline.to(solarSystemGroup.position, { duration: 5, y: 0 }, "start");
  timeline.to(
    camera.position,
    {
      duration: 5,
      x: cameraPosition.solarSystem.x,
      y: cameraPosition.solarSystem.y,
      z: cameraPosition.solarSystem.z,
    },
    "start"
  );

  timeline.to(controls, { duration: 0, enabled: true });
  timeline.call(() => {
    solarSystem.animationStartsAt = clock.getElapsedTime();
    solarSystem.animated = true;
  });

  window.removeEventListener("click", clickHandler);
}
