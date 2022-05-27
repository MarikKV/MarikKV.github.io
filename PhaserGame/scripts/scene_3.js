class Scene_3 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_3" } )
    }
    
    preload(){
        this.load.audio('intro', ['assets/sound/predator-intro.mp3']);
        this.load.image('star', 'assets/star2.png');
        this.load.image('dude', 'assets/phaser-dude.png');
        this.load.image('plane', 'assets/plane.png');
    }

    create() {
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;
    
        var bg = this.add.group({ key: 'star', frameQuantity: 300 });
    
        this.sky = new Phaser.Display.Color(120, 120, 255);
        this.space = new Phaser.Display.Color(0, 0, 0);
    
        this.player = this.add.sprite(this.w / 2, -1100, 'dude');
        this.plane = this.add.sprite(-150, -1300, 'plane');
    
        this.cameras.main.startFollow(this.player);
    
        var rect = new Phaser.Geom.Rectangle(0, -2 * this.h, this.w, 2 * this.h);
    
        Phaser.Actions.RandomRectangle(bg.getChildren(), rect);
    }
    
    update () 
    {   
        if(this.plane.x < this.w + 200 ){
            this.plane.x = this.plane.x + 3;
        }
        if(this.player.y <= 0 && this.plane.x > this.w / 2){
            this.player.y = this.player.y + 2;

            var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.sky, this.space, -this.h * 2, this.player.y);
    
            this.cameras.main.setBackgroundColor(hexColor);
        }
    }
}

export default Scene_3;