class Scene_4 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_4" } )
    }
    
    preload(){
        this.objects = {};
        this.load.image('player', 'assets/phaser-dude.png');
        this.load.image('bullet', 'assets/1715.png');
        this.load.image('sky', 'assets/ms3-sky.png');
        this.load.image('okupant', 'assets/okupant.png');
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
                
                this.speed = Phaser.Math.GetSpeed(400, 1);
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

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 3,
            runChildUpdate: true
        });

        this.player = this.physics.add.sprite(this.w / 2 - 13, this.h - 22, 'player').setDepth(1);
        
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.speed = Phaser.Math.GetSpeed(400, 1);

        //this.ocupantFall(0, this.h/2)
        this.ocupants = this.physics.add.group({
            key: 'okupant',
            frameQuantity: 12,
            maxSize: 12,
            active: false,
            visible: false,
            enable: false,
            collideWorldBounds: true,
            bounceX: 0.5,
            bounceY: 0.5,
            dragX: 30,
            dragY: 0
        });

        this.createOcupant = (x, y, vx, vy) =>
        {
            var ocupant = this.ocupants.get();
            if (!ocupant) return;
            ocupant
                .enableBody(true, x, y, true, true)
                .setVelocity(vx, vy);
        }

        this.createOcupant(400, 10, 100, 1)

        this.destroyOcupant = (bullet, ocupant) => {
            ocupant.disableBody(true, true);
            bullet.destroy();
        };
    
    }
    
    update (time, delta) 
    {   
        this.bg.tilePositionX -= 0.2;

        if (this.cursors.left.isDown)
        {
            this.player.x -= this.speed * delta;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x += this.speed * delta;
        }
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && time > this.lastFired)
        {
            var bullet = this.bullets.get();
            if (bullet)
            {
                bullet.fire(this.player.x, this.player.y);
                this.lastFired = time + 300;
            }
        }
        this.bullets.children.entries.forEach(bullet => {
            this.ocupants.children.entries.forEach(ocupant => {
                if(Math.abs(bullet.x - ocupant.x) < 20 && Math.abs(bullet.y - ocupant.y) < 10){
                    this.destroyOcupant(bullet, ocupant);
                    setTimeout(() => {
                        this.createOcupant(400, 10, 100, 1)
                    }, 1500)
                }
            })
        
        });
        //console.log(this.ocupants)
        this.info.setText([
            //'Used: ' + this.bullets.getTotalUsed(),
            'Бутилок готово: ' + this.bullets.getTotalFree()
        ]);
    }
}

export default Scene_4;