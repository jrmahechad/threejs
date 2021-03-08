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

BoxGeometry params

- *width*: The size on the `x-axis` .
- *height*: The size on the `y-axis`.
- *depth*: The size on the `z-axis`.
- *widthSegments*: How many subdivisions in the `x-axis`.
- *heightSegments*: How many subdivisions in the `y-axis`.
- *depthSegments*: How many subdivisions in the `z-axis`.

Subdivisions correspond to how many triangles should compose a face.

- `1` = 2 triangles per face.
- `2` = 8 triangles per face.

To see the segments use `wireframe: true` when creating the material.

We can create geometries by specifying all of its vertexes. To do so we will use `Float32Array`.
The array represents the coordinates from all points in the geometry. Every 3 values in the array represent a point with `x`, `y`, and `z` values.

