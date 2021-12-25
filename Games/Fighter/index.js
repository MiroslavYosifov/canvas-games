import { keyboard } from './controllers.js';

const flashProgress = document.getElementById('flash-progres');

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
        'images/cosmos3.jpg',
        'images/fire.png',
        'images/laser2.png'
    ])
    .load(setup);

let fighterContainer, fighter, fire, state;
let props = {
    direction: 'up',
    prevDirection: 'up',
    command: '',
    shotCommand: '',
    isDashLoaded: true,
    isDashLoading: true,
    shots: [
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
        { isLoaded: false, shot: {} },
    ]
}

function setup() {

    const cosmos = new Sprite(PIXI.utils.TextureCache['images/cosmos3.jpg']);
    cosmos.x = 0;
    cosmos.y = 0;
    cosmos.scale.set(1, 1); 
    app.stage.addChild(cosmos);

    fire = new Sprite(PIXI.utils.TextureCache['images/fire.png'])
    fire.x = 54;
    fire.y = 151;
    // fire.anchor.set(2.38, 3.4);
    fire.rotation = 3.142;
    fire.scale.set(0.2);

    gsap.to(fire, 0, { delay: 0.2, onComplete: () => {
        gsap.to(fire, 0.5, { repeat: -1, onRepeat: () => {
            gsap.to(fire, 0.25, { pixi:{ scale: 0.2, y: 151, x: 54 },  } );
            gsap.to(fire, 0.25, { pixi:{ scale: 0.21, y: 158, x: 54 }, delay: 0.25 } );
        } });
    } })
   
    // app.stage.addChild(fire);
    const frames = [];

    for (let i = 0; i < 30; i++) {
        const val = i < 10 ? `0${i}` : i;
        frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
    }

    fighter = new PIXI.AnimatedSprite(frames);
    fighter.x = 0;
    fighter.y = 0;
    fighter.animationSpeed = 0.5;
    fighter.scale.set(0.5, 0.5); 
    fighter.play();

    // app.stage.addChild(fighter);

    fighterContainer = new Container();
    fighterContainer.x = 300;
    fighterContainer.y = 300;
    fighterContainer.vx = 0;
    fighterContainer.vy = 0;
    fighterContainer.animationSpeed = 0.5;
    fighterContainer.pivot.set(fighter.width / 2, fighter.height / 2);
    fighterContainer.addChild(fire);
    fighterContainer.addChild(fighter);
    app.stage.addChild(fighterContainer);
    // console.log(fighterContainer.width);
    // console.log(fighterContainer.height);

    const left = keyboard('ArrowLeft'),
        up = keyboard('ArrowUp'),
        right = keyboard('ArrowRight'),
        down = keyboard('ArrowDown'),
        space = keyboard(' '),
        shot = keyboard('f');

    // console.log(space);

    shot.press = () => {
        console.log("fire event");
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
        gsap.to(fighterContainer, 0.4, { rotation: 0 });
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
        gsap.to(fighterContainer, 0.4, { rotation: 3.2 });
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
        gsap.to(fighterContainer, 0.4, { rotation: -1.6 });
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
        gsap.to(fighterContainer, 0.4, { rotation: 1.6 });
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
        checkDirection(props);
        props.prevDirection = props.direction;
    }
    // console.log(props.command);
    if(props.command === 'flash' && props.isDashLoaded) {
        props.isDashLoaded = false;
        props.command = '';
        flashCommand(props.prevDirection);
    }

    if(props.shotCommand === 'shot') {
        props.shotCommand = '';
        console.log("TUK");
        shotCommand(props.prevDirection);
    }
    
    fighterContainer.x += fighterContainer.vx;
    fighterContainer.y += fighterContainer.vy;
    checkForFieldColision();
  
}

function checkDirection(props) {
    if(props.direction === 'up') {
        //console.log('UP');
    } else if (props.direction === 'down') {
        //console.log('DOWN');
    } else if(props.direction === 'left') {
        //console.log('LEFT');
    } else if(props.direction === 'right') {
        //console.log('RIGHT');
    }
}

function moveShots() {
    for (let i = 0; i < props.shots.length; i++) {
        let shot = generateShot(x, y, vx, vy, rotation);
        app.stage.addChild(shot);
    }
}

function shotCommand(direction) {
    let speed = 7; 
    if(direction === 'up') {
        generateShotUtils(fighterContainer.x, fighterContainer.y, 0, (speed *= -1), 0);
    } else if (direction === 'down') {
        generateShotUtils(fighterContainer.x, fighterContainer.y, 0, speed, 0);
    } else if(direction === 'left') {
        generateShotUtils(fighterContainer.x, fighterContainer.y, 0, (speed *= -1), 0);
    } else if(direction === 'right') {
        generateShotUtils(fighterContainer.x, fighterContainer.y, 0, speed, 0);
    }

    function generateShotUtils(x, y, vx, vy, rotation) {
        for (let i = 0; i < props.shots.length; i++) {
            let shot = generateShot(x, y, vx, vy, rotation);
            props.shots[i].isLoaded = true;
            props.shots[i].shot = shot;
            app.stage.addChild(shot);
        }
    }

    function generateShot(x, y, vx, vy, rotation) {
        let shotImg;
        shotImg = new Sprite(PIXI.utils.TextureCache['images/laser2.png'])
        shotImg.x = x;
        shotImg.y = y;
        shotImg.vx = vx;
        shotImg.vy = vy;
        // fire.anchor.set(2.38, 3.4);
        shotImg.rotation = rotation;
        shotImg.scale.set(0.1);
        app.stage.addChild(shotImg);    

        return shotImg;
    }
}

function flashCommand(direction) {
    const flash = 120;
    if(direction === 'up') {
        fighterContainer.y += (flash * -1);
        fighterContainer.x += 0;
    } else if (direction === 'down') {
        fighterContainer.y += flash;
        fighterContainer.x += 0;
    } else if(direction === 'left') {
        fighterContainer.x += (flash * -1);
        fighterContainer.y += 0;
    } else if(direction === 'right') {
        fighterContainer.x += flash;
        fighterContainer.y += 0;
    }
}

function checkForFieldColision() {

    const fieldW = app.view.width;
    const fieldH = app.view.height;

    const diff = Math.abs(fighter.height - fighter.width) * 2;
    const fighterLeftPosition = fighterContainer.x - (fighter.width - diff / 2);
    const fighterRigthPosition = fighterContainer.x + fighter.width - diff / 2;
    const fighterUpPosition = fighterContainer.y - (fighter.width - diff / 2);
    const fighterDownPosition = fighterContainer.y + fighter.width - diff / 2;

    if(fighterLeftPosition < 0) {
        fighterContainer.x = fieldW - (fighter.width - diff / 2);
    } else if(fighterRigthPosition > fieldW) {
        fighterContainer.x = (fighter.width - diff / 2);
    } else if(fighterUpPosition < 0) {  
        fighterContainer.y = fieldH - (fighter.width - diff / 2);
    } else if(fighterDownPosition > fieldH) {
        fighterContainer.y = (fighter.width - diff / 2); 
    }
}