import { state } from '../../state.js';

export class DefaultTerrain {
    constructor(width, height, x, y, color, border) {
        this.rectangle = new PIXI.Graphics();
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color || 0x000000;
        this.border = border || 0x464646;
    }

    generate() {
        this.rectangle.pivot.set(this.width / 2, this.height / 2);
        this.rectangle.lineStyle(1, this.border, 1, 0);
        this.rectangle.beginFill(this.color);

        this.rectangle.drawRect(0, 0, this.width, this.height);
        this.rectangle.endFill();
        this.rectangle.x = this.x;
        this.rectangle.y = this.y;
        
        return this.rectangle;
    }
}




// export class GridItem  {
//     constructor(width, height, x, y) {
//         this.rectangle = new PIXI.Graphics();
//         this.width = width;
//         this.height = height;
//         this.x = x;
//         this.y = y;
//         this._onButtonDown = this.onButtonDown.bind(this);
//         this._onButtonOver = this.onButtonOver.bind(this);
//         this._onButtonOut = this.onButtonOut.bind(this);
//     }

//     render() {
//         this.rectangle.pivot.set(this.width / 2, this.height / 2);
//         this.rectangle.lineStyle(1, 0x464646, 1, 0);
//         this.rectangle.beginFill(0x000000);

//         this.rectangle.drawRect(0, 0, this.width, this.height);
//         this.rectangle.endFill();
//         this.rectangle.x = this.x;
//         this.rectangle.y = this.y;

//         this.rectangle.interactive = true;
//         this.rectangle.buttonMode = true;
//         this.rectangle.on('pointerdown', this._onButtonDown);
//         this.rectangle.on('pointerover', this._onButtonOver);
//         this.rectangle.on('mouseout', this._onButtonOut);

//         return this.rectangle;
//     }

//     onButtonDown(e) {
//         e.currentTarget.removeAllListeners(); 

//         var x = e.currentTarget.x;
//         var y = e.currentTarget.y;
//         e.currentTarget.clear();
//         e.currentTarget.lineStyle(1, 0x464646, 1, 0);
//         e.currentTarget.beginFill(state.selectedMaterialColor);
//         e.currentTarget.drawRect(0, 0, this.width, this.height);
//         e.currentTarget.endFill();
//         e.currentTarget.x = x;
//         e.currentTarget.y = y;
//     }

//     onButtonOver(e) {
//         var x = e.currentTarget.x;
//         var y = e.currentTarget.y;
//         e.currentTarget.clear();
//         e.currentTarget.lineStyle(1, 0x464646, 1, 0);
//         e.currentTarget.beginFill(0x6D6D6D);
//         e.currentTarget.drawRect(0, 0, this.width, this.height);
//         e.currentTarget.endFill();
//         e.currentTarget.x = x;
//         e.currentTarget.y = y;
//     }

//     onButtonOut(e) {
//         var x = e.currentTarget.x;
//         var y = e.currentTarget.y;
//         e.currentTarget.clear();
//         e.currentTarget.lineStyle(1, 0x464646, 1, 0);
//         e.currentTarget.beginFill(0x000000);
//         e.currentTarget.drawRect(0, 0, this.width, this.height);
//         e.currentTarget.endFill();
//         e.currentTarget.x = x;
//         e.currentTarget.y = y;
//     }
// }