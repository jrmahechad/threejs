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

Some texture types:

- *Color (or albedo)*:
    - Most simple one.
    - Applied on the geometry.
- *Alpha*:
    - Grayscale image.
    - White visible.
    Black not visible.
- *Height (or displacement)*:
    - Grayscale image.
    - Move the vertices to create some relief.
    - Need enough subdivision.
    - White vertices move up, Black vertices move down.
- *Normal*:
    - Add details.
    - Doesn't need subdivision.
    - The vertices won't move.
    - Lure the light about the face orientation.
    - Better performaces than adding a height texture with a lot of subdivision.
- *Ambient occlusion*:
    - Grayscale image.
    - Add fake shadows in crevices.
    - Not physically accurate.
    - Helps to create contrast and see details.
- *Metalness*:
    - Grayscale image.
    - White is metallic.
    - Black is non-metallic.
    - Mostly for reflection.
- *Roughness*:
    - Grayscale image.
    - In duo with the metalness.
    - White is rough.
    - Black is smooth.
    - Mostly for light dissipation.

Most of these textures try to follow PBR(physically based rendering) principles. Many technics tent to follow real-life directions to ger realistics results. Its becoming the standard for realistic renders. Many software, engines, and libraries are using it.

### Load textures

Using vanilla JS:

```javascript
const image = new Image();
const texture = new THREE.Texture(image);
image.onload = () => {
    texture.needsUpdate = true;
}
image.src = '/textures/door/color.jpg';

// ...

const material = new THREE.MeshBasicMaterial({ map: texture });
```

Using `textureLoader`:

```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/door/color.jpg');

// ...

const material = new THREE.MeshBasicMaterial({ map: texture });
```

:notebook: One `textureLoader` can load multiple textures. The `textureLoader` has 3 callback: `load`, `progress`, and `error`.

### UV unwrapping
The texture is being stretched or squeezed in different ways to cover the geometry.
This is called `UV unwrapping` and it's like unwrapping and origami or a candy wrap to make it flat.
Each `vertex` will have a 2D coordinate on a flat plane (usually a square).

### Transformations
Texture can be transformed in several ways.

**Repeat**

```javascript
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
```
**RepeatWrapping**

```javascript
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
```

**Adding an offset**

```javascript
colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;
```

**Rotation**

```javascript
colorTexture.rotation = Math.PI / 4;
```

**Changing the pivot point**

```javascript
colorTexture.rotation = Math.PI / 4;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
```

### Filtering and mip mapping
Mipmapping (or "mip mapping") is a technic that consistes of creating half a smaller version of a texture againg and again until we get a `1x1` texture.

All those textures variations are sent to the GPU, and GPU will choose the most appropriate version of the texture.

All of this is already handled by Three.js and the GPU but we can choose different algorithms.

There are twoo types of filters algorithms.

**Minification filter**
Happens when the pixels of texture are smaller than the pixels of the render. In other words, the texture is too big for the surface, it covers.

There are several algorithm in `three.js` for this.

```javascript
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.minFilter = THREE.LinearFilter;
colorTexture.minFilter = THREE.NearestMipMapNearestFilter;
colorTexture.minFilter = THREE.NearestMipMapLinearFilter;
colorTexture.minFilter = THREE.LinearMipMapNearestFilter;
colorTexture.minFilter = THREE.LinearMipMapLinearFilter; // Default
```

**Magnification filter**
Happens when the pixels of the texture are bigger than the pixels of the render. In other words, the texture is too small for the surface it covers.

Example
```javascript
colorTexture.magFilter = THREE.NearestFilter;
```


:notebook: `THREE.NearestFilter` is cheaper than the other ones and if the result is fine you just use it.

If we are using `THREE.NearestFilter` on `minFilter`, we don't need the mipmaps.

We can deactivate the mipmaps like this:

```javascript
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
```

### Preparing textures
When preparing your textures, keep in mind 3 crucial elements:

- The weight
- The size (or the resolution)
- The data

**The weight**

The uses will have to download the textures. Choose the right type of file.

- `.jpg` - lossy compresion but usually ligher.
- `.png` - lossless compression but usually heavier.

Use compression websites and softwares like [TinyPNG](https://tinypng.com/)

**The size**
Each pixel of the textures will have to be stored on the GPU regardless of the image's weight.
GPU has storage limitations
It's even worse because mipmapping increases the number of pixel to store
Try to reduce the dizr of your images as much as possible.

The mipmapping will produce a half smaller version of the texture repeatedly until `1x1`.
Because of that, the texture width and heigh must be a power of 2.

- `512x512`
- `1024x1024`
- `512x2048`

The difficulty is to find the right combination of texture formats and resolutions.

**Where to find textures**

- [poliigon.com](https://www.poliigon.com/)
- [3dtextures.me](https://3dtextures.me/)
- [arroway-textures.ch](https://www.arroway-textures.ch/)
- [Substance Designer](https://www.substance3d.com/products/substance-designer/)
