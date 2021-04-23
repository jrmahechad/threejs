class CustomControl {
  constructor(camera, domElement, speed) {
    this.camera = camera;
    this.domElement = domElement;
    this.cursor = { x: 0, y: 0 };
    this.cameraStartingPosition = camera.position.clone();
    this.speed = speed || { x: 0.5, y: 0.5 };

    this.init_();
  }

  init_() {
    this.domElement.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event);
    });
  }

  handleMouseMove(event) {
    event.preventDefault();
    this.cursor.x = (event.clientX / this.domElement.clientWidth) * 2 - 1;
    this.cursor.y = -(event.clientY / this.domElement.clientHeight) * 2 + 1;
  }

  update() {
    this.camera.position.x =
      this.cameraStartingPosition.x + this.speed.x * this.cursor.x * -1;
    this.camera.position.y =
      this.cameraStartingPosition.y + this.speed.y * this.cursor.y * -1;
  }
}

export { CustomControl };
