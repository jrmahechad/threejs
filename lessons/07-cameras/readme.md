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

:notebook: Note: Use node v14.16.0 or latest

## Lesson

## Perspective Camera

*Parameters:*
- *Field of view*: Vertical vision angle. In degrees. Also, called `fov`. Is recommended to have a `fov` between `45` and `75`.
- *Aspect ratio*: width of the render divided by the height of the render.
- *Near* and *Far*: An object or part of the object closer than `near` or further than `far` will not show up. :warning: Do not use extreme values like `0.0001` and `9999999` to prevent `z-fighting`.

## Orthographic Camera

`OrthographicCamera` differs from `PerspectiveCamera` by its lack of perspective. Objects have the same size regardless of their distance to the camera.

*Parameters:*
- *Left*, *Right*, *Top* and *Bottom*
- *Near* and *Far*

Using int values in *Left*, *Right*, *Top* and *Bottom* can distort on the scene. Use aspect ratio to fix it.

```javascript
// Object is NOT rendered correctly
const camera = new THREE.OrthographicCamera(-1,1, 1, -1, 0.1, 100);

// Object is rendered correctly
const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio, 1, -1, 0.1, 100);

```

## Building controls

- *DeviceOrientationControls*: Used when a device has orientation controls, for instance, a cellphone. Seams like `iOS` is no longer supporting this feature :warning: need to be tested :construction:
- *FlyControls*: Enable moving the camera like if you were on a spaceship. You can rotate on all 3 axes, go forward and go backward.
- *FirstPersonControls*: Is like `FlyControls`, but with a fixed up axis. Doesn't work like in `FPS` games.
- *PointerLockControls*: Uses the [pointer lock JavaScript API.](FlyControls) Hard to use and almost only handles the pointer lock and camera rotation.
- *OrbitControls*: Similar to the controls we made with more features. It has camera rotation and zooming.
- *TrackballControls*: is like `OrbitControls` without the vertical angle limit.
- *TransformControls*: Has nothing to do with the camera. Is used to move objects.
- *DragControls*: Has nothing to do with the camera. Is used to move objects.

## OrbitControls

*Parameters*
- *camera*: camera to be controlled.
- *domElement*: DOM element to attached mouse events.

The target of the controls can be changed. Remember to update the controls when doing so.

```javascript
controls.target.y = 1;
controls.update()

```

### Damping
The damping will smooth the animation by adding some kind of acceleration and friction.

To enable the damping, switch the `enableDamping` property to `true`.

When using the damping you need to update the controls in each frame. This can be done inside the `tick` function.