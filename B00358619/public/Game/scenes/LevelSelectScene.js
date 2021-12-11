class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({key: 'LevelSelectScene'});
    }

    preload(){
        this.load.image('levelSelect_Background','./assets/LevelSelectWithoutButton.png');
        this.load.image('button1','./assets/button1.png');
        this.load.image('button2','./assets/button2.png');
        this.load.image('mainMenu_Button','./assets/mainMenuButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'levelSelect_Background');
        const button1 = this.add.sprite( 316, 239, 'button1')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));
        const button2 = this.add.sprite( 372, 239, 'button2')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));

    }

    update(){


    }
}

export default LevelSelectScene;