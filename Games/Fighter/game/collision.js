export class Collision {
    constructor(app) {
        this.app = app;
    }

    checkForFieldColision() {
        
        const fieldW = this.app.view.width;
        const fieldH = this.app.view.height;
    
        const diff = Math.abs(this.fighter.height - this.fighter.width) * 2;
        const fighterLeftPosition = this.fighterContainer.x - (this.fighter.width - diff / 2);
        const fighterRigthPosition = this.fighterContainer.x + this.fighter.width - diff / 2;
        const fighterUpPosition = this.fighterContainer.y - (this.fighter.width - diff / 2);
        const fighterDownPosition = this.fighterContainer.y + this.fighter.width - diff / 2;
    
        if(fighterLeftPosition < 0) {
            this.fighterContainer.x = fieldW - (this.fighter.width - diff / 2);
        } else if(fighterRigthPosition > fieldW) {
            this.fighterContainer.x = (this.fighter.width - diff / 2);
        } else if(fighterUpPosition < 0) {  
            this.fighterContainer.y = fieldH - (this.fighter.width - diff / 2);
        } else if(fighterDownPosition > fieldH) {
            this.fighterContainer.y = (this.fighter.width - diff / 2); 
        }
    }
}