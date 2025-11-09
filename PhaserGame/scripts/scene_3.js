class Scene_3 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_3" } )
    }
    
    preload(){
        this.load.audio('plane-sound', ['assets/sound/airplane-fly.mp3']);
        this.load.image('star', 'assets/star2.png');
        this.load.image('plane', 'assets/plane.png');
        this.load.spritesheet('okupant', 'assets/okupant-sprite.png', { frameWidth: 40, frameHeight: 100 });
    }

    create() {
        const textStyle = {
            font: "16px Tahoma",
            color: "white"
        }

        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
    
        var bg = this.add.group({ key: 'star', frameQuantity: 300 });
    
        this.sky = new Phaser.Display.Color(120, 120, 255);
        this.space = new Phaser.Display.Color(0, 0, 0);
    
        this.player = this.add.sprite(this.w / 2, -1100, 'dude');
        this.player.displayWidth = 1;
        this.player.displayHeight = 1;

        this.ilText  = this.add.text(-250, -1380, "РУЦКИЙ ІЛ", textStyle);
        this.plane = this.add.sprite(-215, -1300, 'plane');

        //Okupants
        this.okupantMaked_1 = false;
        this.okupantMaked_2 = false;
        this.okupantMaked_3 = false;
        this.ocupantFall = (y_start, x_coord) => {
            const okupantAnimation = this.anims.create({
                key: 'fall',
                frames: this.anims.generateFrameNumbers('okupant'),
                frameRate: 7,
                repeat: -1
            }); 
            const sprite = this.add.sprite(y_start, -1300, 'okupant').setScale(1);
    
            sprite.play({ key: 'fall', repeat: 0 });

            this.tweens.add({
                targets: sprite,
                y: -700,
                x: x_coord,
                duration: 8800,
                ease: 'Linear'
            });
        }
    
        this.cameras.main.startFollow(this.player);
    
        var rect = new Phaser.Geom.Rectangle(0, -2 * this.h, this.w, 2 * this.h);

        this.planeSound = this.sound.add("plane-sound");
        this.planeSound.play();

        this.input.on('pointerdown', () => {
            this.planeSound.stop();
            this.scene.start("Scene_4")
        }, this)
    
        Phaser.Actions.RandomRectangle(bg.getChildren(), rect);
    }
    
    update () 
    {   
        if(this.plane.x < this.w + 1000 )
        {
            this.plane.x = this.plane.x + 2;
            this.ilText.x= this.ilText.x + 2;

            if(this.plane.x > this.w + 700)
            {
                this.planeSound.stop();
            } 
            else if(this.plane.x > this.w + 100)
            {
                this.planeSound.setVolume(0.1)
            } 
            else if(this.plane.x > this.w - 200)
            {
                this.planeSound.setVolume(0.2)
            } 
            else if(this.plane.x > this.w - 350)
            {
                if(!this.okupantMaked_2){
                    this.okupantMaked_2 = true;
                    this.ocupantFall(this.plane.x, 800)
                }
                this.planeSound.setVolume(0.3)
            } 
            else if(this.plane.x > this.w - 400)
            {
                if(!this.okupantMaked_1){
                    this.okupantMaked_1 = true;
                    this.ocupantFall(this.plane.x, 500)
                }
                this.planeSound.setVolume(0.5)
            } 
            else if(this.plane.x > this.w - 600)
            {
                if(!this.okupantMaked_3){
                    this.okupantMaked_3 = true;
                    this.ocupantFall(this.plane.x, 200)
                }
                this.planeSound.setVolume(0.8)
            }
        }
        if(this.player.y <= 0 && this.plane.x > this.w / 2 + 400)
        {
            this.player.y = this.player.y + 3;

            var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -this.h * 2, this.player.y);
    
            this.cameras.main.setBackgroundColor(hexColor);
        }
        if(this.player.y > 0)
        {
            this.planeSound.stop();
            this.scene.start("Scene_4")
        }
    }
}

export default Scene_3;