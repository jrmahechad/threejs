// uniform mat4 projectionMatrix; If using ShaderMaterial this is not needed.
// uniform mat4 viewMatrix; If using ShaderMaterial this is not needed.
// uniform mat4 modelMatrix; If using ShaderMaterial this is not needed.
uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position; If using ShaderMaterial this is not needed.
attribute float aRandom;
// attribute vec2 uv; If using ShaderMaterial this is not needed.

varying vec2 vUv;
varying float vElevation;
// varying float vRandom;

void main() {
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z = elevation;

    // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;

    // vRandom = aRandom;
}
