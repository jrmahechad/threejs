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

Shader is a program written in GLSL.
Is sent to the GPU.
Position each vertex of a geometry.
Colorize each visible pixel of that geometry.

We send a lot of data to the shader.

- Verices coordinates
- Mesh transformation
- Information about the camera
- Colors
- Textues
- Lights
- Fog
- Etc

_vertex shader_ position the vertices on the render
_fragment shader_ color each visible fragment of that geomtry
_fragment shader_ is executed after the _vertex shader_

information that changes betweeb each vertices (like their positions) are called _atrributes_ and can only be used in the _vertex shader_

information that doesn't change between vertices (or fragments) are called _uniforms_ and can use in both the _vertex shader_ and the _fragment shader_

we can send data from the _vertex shader_ to the _fragment shader_ using _varying_

_varyings_ values are interpolated between the vertices

**Why shaders**
Three.js materials are limited.
Our shaders can be very simple and performant.
We can add custom post-processing.

We can use a `ShaderMaterial` or a `RawShaderMaterial`

The shader language is calles **GMLSL** (OpenGL Shading Language)

[The Book of Shaders](https://thebookofshaders.com/)

**gl_Position**:

- already exists
- we need to assign it
- will contain the position of the vertex on the screen
- is a vec4

- `modelMatrix` apply transformations relative to the Mesh (`position`, `rotation`, `scale`)
- `viewMatrix` apply transformations relative to the camera (`position`, `field of view`, `near`, `far`)
- `projectionMatrix` transform the coordinats into the clip space coordinates.
