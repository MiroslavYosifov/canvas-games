import { state } from '../state.js';

export class TerrainMenu {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.container = new PIXI.Container;
        this.content =  new PIXI.Graphics();
        this.menuItems = ['brick', 'ice', 'jungle', 'water'];
        this._onButtonDown = this.onButtonDown.bind(this);
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

        var gap = 10;
        var width = this.width / 2 - gap;
        var height = this.height / 2 - gap;
        for (let i = 0; i < this.menuItems.length; i++) {

            var currentCol = (i % 2);
            var currentRow = Math.floor(i / 2);
            var gapX = currentCol * gap;
            var gapY = currentRow * gap;

            let x = (currentCol * width) / 2 + gapX;
            let y = (currentRow * height) / 2 + gapY;

            let item = new PIXI.Graphics();
            item.lineStyle(1, '0xc76eb0', 1, 0);
            item.beginFill(this.getColor(this.menuItems[i]));
        
            item.drawRect(x, y, width, height);
            item.endFill();
            item.x = x;
            item.y = y;
            item.name = this.menuItems[i];

            item.interactive = true;
            item.buttonMode = true;
            item.on('pointerdown', this._onButtonDown);

            this.content.addChild(item);
        }

        this.container.addChild(this.content);
    }

    getColor(type) {
        switch (type) {
            case 'brick':
                return '0xd23e40'
            case 'ice':
                return '0xe6fae0'
            case 'jungle':
                return '0x85960c'
            case 'water':
                return '0x204deb'
            default:
                break;
        }
    }

    onButtonDown(e) {
        state.selectedMaterial = e.currentTarget.name;
        state.selectedMaterialColor = this.getColor(state.selectedMaterial);
        state.field.updateCurrentFieldType(state.selectedMaterialColor);
    }

    render() {
        return this.container;
    }

    destroy() {

    }
}

    // createTerrainMenu() {
    //     var size = 80;
    //     for (let i = 0; i < this.menuItems.length; i++) {
    //         const x = ((i % 2) * size) + size / 2;
    //         const y = (Math.floor(i / 2) * size) + size / 2;
    //         var item = createRectangle(x, y, size, size, '0x3443ea');
    //         console.log(item);
    //         this.content.addChild(item);
    //     }
    // }