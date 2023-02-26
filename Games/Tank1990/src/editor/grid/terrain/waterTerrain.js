import { DefaultTerrain } from '../terrain/defaultTerrain.js';

export class WaterTerrain extends DefaultTerrain {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
        this.color = color || 0x204deb;
    }

    onButtonDown(e) {
        console.log("WaterTerrain", e);
    }

    onButtonOver(e) {
        // console.log(e);
    }

    onButtonOut(e) {
        // console.log(e);
    }
}