class Scene_4 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_4" } )
    }
    
    preload(){
        this.objects = {};
        this.load.image('ship', 'assets/phaser-dude.png');
        this.load.image('bullet', 'assets/1715.png');
        this.load.image('sky', 'assets/ms3-sky.png');
    }

    create() {
        this.bg = this.add.tileSprite(0, 0, 800, 296, 'sky')
            .setOrigin(0, 0);

        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;

        this.lastFired = 0;

        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                
                this.speed = Phaser.Math.GetSpeed(300, 1);
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y - 50);

                this.setScale(0.03);
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
    
                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });

        this.info = this.add.text(0, 0, 'Click to add objects', { fill: '#00ff00' });

        //  Set the custom class type that this Group will create.
        //  Limited to just 10 objects in the pool, not allowed to grow beyond it.
        //  runChildUpdate tells the Group to call 'update' on any active child. The default is false.

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 3,
            runChildUpdate: true
        });

        this.ship = this.add.sprite(this.w / 2 - 13, this.h - 22, 'ship').setDepth(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.speed = Phaser.Math.GetSpeed(300, 1);
    }
    
    update (time, delta) 
    {   
        this.bg.tilePositionX -= 0.2;

        if (this.cursors.left.isDown)
        {
            this.ship.x -= this.speed * delta;
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.x += this.speed * delta;
        }
        if (this.cursors.up.isDown && time > this.lastFired)
        {
            var bullet = this.bullets.get();
            if (bullet)
            {
                bullet.fire(this.ship.x, this.ship.y);
    
                this.lastFired = time + 300;
            }
        }
    
        this.info.setText([
            'Used: ' + this.bullets.getTotalUsed(),
            'Free: ' + this.bullets.getTotalFree()
        ]);
    }
}

export default Scene_4;