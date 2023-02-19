import { Observer } from './utils/observable.js';

const Container = PIXI.Container,
Sprite = PIXI.Sprite;

export class Tank extends Observer {
    constructor(app, state) {
        super();
        this.app = app;
        this.state = state;
        this.tank;
        this.commands = [
            {
                name: 'up',
                currentPress: false,
                isPress: false,
                vx: 0,
                vy: -5,
                rotation: this.state.radialRotation * 0
            },
            {
                name: 'down',
                currentPress: false,
                isPress: false,
                vx: 0,
                vy:  5,
                rotation: this.state.radialRotation * 0.5
            },
            {
                name: 'left',
                currentPress: false,
                isPress: false,
                vx: -5,
                vy: 0,
                rotation: this.state.radialRotation * 0.75
            },
            {
                name: 'right',
                currentPress: false,
                isPress: false,
                vx: 5,
                vy: 0,
                rotation: this.state.radialRotation * 0.25
            }
        ];
    }

    update (event) {

        this.commands.map(command => {
            if(command.name == event.name && event.isPress) {
                command.isPress = true;
                command.currentPress = true;
            } else if(command.name == event.name && !event.isPress) {
                command.isPress = false;
                command.currentPress = false;
            } else if(!command.isPress){
                command.currentPress = false;
            }
        });

        const currentPressCommand = this.commands.find(command => command.currentPress);
        if(currentPressCommand) {
            this.tank.vx = currentPressCommand.vx;
            this.tank.vy = currentPressCommand.vy;
            this.tank.rotation = currentPressCommand.rotation;
        } else {
            this.tank.vx = 0;
            this.tank.vy = 0;
        }
    }

    checkForFieldColision() {
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
    
        const leftPosition = this.tank.x - this.tank.height * 0.5;
        const rigthPosition = this.tank.x + this.tank.height * 0.5;
        const upPosition = this.tank.y - this.tank.height * 0.5;
        const downPosition = this.tank.y + this.tank.height * 0.5;
        
        if(leftPosition < 0) {
            this.tank.x = fieldW - this.tank.height * 0.5;
        } else if(rigthPosition > fieldW) {
            this.tank.x = this.tank.height * 0.5;
        } else if(upPosition < 0) {  
            this.tank.y = fieldH - this.tank.height * 0.5;
        } else if(downPosition > fieldH) {
            this.tank.y = this.tank.height * 0.5; 
        }
    }
    
    move() {
        this.tank.x += this.tank.vx;
        this.tank.y += this.tank.vy;
    }

    render () {
        this.tank = new Sprite(PIXI.utils.TextureCache['images/tank.png']);
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