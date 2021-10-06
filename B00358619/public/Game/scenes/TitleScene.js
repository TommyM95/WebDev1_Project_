class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }

    preload(){
        this.load.image('titleScene_Background','./assets/titleSceneBackground.png');
        this.load.image('play_Button','./assets/playButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'titleScene_Background');
        // let button = this.add.sprite(400,300,'play_Button');
        const button = this.add.sprite( 400, 300, 'play_Button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));

    }
}

export default TitleScene;