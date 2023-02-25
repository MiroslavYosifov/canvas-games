import { Observer } from '../utils/observer.js';
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

export class Field extends Observer {
    constructor(app, isPixelVersion) {
        super();
        this.grid = new Grid(fieldConfig);
        this.sideBar = new Sidebar(sideBarConfig);
        this.app = app;
        this.appContainer = new PIXI.Container();
        this.isPixelVersion = isPixelVersion;
        this._mouseMoved = this.mouseMoved.bind(this);
        this.init();
    }

    init() {
        this.app.stage.interactive = true;
        this.app.stage.on('pointermove',  this._mouseMoved);
    }

    createCurrentFieldType() {
        this.currentFieldType = new PIXI.Graphics();
        this.currentFieldType.lineStyle(1, 0x464646, 1, 0);
        this.currentFieldType.beginFill(0xFFFF00);
   
        this.currentFieldType.drawRect(0, 0, 50, 50);
        this.currentFieldType.endFill();
        this.currentFieldType.x = 0;
        this.currentFieldType.y = 0;

        return this.currentFieldType;
    }

    render() {
        this.app.stage.addChildAt(this.createCurrentFieldType());
        this.app.stage.addChildAt(this.sideBar.render());
        this.app.stage.addChildAt(this.grid.render());
    }

    mouseMoved(e) {
        var pos = e.data.global;
        this.currentFieldType.x = pos.x;    
        this.currentFieldType.y = (pos.y - 50);
    }
}