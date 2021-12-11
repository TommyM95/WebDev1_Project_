import GameScene from "./GameScene.js";

let LevelSelectSceneBool;
class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({key: 'PauseScene'});
    }

    preload(){
        this.load.image('levelSelect_Background','./assets/LevelSelectWithoutButton.png');
        this.load.image('mainMenu_Button','./assets/mainMenuButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'levelSelect_Background');
        const button = this.add.sprite( 400, 100, 'mainMenuButton.png')
            .setInteractive()
            .on('pointerdown', function () {
                LevelSelectSceneBool = true;
            });
        LevelSelectSceneBool = false;


    }

    update(){


    }
}

export default LevelSelectScene;