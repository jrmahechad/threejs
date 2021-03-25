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

Here are some properties from the `MeshBasicMaterial`. Some of the properties work with other materials.

```javascript
// Set a texture
material.map = doorColorTexture;
// Set a color
material.color.set("red");
// OR set the color using the Color class.
material.scolor = new THREE.Color("red");
// See wireframes
material.wireframe = true;
// Set opacity
material.opacity = 0.5;
// Set alphaMap
material.alphaMap = doorAlphaTexture;
// When setting opacity  or alphaMap you need to enable transparent too
material.transparent = true;
// Set material side
material.side = THREE.FrontSide; // (default)
material.side = THREE.BackSide;
material.side = THREE.DoubleSide;
```

The `MeshNormalMaterial` uses `flatShading` to flat the mesh.

```javascript
material.flatShading = true;
```

Check [this repo to download matcaps](https://github.com/nidorx/matcaps).

The `MeshDepthMaterial` add white when the object is near the camera.

The `MeshLambertMaterial` will react to light. It's performant but we can see strange patterns on the geometry.

The `MeshPhongMaterial`is similar to the `MeshLambertMaterial`, but the strange patterns are less visible, and you can see the light reflection.
The `MeshPhongMaterial` is less performant then the `MeshLambertMaterial`.

```javascript
const material = new THREE.MeshPhongMaterial();
material.shininess = 100;
material.specular = new THREE.Color(0x1188ff);
```

The `MeshToonMaterial` is similar to `MeshLambertMaterial` but with a cartoonish.

```javascript
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
// ...
const material = new THREE.MeshToonMaterial();
material.gradientMap = gradientTexture;
```

The `MeshStandardMaterial` supports light with a more realistic algorithm and better parameters like `roughness` and `metalness`. it uses physically based rendering principles (PBR).

```javascript
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;
```

:warning: To make aoMap work make sure to add `uv2` attribute to the object

```javascript
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
```

Enviroment Map

```javascript
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);
// ...
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;
```

- [HDRI Haven](https://hdrihaven.com/)
- [HDRI to CubeMap](https://matheowis.github.io/HDRI-to-CubeMap/)
