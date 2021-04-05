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

A Raycaster can cast a ray in a specific direction and test what objects intersect with it.

**Usage examples**

- Detect if there is a wall in front of the player.
- Test if the laser gun hit something.
- Test if something is currently under the mouse to simulate mouse events.
- Show an alert message if the spaceship is heading towards a planet.

To setup a raycaster we need to define it's origin and direction. Direction needs to be normalized.

```javascript
/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();

raycaster.set(rayOrigin, rayDirection);
```

To cast a ray use the methods `intersectObject()`or `intersectObjects()`

```javascript
const intersect = raycaster.intersectObject(object2);
console.log(intersect);

const intersects = raycaster.intersectObjects([object1, object2, object3]);
console.log(intersects);
```

The result is always an array because a ray can go through the same object multiple times.
