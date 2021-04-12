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

There are a lot of formats for 3D objects. One is becoming a standard and should cover most of our needs. **GLTF**

Supports different sets of data like _geometries_, _materials_, _cameras_, _lights_, _scene graph_, _animations_, _skeletons_, _morphings_, etc.

You don't have to use GLTF in all cases.

```javascript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/**
 * Models
 */

const gltfLoader = new GLTFLoader();

gltfLoader.load(
  "/models/Duck/glTF/Duck.gltf",
  // "/models/FlightHelmet/glTF/FlightHelmet.gltf",
  (gltf) => {
    console.log("success");
    console.log(gltf);
    // Option 1
    // while (gltf.scene.children.length) {
    //   scene.add(gltf.scene.children[0]);
    // }

    // Option 2
    // const children = [...gltf.scene.children];
    // for (const child of children) {
    //   scene.add(child);
    // }

    //Option 3
    scene.add(gltf.scene);
  }
);
```

In order to load Draco models we need to import it and add it to the gltfLoader.

To run the loader using web assembly we need to copy the folder available `/node_modules/three/examples/js/libs/` into the project.

```javascript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
```

When models have animations attrached to them we can play them by using **mixer**

```javascript
let mixer = null;

gltfLoader.load(
  // "/models/Duck/glTF/Duck.gltf",
  "/models/Fox/glTF/Fox.gltf",
  //   "/models/Duck/glTF-Draco/Duck.gltf",
  // "/models/FlightHelmet/glTF/FlightHelmet.gltf",
  (gltf) => {
    console.log("success");
    console.log(gltf);

    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[2]);
    action.play();
    //...
  })

  // ...

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // Update mixer
    if (mixer) {
        mixer.update(deltaTime);
    }
    //...
  }
);
```
