import { STATE } from './state.js';
import { Fighter } from './fighter.js';
import { Shot } from './shot.js';
import { Meteor } from './meteors.js';
import { Field } from './field.js';
import { shotCommand, flashCommand, upCommand, downCommand, leftCommand, rightCommand } from './controllers/index.js';

export function game () {

    const Application = PIXI.Application;
    const app = new Application({
        width: 1100,
        height: 700 
    });
    
    document.body.appendChild(app.view);
    
    app.loader
        .add([
            'images/fighter.json',
            'images/fire-meteor.json',
            'images/cosmos3.jpg',
            'images/pixel4.jpg',
            'images/fire.png',
            'images/laser2.png'
        ])
        .load(setup);

    function setup() {

        STATE.SHOT = new Shot(app, 18, STATE);
        STATE.SHOT.reloadShots();
        STATE.SHOT.generateAmmonitions();

        STATE.FIELD = new Field(app, false);
        STATE.FIELD.render();

        STATE.METEOR = new Meteor(app);
        STATE.METEOR.multiplication();

        STATE.FIGHTER = new Fighter(app, STATE);
        STATE.FIGHTER.render();

        upCommand.addObserver(STATE.FIGHTER);
        downCommand.addObserver(STATE.FIGHTER);
        leftCommand.addObserver(STATE.FIGHTER);
        rightCommand.addObserver(STATE.FIGHTER);
        shotCommand.addObserver(STATE.SHOT);
        flashCommand.addObserver(STATE.FIGHTER);

        // STATE.CONTROLLERS = new Controllers(STATE.FIGHTER, STATE.SHOT);
        // STATE.CONTROLLERS.events();  
        STATE.ST = play;
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        STATE.ST(delta);
    }
    
    function play(delta) {
        // STATE.CONTROLLERS.updateState();
        if(STATE.direction != STATE.prevDirection) { STATE.prevDirection = STATE.direction; }
        STATE.FIGHTER.rotate(STATE.prevDirection);
        STATE.FIGHTER.move(STATE.direction);
        STATE.FIELD.starAnimation(delta);
        STATE.SHOT.moveShots();
        STATE.METEOR.move();
        STATE.FIGHTER.checkForFieldColision();
    }
}