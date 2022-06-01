export class preloads extends Phaser.Scene { 
   
    constructor() {
        super("preloads");
    }

    preload(){
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('obstacle', './assets/platform_obstacle.png');
        this.load.image('star', '../assets/star.png');
        this.load.image('special_star' , './assets/special_star.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.image('logo', './assets/logo.png');
        this.load.image('logoGameOver', './assets/budyGO.png')
        this.load.image('background', './assets/background.png');
        this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('music', './assets/music.mp3'); 
    }

    create(){
        this.scene.start('main_menu');
    }
}