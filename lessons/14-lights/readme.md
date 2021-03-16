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

**AmbientLight**
Applies omnidirectional lighting.

- color
- intensity

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

**DirectionalLight**
Will have a _sun-like_ effect as if the sun _rays were travelling in parallel_

- color
- intensity

Directional lights point to the center of the scene. Moving the position of the light will change it's direction.

```javascript
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);
```

**HemisphereLight**
Is similat to `AmbientLight` but with a **different color** from the **sky** than the color comming from the **ground**

- color (or _skyColor_)
- groundColor
- intensity

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
```

**PointLight**
Is almost like a _lighter_. The light starts at an infinitely small point and spreads uniformly in every directions.

- color
- intensity
- distance
- decay

```javascript
const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
```

By default, the light intensity doesn't dace. We can control the fade _distance_ and how fast it fades with **distance** and **decay**

```javascript
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
```

**RectAreaLight**
Works like the big rectangle lights you can see on the photoshoot set. It's a mix between a directional light and a difuse light.

- color
- intensity
- width
- height

The `RectAreaLight` **only** works with `MeshStandardMaterial` and `MeshPhysicalMaterial`.

```javascript
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5); // Moving the light
rectAreaLight.lookAt(new THREE.Vector3()); // Pointing the light to the center of the scene.
scene.add(rectAreaLight);
```

**SpotLight**
Is like a _flahslight_. It's a _cone_ of light _starting at a point_ and _oriented in a direction_.

- color
- intensity
- distance
- angle
- penumbra
- decay

To rotate the `Spotlight`, we need to add its `target` property to the scene and move it.

```javascript
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);

spotLight.target.position.x = -0.75;
scene.add(spotLight.target);
```

## Performance

Light can cost a lot when it comes to performance.
Try to add as few lights as possible and try to use the light that cost less.

**Minimal cost**

- AmbientLight
- HemisphereLight

**Moderate cost**

- DirectionalLight
- PointLight

**High cost**

- SpotLight
- RectAreaLight

## Baking

The idea is to `bake` the light into the texture. This can be done in a 3D software.
The drawback is that we cannot move the light anymore and we have to load huge textures.

## Helpers

To assit us with positioning the light

- [HemisphereLightHelper](https://threejs.org/docs/index.html#api/en/helpers/HemisphereLightHelper)
- [DirectionalLightHelper](https://threejs.org/docs/index.html#api/en/helpers/DirectionalLightHelper)
- [PointLightHelper](https://threejs.org/docs/index.html#api/en/helpers/PointLightHelper)
- [RectAreaLightHelper](https://threejs.org/docs/index.html#examples/en/helpers/RectAreaLightHelper)
- [SpotLightHelper](SpotLightHelper)

```javascript
// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2 // Size of the helper
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2 // Size of the helper
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2 // Size of the helper);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
// We need to update the helper.
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});


// We need to import RectAreaLightHelper
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
```
