import { createRectangle, createContainer } from "../../utils/grapics/index.js";
import { TerrainMenu } from './terrainMenu.js';

export class Sidebar {
    constructor({ width, height, x, y }) {
        console.log(width, height, x, y);
        this.container = new PIXI.Container;
        this.content =  new PIXI.Graphics();
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
       
        this.terrainMenu = new TerrainMenu(400, 400, 50, 50);
        this.init();
    }
   
    init() {

        this.container.width = this.width;
        this.container.height = this.height;
        this.container.x = this.x;
        this.container.y = this.y;
        
        this.content.lineStyle(1, 0x3443ea, 1, 0);
        this.content.beginFill(0x000000);
        this.content.drawRect(0, 0, this.width, this.height);
        this.content.endFill();
        this.content.x = 0;
        this.content.y = 0;

        this.content.addChild(this.terrainMenu.render());
        this.container.addChild(this.content);
    }

    render() {
        return this.container;
    }

    

    destroy() {

    }
}

// render() {
//     for (let i = 0; i < this.grid.length; i++) {
//         let square = new PIXI.Graphics();
//         square.pivot.set(20, 20);
//         square.lineStyle(1, 0x464646, 1, 0);
//         square.beginFill(0x000000);
   
//         square.drawRect(0, 0, this.grid[i].width, this.grid[i].height);
//         square.endFill();

//         square.interactive = true;
//         square.buttonMode = true;

//         square.on('pointerover', this.onButtonOver);
//         square.on('mouseout', this.onButtonLeave);
//         square.on('pointerdown', this.onButtonDown);

//         square.x = this.grid[i].x;
//         square.y = this.grid[i].y;
//         // add squares to stage
//         this.app.stage.addChildAt(square, 0);
//     }
// }