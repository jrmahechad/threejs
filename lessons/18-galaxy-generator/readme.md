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

To kwno when to generate a new galaxy, you must listen to the change event.

Use the `finishChange(...)` method and provide the `generateGalaxy` function

Before assigning those variables, we can test if they already exist and use the `dispose()` method to destroy the geometry and the material properly.
Then remove the points from the scene with `remove()`

To create mixed colors do something similar to.
Clone the base color. Then use the `lerp` function with the color to mix and an alpha value.

```javascript
const mixedColor = colorInside.clone();
mixedColor.lerp(colorOutside, radius / parameters.radius);
```
