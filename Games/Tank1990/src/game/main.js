import { STATE } from './state.js';
import { Field } from './field.js';

export function game () {

    const Application = PIXI.Application;
    const app = new Application({
        width: 1100,
        height: 700 
    });
    
    document.body.appendChild(app.view);
    
    app.loader
        .add([
            'images/pixel4.jpg',
        ])
        .load(setup);

    function setup() {

        STATE.field = new Field(app, false);
        STATE.field.render();

        // STATE.tank = new Tank(app, STATE);
        // STATE.tank.render();

        STATE.st = play;
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        STATE.st(delta);
    }
    
    function play(delta) {
        //console.log("delta");
    }
}