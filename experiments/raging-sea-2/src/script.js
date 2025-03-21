import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { LightningStorm } from "three/examples/jsm/objects/LightningStorm.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import waterVertexShader from "./shaders/water/vertex.glsl";
import waterFragmentShader from "./shaders/water/fragment.glsl";
import cloudVertexShader from "./shaders/cloud/vertex.glsl";
import cloudFragmentShader from "./shaders/cloud/fragment.glsl";
import { Vector3 } from "three";

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

// Loader
let boatModel = null;
const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/boat.glb", (gltf) => {
  const boatScale = 0.05;
  boatModel = gltf.scene.children[0];
  boatModel.scale.set(boatScale, boatScale, boatScale);
  console.log(boatModel.rotation.x);

  // boatModel.rotateZ(Math.PI / 16);
  scene.add(boatModel);
});

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

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
debugObject.cloudDepthColor = "#363639";
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
// const boatGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

// Material
// const BoatMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Mesh
// const boat = new THREE.Mesh(boatGeometry, BoatMaterial);
// Add the mesh to the scene
// scene.add(boat);
/**
 * Storm
 */

let rayLength = 0;
const rayDirection = new THREE.Vector3(0, -1, 0);
const vec1 = new THREE.Vector3();
const vec2 = new THREE.Vector3();

const rayParams = {
  radius0: 0.02,
  radius1: 0.02,
  minRadius: 0.01,
  maxIterations: 7,

  timeScale: 0.15,
  propagationTimeFactor: 0.2,
  vanishingTimeFactor: 0.9,
  subrayPeriod: 4,
  subrayDutyCycle: 0.6,

  maxSubrayRecursion: 3,
  ramification: 3,
  recursionProbability: 0.4,

  roughness: 0.85,
  straightness: 0.65,

  onSubrayCreation: function (
    segment,
    parentSubray,
    childSubray,
    lightningStrike
  ) {
    lightningStrike.subrayConePosition(
      segment,
      parentSubray,
      childSubray,
      0.6,
      0.6,
      0.5
    );

    // Plane projection

    rayLength = lightningStrike.rayParameters.sourceOffset.y;
    vec1.subVectors(
      childSubray.pos1,
      lightningStrike.rayParameters.sourceOffset
    );
    const proj = rayDirection.dot(vec1);
    vec2.copy(rayDirection).multiplyScalar(proj);
    vec1.sub(vec2);
    const scale = proj / rayLength > 0.5 ? rayLength / proj : 1;
    vec2.multiplyScalar(scale);
    vec1.add(vec2);
    childSubray.pos1.addVectors(
      vec1,
      lightningStrike.rayParameters.sourceOffset
    );
  },
};

const lightningColor = new THREE.Color(0xb0ffff);

const lightningMaterial = new THREE.MeshBasicMaterial({
  color: lightningColor,
});

const storm = new LightningStorm({
  size: data.waterWidth,
  minHeight: 0.5,
  maxHeight: 2,
  maxSlope: 0.06,
  maxLightnings: 5,

  lightningParameters: rayParams,

  lightningMaterial: lightningMaterial,
});

scene.add(storm);

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
camera.position.set(1, 0.5, 2);
scene.add(camera);
camera.lookAt(new Vector3());

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
renderer.setClearColor(debugObject.depthColor, 0.35);

const updateBoat = (elapsedTime) => {
  if (!boatModel) return;
  const angleX = elapsedTime / 8;
  const angleZ = elapsedTime / 4;

  boatModel.position.x = Math.sin(angleX) * 0.8;
  boatModel.position.z = Math.sin(angleZ) * 0.8;

  // boatModel.rotateZ(Math.sin(elapsedTime) * (Math.PI / 16));
  boatModel.rotation.z = Math.sin(elapsedTime) * (Math.PI / 16);
  boatModel.rotation.x = Math.sin(elapsedTime) * (Math.PI / 12);
  boatModel.rotation.y = Math.sin(elapsedTime) * (Math.PI / 20);

  const height =
    Math.sin(
      boatModel.position.x * waterMaterial.uniforms.uBigWavesFrequency.value.x +
        waterMaterial.uniforms.uTime.value *
          waterMaterial.uniforms.uBigWavesSpeed.value
    ) *
    Math.sin(
      boatModel.position.z * waterMaterial.uniforms.uBigWavesFrequency.value.y +
        waterMaterial.uniforms.uTime.value *
          waterMaterial.uniforms.uBigWavesSpeed.value
    ) *
    waterMaterial.uniforms.uBigWavesElevation.value;

  boatModel.position.y = height;
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

  storm.update(elapsedTime);

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
