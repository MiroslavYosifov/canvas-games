import { Fighter } from './fighter.js';
import { Shots } from './shots.js';
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

    let generatedFighter, generatedMeteor, generatedField, generatedShots, controllers, state;

    function setup() {

        generatedShots = new Shots(app, 18);
        generatedShots.reloadShots();
        generatedShots.generateAmmonitions();

        generatedField = new Field(app, true);
        generatedField.render();

        generatedMeteor = new Meteor (app);
        generatedFighter = new Fighter (app);
        generatedFighter.render();

        controllers = new Controllers(generatedFighter, generatedShots);

        gsap.to({}, 1.4, { repeat: -1, onRepeat: () => {
            generatedMeteor.generateMeteor();
        } });

        controllers.directions();
        controllers.flash();
        controllers.shot();
        
        state = play;
        app.ticker.add((delta) => gameLoop(delta));
    }
    
    function gameLoop(delta) {
        state(delta);
    }
    
    function play(delta) {
        controllers.updateState();
        generatedField.starAnimation(delta);
        generatedShots.moveShots();
        generatedMeteor.move();
        generatedFighter.checkForFieldColision();
    }
}