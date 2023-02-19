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
            square.pivot.set(20, 20);

            square.lineStyle(1, 0x464646, 1, 0);
            square.beginFill(0x000000);
       
          
            square.drawRect(0, 0, 40, 40);
            square.endFill();

            // square.anchor.set(0.5, 0.5);

            square.interactive = true;
            square.buttonMode = true;

            square.on('pointerover', this.onButtonOver);
            square.on('mouseout', this.onButtonLeave);
            square.on('pointerdown', this.onButtonDown);
  
            square.x = ((i % 25) * 40) + 20;
            square.y = (Math.floor(i / 25) * 40) + 20;
            // add squares to stage
            this.app.stage.addChildAt(square, 0);
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