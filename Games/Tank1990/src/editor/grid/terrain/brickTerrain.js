import { DefaultTerrain } from '../terrain/defaultTerrain.js';

export class BrickTerrain extends DefaultTerrain {
    constructor(x, y, width, height, color) {
      super(x, y, width, height)
      this.color = color || 0xd23e40;
    }

    onButtonDown(e) {
      console.log("BrickTerrain", e);
  }

  onButtonOver(e) {
      // console.log(e);
  }

  onButtonOut(e) {
      // console.log(e);
  }
}