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
        this.trigger({ name: 'up', isPress: true });
    }
    _release() {
        this.trigger({ name: 'up', isPress: false });
    }
}

// this.carSpeed -= REVERSE_POWER;
export class DownCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'down',  isPress: true });
    }
  
    _release() {
        this.trigger({ name: 'down',  isPress: false });
    }
}
  
// this.carAng -= TURN_RATE*Math.PI;
export class LeftCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }

    _press() {
        this.trigger({ name: 'left', isPress: true });
    }

    _release() {
        this.trigger({ name: 'left', isPress: false });
    }
}
  
// this.carAng += TURN_RATE*Math.PI;
export class RightCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'right', isPress: true });
    }
  
    _release() {
        this.trigger({ name: 'right', isPress: false });
    }
}
  
export class ShotCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }

    _press() {
        this.trigger({ name: 'shot', isPress: true  });
    }

    _release() {
        this.trigger({ name: 'shot', isPress: false });
    }
}
  
export class FlashCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.trigger({ name: 'flash', isPress: true });
    }
  
    _release() {
        this.trigger({ name: 'flash', isPress: false });
    }
}