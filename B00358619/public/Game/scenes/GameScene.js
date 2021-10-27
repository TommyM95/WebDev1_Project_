import RestartScene from "./RestartScene.js";
import WinScene from "./WinScene.js";

let gameOptions = {
    obstacleStatPosMinY: 0,
    obstacleStatPosMaxY: 600
}

let cursors;                    // Controls
let keyA;
let keyS;
let keyD;
let keyW;
let player;                     // Player
let playerHealth;               // Player Health
let floatingRockObstacles;      // Rock Type 1 Obstacle
let medals;                     // Medals (things collided with for points)
let score = 0;                  // Score
let scoreText;                  // Score Text object
let cloudsLarge;
let cloudsSmall;
let otherBackground;
let cloudLargeSpeed = 0.5;
let cloudSmallSpeed = 0.25;
let backgroundSpeed = 0.1;
let RestartSceneBool;
let WinSceneBool;
let pauseSceneBool;
let planeSound;
let audioPaused;
let muteButtonBool;



class GameScene extends Phaser.Scene {



    constructor() {
        super({key: 'GameScene'});
    }

    preload ()
    {
        this.load.image('skyBackground', 'assets/sky_background.png');
        this.load.image('otherBg', "sourcedAssets/BG_Resize.png");
        this.load.image('floatingRock', 'assets/floatyRockTest.png');
        this.load.spritesheet('plane', 'sourcedAssets/Plane/flyingSprSheet.png',{
            frameWidth: 150, frameHeight: 97
    });

        this.load.image('medal', 'assets/medal.png');
        this.load.image('clouds-large', "assets/clouds-large.png");
        this.load.image('clouds-small', "assets/clouds-small.png");

        this.load.audio('planeAudio',['sourcedAssets/Sound/planePropSoundMod.mp3',
            'sourcedAssets/Sound/planePropSoundMod.ogg']);
        this.load.image('mute_Button', "assets/muteButton.png");
        this.load.image('muteOn_Button', 'assets/muteOnButton.png');
    }

    create ()
    {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        audioPaused = false;
        this.game.events.on(Phaser.Core.Events.BLUR, () => {
            this.handleLoseFocus()
        })

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden)
            {
                return
            }

