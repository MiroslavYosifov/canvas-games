import { GridGenerator } from './grid/gridGenerator.js';

export class Field {
    constructor(app, isPixelVersion) {
        this.grid;
        this.gridGenerator = new GridGenerator(40, 25, 25);
        this.app = app;
        this.isPixelVersion = isPixelVersion;
        this.init();
    }

    init() {
        this.gridGenerator.create();
        this.grid = this.gridGenerator.getGrid;
    }

    render() {
        for (let i = 0; i < this.grid.length; i++) {
            this.app.stage.addChildAt(this.grid[i].render(), 0);
        }
    }

    onButtonOver(e) {
        var x = e.currentTarget.x;
        var y = e.currentTarget.y;
        e.currentTarget.clear();
        e.currentTarget.lineStyle(1, 0x464646, 1, 0);
        e.currentTarget.beginFill(0x6D6D6D);
        e.currentTarget.drawRect(0, 0, 40, 40);
        e.currentTarget.endFill();
        e.currentTarget.x = x;
        e.currentTarget.y = y;
    }

    onButtonLeave(e) {
        var x = e.currentTarget.x;
        var y = e.currentTarget.y;
        e.currentTarget.clear();
        e.currentTarget.lineStyle(1, 0x464646, 1, 0);
        e.currentTarget.beginFill(0x000000);
        e.currentTarget.drawRect(0, 0, 40, 40);
        e.currentTarget.endFill();
        e.currentTarget.x = x;
        e.currentTarget.y = y;
    }

    onButtonDown(e) {
        e.currentTarget.removeAllListeners(); 

        var x = e.currentTarget.x;
        var y = e.currentTarget.y;
        e.currentTarget.clear();
        e.currentTarget.lineStyle(1, 0x464646, 1, 0);
        e.currentTarget.beginFill(0x6D6D6D);
        e.currentTarget.drawRect(0, 0, 40, 40);
        e.currentTarget.endFill();
        e.currentTarget.x = x;
        e.currentTarget.y = y;
    }

}