import { GridItem } from './gridItem.js';

export class Grid {
    constructor({ size, rows, cols }) {
        this.container = new PIXI.Container;
        this.grid = [];
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.itemsCount =  this.rows * this.cols; 
        this.init();
    }

    get getGrid() {
        return this.grid;
    }

    init() {
        for (let i = 0; i < this.itemsCount; i++) {
            const x = ((i % this.rows) * this.size) + this.size / 2;
            const y = (Math.floor(i / this.cols) * this.size) + this.size / 2;
            const gridItem = new GridItem(x, y, this.size, this.size);
            this.grid.push(gridItem);
        }
    }

    render() {
        for (let i = 0; i < this.grid.length; i++) {
            this.container.addChild(this.grid[i].render())
        }
        return this.container;
    }

    destroy() {

    }
}