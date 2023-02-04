import { Subject } from '../utils/observable.js';

class Command extends Subject { 
    constructor(inputHandler) {
        super();
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }

    _press() {
        console.log('BTN IS PRESSED');
    }
  
    _release() {
        console.log('BTN IS RELEASED');
    }
}

// this.carSpeed += DRIVE_POWER;
export class UpCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'up' });
    }
    _release() {
        this.trigger({ name: 'upRelease' });
    }
}

// this.carSpeed -= REVERSE_POWER;
export class DownCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'down' });
    }
  
    _release() {
        this.trigger({ name: 'downRelease' });
    }
}
  
// this.carAng -= TURN_RATE*Math.PI;
export class LeftCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }

    _press() {
        this.trigger({ name: 'left' });
    }

    _release() {
        this.trigger({ name: 'leftRelease' });
    }
}
  
// this.carAng += TURN_RATE*Math.PI;
export class RightCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'right' });
    }
  
    _release() {
        this.trigger({ name: 'rightRelease' });
    }
}
  
export class ShotCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }

    _press() {
        this.trigger({ name: 'shot' });
    }

    _release() {}
}
  
export class FlashCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'flash' });
    }
  
    _release() {

    }
}

// // this.carSpeed += DRIVE_POWER;
// export class UpCommand extends Command { 
//     constructor(inputHandler, state) {
//         super(inputHandler);
//         this.state = state;
//     }
  
//     _press() {
//         this.state.direction = 'up';
//         this.state.currDirection = { x: 0, y: -1 };
//         this.state.rotateDegree = 0;
//         this.trigger({ name: 'direction', x: 0, y: this.state.speed * -1 });
//     }
//     _release() {
//         if (this.state.direction != 'down' && this.state.fighter.fighterContainer.vx === 0) {
//             this.trigger({ name: 'direction', x: 0, y: 0 });
//         }
//     }
// }

// // this.carSpeed -= REVERSE_POWER;
// export class DownCommand extends Command { 
//     constructor(inputHandler, state) {
//         super(inputHandler);
//         this.state = state;
//     }
  
//     _press() {
//         this.state.direction = "down";
//         this.state.currDirection = { x: 0, y: 1 };
//         this.state.rotateDegree = 3.2;
//         this.trigger({ name: 'direction', x: 0, y: this.state.speed });
//     }
  
//     _release() {
//         if (this.state.direction != 'up' && this.state.fighter.fighterContainer.vx === 0) {
//             this.trigger({ name: 'direction', x: 0, y: 0 });
//         }
//     }
// }
  
// // this.carAng -= TURN_RATE*Math.PI;
// export class LeftCommand extends Command { 
//     constructor(inputHandler, state) {
//         super(inputHandler);
//         this.state = state;
//     }

//     _press() {
//         this.state.direction = "left";
//         this.state.currDirection = { x: -1, y: 0 };
//         this.state.rotateDegree = -1.6;
//         this.trigger({ name: 'direction', x: this.state.speed * -1, y: 0 });
//     }

//     _release() {
//         if (this.state.direction != 'right' && this.state.fighter.fighterContainer.vy === 0) {
//             this.trigger({ name: 'direction', x: 0, y: 0 });
//         }
//     }
// }
  
// // this.carAng += TURN_RATE*Math.PI;
// export class RightCommand extends Command { 
//     constructor(inputHandler, state) {
//         super(inputHandler);
//         this.state = state;
//     }
  
//     _press() {
//         this.state.direction = "right";
//         this.state.currDirection = { x: 1, y: 0 };
//         this.state.rotateDegree = 1.6;
//         this.trigger({ name: 'direction', x: this.state.speed, y: 0 });;
//     }
  
//     _release() {
//         if (this.state.direction != 'left' && this.state.fighter.fighterContainer.vy === 0) {
//             this.trigger({ name: 'direction', x: 0, y: 0 });
//         }
//     }
// }