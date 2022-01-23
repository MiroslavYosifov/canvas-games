import { Subject } from '../observable.js';

// if(Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
//     if(this.keyHeld_TurnLeft) {
//       this.carAng -= TURN_RATE*Math.PI;
//     }

//     if(this.keyHeld_TurnRight) {
//       this.carAng += TURN_RATE*Math.PI;
//     }
//   }
  
//   if(this.keyHeld_Gas) {
//     this.carSpeed += DRIVE_POWER;
//   }
//   if(this.keyHeld_Reverse) {
//     this.carSpeed -= REVERSE_POWER;
// }

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
        this.trigger({ name: 'forward', speed: this.state.speed });
    }
    _release() {
        this.trigger({ name: 'forward', speed: 0 });
    }
}

// this.carSpeed -= REVERSE_POWER;
export class DownCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'back', speed: this.state.speed * -1 });
    }
  
    _release() {
        this.trigger({ name: 'back', speed: 0 });
    }
}
  
// this.carAng -= TURN_RATE*Math.PI;
export class LeftCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }

    _press() {
        this.trigger({ name: 'turnLeft', angle: (this.state.TURN_RATE * Math.PI) * -1 });
    }

    _release() {
        this.trigger({ name: 'turnLeft', angle: 0 });
    }
}
  
// this.carAng += TURN_RATE*Math.PI;
export class RightCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'turnRight', angle: this.state.TURN_RATE * Math.PI });
    }
  
    _release() {
        this.trigger({ name: 'turnRight', angle: 0 });
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