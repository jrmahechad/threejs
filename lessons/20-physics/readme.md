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

- We create a physics world.
- We create a Three.js 3D world.
- When we add an object ot the Three.js world, we also add one in the physics world.
- On each frame, we let the physics world update itself and we update the Three.js world accordingly.

**3D Physics libraries**

For 3D physics, there are three main libraries:

Ammo.js

- Website: [http://schteppe.github.io/ammo.js-demos/](http://schteppe.github.io/ammo.js-demos/)
- Git repository: [https://github.com/kripken/ammo.js/](https://github.com/kripken/ammo.js/)
- Documentation: No documentation
- Direct JavaScript port of Bullet (a physics engine written in C++)
- A little heavy
- Still updated by a community

  Cannon.js

- Website: [https://schteppe.github.io/cannon.js/](https://schteppe.github.io/cannon.js/)
- Git repository: [https://github.com/schteppe/cannon.js](https://github.com/schteppe/cannon.js)
- Documentation: [http://schteppe.github.io/cannon.js/docs/](http://schteppe.github.io/cannon.js/docs/)
- Lighter than Ammo.js
- More comfortable to implement than Ammo.js
- Mostly maintained by one developer
- Hasn't been updated for many years
- There is a maintained fork

  Oimo.js

- Website: [https://lo-th.github.io/Oimo.js/](https://lo-th.github.io/Oimo.js/)
- Git repository: [https://github.com/lo-th/Oimo.js](https://github.com/lo-th/Oimo.js)
- Documentation: [http://lo-th.github.io/Oimo.js/docs.html](http://lo-th.github.io/Oimo.js/docs.html)
- Lighter than Ammo.js
- Easier to implement than Ammo.js
- Mostly maintained by one developer
- Hasn't been updated for 2 years

For 2D physics, there are many libraries, but here's the most popular:

Matter.js

- Website: [https://brm.io/matter-js/](https://brm.io/matter-js/)
- Git repository: [https://github.com/liabru/matter-js](https://github.com/liabru/matter-js)
- Documentation: [https://brm.io/matter-js/docs/](https://brm.io/matter-js/docs/)
- Mostly maintained by one developer
- Still kind of updated

  P2.js

- Website: [https://schteppe.github.io/p2.js/](https://schteppe.github.io/p2.js/)
- Git repository: [https://github.com/schteppe/p2.js](https://github.com/schteppe/p2.js)
- Documentation: [http://schteppe.github.io/p2.js/docs/](http://schteppe.github.io/p2.js/docs/)
- Mostly maintained by one developer (Same as Cannon.js)
- Hasn't been update for 2 years

  Planck.js

- Website: [https://piqnt.com/planck.js/](https://piqnt.com/planck.js/)
- Git repository: [https://github.com/shakiba/planck.js](https://github.com/shakiba/planck.js)
- Documentation: [https://github.com/shakiba/planck.js/tree/master/docs](https://github.com/shakiba/planck.js/tree/master/docs)
- Mostly maintained by one developer
- Still updated nowadays

  Box2D.js

- Website: [http://kripken.github.io/box2d.js/demo/webgl/box2d.html](http://kripken.github.io/box2d.js/demo/webgl/box2d.html)
- Git repository: [https://github.com/kripken/box2d.js/](https://github.com/kripken/box2d.js/)
- Documentation: No documentation
- Mostly maintained by one developer (same as Ammo.js)
- Still updated nowadays

### Using Cannon.js

Create a physic `world` and set its `gravity` for a basic set up.

```javascript
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);
```

We need to create the same object in Three.js scene and in Cannon.js world.

```javascript
// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMatetial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});

const createSphere = (radius, position) => {
  // Three.js Mesh
  const mesh = new THREE.Mesh(sphereGeometry, sphereMatetial);
  mesh.scale.set(radius, radius, radius);

  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  // Cannon.js body
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape,
    material: defaultMaterial,
  });
  body.position.copy(position);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  // Save in object to update
  objectsToUpdate.push({
    mesh,
    body,
  });
};
```

We need to update every object in each frame using the values from the physics world into Thee.js scene.

```javascript
/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  world.step(1 / 60, deltaTime, 3);
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
```

In order to make the object collide we need to create at least one contact material.

```javascript
const defaultMaterial = new CANNON.Material("default");

const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  }
);
// For adding more contact materials to the world.
// world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;
```
