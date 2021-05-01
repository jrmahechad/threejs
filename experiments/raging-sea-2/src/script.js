import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { LightningStrike } from "three/examples//jsm/geometries/LightningStrike.js";
import { LightningStorm } from "three/examples//jsm/objects/LightningStorm.js";

import waterVertexShader from "./shaders/water/vertex.glsl";
import waterFragmentShader from "./shaders/water/fragment.glsl";
import cloudVertexShader from "./shaders/cloud/vertex.glsl";
import cloudFragmentShader from "./shaders/cloud/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const data = {
  waterSegments: 512,
  waterWidth: 4,
  waterHeight: 4,
};

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(
  data.waterWidth,
  data.waterHeight,
  data.waterSegments,
  data.waterSegments
);

// Color
debugObject.depthColor = "#186691";
debugObject.surfaceColor = "#9db8ff";

// Color
debugObject.cloudDepthColor = "#5c5c64";
debugObject.cloudSurfaceColor = "#8e8e98";

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uBigWavesSpeed: { value: 0.75 },
    uBigWavesElevation: {
      value: 0.2,
    },
    uBigWavesFrequency: {
      value: new THREE.Vector2(4, 1.5),
    },
    uDepthColor: {
      value: new THREE.Color(debugObject.depthColor),
    },
    uSurfaceColor: {
      value: new THREE.Color(debugObject.surfaceColor),
    },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 },
    uSmallWavesElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 3 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallIterations: { value: 4.0 },
  },
});

const waterFolder = gui.addFolder("water");

waterFolder
  .add(waterMaterial.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uBigWavesElevation");
waterFolder
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, "x")
  .min(0)
  .max(10)
  .name("uBigWavesFrequencyX");
waterFolder
  .add(waterMaterial.uniforms.uBigWavesFrequency.value, "y")
  .min(0)
  .max(10)
  .name("uBigWavesFrequencyY");

waterFolder
  .add(waterMaterial.uniforms.uBigWavesSpeed, "value")
  .min(0)
  .max(4)
  .step(0.01)
  .name("uBigWavesSpeed");

waterFolder.addColor(debugObject, "depthColor").onChange(() => {
  waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor);
});
waterFolder.addColor(debugObject, "surfaceColor").onChange(() => {
  waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
});

