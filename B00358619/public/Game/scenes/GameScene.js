let gameOptions = {
    obstacleStatPosMinY: 0,
    obstacleStatPosMaxY: 600
}

let cursors;                    // Controls
let player;                     // Player
let playerHealth;               // Player Health
let floatingRockObstacles;      // Rock Type 1 Obstacle
let medals;                     // Medals (things collided with for points)
let score = 0;                  // Score
let scoreText;                  // Score Text object
let cloudsLarge;
let cloudsSmall;
let otherBackground;

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload ()
    {
        this.load.image('skyBackground', 'assets/sky_background.png');
        this.load.image('otherBg', "sourcedAssets/BG_Resize.png");
        this.load.image('floatingRock', 'assets/floatyRockTest.png');
        // this.load.image('plane', 'sourcedAssets/Plane/plane_1_Resize.png');
        this.load.spritesheet('plane', 'sourcedAssets/Plane/flyingSprSheet.png',{
            frameWidth: 150, frameHeight: 97
    });

        this.load.image('medal', 'assets/medal.png');
        this.load.image('clouds-large', "assets/clouds-large.png");
        this.load.image('clouds-small', "assets/clouds-small.png");
    }

    create ()
    {
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
        for (let i =0; i < 20; i++){
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
        for (let i =0; i < 20; i++){
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

        // init Player @ position
        player = this.physics.add.sprite(400, 100, 'plane');

        this.anims.create({
           key:'fly',
            frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        // Defining player properties
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        playerHealth = 100;
        // Adding collision between player and obstacles
        this.physics.add.collider(player, floatingRockObstacles, playerHitObstacleCallback);


        function playerHitObstacleCallback(player, obstacleHit) {
            playerHealth--;
            console.log("player Hp is now: " + playerHealth);
            if (playerHealth <= 0){
                this.scene.start('RestartScene');
            }
        }

        // Making the medals be able to be picked up by the player on Collision
        this.physics.add.overlap(player, medals, collectMedal, null, this);
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

    }

    update ()
    {
        // Movement
        if (cursors.up.isDown || cursors.space.isDown){
            player.setVelocityY(-100);
            player.anims.play('fly', true);
        }
        if(cursors.left.isDown){
            player.setVelocityX(-100);
            player.anims.play('fly', true);
        }
        if(cursors.right.isDown){
            player.setVelocityX(100);
            player.anims.play('fly', true);
        }

        // Move Background
        otherBackground.tilePositionX += 0.1;

        // Move Clouds
        cloudsLarge.tilePositionX += 0.5;
        cloudsSmall.tilePositionX += 0.25;

    }

}

export default GameScene;