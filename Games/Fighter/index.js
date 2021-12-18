import { keyboard } from './controllers.js';

//Aliases
const Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

const app = new Application({
    width: 1100,         // default: 800
    height: 700     // default: 600
});
document.body.appendChild(app.view);

app.loader
    .add([
        'images/fighter.json',
        'images/cosmos3.jpg'
    ])
    
    .load(setup);

let fighter, state;

function setup() {

    const texture = PIXI.utils.TextureCache["images/cosmos3.jpg"];
    const cosmos = new Sprite(texture);
    cosmos.x = 0;
    cosmos.y = 0;
    cosmos.scale.set(1.1, 1.1); 
    app.stage.addChild(cosmos);

    const frames = [];

    for (let i = 0; i < 30; i++) {
        const val = i < 10 ? `0${i}` : i;
        frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
    }

    fighter = new PIXI.AnimatedSprite(frames);

    fighter.x = 300;
    fighter.y = 300;
    fighter.anchor.set(0.5);
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.scale.set(0.5, 0.5); 
    fighter.animationSpeed = 0.5;
    fighter.play();

    app.stage.addChild(fighter);

    const left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => {
        fighter.vx = -5;
        fighter.vy = 0;
        gsap.to(fighter, 0.4, { rotation: -1.6 });
    };
    left.release = () => {
        if (!right.isDown && fighter.vy === 0) {
            fighter.vx = 0;
        }
    };

    up.press = () => {
        fighter.vy = -5;
        fighter.vx = 0;
        gsap.to(fighter, 0.4, { rotation: 0 });
    }
    up.release = () => {
        if (!down.isDown && fighter.vx === 0) {
            fighter.vy = 0;
        }
    };

    right.press = () => {
        fighter.vx = 5;
        fighter.vy = 0;
        gsap.to(fighter, 0.4, { rotation: 1.6 });
    };
    right.release = () => {
        if (!left.isDown && fighter.vy === 0) {
            fighter.vx = 0;
        }
    };


    down.press = () => {
        fighter.vy = 5;
        fighter.vx = 0;
        gsap.to(fighter, 0.4, { rotation: 3.2 });
    };
    down.release = () => {
        if (!up.isDown && fighter.vx === 0) {
            fighter.vy = 0;
        }
    };

    state = play;
    app.ticker.add((props) => gameLoop(props));
}

function gameLoop(props) {
  state(props);
}

function play() {
  fighter.x += fighter.vx;
  fighter.y += fighter.vy;

  checkForColision();
}


function checkForColision() {

    const fieldW = app.view.width;
    const fieldH = app.view.height;

    const diff = Math.abs(fighter.height - fighter.width) * 2;
    const fighterLeftPosition = fighter.x - diff;
    const fighterRigthPosition = fighter.x + fighter.width - diff / 2;
    const fighterUpPosition = fighter.y - diff;
    const fighterDownPosition = fighter.y + fighter.width - diff / 2;

    if(fighterLeftPosition < 0) {
        fighter.x = fieldW - fighter.width + diff / 2;
        // console.log("LEFT");
    } else if(fighterRigthPosition > fieldW) {
        fighter.x = diff;
        // console.log("RIGHT");
    } else if(fighterUpPosition < 0) {  
        fighter.y = fieldH - fighter.width + diff / 2;
        // console.log("UP");
    } else if(fighterDownPosition > fieldH) {
        fighter.y = diff;
        // console.log("DOWN");
    }

}


