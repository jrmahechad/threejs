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

You can add fog to the scene by doing

```javascript
// Fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;
```

To fix the background, we must change the clear color of the `renderer` and use the same color as the fog.

```javascript
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
// ...
renderer.setClearColor("#262837");
```

To change the _size_ of a texture in an objet we can repeat it
