class Scene_1 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_1" } )
    }
    
    preload(){
        this.load.audio('intro', ['assets/sound/predator-intro.mp3'])
    }

    create() {
        const textStyle = {
            font: "24px Tahoma"
        }
        
        this.text = this.add.text(240, 200, "У древні часи не було бутилок.", textStyle)
        this.text2 = this.add.text(240, 230, "І було тяжко рускім.", textStyle)
        this.text3 = this.add.text(240, 260, "Та недовго лаптєногі страждали.", textStyle)
        this.text4 = this.add.text(240, 290, "Людство винайшло бутилку.", textStyle)
        this.text5 = this.add.text(240, 320, "І возрадувались рускі!", textStyle)

        let start = 500;
        [this.text, this.text2, this.text3, this.text4, this.text5].forEach(text => {
            this.tweens.add({targets: text,alpha: 0, delay: 0, duration: 100});
            this.tweens.add({ 
                targets: text,
                alpha: 1,
                delay: start,
                duration: 3000,
                ease: 'fadeIn'
            })
            start+=3500;
        });
        this.soundFX = this.sound.add("intro", { loop: "true" });
        this.soundFX.play();
    }
}

export default Scene_1;