export class InputHandler {
  constructor(value) {
      this.key = {};
      this.key.value = value;
      this.key.isDown = false;
      this.key.isUp = true;
      this.key.release = undefined;
      this.key.press = undefined;
      this._downListener = this.#downHandler.bind(this);
      this._upListener = this.#upHandler.bind(this);
      this.attachEvents();
  }
  
  get getKey() {
      return this.key;
  }

  #downHandler(event) {
    if (event.key === this.key.value) {
      if (this.key.isUp && this.key.press) {
          this.key.press(this.key.value);  
      }
      this.key.isDown = true;
      this.key.isUp = false;
      event.preventDefault();
    }
  }

  #upHandler(event) {
    if (event.key === this.key.value) {
      if (this.key.isDown && this.key.release) {
          this.key.release(this.key.value);
      }
      this.key.isDown = false;
      this.key.isUp = true;
      event.preventDefault();
    }  
  }

  attachEvents() {
      window.addEventListener("keydown", this._downListener , false);
      window.addEventListener("keyup", this._upListener, false);
  }

  detachEvents() {
      window.removeEventListener("keydown", this._downListener);
      window.removeEventListener("keyup", this._upListener);
  }

  subscribeKeyDown () {
    window.addEventListener("keydown", this._downListener, false);
  }

  unsubscribeKeyDown () {
    window.removeEventListener("keydown", this._downListener);
  }
}