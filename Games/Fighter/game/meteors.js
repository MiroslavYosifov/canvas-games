export class Meteor {
    constructor(app) {
        this.app = app;
        this.meteor;
        this.meteors = [];
    }

    multiplication() {
        gsap.to({}, 1.4, { repeat: -1, onRepeat: () => {
            this.render();
        } });
    }

    render() {
        var speed = getRandomInt(1, 4);
    
        var randomMeteor = getRandomInt(0, 9);
        var randomDirection = getRandomInt(0, 9);
    
        const framesFireMeteor = [];
        for (let i = 1; i < 25; i++) {
            const val = i < 10 ? `0${i}` : i;
            framesFireMeteor.push(PIXI.Texture.from(`fire-meteor${val}.png`));
        }
    
        this.meteor = new PIXI.AnimatedSprite(framesFireMeteor);
        if(randomDirection % 2 == 0) {
            this.meteor.x = getRandomInt(0, (this.app.view.width - 46));
            this.meteor.y = 0;
        } else {
            this.meteor.x = 0;
            this.meteor.y = getRandomInt(0, (this.app.view.height - 46));
        }
    
        this.meteor.vx = speed;
        this.meteor.vy = speed;
        this.meteor.animationSpeed = 0.3;
        this.meteor.scale.set(getRandomArbitraryDecimal(0.3, 0.6)); 
        this.meteor.play();
        this.meteor.rotation = 2.4;
        // fireMeteor.tint = Math.random() * 0xFFFFFF;
        if(randomMeteor % 2 == 0) {
            this.meteor.filters = [new PIXI.filters.AdjustmentFilter({saturation: 0, contrast: 1.1, blue: 1 }), new PIXI.filters.ColorOverlayFilter([118/255, 210/255, 13/255], 0.55)];
        }
        this.app.stage.addChildAt(this.meteor, 1);
        var obj = { meteor: {}, isLoaded: true }
        obj.meteor = this.meteor;
        this.meteors.push(obj);
    }

    move() {
        for (let i = 0; i < this.meteors.length; i++) {
            if(this.meteors[i].isLoaded) {
                this.meteors[i].meteor.x += this.meteors[i].meteor.vx;
                this.meteors[i].meteor.y += this.meteors[i].meteor.vy;
                this.checkForMeteorFieldColision(this.meteors[i].meteor, i);
            }
        }
    }

    checkForMeteorFieldColision(meteor, index) {
    
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
    
        const diff = Math.abs(meteor.height - meteor.width) * 2;
        const meteorLeftPosition = meteor.x - (meteor.width - diff);
        const meteorRigthPosition = meteor.x + meteor.width - diff / 2;
        const meteorUpPosition = meteor.y - (meteor.width - diff);
        const meteorDownPosition = meteor.y + meteor.width - diff / 2;
        
        if(meteorLeftPosition < 0) {
            // killMeteor(meteor, index);
        } else if(meteorRigthPosition > fieldW + 60) {
            this.kill(meteor, index);
        } else if(meteorUpPosition < 0) {  
            // killMeteor(meteor, index);
        } else if(meteorDownPosition > fieldH + 60) {
            this.kill(meteor, index);
        }
    }
    
    kill(meteor, index) {
        this.app.stage.removeChild(meteor);
        this.meteors.splice(index, 1);
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitraryDecimal (min, max) {
    return Math.random() * (max - min) + min;
}

// function randomBtwTwoNumbers(up_boundary, low_boundary) {
//     var res = Math.floor(Math.random() * ((up_boundary - low_boundary) + 1));
//     return res;
// }