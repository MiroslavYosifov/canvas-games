const Application = PIXI.Application,
Container = PIXI.Container,
loader = PIXI.Loader.shared,
resources = PIXI.Loader.shared.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Rectangle = PIXI.Rectangle;

export class Shot {
    constructor(app, shotsCount) {
        this.ammonition = document.getElementById('shot-container');
        this.app = app;
        this.shotsCount = shotsCount;
        this.shot;
        this.shots = [];
    }

    shotCommand(direction, fighterContainer) {
        let speed = 7; 
        if(direction === 'up') {
            this.generateShotUtils(fighterContainer.x, fighterContainer.y, 0, (speed *= -1), 1.59);
        } else if (direction === 'down') {
            this.generateShotUtils(fighterContainer.x, fighterContainer.y, 0, speed, 1.59);
        } else if(direction === 'left') {
            this.generateShotUtils(fighterContainer.x, fighterContainer.y, (speed *= -1), 0, 0);
        } else if(direction === 'right') {
            this.generateShotUtils(fighterContainer.x, fighterContainer.y, speed, 0, 0);
        }
    }

    generateShotUtils(x, y, vx, vy, rotation) {

        for (let i = 0; i < this.shots.length; i++) {
            if(!this.shots[i].isLoaded) {
                let shot = this.generateShot(x, y, vx, vy, rotation, i);
                this.shots[i].isLoaded = true;
                this.shots[i].shot = shot;
                this.app.stage.addChildAt(shot, 1);
                var shots = document.querySelectorAll('.shot');
                if(shots.length > 0) {
                    shots[shots.length-1].remove();
                }
                break;
            }
        }
    }

    generateShot(x, y, vx, vy, rotation, i) {
        var shotName = `shot${i}`
        let shot;
        shot = new Sprite(PIXI.utils.TextureCache['images/laser2.png']);
        shot.x = x;
        shot.y = y;
        shot.vx = vx;
        shot.vy = vy;
        shot.name = shotName;
        // fire.anchor.set(2.38, 3.4);
        shot.rotation = rotation;
        shot.scale.set(0.1);
        return shot;
    }

    moveShots() {
        for (let i = 0; i < this.shots.length; i++) {
            if(this.shots[i].isLoaded) {
                this.shots[i].shot.x += this.shots[i].shot.vx;
                this.shots[i].shot.y += this.shots[i].shot.vy;
                this.checkForShotFieldColision(this.shots[i].shot, i);
            }
        }
    }

    checkForShotFieldColision(shot, index) {
    
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
        const diff = Math.abs(shot.height - shot.width) * 2;
        const shotLeftPosition = shot.x - (shot.width - diff);
        const shotRigthPosition = shot.x + shot.width - diff / 2;
        const shotUpPosition = shot.y - (shot.width - diff);
        const shotDownPosition = shot.y + shot.width - diff / 2;
    
        if(shotLeftPosition < 0) {
            this.killShot(shot, index);
        } else if(shotRigthPosition > fieldW) {
            this.killShot(shot, index);
        } else if(shotUpPosition < 0) {  
            this.killShot(shot, index);
        } else if(shotDownPosition > fieldH) {
            this.killShot(shot, index);
        }
    }
    
    killShot(shot, index) {
        this.app.stage.removeChild(shot);
        this.shots.splice(index, 1);
        if(this.shots.length < 1) {
            this.generateAmmonitions(this.shotsCount);
            this.reloadShots(this.shotsCount);
        }
        // props.shots[index].isKilled = true;
    }
    
    reloadShots() {
        for (let i = 0; i < this.shotsCount; i++) {
            this.shots.push({ isLoaded: false, shot: {} });
        }
    }
   
    generateAmmonitions () {
        for (let i = 0; i < this.shotsCount; i++) {
            var div = document.createElement('div');
            div.classList.add('shot');
            this.ammonition.appendChild(div);
        }
    }
}