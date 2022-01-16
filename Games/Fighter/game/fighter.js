import { Observer } from './observable.js';

const Container = PIXI.Container,
Sprite = PIXI.Sprite;

export class Fighter extends Observer {
    constructor(app, state) {
        super();
        this.app = app;
        this.state = state;
        this.fighterContainer;
        this.fighter;
        this.fire;
        this.speed = 0;
    }

    update (event) {

        if(event.name === 'direction') {
            this.fighterContainer.vx = event.x;
            this.fighterContainer.vy = event.y;
        }

        if(event.name === 'flash') {
            if(this.state.isFlashLoading) {
                this.state.isFlashLoading = false;
                gsap.fromTo(this.state.flashProgress, 2, { width: '0%' }, { width: '100%', onComplete: () => {
                    this.state.isFlashLoaded = true;
                    this.state.isFlashLoading = true;
                }});
            }
        }
    }

    render() {

        this.renderFighter();
        this.renderFire();

        this.fighterContainer = new Container();
        this.fighterContainer.x = 300;
        this.fighterContainer.y = 300;
        this.fighterContainer.vx = 0;
        this.fighterContainer.vy = 0;
        this.fighterContainer.animationSpeed = 0.5;
        this.fighterContainer.pivot.set(this.fighter.width / 2, this.fighter.height / 2);
        this.fighterContainer.addChild(this.fire);
        this.fighterContainer.addChild(this.fighter);
        this.app.stage.addChild(this.fighterContainer);

        if(this.state.command === 'flash' && this.state.isFlashLoaded) {
            this.state.isFlashLoaded = false;
            this.state.command = '';
            this.state.FIGHTER.flash(this.state.prevDirection);
        }
    }

    renderFighter () {
        const frames = [];
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
        }

        this.fighter = new PIXI.AnimatedSprite(frames);
        this.fighter.x = 0;
        this.fighter.y = 0;
        this.fighter.animationSpeed = 0.5;
        this.fighter.scale.set(0.5, 0.5); 
        this.fighter.play();
    }

    renderFire() {
        this.fire = new Sprite(PIXI.utils.TextureCache['images/fire.png'])
        this.fire.x = 54;
        this.fire.y = 151;
        // fire.anchor.set(2.38, 3.4);
        this.fire.rotation = 3.142;
        this.fire.scale.set(0.2);
            
        gsap.to(this.fire, 0, { delay: 0.2, onComplete: () => {
            gsap.to(this.fire, 0.5, { repeat: -1, onRepeat: () => {
                gsap.to(this.fire, 0.25, { pixi:{ scale: 0.2, y: 151, x: 54 },  } );
                gsap.to(this.fire, 0.25, { pixi:{ scale: 0.21, y: 158, x: 54 }, delay: 0.25 } );
            } });
        } })
    }

    move() {
        this.fighterContainer.x += this.fighterContainer.vx;
        this.fighterContainer.y += this.fighterContainer.vy;
    }

    rotate(direction) {
        if(direction === 'up') {
            gsap.to(this.fighterContainer, 0.4, { rotation: 0 });
        } else if (direction === 'down') {
            gsap.to(this.fighterContainer, 0.4, { rotation: 3.2 });
        } else if(direction === 'left') {
            gsap.to(this.fighterContainer, 0.4, { rotation: -1.6 });
        } else if(direction === 'right') {
            gsap.to(this.fighterContainer, 0.4, { rotation: 1.6 });
        }
    }

    flash(direction) {
        const flash = 120;
        if(direction === 'up') {
            this.fighterContainer.y += (flash * -1);
            this.fighterContainer.x += 0;
        } else if (direction === 'down') {
            this.fighterContainer.y += flash;
            this.fighterContainer.x += 0;
        } else if(direction === 'left') {
            this.fighterContainer.x += (flash * -1);
            this.fighterContainer.y += 0;
        } else if(direction === 'right') {
            this.fighterContainer.x += flash;
            this.fighterContainer.y += 0;
        }
    }

    checkForFieldColision() {
    
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
    
        const diff = Math.abs(this.fighter.height - this.fighter.width) * 2;
        const fighterLeftPosition = this.fighterContainer.x - (this.fighter.width - diff / 2);
        const fighterRigthPosition = this.fighterContainer.x + this.fighter.width - diff / 2;
        const fighterUpPosition = this.fighterContainer.y - (this.fighter.width - diff / 2);
        const fighterDownPosition = this.fighterContainer.y + this.fighter.width - diff / 2;
    
        if(fighterLeftPosition < 0) {
            this.fighterContainer.x = fieldW - (this.fighter.width - diff / 2);
        } else if(fighterRigthPosition > fieldW) {
            this.fighterContainer.x = (this.fighter.width - diff / 2);
        } else if(fighterUpPosition < 0) {  
            this.fighterContainer.y = fieldH - (this.fighter.width - diff / 2);
        } else if(fighterDownPosition > fieldH) {
            this.fighterContainer.y = (this.fighter.width - diff / 2); 
        }
    }
}