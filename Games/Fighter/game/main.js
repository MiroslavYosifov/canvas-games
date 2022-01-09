import { keyboard } from './controllers.js';
import { Fighter } from './fighter.js';
import { Meteor } from './meteors.js';
import { Field } from './field.js';

export function game () {
    
    const flashProgress = document.getElementById('flash-progres');
    const ammonition = document.getElementById('shot-container');
    const btnDesignStyle = document.getElementById('btn-design-style');
    var isPixelVersion = true;
    
    //Aliases
    const Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.Loader.shared,
        resources = PIXI.Loader.shared.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite,
        Rectangle = PIXI.Rectangle;
    
    const app = new Application({
        width: 1100,    // default: 800
        height: 700     // default: 600
    });
    
    document.body.appendChild(app.view);
    
    app.loader
        .add([
            'images/fighter.json',
            'images/fire-meteor.json',
            'images/cosmos3.jpg',
            'images/pixel1.jpg',
            'images/pixel2.jpg',
            'images/pixel3.jpg',
            'images/pixel4.jpg',
            'images/pixel5.jpg',
            'images/pixel6.jpg',
            'images/pixel7.jpg',
            'images/pixel8.jpg',
            'images/fire.png',
            'images/laser2.png'
        ])
        .load(setup);
    
    let generatedFighter, generatedMeteor, generatedField, fighterContainer, fighter, fire, state;
    let props = {
        direction: 'up',
        prevDirection: 'up',
        command: '',
        shotCommand: '',
        isDashLoaded: true,
        isDashLoading: true,
        shotsCount: 18,
        shots: [],
    }

    reloadShots(props.shotsCount);
    generateAmmonitions(props.shotsCount);
    function generateAmmonitions (count) {
        for (let i = 0; i < count; i++) {
            var div = document.createElement('div');
            div.classList.add('shot');
            ammonition.appendChild(div);
        }
    }
    
    function setup() {

        generatedFighter = new Fighter (app);
        generatedMeteor = new Meteor (app);
        generatedField = new Field(app, true);

        generatedField.generateField();
    
        generatedFighter.generateFighterContainer();
        fighterContainer = generatedFighter.fighterContainer;
        fighter = generatedFighter.fighter;
        fire = generatedFighter.fire;

        gsap.to({}, 1.4, { repeat: -1, onRepeat: () => {
            generatedMeteor.generateMeteor();
        } });
        
        const left = keyboard('ArrowLeft'),
            up = keyboard('ArrowUp'),
            right = keyboard('ArrowRight'),
            down = keyboard('ArrowDown'),
            space = keyboard(' '),
            shot = keyboard('f');
    
        // console.log(space);
    
        shot.press = () => {
            // console.log("fire event");
            if(!props.shotCommand) {
                props.shotCommand = 'shot';
            }
        };
    
        shot.release = () => {
        
        };
    
        space.press = () => {
        
            if(props.isDashLoaded) {
                props.command = 'flash';
            }
            space.unsubscribeKeyDown();
            if(props.isDashLoading) {
                props.isDashLoading = false;
                gsap.fromTo(flashProgress, 2, { width: '0%' }, { width: '100%', onComplete: () => {
                    props.isDashLoaded = true;
                    props.isDashLoading = true;
                }});
            }
        };
        space.release = () => {
            space.subscribeKeyDown();
        };
    
        up.press = () => {
            fighterContainer.vy = -5;
            fighterContainer.vx = 0;
            props.direction = "up";
        }
        up.release = () => {
            if (!down.isDown && fighterContainer.vx === 0) {
                fighterContainer.vy = 0;
            }
        };
    
        down.press = () => {
            fighterContainer.vy = 5;
            fighterContainer.vx = 0;
            props.direction = "down";
        };
        down.release = () => {
            if (!up.isDown && fighterContainer.vx === 0) {
                fighterContainer.vy = 0;
            }
        };
    
        left.press = () => {
            fighterContainer.vx = -5;
            fighterContainer.vy = 0;
            props.direction = "left";
        };
        left.release = () => {
            if (!right.isDown && fighterContainer.vy === 0) {
                fighterContainer.vx = 0;
            }
        };
    
        right.press = () => {
            fighterContainer.vx = 5;
            fighterContainer.vy = 0;
            props.direction = "right";
        };
        right.release = () => {
            if (!left.isDown && fighterContainer.vy === 0) {
                fighterContainer.vx = 0;
            }
        };
        
        state = play;
        app.ticker.add((delta) => gameLoop(delta, props));
    }
    
    function gameLoop(delta, props) {
    state(delta, props);
    }
    
    function play(delta, props) {
    
        if(props.direction != props.prevDirection) {
            // checkDirection(props);
            props.prevDirection = props.direction;
        }
        // console.log(props.command);
        if(props.command === 'flash' && props.isDashLoaded) {
            props.isDashLoaded = false;
            props.command = '';
            generatedFighter.flash(props.prevDirection);
        }

        generatedFighter.rotate(props.prevDirection);
    
        if(props.shotCommand === 'shot') {
            props.shotCommand = '';
            // console.log("TUK");
            shotCommand(props.prevDirection);
        }

        generatedFighter.move();
        generatedFighter.checkForFieldColision();
        moveShots();
        generatedMeteor.move();
        generatedField.starAnimation(delta);
    }
    
    function moveShots() {
        for (let i = 0; i < props.shots.length; i++) {
            if(props.shots[i].isLoaded) {
                props.shots[i].shot.x += props.shots[i].shot.vx;
                props.shots[i].shot.y += props.shots[i].shot.vy;
                checkForShotFieldColision(props.shots[i].shot, i);
            }
        }
    }
    
    function checkForShotFieldColision(shot, index) {
    
        const fieldW = app.view.width;
        const fieldH = app.view.height;
        const diff = Math.abs(shot.height - shot.width) * 2;
        const shotLeftPosition = shot.x - (shot.width - diff);
        const shotRigthPosition = shot.x + shot.width - diff / 2;
        const shotUpPosition = shot.y - (shot.width - diff);
        const shotDownPosition = shot.y + shot.width - diff / 2;
    
        if(shotLeftPosition < 0) {
            killShot(shot, index);
        } else if(shotRigthPosition > fieldW) {
            killShot(shot, index);
        } else if(shotUpPosition < 0) {  
            killShot(shot, index);
        } else if(shotDownPosition > fieldH) {
            killShot(shot, index);
        }
    }
    
    function killShot(shot, index) {
        app.stage.removeChild(shot);
        props.shots.splice(index, 1);
        if(props.shots.length < 1) {
            generateAmmonitions(props.shotsCount);
            reloadShots(props.shotsCount);
        }
        // props.shots[index].isKilled = true;
    }
    
    function reloadShots(count) {
        for (let i = 0; i < count; i++) {
            props.shots.push({ isLoaded: false, shot: {} });
        }
    }
    
    function shotCommand(direction) {
        let speed = 7; 
        if(direction === 'up') {
            generateShotUtils(fighterContainer.x, fighterContainer.y, 0, (speed *= -1), 1.59);
        } else if (direction === 'down') {
            generateShotUtils(fighterContainer.x, fighterContainer.y, 0, speed, 1.59);
        } else if(direction === 'left') {
            generateShotUtils(fighterContainer.x, fighterContainer.y, (speed *= -1), 0, 0);
        } else if(direction === 'right') {
            generateShotUtils(fighterContainer.x, fighterContainer.y, speed, 0, 0);
        }
    
        function generateShotUtils(x, y, vx, vy, rotation) {
            for (let i = 0; i < props.shots.length; i++) {
                if(!props.shots[i].isLoaded) {
                    let shot = generateShot(x, y, vx, vy, rotation, i);
                    props.shots[i].isLoaded = true;
                    props.shots[i].shot = shot;
                    app.stage.addChildAt(shot, 1);
                    var shots = document.querySelectorAll('.shot');
                    if(shots.length > 0) {
                        shots[shots.length-1].remove();
                    }
                    // console.log(app.stage.children);
                    break;
                }
            }
        }
    
        function generateShot(x, y, vx, vy, rotation, i) {
            var shotName = `shot${i}`
            let shotImg;
            shotImg = new Sprite(PIXI.utils.TextureCache['images/laser2.png']);
            shotImg.x = x;
            shotImg.y = y;
            shotImg.vx = vx;
            shotImg.vy = vy;
            shotImg.name = shotName;
            // fire.anchor.set(2.38, 3.4);
            shotImg.rotation = rotation;
            shotImg.scale.set(0.1);    
            return shotImg;
        }
    }
}