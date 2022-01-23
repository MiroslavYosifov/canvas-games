const RELEASE_DOWN = "&145";

class FighterState {
    static alive = "alive";
    static death = "death";
    static movingUp = "movingUp";
    static movingDown = "movingDown";
    static movingLeft = "movingLeft";
    static movingRight = "movingRight";
    static shoting = "shoting";
    constructor() {}

    handleInput(fighter, input) {

        if (input == PRESS_DOWN) {
            return new OnMoveLeftState();
        }

        return null;
    }

    update(fighter) {}
}


class OnMoveLeftState extends FighterState {
    static handleInput(fighter, input) {
      if (input == PRESS_B) {
        // change direction
      } else if (input == PRESS_DOWN) {
        // duck
      }
    }
}

class OnMoveRightState extends FighterState {
    static handleInput(fighter, input) {
      if (input == PRESS_B) {
        // change direction
      } else if (input == PRESS_DOWN) {
        // duck
      }
    }
}

class OnMoveUpState extends FighterState {
    static handleInput(fighter, input) {
      if (input == PRESS_B) {
        // change direction
      } else if (input == PRESS_DOWN) {
        // duck
      }
    }
}

class OnMoveDownState extends FighterState {
    static handleInput(fighter, input) {
      if (input == PRESS_B) {
        // change direction
      } else if (input == PRESS_DOWN) {
        // duck
      }
    }
}

class DuckingState extends OnGroundState {
  constructor() {
    this.chargeTime = 0;
  }

  handleInput(heroine, input) {
    if (input == RELEASE_DOWN) {
      return new StandingState();
    } else {
      OnGroundState.handleInput(heroine, input);
    }
  }

  update(heroine) {
    this.chargeTime += 1;
    if (this.chargeTime > MAX_CHARGE) {
      heroine.superBomb();
    }
  }
}

class StandingState extends HeroineState {
  constructor() {}

  handleInput(heroine, input) {
    if (input == PRESS_B) {
      heroine.state = HeroineState.jumping;
    }
  }

  update(heroine) {
    this.velocityY = JUMP_VELOCITY;
  }

  enter(heroine) {
    heroine.setGraphics(IMAGE_JUMP);
  }
}

class Fighter {
  constructor() {
    this.state = new StandingState();
    this.equipment = new Gun();
  }

  handleInput(input) {
    // const state = this.state.handleInput(input);

    // if (state != null) {
    //   this.state = state;
    //   this.state.enter(this);
    // }

    this.state.handleInput(input);
    this.equipment.handleInput(input);
  }

  update() {
    this.state.update(this);
  }
}

class jumpingState {
    constructor(heroine) {
        // apply initial up velocity to heroine
    }

    handleInput(heroine, input) {}

    update(heroine) {
        if (heroine.isOnGround()) {
            return new StandingState();
        } else {
            heroine.applyForce(GRAVITY);
        }
    }
}
