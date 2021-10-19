class RestartScene extends Phaser.Scene {
    constructor() {
        super({key: 'RestartScene'});
    }

    preload(){
        this.load.image('titleScene_Background','./assets/titleSceneBackground.png');
        this.load.image('restart_Button','./assets/restartButton.png');
        this.load.image('mainMenu_Button','./assets/mainMenuButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'titleScene_Background');
        const button = this.add.sprite( 400, 300, 'restart_Button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));
        const buttonMainMenu = this.add.sprite( 400, 400, 'mainMenu_Button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('TitleScene'));

    }
}

export default RestartScene;