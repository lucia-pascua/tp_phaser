import {preloads} from '../pages/preloads.js'
import {main_menu} from '../pages/main_menu.js'
import {gameplay} from '../pages/gameplay.js'
import {gameover} from '../pages/gameover.js'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height: 1200
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [preloads, main_menu, gameplay, gameover] 
};

var game = new Phaser.Game(config);