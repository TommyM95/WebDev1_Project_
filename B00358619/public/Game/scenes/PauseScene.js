import GameScene from "./GameScene";

let pauseSceneBool;
class PauseScene extends Phaser.Scene {
    constructor() {
        super({key: 'PauseScene'});
    }

    preload(){
        this.load.image('pause_Background','./assets/pauseSceneBackground.png');
        this.load.image('resume_Button','./assets/resumeButton.png');
    }

    create(){
        // Set background image
        let background = this.add.sprite(400,300,'pause_Background');
        // let button = this.add.sprite(400,300,'play_Button');
        const button = this.add.sprite( 400, 360, 'resume_Button')
            .setInteractive()
            .on('pointerdown', function () {
                pauseSceneBool = true;
        });
        pauseSceneBool = false;
        this.input.keyboard.on('keydown-' + 'P', function (event) { pauseSceneBool = true; });
        function OnSceneResume(){
            planeSound.play({
                volume: 0.1,
                loop: true
            });
        }
    }

    update(){
        if (pauseSceneBool){
            this.scene.resume('GameScene');
            this.scene.stop();
            pauseSceneBool = false;

        }

    }
}

export default PauseScene;