import { DefaultTerrain } from '../terrain/defaultTerrain.js';

export class JungleTerrain extends DefaultTerrain {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
        this.color = color || 0x85960c;
    }

    onButtonDown(e) {
        console.log("JungleTerrain", e);
    }

    onButtonOver(e) {
        // console.log(e);
    }

    onButtonOut(e) {
        // console.log(e);
    }
}