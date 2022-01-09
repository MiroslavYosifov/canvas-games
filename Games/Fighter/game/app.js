const Application = PIXI.Application;
const app = new Application({
    width: 1100,
    height: 700 
});

document.body.appendChild(app.view);

export const resourse = new Promise((resolve, reject) => {
    app.loader
    .add([
        'images/fighter.json',
        'images/fire-meteor.json',
        'images/cosmos3.jpg',
        'images/pixel4.jpg',
        'images/fire.png',
        'images/laser2.png'
    ])
    .load(resolve(app));
});
