#pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: levels = require('./levels')


uniform sampler2D uCloudShape;
uniform sampler2D uCloudTexture;
uniform float uTime;

uniform float uFac1;
uniform float uFac2;
uniform float uTimeFactor1;
uniform float uTimeFactor2;
uniform float uDisplStrenght1;
uniform float uDisplStrenght2;

varying vec2 vUv;

void main() {
    vec2 newUv = vUv;

    vec4 txtNoise1 = texture2D(uCloudTexture, vec2(vUv.x + sin(uTime) * 0.01, vUv.y - cos(uTime) * 0.01)); // noise txt
    vec4 txtNoise2 = texture2D(uCloudTexture, vec2(vUv.x - sin(uTime + 0.5) * 0.01, vUv.y + cos(uTime + 0.5) * 0.01)); // noise txt

    float noiseBig = fbm3d(vec3(vUv * uFac1, uTime * uTimeFactor1), 4)+ 1.0 * 0.5;
    newUv += noiseBig * uDisplStrenght1;

    float noiseSmall = snoise3(vec3(newUv * uFac2, uTime * uTimeFactor2));

    newUv += noiseSmall * uDisplStrenght2;

    vec4 txtShape = texture2D(uCloudShape, newUv);

    float alpha = levels((txtNoise1 + txtNoise2) * 0.6, 0.2, 0.4, 0.7).r;
    alpha *= txtShape.r;

    gl_FragColor = vec4(vec3(alpha),alpha);
    // gl_FragColor = vec4(txtNoise1);
}