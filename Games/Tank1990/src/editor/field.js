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
        for (let i = 0; i < 625; i++) {
            let square = new PIXI.Graphics();
            if(i % 2 == 0) {
                square.beginFill(0xb60c0c);
            } else {
                square.beginFill(0x6e3907);
            }
          
            square.drawRect(0, 0, 40, 40);
            square.endFill();

            // square.interactive = true;
            // square.buttonMode = true;

            // square.on('pointerdown', this.onButtonDown);
            // square.on('pointerover', this.onButtonOver);
            // square.on('mouseout', this.onButtonOut);

            square.x = (i % 25) * 40;
            square.y = Math.floor(i / 25) * 40;
            // add squares to stage
            this.app.stage.addChildAt(square, 0);
        }
    }
}