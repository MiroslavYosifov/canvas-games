import { Grid } from './grid/grid.js';
import { Sidebar } from './sidebar/sidebar.js'

const fieldConfig = {
    size: 50,
    rows: 20,
    cols: 20,
    x: 0,
    y: 0,
}

const sideBarConfig = {
    x: 1100,
    y: 0,
    width: 500,
    height: 1000
}

export class Field {
    constructor(app, isPixelVersion) {
        this.grid = new Grid(fieldConfig);
        this.sideBar = new Sidebar(sideBarConfig);
        this.app = app;
        this.isPixelVersion = isPixelVersion;
        this.init();
    }

    init() {
       
    }

    render() {
        this.app.stage.addChildAt(this.sideBar.render());
        this.app.stage.addChildAt(this.grid.render());
        
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