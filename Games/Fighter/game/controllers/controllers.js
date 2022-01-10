import { keyboard } from './keybord.js';

export class Controllers {
  constructor(generatedFighter, generatedShots) {
    this.generatedFighter = generatedFighter;
    this.generatedShots = generatedShots;
    this.command = '';
    this.shotCommand = '';
    this.isFlashLoaded = true;
    this.isFlashLoading = true;
    this.flashProgress = document.getElementById('flash-progres');
    this.direction = "up";
    this.upCommand = keyboard('ArrowUp'),
    this.downCommand = keyboard('ArrowDown'),
    this.leftCommand = keyboard('ArrowLeft'),
    this.rightCommand = keyboard('ArrowRight'),
    this.spaceCommand = keyboard(' '),
    this.shotKey = keyboard('f');
  }

  events() {
    this.up();
    this.down();
    this.left();
    this.right();
    this.flash();
    this.shot();
  }

  up() {
    this.upCommand.press = () => {
      this.direction = "up";
      this.generatedFighter.start();
    }
    this.upCommand.release = () => {
        if (!this.downCommand.isDown && this.generatedFighter.fighterContainer.vx === 0) {
          this.generatedFighter.stop();
        }
    };
  }

  down() {
    this.downCommand.press = () => {
      this.direction = "down";
      this.generatedFighter.start();
    };
    this.downCommand.release = () => {
        if (!this.upCommand.isDown && this.generatedFighter.fighterContainer.vx === 0) {
          this.generatedFighter.stop();
        }
    };
  }

  left() {
    this.leftCommand.press = () => {
      this.direction = "left";
      this.generatedFighter.start();
    };
    this.leftCommand.release = () => {
        if (!this.rightCommand.isDown && this.generatedFighter.fighterContainer.vy === 0) {
          this.generatedFighter.stop();
        }
    };
  }

  right() {
    this.rightCommand.press = () => {
      this.direction = "right";
      this.generatedFighter.start();
    };
    this.rightCommand.release = () => {
        if (!this.leftCommand.isDown && this.generatedFighter.fighterContainer.vy === 0) {
          this.generatedFighter.stop();
        }
    };
  }

  flash() {
    this.spaceCommand.press = () => {
    
      if(this.isFlashLoaded) {
        this.command = 'flash';
      }
      this.spaceCommand.unsubscribeKeyDown();
      if(this.isFlashLoading) {
        this.isFlashLoading = false;
          gsap.fromTo(this.flashProgress, 2, { width: '0%' }, { width: '100%', onComplete: () => {
            this.isFlashLoaded = true;
            this.isFlashLoading = true;
          }});
      }
    };

    this.spaceCommand.release = () => {
      this.spaceCommand.subscribeKeyDown();
    };
  }

  shot() {
    this.shotKey.press = () => {
      if(!this.shotCommand) {
          this.shotCommand = 'shot';
      }
    };

    this.shotKey.release = () => {
    
    };
  }

  updateState() {
    if(this.direction != this.prevDirection) {
      this.prevDirection = this.direction;
    }

    if(this.command === 'flash' && this.isFlashLoaded) {
      this.isFlashLoaded = false;
      this.command = '';
      this.generatedFighter.flash(this.prevDirection);
    }

    if(this.shotCommand === 'shot') {
      this.shotCommand = '';
      this.generatedShots.shotCommand(this.prevDirection,  this.generatedFighter.fighterContainer);
    }

    this.generatedFighter.rotate(this.prevDirection);
    this.generatedFighter.move(this.direction);
  }
}