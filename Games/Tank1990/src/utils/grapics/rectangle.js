export function createRectangle(width, height, x, y, color, border, options) {
    var rectangle = new PIXI.Graphics();

    if(options && options.pivot == 'center') rectangle.pivot.set(width / 2, height / 2);
    if(border) rectangle.lineStyle(1, border, 1, 0);
    if(color) rectangle.beginFill(color);

    rectangle.drawRect(x, y, width, height);
    rectangle.endFill();
    rectangle.x = x;
    rectangle.y = y;

    return rectangle;
}