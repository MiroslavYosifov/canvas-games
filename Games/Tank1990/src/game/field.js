const Application = PIXI.Application,
Container = PIXI.Container,
loader = PIXI.Loader.shared,
resources = PIXI.Loader.shared.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Rectangle = PIXI.Rectangle;


export class Field {
    constructor(app, isPixelVersion) {
        this.app = app;
        this.isPixelVersion = isPixelVersion;
    }

    render() {
        const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel4.jpg']);
        cosmos.filters = [new PIXI.filters.AdjustmentFilter({ saturation: 0.6, contrast: 1.5, blue: 0.6, red: 0.5, green: 0.5, brightest: 2 }), new PIXI.filters.ColorOverlayFilter([0/255, 0/255, 0/255], 0.55)];
        cosmos.scale.set(1.84, 1.94); 
        cosmos.x = 0;
        cosmos.y = 0;
        this.app.stage.addChildAt(cosmos, 0);
    }
}
