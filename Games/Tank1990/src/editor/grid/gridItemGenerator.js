export class GridItemGenerator {
    constructor(x, y, width, height) {
        this.rectangle = new PIXI.Graphics();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render() {
        this.rectangle.pivot.set(this.width / 2, this.height / 2);
        this.rectangle.lineStyle(1, 0x464646, 1, 0);
        this.rectangle.beginFill(0x000000);
   
        this.rectangle.drawRect(0, 0, this.width, this.height);
        this.rectangle.endFill();
        this.rectangle.x = this.x;
        this.rectangle.y = this.y;

        return this.rectangle;
    }
}