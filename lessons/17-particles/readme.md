# Three.js Journey

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Lesson

Particles can be used to create _stars_, _smoke_, _rain_, _dust_, _fire_, etc.

You can have thousands of them with a reasonable frame rate.

Each particle is composed of a plane (two, triangles) always facing the camera

To create particles we need to define a _geometry_, a _material_ and the **points**

```javascript
// Geometry

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
```

We can use textures in the particles too. Use the alphaMap for transparency.

```javascript
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");
// ...
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
```

We can still see edges of the particles.
That is because the particles are _drawn in the same order as they are created_, and WebGL doen't really know which one is in front of the other.

**alphaTest**
The `alphaTest` is a value between `0` and `1` that enables the WebGl to know when not to render the pixel according to that pixel's transparency.

By default, the value is `0` meaning that the pixel will be rendered anyway.

```javascript
particlesMaterial.alphaTest = 0.001;
```

**alphaTest**
When drawing, the WebGL tests if what0s being drawn is closer than what's already drawin.

That is called **depth testing** and can be deactivated with `alphaTest`

```javascript
// particlesMaterial.alphaTest = 0.001;
particlesMaterial.depthTest = false;
```

Deactivating the depth testing might create bugs if you have other objects in your scene or particles with different colors.

Add a cube to the scene to see that.

```javascript
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial()
);
scene.add(cube);
```

**depthWrite**
The depth of what's being drawn is tored in what we call a depth buffer.

Instead of not testing if the particle is closer that what's in the depth buffer, we can tell the WebGL not to write particles in that depht buffer with `depthWrite`

**Blending**
The WebGl currently draws pixels one on top of the other.
With the blending property, we can tell the WebGl to _add_ the color of the pixeld to the color of the pixel already drawn.

Change the _blending_ property to `THREE.AdditiveBlending`

**This effect will impact the performances**

Each particle can have different colors.

```javascript
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  colors[i] = Math.random();
}

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// ...
particlesMaterial.vertexColors = true;
```

[Particles pack](https://www.kenney.nl/assets/particle-pack)
