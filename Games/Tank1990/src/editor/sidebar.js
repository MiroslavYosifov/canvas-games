
// render() {
//     for (let i = 0; i < this.grid.length; i++) {
//         let square = new PIXI.Graphics();
//         square.pivot.set(20, 20);
//         square.lineStyle(1, 0x464646, 1, 0);
//         square.beginFill(0x000000);
   
//         square.drawRect(0, 0, this.grid[i].width, this.grid[i].height);
//         square.endFill();

//         square.interactive = true;
//         square.buttonMode = true;

//         square.on('pointerover', this.onButtonOver);
//         square.on('mouseout', this.onButtonLeave);
//         square.on('pointerdown', this.onButtonDown);

//         square.x = this.grid[i].x;
//         square.y = this.grid[i].y;
//         // add squares to stage
//         this.app.stage.addChildAt(square, 0);
//     }
// }