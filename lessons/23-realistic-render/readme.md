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

The default Three.js light intensities are baed on an arbitrary scale unit and don't reflect real world values.

Set the `physicallyCorrectLights` property of the renderer to `true` to enable it.

```javascript
renderer.physicallyCorrectLights = true;
```

The lighting will be taken care of by the environment map.

We will use the environment map both for the background and to illuminate our model.

To add the environment map as a background use:

```javascript
scene.background = environmentMap;
```

To add an environment map to all objects in the scene do:

```javascript
scene.environment = environmentMap;
```
