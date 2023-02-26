import { DefaultTerrain } from '../terrain/defaultTerrain.js';

export class IceTerrain extends DefaultTerrain {
    constructor(x, y, width, height, color) {
        super(x, y, width, height);
        this.color = color || 0xe6fae0;
    }

    // render() {
    //     this.rectangle.pivot.set(this.width / 2, this.height / 2);
    //     this.rectangle.lineStyle(1, this.border, 1, 0);
    //     this.rectangle.beginFill(this.color);

    //     this.rectangle.drawRect(0, 0, this.width, this.height);
    //     this.rectangle.endFill();
    //     this.rectangle.x = this.x;
    //     this.rectangle.y = this.y;

    //     this.addEvents();

    //     return this.rectangle;
    // }

    onButtonDown(e) {
        console.log("IceTerrain", e);
    }

    onButtonOver(e) {
        // console.log(e);
    }

    onButtonOut(e) {
        // console.log(e);
    }
}