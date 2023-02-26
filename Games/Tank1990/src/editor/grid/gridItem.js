import terrain from './terrain/index.js';

export class GridItem {
    constructor(itemIndex, terrainType, width, height, x, y, ) {
        this.itemIndex = itemIndex;
        this.terrainType = terrainType;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.gridTerrain = new terrain[this.terrainType](this.width, this.height, this.x,  this.y);
        this.gridTerrainGraphics = this.gridTerrain.generate();
        this._onButtonDown = this.onButtonDown.bind(this);
        this._onButtonOver = this.onButtonOver.bind(this);
        this._onButtonOut = this.onButtonOut.bind(this);
        this.init();
    }

    init() {
        this.addEvents(this.gridTerrainGraphics);
    }

    update() {

    }

    changeTerrain(terrainType) {
        this.terrainType = terrainType;
        this.gridTerrain = new terrain[this.terrainType](this.width, this.height, this.x,  this.y);
        this.gridTerrainGraphics = this.gridTerrain.generate();
    }

    render() {
        return this.gridTerrainGraphics;
    }

    addEvents(item) {
        if(!item) return;
        item.interactive = true;
        item.buttonMode = true;
        item.on('pointerdown', this._onButtonDown);
        item.on('pointerover', this._onButtonOver);
        item.on('mouseout', this._onButtonOut);
    }

    removeEvents(item) {
        if(!item) return;
        item.interactive = false;
        item.buttonMode = false;
        item.off('pointerdown', this._onButtonDown);
        item.off('pointerover', this._onButtonOver);
        item.off('mouseout', this._onButtonOut);
    }

    onButtonDown(e) {
        console.log("onButtonDown", this.terrainType);
        this.onSelectGridItem(this.itemIndex);
    }

    onSelectGridItem() {}

    onButtonOver(e) {
        // console.log(e);
    }

    onButtonOut(e) {
        // console.log(e);
    }
}