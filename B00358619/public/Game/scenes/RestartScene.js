class RestartScene extends Phaser.Scene {
    constructor() {
        super({key: 'RestartScene'});
    }

    preload(){
        this.load.image('titleScene_Background','./assets/titleSceneBackground.png');
        this.load.image('restart_Button','./assets/restartButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'titleScene_Background');
        // let button = this.add.sprite(400,300,'play_Button');
        const button = this.add.sprite( 400, 300, 'restart_Button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));

    }
}

export default RestartScene;