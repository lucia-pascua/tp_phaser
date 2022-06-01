var player;
var stars;
var special_star;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var collectSpecialStar;
var collectStar;
var hitBomb;


export class gameplay extends Phaser.Scene{

    constructor() {
        super("gameplay");
    }

    create(){
       
         
        gameOver = false;
     
        score = 0;
        //  A simple background for our game
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'sky').setScale(1.1);

        var music = this.sound.add('music');
        music.play()
    
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
    
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        //  Now let's create some ledges
        platforms.create(500, 420, 'ground');
        platforms.create(70, 340, 'ground');
        platforms.create(850, 300, 'ground');
        platforms.create(309, 170, 'ground');
        platforms.create(950, 170, 'ground');
    
        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');
    
        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
    
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
    
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });


        stars.children.iterate(function (child) {
    
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });

        special_star = this.physics.add.group({
            key: 'special_star',
            repeat: 4,
            setXY: { x: 50, y: 10, stepX: 180 }
        });


        special_star.children.iterate(function (child) {
    
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });

        bombs = this.physics.add.group();
    
        //  The score
        scoreText = this.add.text(600, 550, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' });
    
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(special_star, platforms);
        this.physics.add.collider(bombs, platforms);
    
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, special_star, this.collectSpecialStar, null, this);
    
    
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    }

    update(){
        if (gameOver)
        {
            return;
           // gameOverText = this.add.text(220, 250, 'Game Over', { fontSize: '64px', fill: '#FFFFFF' });
           // reloadText = this.add.text(170, 300, 'presione espacio para reiniciar', { fontSize: '24px', fill: '#FFFFFF' });
           // if (cursors.space.isDown)
           // {
          //      document.location.reload();
          //  }
        }
    
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
    
            player.anims.play('turn');
        }
    
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        } 
    }

    collectStar (player, star){
        star.disableBody(true, true);
    
        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);
    
        if (stars.countActive(true) === 0 && special_star.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate (function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });

            special_star.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);

           });
    
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
    
        }
    }

    hitBomb(player, bomb){
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play('turn');
    
        gameOver = true;

        setTimeout(() => {
            // Instrucción que sera llamada despues del segundo
            this.scene.start(
              "gameover",
              { score: score } // se pasa el puntaje como dato a la escena RETRY
            );
          }, 1000); // Ese número es la cantidad de milisegundos
    }

    collectSpecialStar(player, special_star){
        special_star.disableBody(true, true);
    
        //  Add and update the score
        score += 15;
        scoreText.setText('Score: ' + score);

    }
}