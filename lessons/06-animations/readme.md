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

:pencil2: Use `requestAnimationFrame` to call a function in the next animation frame.

You can create an animation loop by calling `requestAnimationFrame` inside a function and pass the same function to `requestAnimationFrame`.

Function will be executed according to the frame rate of the computer. The animation speed can change in computer with differente frame rates.

To avoid this on option is to use the `currentTime` and a `deltaTime` in the animation.

```javascript
// Time
let time = Date.now();

// Animations
const tick = () => {
    //Time
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    // Update objects
    mesh.rotation.y += 0.001 * deltaTime;

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};

tick();
```

`three.js` provides us with an alternative function. We can use the `Clock` function to get an `elapsedTime` and use it in the animation.

```javascript
// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    mesh.rotation.y = elapsedTime * Math.PI * 2;

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};
tick();
```

:warning: Do *NOT* use `Clock.getDelta()`.

You can algo use [GreenSock GSAP](https://greensock.com/gsap/) to create the animation.

```javascript
// GreenSock
gsap.to(mesh.position, {duration:1, delay: 1, x: 2});
gsap.to(mesh.position, {duration:1, delay: 2, x: 0});

// Animations
const tick = () => {
    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};

tick();
```

Inside the `tick` function only call `renderer.render` function.