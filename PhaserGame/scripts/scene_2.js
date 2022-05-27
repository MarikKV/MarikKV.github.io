class Scene_2 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_2" } )
    }
    
    preload(){
        this.load.audio('intro', ['assets/sound/predator-intro.mp3']);
        this.load.image('star', 'assets/star2.png');
        this.load.image('dude', 'assets/phaser-dude.png');
    }

    create() {
        const textStyle = {
            font: "30px Tahoma",
            color: "transparent"
        }
        
        this.text  = this.add.text(200, 200, "Гостомельський аеропорт.", textStyle);
        this.text2  = this.add.text(200, 240, "24.02.2022", textStyle);

        let start = 500;
        [this.text, this.text2].forEach(text => {
            this.tweens.add({targets: text,alpha: 0, delay: 0, duration: 100});
            this.tweens.add({ 
                targets: text,
                alpha: 1,
                delay: start,
                duration: 2000,
                ease: 'Sine.easeInOut'
            })
            start += 2500;
        });

        setTimeout(()=>{
            [this.text, this.text2].forEach(text => {
                text.setColor("white")
            });
        }, 500)

        setTimeout(()=>{
            [this.text, this.text2].forEach(text => {
                this.tweens.add({ 
                    targets: text,
                    alpha: 0,
                    duration: 2000,
                })
            });

            setTimeout(startAnimation, 3000);
        }, 6000)

        const startAnimation = () => {
            this.w = this.cameras.main.width;
            this.h = this.cameras.main.height;
        
            var bg = this.add.group({ key: 'star', frameQuantity: 300 });
        
            this.sky = new Phaser.Display.Color(120, 120, 255);
            this.space = new Phaser.Display.Color(0, 0, 0);
        
            this.player = this.add.sprite(this.w / 2, 0, 'dude');
        
            this.cameras.main.startFollow(this.player);
        
            var rect = new Phaser.Geom.Rectangle(0, -2 * this.h, this.w, 2 * this.h);
        
            Phaser.Actions.RandomRectangle(bg.getChildren(), rect);
        }
    }
    
    update () 
    {
        setTimeout(()=>{
            this.player.y = (Math.cos(this.time.now / 1000) * (this.h - 10)) - this.h;

            var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -this.h * 2, this.player.y);
        
            this.cameras.main.setBackgroundColor(hexColor);
        }, 10000)
    }
}

export default Scene_2;