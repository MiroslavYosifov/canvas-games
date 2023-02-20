import { GridItemGenerator } from './gridItemGenerator.js';

export class GridGenerator {
    constructor(size, rows, colums) {
        this.grid = [];
        this.size = size;
        this.rows = rows;
        this.colums = colums;
        this.itemsCount =  this.rows * this.colums; 
    }

    get getGrid() {
        return this.grid;
    }

    create() {
        for (let i = 0; i < this.itemsCount; i++) {
            const x = ((i % this.rows) * this.size) + this.size / 2;
            const y = (Math.floor(i / this.colums) * this.size) + this.size / 2;
            const gridItem = new GridItemGenerator(x, y, this.size, this.size);
            this.grid.push(gridItem);
        }
    }
}