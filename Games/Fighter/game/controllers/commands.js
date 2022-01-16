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
  
export class ShotCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        if(!this.state.shotCommand) {
            this.state.shotCommand = 'shot';
        }
    }
  
    _release() {
      // console.log('BTN IS RELEASED');
    }
  
    render() {
        if(this.state.shotCommand === 'shot') {
            this.state.shotCommand = '';
            this.state.SHOT.shotCommand(this.state.prevDirection, this.state.FIGHTER.fighterContainer);
        }
    }
}
  
export class FlashCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        if(this.state.isFlashLoaded) {
            this.state.command = 'flash';
        }

        this.inputHandler.unsubscribeKeyDown();
        if(this.state.isFlashLoading) {
            this.state.isFlashLoading = false;
            gsap.fromTo(this.state.flashProgress, 2, { width: '0%' }, { width: '100%', onComplete: () => {
                this.state.isFlashLoaded = true;
                this.state.isFlashLoading = true;
            }});
        }
    }
  
    _release() {
        this.inputHandler.subscribeKeyDown();
    }
  
    render() {
        if(this.state.command === 'flash' && this.state.isFlashLoaded) {
            this.state.isFlashLoaded = false;
            this.state.command = '';
            this.state.FIGHTER.flash(this.state.prevDirection);
        }
    }
}
  
export class UpCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.state.direction = 'up';
        this.state.FIGHTER.start();
    }
  
    _release() {
        if (this.state.direction != 'down' && this.state.FIGHTER.fighterContainer.vx === 0) {
            this.state.FIGHTER.stop();
        }
    }
  
    render() {
      
    }
}
  
export class DownCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.state.direction = "down";
        this.state.FIGHTER.start();
    }
  
    _release() {
        if (this.state.direction != 'up' && this.state.FIGHTER.fighterContainer.vx === 0) {
          this.state.FIGHTER.stop();
        }
    }
  
    render() {
      
    }
}
  
  export class LeftCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.state.direction = "left";
        this.state.FIGHTER.start();
    }
  
    _release() {
        if (this.state.direction != 'right' && this.state.FIGHTER.fighterContainer.vy === 0) {
            this.state.FIGHTER.stop();
        }
    }
  
    render() {
      
    }
  }
  
  export class RightCommand extends Command { 
    constructor(inputHandler, state) {
        super(inputHandler);
        this.state = state;
    }
  
    _press() {
        this.state.direction = "right";
        this.state.FIGHTER.start();
    }
  
    _release() {
        console.log(this.key.isDown);
        if (this.state.direction != 'left' && this.state.FIGHTER.fighterContainer.vy === 0) {
            this.state.FIGHTER.stop();
        }
    }
  
    render() {
      
    }
}