const Application = PIXI.Application,
Container = PIXI.Container,
loader = PIXI.Loader.shared,
resources = PIXI.Loader.shared.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Rectangle = PIXI.Rectangle;

let starTexture;
    
let starAmount;
let cameraZ;
let fov;
let baseSpeed;
let speed;
let warpSpeed;
let starStretch;
let starBaseSize;
let stars;

export class Field {
    constructor(app, isPixelVersion) {
        this.app = app;
        this.isPixelVersion = isPixelVersion;
    }

    generateField() {
        if(!this.isPixelVersion) {
            let cosmos = new Sprite(PIXI.utils.TextureCache['images/cosmos3.jpg']);
            cosmos.x = 0;
            cosmos.y = 0;
            cosmos.scale.set(1, 1); 
            cosmos.filters = [new PIXI.filters.AdjustmentFilter({ saturation: 0.9, contrast: 1, blue: 0.5, red: 0.4, green: 0.2 }), new PIXI.filters.ColorOverlayFilter([0/255, 0/255, 0/255], 0.1)];
            this.app.stage.addChildAt(cosmos, 0);
        
            // new Sprite(PIXI.utils.TextureCache['imagespixel4.jpg']);
            starTexture = PIXI.Texture.from('images/star.png');
        
            starAmount = 1000;
            cameraZ = 0;
            fov = 20;
            baseSpeed = 0.02;
            speed = 0;
            warpSpeed = 0;
            starStretch = 5;
            starBaseSize = 0.05;
        
            // Create the stars
            stars = [];
            for (var i = 0; i < starAmount; i++) {
                var star = {
                    sprite: new PIXI.Sprite(starTexture),
                    z: 0,
                    x: 0,
                    y: 0
                };
                star.sprite.anchor.x = 0.5;
                star.sprite.anchor.y = 0.7;
                this.randomizeStar(star, true);
                this.app.stage.addChild(star.sprite);
                stars.push(star);
            }
        
        } else {
            const cosmos = new Sprite(PIXI.utils.TextureCache['images/pixel4.jpg']);
            cosmos.filters = [new PIXI.filters.AdjustmentFilter({ saturation: 0.6, contrast: 1.5, blue: 0.6, red: 0.5, green: 0.5, brightest: 2 }), new PIXI.filters.ColorOverlayFilter([0/255, 0/255, 0/255], 0.55)];
            cosmos.scale.set(1.84, 1.94); 
            cosmos.x = 0;
            cosmos.y = 0;
            this.app.stage.addChildAt(cosmos, 0);
        
            starTexture = PIXI.Texture.from('images/star.png');
        
            starAmount = 200;
            cameraZ = 0;
            fov = 20;
            baseSpeed = 0.01;
            speed = 0;
            warpSpeed = 0;
            starStretch = 5;
            starBaseSize = 0.05;
        
            // Create the stars
            stars = [];
            for (var i = 0; i < starAmount; i++) {
                var star = {
                    sprite: new PIXI.Sprite(starTexture),
                    z: 0,
                    x: 0,
                    y: 0
                };
                star.sprite.anchor.x = 0.5;
                star.sprite.anchor.y = 0.7;
                this.randomizeStar(star, true);
                this.app.stage.addChild(star.sprite);
                stars.push(star);
            }
        }
        
        if(this.isPixelVersion) {
            this.app.stage.filters = [new PIXI.filters.PixelateFilter(4)];
        }
    }

    starAnimation(delta) {
        // Listen for animate update
        // Simple easing. This should be changed to proper easing function when used for real.
        speed += (warpSpeed - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed);
        for (var i = 0; i < starAmount; i++) {
           //  console.log(i);
           //  console.log(stars);
            var star = stars[i];
            if (star.z < cameraZ) this.randomizeStar(star);      
       
            // Map star 3d position to 2d with really simple projection
            var z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.height / 2;        
       
            // Calculate star scale & rotation.
            var dxCenter = star.sprite.x - this.app.renderer.screen.width / 2;
            var dyCenter = star.sprite.y - this.app.renderer.screen.height / 2;
            var distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
            var distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * starBaseSize;
            // Star is looking towards center so that y axis is towards center.
            // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
            star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / this.app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
       }
    }

    randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
    
        // Calculate star positions with radial random coordinate so no star hits the camera.
        var deg = Math.random() * Math.PI * 2;
        var distance = Math.random() * 50 + 1;
        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }
}
