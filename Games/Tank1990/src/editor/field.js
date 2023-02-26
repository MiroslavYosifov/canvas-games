import { state } from './state.js';
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
        this.currentMousePosition = { x: 0, y: 0 }
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

    updateCurrentFieldType() {
        this.app.stage.addChildAt(this.createCurrentFieldType(state.selectedMaterialColor), 3);
    }

    createCurrentFieldType(color) {
        if(this.currentFieldType) this.currentFieldType.clear();
        this.currentFieldType = new PIXI.Graphics();
        this.currentFieldType.lineStyle(1, 0x464646, 1, 0);
        this.currentFieldType.beginFill(color);
   
        this.currentFieldType.drawRect(0, 0, 50, 50);
        this.currentFieldType.endFill();
        this.currentFieldType.x = this.currentMousePosition.x;
        this.currentFieldType.y = this.currentMousePosition.y - 50;

        return this.currentFieldType;
    }

    render() {
        this.app.stage.addChildAt(this.createCurrentFieldType(state.selectedMaterialColor));
        this.app.stage.addChildAt(this.sideBar.render());
        this.app.stage.addChildAt(this.grid.render());
    }

    mouseMoved(e) {
        this.currentMousePosition = e.data.global;
        if(state.selectedMaterialColor) {
            this.currentFieldType.x = this.currentMousePosition.x;    
            this.currentFieldType.y = (this.currentMousePosition.y - 50);
        }
   
    }
}