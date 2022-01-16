import { Subject } from '../observable.js';

class Command { 
    constructor(inputHandler) {
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
  
export class ShotCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.trigger({ name: 'shot' });
    }
  
    _release() {
      // console.log('BTN IS RELEASED');
    }
}
  
export class FlashCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.inputHandler.unsubscribeKeyDown();
        if(this.state.isFlashLoaded) { this.state.command = 'flash'; }
        this.trigger({ name: 'flash' });
    }
  
    _release() {
        this.inputHandler.subscribeKeyDown();
    }
}
  
export class UpCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.state.direction = 'up';
        this.trigger({ name: 'direction', x: 0, y: this.state.speed * -1 });
    }
    _release() {
        if (this.state.direction != 'down' && this.state.FIGHTER.fighterContainer.vx === 0) {
            this.trigger({ name: 'direction', x: 0, y: 0 });
        }
    }
}
  
export class DownCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.state.direction = "down";
        this.trigger({ name: 'direction', x: 0, y: this.state.speed });
    }
  
    _release() {
        if (this.state.direction != 'up' && this.state.FIGHTER.fighterContainer.vx === 0) {
            this.trigger({ name: 'direction', x: 0, y: 0 });
        }
    }
}
  
  export class LeftCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.state.direction = "left";
        this.trigger({ name: 'direction', x: this.state.speed * -1, y: 0 });
    }
  
    _release() {
        if (this.state.direction != 'right' && this.state.FIGHTER.fighterContainer.vy === 0) {
            this.trigger({ name: 'direction', x: 0, y: 0 });
        }
    }
  }
  
  export class RightCommand extends Subject { 
    constructor(inputHandler, state) {
        super();
        this.state = state;
        this.inputHandler = inputHandler;
        this.key = this.inputHandler.getKey;
        this.key.press = this._press.bind(this);
        this.key.release = this._release.bind(this);
    }
  
    _press() {
        this.state.direction = "right";
        this.trigger({ name: 'direction', x: this.state.speed, y: 0 });;
    }
  
    _release() {
        if (this.state.direction != 'left' && this.state.FIGHTER.fighterContainer.vy === 0) {
            this.trigger({ name: 'direction', x: 0, y: 0 });
        }
    }
}