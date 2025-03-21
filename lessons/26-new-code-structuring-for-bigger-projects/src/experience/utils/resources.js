import * as THREE from "three";
import EventEmitter from "./event-emitter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;

    //Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      textureLoader: new THREE.TextureLoader(),
      gLTFLoader: new GLTFLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gLTFLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
