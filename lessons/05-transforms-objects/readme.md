# Three.js Journey - Tranform Objets

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

:notebook: Note: Use node v14.16.0 or latest

## Lesson

### Position

You can access/change the `position` of an element on each axis. Change the value of `x`, `y`, and `z` individually or using the `set` function.

```javascript
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;
// OR
mesh.position.set(0.7, -0.6, 1)

```

### Scale

`scale` works in the same way than `position`.

```javascript
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
// OR
mesh.scale.set(2, 0.5, 0.5);
```

### Rotation

For `rotation` you can acces/change it using the individually. Use `Math.PI` to set the angle. See [Euler angles](https://en.wikipedia.org/wiki/Euler_angles) for more details.

```javascript
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
```

You can change the order of the rotation axis by doing:

```javascript
mesh.rotation.reorder('YXZ');
```

:notebook: Remember to reorder before doing the rotation!

### Look At

We can change the position of the camera to `look at` a particular point/object like this

```javascript
camera.lookAt(new THREE.Vector3(3, 0, 0));
// OR
camera.lookAt(mesh.position);

```

### Groups

You can create groups of objects. Groups work as an object so you can change it's `position`, `scale` and `rotation` in the scene. Also, you can change the position of the elements inside the group in the same way.

### Notes :notebook: :pencil2:

`mesh.position.normalize()` Reduce the length of the vector until is 1.