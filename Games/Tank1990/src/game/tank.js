import { Observer } from './utils/observable.js';

const Container = PIXI.Container,
Sprite = PIXI.Sprite;

export class Tank extends Observer {
    constructor(app, state) {
        super();
        this.app = app;
        this.state = state;
        this.tank;
    }

    update (event) {

        if(event.name === 'upRelease' || event.name === 'downRelease' || event.name === 'leftRelease' || event.name === 'rightRelease') {
            this.tank.vx = 0;
            this.tank.vy = 0;
        } else if(event.name === 'up') {
            this.tank.vx = 0;
            this.tank.vy = -5;
            this.tank.rotation = this.state.radialRotation * 0;
        } else if(event.name === 'down') {
            this.tank.vx = 0;
            this.tank.vy = 5;
            this.tank.rotation = this.state.radialRotation * 0.5;
        } else if(event.name === "left") {
            this.tank.vx = -5;
            this.tank.vy = 0;
            this.tank.rotation = this.state.radialRotation * 0.75;
        } else if(event.name === "right") {
            this.tank.vx = 5;
            this.tank.vy = 0;
            this.tank.rotation = this.state.radialRotation * 0.25;
        }
    }


    checkForFieldColision() {
    
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
    
        const leftPosition = this.tank.x - this.tank.width * 0.5;
        const rigthPosition = this.tank.x + this.tank.width * 0.5;
        const upPosition = this.tank.y - this.tank.width * 0.5;
        const downPosition = this.tank.y + this.tank.width * 0.5;
        
        if(leftPosition < 0) {
            this.tank.x = fieldW - this.tank.width * 0.5;
        } else if(rigthPosition > fieldW) {
            this.tank.x = this.tank.width * 0.5;
        } else if(upPosition < 0) {  
            this.tank.y = fieldH - this.tank.width * 0.5;
        } else if(downPosition > fieldH) {
            this.tank.y = this.tank.width * 0.5; 
        }
    }
    

    move() {
        this.tank.x += this.tank.vx;
        this.tank.y += this.tank.vy;
    }

    render () {
        this.tank = new Sprite(PIXI.utils.TextureCache['images/tank.jpg']);
        this.tank.width = 100;
        this.tank.height = 100;
        this.tank.x = this.tank.width * 0.5;
        this.tank.y = this.tank.height * 0.5;
        this.tank.vx = 0;
        this.tank.vy = 0;
        this.tank.anchor.set(0.5, 0.5);
        this.app.stage.addChild(this.tank);
    }
}