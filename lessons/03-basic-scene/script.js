console.log("Hello Three.js");
// console.log(THREE)

const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Mesh
const mesh = new THREE.Mesh(geometry, material);
// Add the mesh to the scene
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera (fov, aspect ratio)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// Add camera to the scene
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