            this.handleLoseFocus()
        })

        // init controls
        cursors = this.input.keyboard.createCursorKeys();

        // rendering background image
        this.add.image(400,300,'skyBackground');
        // creating clouds
        otherBackground = this.add.tileSprite(400,300,800,600,'otherBg');
        cloudsLarge = this.add.tileSprite(400,300,800,600, 'clouds-large');
        cloudsSmall = this.add.tileSprite(400,300,800,600, 'clouds-small');

        // Creating a group for the floating rock obstacles
        floatingRockObstacles = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        // Creating a group for the floating Medals
        medals = this.physics.add.group({
            allowGravity: false
        });

        // Creating a floating rock obstacle
        let lastSpawnX = 0;
        for (let i =0; i < 25; i++){
            let randNumY = Phaser.Math.Between(gameOptions.obstacleStatPosMinY,gameOptions.obstacleStatPosMaxY);
            let randNumX = Phaser.Math.Between(400,800);
            floatingRockObstacles.create(lastSpawnX+randNumX,randNumY, 'floatingRock');
            lastSpawnX += randNumX;
            console.log('Spawned rock ' + i);
        }

        // Making Rocks move
        Phaser.Actions.Call(floatingRockObstacles.getChildren(), function(go) {
            go.setVelocityX(-90)
        });

        // Creating medals
        medals.create(400,35, 'medal');
        let lastMedalSpawnX = 0;
        for (let i =0; i < 25; i++){
            let randNumY = Phaser.Math.Between(gameOptions.obstacleStatPosMinY,gameOptions.obstacleStatPosMaxY);
            let randNumX = Phaser.Math.Between(400,800);
            medals.create(lastMedalSpawnX+randNumX,randNumY, 'medal');
            lastMedalSpawnX += randNumX;
            console.log('Spawned medal ' + i);
        }
        // Making medals move
        Phaser.Actions.Call(medals.getChildren(), function(go) {
            go.setVelocityX(-80)
        });


        const muteButton = this.add.sprite( 750, 45, 'mute_Button')
            .setInteractive()
            .on('pointerdown', function () {
                PauseAudioToggle();
            });


        // init Player @ position
        player = this.physics.add.sprite(400, 100, 'plane');

        this.anims.create({
           key:'fly',
            frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        planeSound = this.sound.add('planeAudio');
        // Defining player properties

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        playerHealth = 100;
        planeSound.play({
            volume: 0.1,
            loop: true
        });
        // Adding collision between player and obstacles
        this.physics.add.collider(player, floatingRockObstacles, playerHitObstacleCallback);

        // Called when player collides with an obstacle
        function playerHitObstacleCallback(player, obstacleHit) {
            playerHealth--;
            if (playerHealth <= 0){
                RestartSceneBool = true;
            }
        }

        // Making the medals be able to be picked up by the player on Collision
        this.physics.add.overlap(player, medals, collectMedal, playerHitMedalCallback, this);
        // Func to handle the collection of Medals
        function collectMedal(player, medal){
            medal.disableBody(true,true);
            // Updating the score
            score += 1;
            // Updating the Score Text to reflect score
            scoreText.setText('Score: ' + score);
        }
        // Init score text
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#000' });

        function playerHitMedalCallback(player, medalHit) {
            console.log("player Score is now: " + score);
            if (score >= 10){
                WinSceneBool = true;
            }
        }

        WinSceneBool = false;       // Init Bool to false
        RestartSceneBool = false;   // Init Bool to false
        pauseSceneBool = false;     // Init Bool to false
        this.input.keyboard.on('keydown-' + 'P', function (event) { pauseSceneBool = true; });
        this.input.keyboard.on('keydown-' + 'M', function (event) { PauseAudioToggle()});

        function PauseAudioToggle() {
            if(audioPaused===false){
                console.log("Mute Button Pressed no else");
                planeSound.pause();
                muteButton.setTexture('muteOn_Button');
                audioPaused = true;
            }else if(audioPaused===true){
                console.log("Mute Button Pressed else");
                planeSound.resume();
                muteButton.setTexture('mute_Button');
                audioPaused = false;
            }
        }
    }

    update ()
    {
        // Movement
        if (cursors.up.isDown || keyW.isDown){
            player.setVelocityY(-100);
            player.anims.play('fly', true);

        }
        if(cursors.left.isDown || keyA.isDown){
            player.setVelocityX(-100);
            player.anims.play('fly', true);
        }
        if(cursors.right.isDown  || keyD.isDown){
            player.setVelocityX(100);
            player.anims.play('fly', true);
        }

        if (pauseSceneBool){
            this.scene.launch('PauseScene');
            this.scene.pause();
            this.handleLoseFocus();
            pauseSceneBool = false;
        }

        // Move Background
        otherBackground.tilePositionX += backgroundSpeed;

        // Move Clouds
        cloudsLarge.tilePositionX += cloudLargeSpeed;
        cloudsSmall.tilePositionX += cloudSmallSpeed;

        if(RestartSceneBool){
            this.scene.start('RestartScene', new RestartScene());
            planeSound.pause();
            audioPaused = true;

        }
        if(WinSceneBool){
            this.scene.start('WinScene', new WinScene());
            planeSound.pause();
            audioPaused = true;
        }

    }

    handleLoseFocus()
    {
        // assuming a Paused scene that has a pause modal
        if (this.scene.isActive('PauseScene'))
        {
            return
        }

        // pause sound
        planeSound.pause()

        // Paused Scene will call the onResume callback when ready
        this.scene.run('PauseScene', {
            onResume: () => {
                this.scene.stop('PauseScene')

                // resume sound
                //planeSound.resume()
            }
        })
    }
}

export default GameScene;