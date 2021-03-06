import TitleScene from './TitleScene.js';
import PauseScene from './PauseScene.js';
import GameScene from './GameScene.js';
import RestartScene from './RestartScene.js';
import WinScene from './WinScene.js';
import LevelSelectScene from "./LevelSelectScene.js";



let titleScene = new TitleScene();
let gameScene = new GameScene();
let restartScene = new RestartScene();
let winScene = new WinScene();
let pauseScene = new PauseScene();
let levelScene = new LevelSelectScene();

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
game.scene.add('RestartScene', restartScene);
game.scene.add('WinScene', winScene);
game.scene.add('PauseScene', pauseScene);
game.scene.add('LevelSelectScene', levelScene);
game.scene.start('TitleScene');

