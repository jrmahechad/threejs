# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Lesson

The dark shado in the back of the object are called **core shadows**.
What we are missing are the **drop shadows**.

When you do one render, Three.js will do a render for each light supporting shadows.
Those renders will simulate what the light sees as if it was a camera.
During these lights renders, a *MeshDepthMaterial* replaces all meshes materials.

The lights renders are stored as textures and we call those **shadow maps**.
They are then used on every materials supposed to receive shadows and projected on the geometry.

To enable shadow maps use:

```javascript
renderer.shadowMap.enabled = true;
```

Then go through each object and decide it it can cas a shadow with `castShadow` and if it can receive shadow with `receiveShadow`.
```javascript
// ...
sphere.castShadow = true;
// ...
plane.receiveShadow = true;
```

Now we need to activate the shadows on the light.
Only the following types of lights supports shadows.

- PointLight
- DirectionalLight
- Spotlight

```javascript
directionalLight.castShadow = true;
```

By default, the shadow map size is `512x512`
We can improve it but keep a power of 2 for the mipmapping.

**Adjusting the camera**

We can change the shadow camera values to improve our shadow.
The `directionalLight` camera is an `orthographic camera` so we can change these values.

```javascript
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
```

The closer the object is in the shadow map the better the shadow.
The smaller the values, the more precise the shadow will be. However, if it's too small, the shadows will be cropped.

**Blur**
You can control the shadow blur with the `radius` property

```javascript
directionalLight.shadow.radius = 10;
```

This technic doesn't use the proximity of the camera with the object, it's a general and cheap blur.

**Shadow map algorith**

Different types of algorithms can be applied to shadow maps.

- `THREE.BasicShadowMap`: Very performant but lousy quality.
- `THREE.PCFShadowMap`: Less performant but smoother edges (default).
- `THREE.PCFSoftShadowMap`: Less performant but even softer edges.
- `THREE.VSMShadowMap`: Less performant,moew constraints, can have unexpected results.

```javascript
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

The `radius` doesn't work with `THREE.PCFSoftShadowMap`.

PointLight creates 6 perpective cameras, in each direction of a cube.

## Baking shadows
A good alternative to Three.js shadows is baked shadows.
We integrate shadows in textures that we apply on materials