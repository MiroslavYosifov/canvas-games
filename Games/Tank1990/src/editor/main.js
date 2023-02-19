import { Field } from './field.js';

export function editor () {

    const Application = PIXI.Application;
    const app = new Application({
        width: 1000,
        height: 1000 
    });
    
    document.body.appendChild(app.view);
    
    app.loader
        .add([
            'images/pixel4.jpg',
            'images/brick.png'
        ])
        .load(setup);

    function setup() {
        const field = new Field(app, false);
        field.render();

        // STATE.st = play;
        // app.ticker.add((delta) => editorLoop(delta));
    }

    // function setup() {
    //     // making a 30 x 13 grid of tiles
    //     for (let i = 0; i < 25000; i++) {
    //         let square = new PIXI.Graphics();
    //         square.beginFill(0xF2F2F2);
    //         square.drawRect(0, 0, 25, 25);
    //         square.endFill();
    //         // Opt-in to interactivity
    //         square.interactive = true;
    //         square.buttonMode = true;

    //         square.on('pointerdown', this.onButtonDown);
    //         // square.on('pointerover', this.onButtonOver);
    //         // square.on('mouseout', this.onButtonOut);

    //         square.x = (i % 30) * 32;
    //         square.y = Math.floor(i / 30) * 32;
    //         // add squares to stage
    //         this.viewport.addChild(square);
    //     }
    // }
    
    // function editorLoop(delta) {
    //     STATE.st(delta);
    // }
    
    // function play(delta) {

    // }
}