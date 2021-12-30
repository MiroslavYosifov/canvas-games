    import { keyboard } from './controllers.js';

    const flashProgress = document.getElementById('flash-progres');
    const ammonition = document.getElementById('shot-container');
    const btnDesignStyle = document.getElementById('btn-design-style');
    var isPixelVersion = false;


    // btnDesignStyle.addEventListener('click', changeDesignStyle);
    // function changeDesignStyle(e) {
    //     e.preventDefault();
    //     console.log(e.currentTarget.dataset.style);
    //     if(e.currentTarget.dataset.style == 'pixel') {
    //         e.currentTarget.dataset.style = 'standart';
    //         isPixelVersion = true;
    //     } else {
    //         e.currentTarget.dataset.style = 'pixel';
    //         isPixelVersion = false;
    //     }
    // }

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

    let fighterContainer, fighter, fire, state;
    let props = {
        direction: 'up',
        prevDirection: 'up',
        command: '',
        shotCommand: '',
        isDashLoaded: true,
        isDashLoading: true,
        shotsCount: 18,
        shots: [],
        meteors: []
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

        if(!isPixelVersion) {
            const cosmos = new Sprite(PIXI.utils.TextureCache['images/cosmos3.jpg']);
            cosmos.x = 0;
            cosmos.y = 0;
            cosmos.scale.set(1, 1); 
            app.stage.addChildAt(cosmos, 0);
         
        } else {
            // const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel1.jpg']); // STAVA
            // const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel2.jpg']); // STAVA
            // const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel4.jpg']); // STAVA
            const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel5.jpg']); // STAVA
            // const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel6.jpg']); // STAVA
            // const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel7.jpg']); // STAVA
            cosmos.x = 0;
            cosmos.y = 0;
            cosmos.scale.set(0.65, 0.65); 
            // cosmos.filters = [new PIXI.filters.PixelateFilter(4)];
            app.stage.addChildAt(cosmos, 0);
        }

        if(isPixelVersion) {
            app.stage.filters = [new PIXI.filters.PixelateFilter(4)];
        }


        // FIGHTER
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

        gsap.to(fire, 1.4, { repeat: -1, onRepeat: () => {
            generateMeteor();
        } });
        
    
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
        // fighter.filters = [new PIXI.filters.PixelateFilter(4)];
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
        // fighterContainer.filters = [new PIXI.filters.PixelateFilter(4)];
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
            // console.log("TUK");
            shotCommand(props.prevDirection);
        }
        
        fighterContainer.x += fighterContainer.vx;
        fighterContainer.y += fighterContainer.vy;
        checkForFieldColision();
        moveShots();
        moveMeteors();
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

    function generateMeteor() {


        var fireMeteor;
        var speed = getRandomInt(1, 4);

        var randomMeteor = getRandomInt(0, 9);

        const framesFireMeteor = [];
        for (let i = 1; i < 25; i++) {
            const val = i < 10 ? `0${i}` : i;
            framesFireMeteor.push(PIXI.Texture.from(`fire-meteor${val}.png`));
        }
    
        fireMeteor = new PIXI.AnimatedSprite(framesFireMeteor);
        if(randomMeteor % 2 == 0) {
            fireMeteor.x = getRandomInt(0, (app.view.width - 46));
            fireMeteor.y = 0;
        } else {
            fireMeteor.x = 0
            fireMeteor.y = getRandomInt(0, (app.view.height - 46));
        }
    
        fireMeteor.vx = speed;
        fireMeteor.vy = speed;
        fireMeteor.animationSpeed = 0.3;
        fireMeteor.scale.set(getRandomArbitraryDecimal(0.3, 0.6)); 
        fireMeteor.play();
        fireMeteor.rotation = 2.4;
        // fireMeteor.tint = Math.random() * 0xFFFFFF;
        if(randomMeteor % 2 == 0) {
            fireMeteor.filters = [new PIXI.filters.AdjustmentFilter({saturation: 0, contrast: 1.1, blue: 1 }), new PIXI.filters.ColorOverlayFilter([118/255, 210/255, 13/255], 0.55)];
        }
        app.stage.addChildAt(fireMeteor, 1);
        var obj = { meteor: {}, isLoaded: true }
        obj.meteor = fireMeteor;
        props.meteors.push(obj);
    }

    function moveMeteors() {
        for (let i = 0; i < props.meteors.length; i++) {
            // console.log(props.meteors);
            if(props.meteors[i].isLoaded) {
                // console.log("test");
                // console.log(props.shots[i].shot.name);
                props.meteors[i].meteor.x += props.meteors[i].meteor.vx;
                props.meteors[i].meteor.y += props.meteors[i].meteor.vy;
                // checkForShotFieldColision(props.meteors[i].shot, i);
            }
        }
    }

    function moveShots() {
        for (let i = 0; i < props.shots.length; i++) {
            if(props.shots[i].isLoaded) {
                // console.log("test");
                // console.log(props.shots[i].shot.name);
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
            // console.log("IT IS OUT LEFT", shot);
            killShot(shot, index);
        } else if(shotRigthPosition > fieldW) {
            // console.log("IT IS OUT RIGHT", shot);
            killShot(shot, index);
        } else if(shotUpPosition < 0) {  
            // console.log("IT IS OUT UP", shot);
            killShot(shot, index);
        } else if(shotDownPosition > fieldH) {
            // console.log("IT IS OUT DOWN", shot);
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

    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function randomBtwTwoNumbers(up_boundary, low_boundary) {
        var res = Math.floor(Math.random() * ((up_boundary - low_boundary) + 1));
        return res;
    }

    function getRandomArbitraryDecimal (min, max) {
        return Math.random() * (max - min) + min;
    }