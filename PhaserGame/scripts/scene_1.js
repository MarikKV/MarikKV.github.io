class Scene_1 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_1" } )
    }
    
    preload(){
        this.load.audio('intro', ['assets/sound/predator-intro.mp3'])
    }

    create() {
        const textStyle = {
            font: "400% Tahoma",
            color: "transparent"
        }
        
        this.text  = this.add.text(200, 200, "У древні часи не було бутилок.", textStyle)
        this.text2 = this.add.text(200, 250, "І було тяжко рускім.", textStyle)
        this.text3 = this.add.text(200, 300, "Та недовго лаптєногі страждали.", textStyle)
        this.text4 = this.add.text(200, 350, "Людство винайшло бутилку.", textStyle)
        this.text5 = this.add.text(200, 400, "І возрадувались рускі!", textStyle)

        let start = 500;
        [this.text, this.text2, this.text3, this.text4, this.text5].forEach(text => {
            this.tweens.add({targets: text,alpha: 0, delay: 0, duration: 100});
            this.tweens.add({ 
                targets: text,
                alpha: 1,
                delay: start,
                duration: 3000,
                ease: 'Sine.easeInOut'
            })
            start+=3500;
        });

        setTimeout(()=>{
            [this.text, this.text2, this.text3, this.text4, this.text5].forEach(text => {
                text.setColor("white")
            });
        }, 500)
        
        const introMusic = this.sound.add("intro");
        introMusic.once("complete", () => this.scene.start("Scene_2"));  
        introMusic.play();

        this.input.on('pointerdown', ()=>{
            introMusic.stop();
            this.scene.start("Scene_2")
        }, this)
    }
}

export default Scene_1;