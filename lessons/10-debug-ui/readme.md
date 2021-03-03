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

There are multiple libraries that allow us to add a control panel to change elements in the UI.
- [Dat.GUI](https://github.com/dataarts/dat.gui)
- [control-panel](https://github.com/freeman-lab/control-panel)
- [ControlKit](https://github.com/automat/controlkit.js)
- [Guify](https://github.com/colejd/guify)
- [Oui](https://github.com/wearekuva/oui)
Bruno Simon's debug panel

## Dat.GUI
Dat.GUI is the most popular one. Install with the following command.

```bash
npm install --save dat.gui
```
Import and initialization.

```javascript
import * as dat from 'dat.gui';

/**
 * Debug
 */
const gui = new dat.GUI();
```

We have different types of tweak.

- *Range*: for number with minumim and maximum value.
- *Color*: for colors with various formats.
- *Text*: for simple texts
- *Checkbox*: for booleans (`true` or `false`).
- *Select*: for a choice from a list of values.
- *Button*: to trigger functions.
- *Folder*: to organize your panel if you have too many elements.

**Range**

```javascript
//Debug
gui.add(mesh.position, 'y', -3, 3, 0.01);
//OR
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01);
```
**Boolean**

```javascript
gui.add(mesh, 'visible')
gui.add(material, 'wireframe');
```

**Color**

```javascript
const debugObject = {
    color: 0xff0000
};
gui.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color);
});
```
**Functions**

```javascript
const debugObject = {
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + Math.PI * 2});
    }
};
gui.add(debugObject, 'spin');
```

**Hide the UI**
Press `h` to hide/show the panel.
If you want the panel to be hidden at the start, use `gui.hide()`.

**Close the UI**
Close the panel by clicking on its bottom part.
If you want the panel to be closed at start, send an object when instantiation and pass it `closed: true`

```javascript
const gui = new dat.GUI({closed: true});
```

**Width**
You can drag and drop the panel to change its width.
You can change the default with with `width: ...`

```javascript
const gui = new dat.GUI({width: 400});
```

**Links**

[API documentation](https://github.com/dataarts/dat.gui/blob/HEAD/API.md)
[Example](https://jsfiddle.net/ikatyang/182ztwao/)