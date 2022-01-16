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

        STATE.shot = new Shot(app, 18, STATE);
        STATE.shot.reloadShots();
        STATE.shot.generateAmmonitions();

        STATE.field = new Field(app, false);
        STATE.field.render();

        STATE.meteor = new Meteor(app);
        STATE.meteor.multiplication();

        STATE.fighter = new Fighter(app, STATE);
        STATE.fighter.render();

        upCommand.addObserver(STATE.fighter);
        downCommand.addObserver(STATE.fighter);
        leftCommand.addObserver(STATE.fighter);
        rightCommand.addObserver(STATE.fighter);
        shotCommand.addObserver(STATE.shot);
        flashCommand.addObserver(STATE.fighter);

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
        STATE.fighter.rotate(STATE.prevDirection);
        STATE.fighter.move(STATE.direction);
        STATE.field.starAnimation(delta);
        STATE.shot.moveShots();
        STATE.meteor.move();
        STATE.fighter.checkForFieldColision();
    }
}