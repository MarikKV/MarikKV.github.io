class Scene_2 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_2" } )
    }
    
    preload(){

    }

    create() {
        const textStyle = {
            font: "400% Tahoma",
            color: "transparent"
        }

        this.text  = this.add.text(200, 200, "Гостомельський аеропорт.", textStyle);
        this.text2  = this.add.text(200, 250, "24.02.2022", textStyle);
        this.skip = false;

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

            setTimeout(startScene3, 3000);
        }, 6000)

        const startScene3 = () => {
            if(!this.skip){
                this.scene.start("Scene_3")
            }
        }

        this.input.on('pointerdown', () => {
            this.skip = true;
            this.scene.start("Scene_3")
        }, this)
    }
}

export default Scene_2;