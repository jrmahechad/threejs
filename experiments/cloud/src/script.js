import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import { Vector2 } from "three";

/**
 * Base on https://tympanus.net/codrops/2020/01/28/how-to-create-procedural-clouds-using-three-js-sprites/
 */

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cloudTexture = textureLoader.load("/textures/cloud-texture.jpeg");
const cloudShape = textureLoader.load("/textures/cloud-shape.jpeg");

console.log(testVertexShader);

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uFac1: { value: 17.8 },
    uFac2: { value: 2.7 },
    uTimeFactor1: { value: 0.17 },
    uTimeFactor2: { value: 0.07 },
    uDisplStrenght1: { value: 0.04 },
    uDisplStrenght2: { value: 0.08 },
    uCloudTexture: { value: cloudTexture },
    uCloudShape: { value: cloudShape },
    uCenter: { value: new Vector2(0.5, 0.5) },
  },
});

gui
  .add(material.uniforms.uFac1, "value")
  .min(0)
  .max(20)
  .step(0.001)
  .name("uFac1");
gui
  .add(material.uniforms.uFac2, "value")
  .min(0)
  .max(20)
  .step(0.001)
  .name("uFac2");
gui
  .add(material.uniforms.uTimeFactor1, "value")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("uTimeFactor1");
gui
  .add(material.uniforms.uTimeFactor2, "value")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("uTimeFactor2");
gui
  .add(material.uniforms.uDisplStrenght1, "value")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("uDisplStrenght1");
gui
  .add(material.uniforms.uDisplStrenght2, "value")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("uDisplStrenght2");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
scene.add(mesh);

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
camera.position.set(0.25, -0.25, 1);
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
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
