import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Vector3 } from "three";
import planetVertexShader from "./shaders/planet/vertex.glsl";
import planetFragmentShader from "./shaders/planet/fragment.glsl";

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

// Planets sizes
const planetSizes = {
  sun: 1,
  earth: 0.5,
  moon: 0.2,
  asteroids: 0.05,
};

const seeds = {
  earthNumber: 1,
  earthScale: 10,
  moonNumber: 6,
  moonScale: 10,
  sunNumber: 10,
  sunScale: 20,
  asteroidNumber: 10,
  asteroidScale: 20,
};

const colors = {
  earthColor1: 0x1ccd5b,
  earthColor2: 0x1344a0,
  moonColor1: 0x5b5f5c,
  moonColor2: 0xc0cfff,
  sunColor1: 0xdea41c,
  sunColor2: 0xf51111,
  asteroidColor1: 0x6b6b6b,
  asteroidColor2: 0xd0225,
};

gui.add(distances, "earth").min(3).max(10).step(0.1).name("Earth distance");
gui.add(distances, "moon").min(1).max(5).step(0.1).name("Moon distance");
gui
  .add(distances, "asteroids")
  .min(1)
  .max(5)
  .step(0.1)
  .name("Asteroids distance");
gui
  .add(seeds, "earthNumber")
  .min(1)
  .max(20)
  .step(1)
  .name("Earth seed")
  .onChange(() => {
    shaderEarthMaterial.uniforms.uSeed.value = seeds.earthNumber;
  });
gui.addColor(colors, "earthColor1").onChange(() => {
  shaderEarthMaterial.uniforms.uColor1.value.set(colors.earthColor1);
});
gui.addColor(colors, "earthColor2").onChange(() => {
  shaderEarthMaterial.uniforms.uColor2.value.set(colors.earthColor2);
});
gui
  .add(seeds, "earthScale")
  .min(1)
  .max(30)
  .step(1)
  .name("Earth Scale")
  .onChange(() => {
    shaderEarthMaterial.uniforms.uScale.value = seeds.earthScale;
  });
gui
  .add(seeds, "moonNumber")
  .min(1)
  .max(20)
  .step(1)
  .name("Moon seed")
  .onChange(() => {
    shaderMoonMaterial.uniforms.uSeed.value = seeds.moonNumber;
  });
gui.addColor(colors, "moonColor1").onChange(() => {
  shaderMoonMaterial.uniforms.uColor1.value.set(colors.moonColor1);
});
gui.addColor(colors, "moonColor2").onChange(() => {
  shaderMoonMaterial.uniforms.uColor2.value.set(colors.moonColor2);
});
gui
  .add(seeds, "moonScale")
  .min(2)
  .max(20)
  .step(1)
  .name("Moon Scale")
  .onChange(() => {
    shaderMoonMaterial.uniforms.uScale.value = seeds.moonScale;
  });
gui
  .add(seeds, "sunNumber")
  .min(1)
  .max(20)
  .step(1)
  .name("Sun seed")
  .onChange(() => {
    shaderSunMaterial.uniforms.uSeed.value = seeds.sunNumber;
  });
gui.addColor(colors, "sunColor1").onChange(() => {
  shaderSunMaterial.uniforms.uColor1.value.set(colors.sunColor1);
});
gui.addColor(colors, "sunColor2").onChange(() => {
  shaderSunMaterial.uniforms.uColor2.value.set(colors.sunColor2);
});
gui
  .add(seeds, "sunScale")
  .min(2)
  .max(20)
  .step(1)
  .name("Sun Scale")
  .onChange(() => {
    shaderSunMaterial.uniforms.uScale.value = seeds.sunScale;
  });
gui
  .add(seeds, "asteroidNumber")
  .min(1)
  .max(20)
  .step(1)
  .name("Asteroid seed")
  .onChange(() => {
    shaderAsteroidMaterial.uniforms.uSeed.value = seeds.asteroidNumber;
  });
gui.addColor(colors, "asteroidColor1").onChange(() => {
  shaderAsteroidMaterial.uniforms.uColor1.value.set(colors.asteroidColor1);
});
gui.addColor(colors, "asteroidColor2").onChange(() => {
  shaderAsteroidMaterial.uniforms.uColor2.value.set(colors.asteroidColor2);
});
gui
  .add(seeds, "asteroidScale")
  .min(2)
  .max(20)
  .step(1)
  .name("Asteroid Scale")
  .onChange(() => {
    shaderAsteroidMaterial.uniforms.uScale.value = seeds.asteroidScale;
  });

/**
 * Objects
 */

// Sun
const geometrySun = new THREE.SphereGeometry(planetSizes.sun, 32, 32);

const shaderSunMaterial = new THREE.ShaderMaterial({
  vertexShader: planetVertexShader,
  fragmentShader: planetFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uSeed: { value: seeds.sunNumber },
    uColor1: { value: new THREE.Color(colors.sunColor1) },
    uColor2: { value: new THREE.Color(colors.sunColor2) },
    uScale: { value: seeds.sunScale },
  },
});

const sphereSun = new THREE.Mesh(geometrySun, shaderSunMaterial);
sphereSun.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereSun.geometry.attributes.uv.array, 2)
);

scene.add(sphereSun);

//Earth
const geometryEarth = new THREE.SphereGeometry(planetSizes.earth, 32, 32);

const shaderEarthMaterial = new THREE.ShaderMaterial({
  vertexShader: planetVertexShader,
  fragmentShader: planetFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uSeed: { value: seeds.earthNumber },
    uColor1: { value: new THREE.Color(colors.earthColor1) },
    uColor2: { value: new THREE.Color(colors.earthColor2) },
    uScale: { value: seeds.earthScale },
  },
});

const sphereEarth = new THREE.Mesh(geometryEarth, shaderEarthMaterial);
sphereEarth.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereEarth.geometry.attributes.uv.array, 2)
);
// Moon
const geometryMoon = new THREE.SphereGeometry(planetSizes.moon, 32, 32);

const shaderMoonMaterial = new THREE.ShaderMaterial({
  vertexShader: planetVertexShader,
  fragmentShader: planetFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uSeed: { value: seeds.moonNumber },
    uColor1: { value: new THREE.Color(colors.moonColor1) },
    uColor2: { value: new THREE.Color(colors.moonColor2) },
    uScale: { value: seeds.moonScale },
  },
});

const sphereMoon = new THREE.Mesh(geometryMoon, shaderMoonMaterial);

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

const shaderAsteroidMaterial = new THREE.ShaderMaterial({
  vertexShader: planetVertexShader,
  fragmentShader: planetFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uSeed: { value: seeds.asteroidNumber },
    uColor1: { value: new THREE.Color(colors.asteroidColor1) },
    uColor2: { value: new THREE.Color(colors.asteroidColor2) },
    uScale: { value: seeds.asteroidScale },
  },
});

const asteroidsGroup = new THREE.Group();

scene.add(asteroidsGroup);

const geometryAsteroid = new THREE.SphereGeometry(
  planetSizes.asteroids,
  32,
  32
);

const asteroids = [];
for (let i = 0; i < 20; i++) {
  const asteroid = new THREE.Mesh(geometryAsteroid, shaderAsteroidMaterial);
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
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

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
