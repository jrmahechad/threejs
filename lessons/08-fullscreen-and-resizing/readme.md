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

To handle resize add an event listener and update camera and renderer properties as follows:

```javascript
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

To visualize the animation correctly in devices with a high pixel ratio use the following code:

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

To toggle fullscreen use the functions `canvas.requestFullscreen` and `document.exitFullscreen`.

To make it work in safari use the the webkit versions of the functions, `canvas.webkitRequestFullscreen` and `document.webkitExitFullscreen`.

```javascript
window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullScreenElement) {
        if(canvas.requestFullscreen){
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen();
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
});
```