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

There is no `random` function in GLSL. Use the following

```
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
```

There is no definition for `pi` in GLSL. Use the following

```
#define PI 3.1415926535897932384626433832795
```

This is a helper function to rotate a `vec2`

```
vec2 rotate(vec2 uv,float rotation,vec2 mid){
    return vec2(
        cos(rotation)*(uv.x-mid.x)+sin(rotation)*(uv.y-mid.y)+mid.x,
        cos(rotation)*(uv.y-mid.y)-sin(rotation)*(uv.x-mid.x)+mid.y
    );
}
```

[Github Noise for Perlin Noise](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)

| PATTERN | IMAGE                                   |
| ------- | --------------------------------------- |
| 1       | ![pattern 1](./img_readme/p1.png)       |
| 2       | ![pattern 2](./img_readme/p2.png)       |
| 3       | ![pattern 3](./img_readme/p3.png)       |
| 4       | ![pattern 4](./img_readme/p4.png)       |
| 5       | ![pattern 5](./img_readme/p5.png)       |
| 6       | ![pattern 6](./img_readme/p6.png)       |
| 7       | ![pattern 7](./img_readme/p7.png)       |
| 8       | ![pattern 8](./img_readme/p8.png)       |
| 9       | ![pattern 9](./img_readme/p9.png)       |
| 10      | ![pattern 10](./img_readme/p10.png)     |
| 11      | ![pattern 11](./img_readme/p11.png)     |
| 12      | ![pattern 12](./img_readme/p12.png)     |
| 13      | ![pattern 13](./img_readme/p13.png)     |
| 14      | ![pattern 14](./img_readme/p14.png)     |
| 15      | ![pattern 15](./img_readme/p15.png)     |
| 16      | ![pattern 16](./img_readme/p16.png)     |
| 17      | ![pattern 17](./img_readme/p17.png)     |
| 18      | ![pattern 18](./img_readme/p18.png)     |
| 19      | ![pattern 19](./img_readme/p19.png)     |
| 20      | ![pattern 20](./img_readme/p20.png)     |
| 21      | ![pattern 21](./img_readme/p21.png)     |
| 22      | ![pattern 22](./img_readme/p22.png)     |
| 23      | ![pattern 23](./img_readme/p23.png)     |
| 24      | ![pattern 24](./img_readme/p24.png)     |
| 25      | ![pattern 25](./img_readme/p25.png)     |
| 26      | ![pattern 26](./img_readme/p26.png)     |
| 27      | ![pattern 27](./img_readme/p27.png)     |
| 28      | ![pattern 28](./img_readme/p28.png)     |
| 29      | ![pattern 29](./img_readme/p29.png)     |
| 30      | ![pattern 30](./img_readme/p30.png)     |
| 31      | ![pattern 31](./img_readme/p31.png)     |
| 32      | ![pattern 32](./img_readme/p32.png)     |
| 33      | ![pattern 33](./img_readme/p33.png)     |
| 34      | ![pattern 34](./img_readme/p34.png)     |
| 35      | ![pattern 35](./img_readme/p35.png)     |
| 36      | ![pattern 36](./img_readme/p36.png)     |
| 37      | ![pattern 37](./img_readme/p37.png)     |
| 38      | ![pattern 38](./img_readme/p38.png)     |
| 39      | ![pattern 39](./img_readme/p39.png)     |
| 40      | ![pattern 40](./img_readme/p40.png)     |
| 41      | ![pattern 41](./img_readme/p41.png)     |
| 42      | ![pattern 42](./img_readme/p42.png)     |
| 43      | ![pattern 43](./img_readme/p43.png)     |
| 44      | ![pattern 44](./img_readme/p44.png)     |
| 45      | ![pattern 45](./img_readme/p45.png)     |
| 46      | ![pattern 46](./img_readme/p46.png)     |
| 47      | ![pattern 47](./img_readme/p47.png)     |
| 48      | ![pattern 48](./img_readme/p48.png)     |
| 49      | ![pattern 49](./img_readme/p49.png)     |
| 50      | ![pattern 50](./img_readme/p50.png)     |
| 50-2    | ![pattern 50-2](./img_readme/p50-2.png) |
