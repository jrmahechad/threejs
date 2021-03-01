# Threejs Journey - Basic Scene

Set up a basic scene using `three.min.js` script file in the project folder.

`ThreeJs` exports an object `THREE` (all caps).

To render a basic scene we need a `canvas` element.

We create the following elements:
- *scene*: Scene to render
- *geometry*: Represents the object we are going to display. In this case a cube
- *material*: Represents a material. In this case the color red.
- *mesh*: Is the union of the geometry and the material. This is the objet to render. We need to add the `mesh` to the `scene`.
- *camera*: From where we look at the scene.
- *renderer*: The element that will render the scene.

:movie_camera: By default all object are rendered in the same position. Because of that we need to move the camera to see the cube.

```javascript
camera.position.z = 3;
```

