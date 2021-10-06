import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

let titleScene = new TitleScene();
let gameScene = new GameScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

game.scene.add('TitleScene', titleScene);
game.scene.add('GameScene', gameScene);
game.scene.start('TitleScene');
