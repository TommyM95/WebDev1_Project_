class WinScene extends Phaser.Scene {
    constructor() {
        super({key: 'WinScene'});
    }

    preload(){
        this.load.image('winScene_Background','./assets/winSceneBackground.png');
        this.load.image('restart_Button','./assets/restartButton.png');
        this.load.image('mainMenu_Button','./assets/mainMenuButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'winScene_Background');

        const buttonMainMenu = this.add.sprite( 400, 300, 'mainMenu_Button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('TitleScene'));

    }
}

export default WinScene;