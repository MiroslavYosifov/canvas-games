import { Fighter } from './fighter.js';
import { Shot } from './shot.js';
import { Meteor } from './meteors.js';
import { Field } from './field.js';
import { Controllers } from './controllers/controllers.js';

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

    let fighter, meteor, field, shot, controllers, state;

    function setup() {

        shot = new Shot(app, 18);
        shot.reloadShots();
        shot.generateAmmonitions();

        field = new Field(app, false);
        field.render();

        meteor = new Meteor(app);
        meteor.multiplication();

        fighter = new Fighter(app);
        fighter.render();

        controllers = new Controllers(fighter, shot);
        controllers.events();
        
        state = play;
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        state(delta);
    }
    
    function play(delta) {
        controllers.updateState();
        field.starAnimation(delta);
        shot.moveShots();
        meteor.move();
        fighter.checkForFieldColision();
    }
}