waterFolder
  .add(waterMaterial.uniforms.uColorOffset, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uColorOffset");

waterFolder
  .add(waterMaterial.uniforms.uColorMultiplier, "value")
  .min(0)
  .max(10)
  .step(0.001)
  .name("uColorMultiplier");

waterFolder
  .add(waterMaterial.uniforms.uSmallWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uSmallWavesElevation");
waterFolder
  .add(waterMaterial.uniforms.uSmallWavesFrequency, "value")
  .min(0)
  .max(30)
  .step(0.001)
  .name("uSmallWavesFrequency");
waterFolder
  .add(waterMaterial.uniforms.uSmallWavesSpeed, "value")
  .min(0)
  .max(4)
  .step(0.001)
  .name("uSmallWavesSpeed");
waterFolder
  .add(waterMaterial.uniforms.uSmallIterations, "value")
  .min(0)
  .max(5)
  .step(1)
  .name("uSmallIterations");

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

/**
 * Cloud
 */
// Geometry
const cloudGeometry = new THREE.PlaneGeometry(
  data.waterWidth,
  data.waterHeight,
  data.waterSegments,
  data.waterSegments
);

// Material
const cloudMaterial = new THREE.ShaderMaterial({
  vertexShader: cloudVertexShader,
  fragmentShader: cloudFragmentShader,
  transparent: true,
  uniforms: {
    uTime: { value: 0 },
    uBigWavesSpeed: { value: 0.45 },
    uBigWavesElevation: {
      value: 0.089,
    },
    uBigWavesFrequency: {
      value: new THREE.Vector2(2.1, 6.5),
    },
    uDepthColor: {
      value: new THREE.Color(debugObject.cloudDepthColor),
    },
    uSurfaceColor: {
      value: new THREE.Color(debugObject.cloudSurfaceColor),
    },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 },
    uSmallWavesElevation: { value: 0.089 },
    uSmallWavesFrequency: { value: 1.96 },
    uSmallWavesSpeed: { value: 0.137 },
    uSmallIterations: { value: 4.0 },
  },
});

const cloudFolder = gui.addFolder("cloud");

cloudFolder
  .add(cloudMaterial.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uBigWavesElevation");
cloudFolder
  .add(cloudMaterial.uniforms.uBigWavesFrequency.value, "x")
  .min(0)
  .max(10)
  .name("uBigWavesFrequencyX");
cloudFolder
  .add(cloudMaterial.uniforms.uBigWavesFrequency.value, "y")
  .min(0)
  .max(10)
  .name("uBigWavesFrequencyY");

cloudFolder
  .add(cloudMaterial.uniforms.uBigWavesSpeed, "value")
  .min(0)
  .max(4)
  .step(0.01)
  .name("uBigWavesSpeed");

cloudFolder.addColor(debugObject, "cloudDepthColor").onChange(() => {
  cloudMaterial.uniforms.uDepthColor.value.set(debugObject.cloudDepthColor);
});
cloudFolder.addColor(debugObject, "cloudSurfaceColor").onChange(() => {
  cloudMaterial.uniforms.uSurfaceColor.value.set(debugObject.cloudSurfaceColor);
});

cloudFolder
  .add(cloudMaterial.uniforms.uColorOffset, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uColorOffset");

cloudFolder
  .add(cloudMaterial.uniforms.uColorMultiplier, "value")
  .min(0)
  .max(10)
  .step(0.001)
  .name("uColorMultiplier");

cloudFolder
  .add(cloudMaterial.uniforms.uSmallWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uSmallWavesElevation");
cloudFolder
  .add(cloudMaterial.uniforms.uSmallWavesFrequency, "value")
  .min(0)
  .max(30)
  .step(0.001)
  .name("uSmallWavesFrequency");
cloudFolder
  .add(cloudMaterial.uniforms.uSmallWavesSpeed, "value")
  .min(0)
  .max(4)
  .step(0.001)
  .name("uSmallWavesSpeed");
cloudFolder
  .add(cloudMaterial.uniforms.uSmallIterations, "value")
  .min(0)
  .max(5)
  .step(1)
  .name("uSmallIterations");

// Mesh
const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloud.position.y = 1;
cloud.rotation.x = -Math.PI * 1.5;
scene.add(cloud);

/**
 * Boat
 */
// Geometry
const boatGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

// Material
const BoatMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Mesh
const boat = new THREE.Mesh(boatGeometry, BoatMaterial);
// Add the mesh to the scene
scene.add(boat);

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
camera.position.set(1, 1, 1);
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
renderer.setClearColor(debugObject.depthColor);

let logged = false;

let prevPos = { x: 0, y: 0, z: 0 };
const updateBoat = (elapsedTime) => {
  if (!logged) {
    console.log(water);
    console.log(boat);
    logged = true;
  }

  const index = getLinearIndex(
    boat.position.x,
    boat.position.z,
    data.waterSegments
  );

  const angleX = elapsedTime / 8;
  const angleZ = elapsedTime / 4;

  boat.position.x = Math.sin(angleX) * 0.8;
  boat.position.z = Math.sin(angleZ) * 0.8;

  boat.rotateY(0.001);

  const height =
    Math.sin(
      boat.position.x * waterMaterial.uniforms.uBigWavesFrequency.value.x +
        waterMaterial.uniforms.uTime.value *
          waterMaterial.uniforms.uBigWavesSpeed.value
    ) *
    Math.sin(
      boat.position.z * waterMaterial.uniforms.uBigWavesFrequency.value.y +
        waterMaterial.uniforms.uTime.value *
          waterMaterial.uniforms.uBigWavesSpeed.value
    ) *
    waterMaterial.uniforms.uBigWavesElevation.value;

  boat.position.y = height;
};

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update water
  waterMaterial.uniforms.uTime.value = elapsedTime;
  cloudMaterial.uniforms.uTime.value = elapsedTime;

  updateBoat(elapsedTime);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function getLinearIndex(x, z, waterSegments) {
  const i = x + waterSegments / 2;
  const j = z + waterSegments / 2;
  // console.log(x, z, i, j);
  return (i * (waterSegments + 1) + j) * 3 + 2;
}
