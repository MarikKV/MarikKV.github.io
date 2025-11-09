class Scene_4 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_4" } )
    }
    
    preload(){
        this.objects = {};
        this.load.audio('bootle_sound', ['assets/sound/bottle_sound.mp3']);
        this.load.image('player', 'assets/phaser-dude.png');
        this.load.image('bullet', 'assets/1715.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('okupant', 'assets/okupant.png');
    }

    create() {
      // Sky height (20% of screen)
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
         // Define sky layers — each with different height & speed
        const layers = [
            { heightPercent: 0.05, speed: 0.25, alpha: 0.7 },
            { heightPercent: 0.10, speed: 0.35, alpha: 0.9 },
            { heightPercent: 0.08, speed: 0.45, alpha: 1.0 },
        ];

        this.skies = [];

        const skyTexture = this.textures.get('sky').getSourceImage();
        const imgRatio = skyTexture.width / skyTexture.height;

       layers.forEach((layer, i) => {
            const skyHeight = this.h * layer.heightPercent;
            const skyWidth = skyHeight * imgRatio;

            // Vertical position: stack layers down from top
            const yPos = i === 0 ? 0 : layers.slice(0, i).reduce((sum, l) => sum + this.h * l.heightPercent, 0);

            // Create enough images to fill width (considering gaps)
            const needed = Math.ceil(this.w / (skyWidth * 2)) + 2; // *2 = with gap

            const images = [];
            for (let j = 0; j < needed; j++) {
                const img = this.add.image(j * skyWidth * 2, yPos, 'sky') // <-- note *2
                    .setOrigin(0, 0)
                    .setDisplaySize(skyWidth, skyHeight)
                    .setAlpha(layer.alpha);
                images.push(img);
            }

            this.skies.push({
                images,
                width: skyWidth,
                height: skyHeight,
                speed: layer.speed
            });
        });


        // Keep background color for the rest of the screen
        this.cameras.main.setBackgroundColor(new Phaser.Display.Color(3, 186, 252));

        this.bottleSound = this.sound.add('bootle_sound');

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
            frameQuantity: 4,
            maxSize: 4,
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

        this.destroyOcupant = (bullet, ocupant) => {
            ocupant.disableBody(true, true);
            bullet.destroy();
        };

        setInterval(() => {
            let okupantX = 0;
            if(this.player.x <= 200)
            {
                okupantX = 200;
            }
            else if(this.player.x >= this.w - 200)
            {
                okupantX = -200;
            }
            else
            {
                let direction =  Math.random() > 0.5 ? 1 : -1; 
                okupantX = this.player.x + direction * 200;
            }
            
            this.createOcupant(okupantX, -100, 100, 1)
        }, 2500)

        this.sky = new Phaser.Display.Color(3, 186, 252);
        this.cameras.main.setBackgroundColor(this.sky);
    
    }
    
    update (time, delta) 
    {   
        // Move backgrounds to the right at slightly different speeds
         this.skies.forEach(layer => {
            layer.images.forEach(img => {
                img.x += layer.speed;

                // When an image goes off screen (including gap), wrap it back
                if (img.x >= this.w + layer.width) {
                    img.x -= layer.width * 2 * layer.images.length;
                }
            });
        });

        if (this.cursors.left.isDown)
        {
            this.player.x -= this.speed * delta;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x += this.speed * delta;
        }

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && time > this.lastFired) {
            var bullet = this.bullets.get();
            if (bullet) {
                bullet.fire(this.player.x, this.player.y);
                this.bottleSound.play(); // 🔊 play sound
                this.lastFired = time + 300;
            }
        }
        
        this.bullets.children.entries.forEach(bullet => {
            this.ocupants.children.entries.forEach(ocupant => {
                if(Math.abs(bullet.x - ocupant.x) < 20 && Math.abs(bullet.y - ocupant.y) < 10){
                    this.destroyOcupant(bullet, ocupant);
                }
            })
        
        });
        this.info.setText([
            //'Used: ' + this.bullets.getTotalUsed(),
            'Бутилок готово: ' + this.bullets.getTotalFree()
        ]);
        let ocupantsFall = 0;

        this.ocupants.children.entries.forEach(ocupant => {
            if(ocupant.y >= this.h - 50){ocupantsFall++};
        });
        console.log(ocupantsFall)
        if(ocupantsFall == 4){
            this.scene.start("Scene_5");
        } else {
            ocupantsFall = 0;
        }
    }
}

export default Scene_4;