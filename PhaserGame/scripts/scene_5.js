class Scene_5 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_5" } )
    }
    
    preload(){
        this.objects = {};
        this.load.image('okupant_1', 'assets/okupant_with_bosch-right.png');
        this.load.image('okupant_2', 'assets/okupant_with_bosch-left.png');
        this.load.image('okupant_3', 'assets/okupant_with_unitaz-left.png');
        this.load.image('okupant_4', 'assets/okupant_with_unitaz-right.png');

        this.load.audio('orks-win', ['assets/sound/orks-win.mp3']);

    }

    create() {
        const textStyle = {
            font: "34px Tahoma",
            color: "white"
        }
        this.w = this.cameras.main.width;
        this.h = this.cameras.main.height;

        this.UkraineText  = this.add.text(0, 0, "Україна", textStyle);
        this.MaskvaText  = this.add.text(this.w - 90, 0, "мацква", textStyle);
        this.okupant_1 = this.add.sprite(-100, 100, 'okupant_1').setScale(1.5);
        this.okupant_2 = this.add.sprite(-650, 240, 'okupant_4').setScale(1.5);
        this.okupant_3 = this.add.sprite(-450, 340, 'okupant_1').setScale(1.5);
        this.okupant_4 = this.add.sprite(-850, 440, 'okupant_4').setScale(1.5);


        this.okupant_11 = this.add.sprite(-1100, 100, 'okupant_1').setScale(1.5);
        this.okupant_22 = this.add.sprite(-1650, 240, 'okupant_4').setScale(1.5);
        this.okupant_33 = this.add.sprite(-1450, 340, 'okupant_1').setScale(1.5);
        this.okupant_44 = this.add.sprite(-1850, 440, 'okupant_4').setScale(1.5);

        [
            this.okupant_1, 
            this.okupant_2, 
            this.okupant_3, 
            this.okupant_11,
            this.okupant_22,
            this.okupant_33,
            this.okupant_44
        ].forEach(ocupant=>{
            this.tweens.add({
                targets: ocupant,
                y: ocupant.y,
                x: 3000,
                duration: 20000,
                ease: 'Linear'
            });
        })

        this.sky = new Phaser.Display.Color(3, 186, 252);
        this.cameras.main.setBackgroundColor(this.sky);
        this.orksSound = this.sound.add("orks-win").setVolume(0.4);
        this.orksSound.play();
    }
    
    update () 
    {   
        
    }
}

export default Scene_5;