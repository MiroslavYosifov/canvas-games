import { STATE } from './state.js';
import { upCommand, downCommand, leftCommand, rightCommand } from './controllers/index.js';
import { Field } from './field.js';
import { Tank } from './tank.js';

export function game () {

    const Application = PIXI.Application;
    const app = new Application({
        width: 1100,
        height: 1100 
    });
    
    document.body.appendChild(app.view);
    
    app.loader
        .add([
            'images/pixel4.jpg',
            'images/tank.jpg'
        ])
        .load(setup);



    function setup() {
        console.log(app);
        STATE.field = new Field(app, false);
        STATE.field.render();

        STATE.tank = new Tank(app, STATE);
        STATE.tank.render();
        console.log(STATE.tank);
        upCommand.addObserver(STATE.tank);
        downCommand.addObserver(STATE.tank);
        leftCommand.addObserver(STATE.tank);
        rightCommand.addObserver(STATE.tank);

        STATE.st = play;
        console.log(STATE);
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        STATE.st(delta);
    }
    
    function play(delta) {
        //console.log("delta");
        STATE.tank.move();
    }
}