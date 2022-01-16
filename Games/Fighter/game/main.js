import { STATE } from './state.js';
import { Fighter } from './fighter.js';
import { Shot } from './shot.js';
import { Meteor } from './meteors.js';
import { Field } from './field.js';
import { InputHandler }  from './controllers/inputHandler.js';
import { ShotCommand, FlashCommand, UpCommand, DownCommand, LeftCommand, RightCommand } from './controllers/commands.js';

let shotCommand;
let flashCommand;
let upCommand;
let downCommand;
let leftCommand;
let rightCommand;

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

        STATE.SHOT = new Shot(app, 18);
        STATE.SHOT.reloadShots();
        STATE.SHOT.generateAmmonitions();

        STATE.FIELD = new Field(app, false);
        STATE.FIELD.render();

        STATE.METEOR = new Meteor(app);
        STATE.METEOR.multiplication();

        STATE.FIGHTER = new Fighter(app);
        STATE.FIGHTER.render();

        // STATE.CONTROLLERS = new Controllers(STATE.FIGHTER, STATE.SHOT);
        // STATE.CONTROLLERS.events();

        shotCommand = new ShotCommand(new InputHandler('f'), STATE);
        flashCommand = new FlashCommand(new InputHandler(' '), STATE);
        upCommand = new UpCommand(new InputHandler('ArrowUp'), STATE);
        downCommand = new DownCommand(new InputHandler('ArrowDown'), STATE);
        leftCommand = new LeftCommand(new InputHandler('ArrowLeft'), STATE);
        rightCommand = new RightCommand(new InputHandler('ArrowRight'), STATE);
        
        STATE.ST = play;
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        STATE.ST(delta);
    }
    
    function play(delta) {
        // STATE.CONTROLLERS.updateState();
        if(STATE.direction != STATE.prevDirection) { STATE.prevDirection = STATE.direction; }
        shotCommand.render();
        flashCommand.render();
        STATE.FIGHTER.rotate(STATE.prevDirection);
        STATE.FIGHTER.move(STATE.direction);
        STATE.FIELD.starAnimation(delta);
        STATE.SHOT.moveShots();
        STATE.METEOR.move();
        STATE.FIGHTER.checkForFieldColision();
    }
}