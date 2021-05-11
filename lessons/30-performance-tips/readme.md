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

- Monitor FPS
- [Disable FPT Limit](https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d)
- Monitoring draw calls. ([Spector.js](https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk))
- Renderer informations
- Good JavaScript code
- [Dispose of things](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)

**Lights**

- Avoid them
- Avoid adding or removing lights

**Shadows**

- Avoid them
- Optimize shadow maps
- Use castShadow and receiveShadow wisely
- Deactivate shadow auto update

**Textures**

- Resize textures
  - [Basic compression](https://github.com/BinomialLLC/basis_universal)
- Keep a power of 2 resolutions
- Use the right format

**Geometries**

- Do not update vertices
- Mutualize geometries
  - If you have multiple Meshes using the same geometry shape, create only one geometry, and use it on all the meshes
- Merge geometries

**Materials**

- Mutualize materials
- Use cheap materials

**Meshes**

- Use InstancedMesh

**Models**

- Low poly
- Draco compression
- Gzip

**Cameras**

- Field of view
- Near and far

**Renderer**

- Pixel ratio
- Power preferences
- Antialias

**Postprocessing**

- Limit passes

**Shaders**

- Specify the precision
- Keep code simple
  - Avoid use `if`, use `max`, `min` or `clamp` instead.
- Use textures
- Use defines
- Do the calculations in the vertex shader
