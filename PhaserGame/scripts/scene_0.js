class Scene_0 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_0" } )
    }
    
    preload(){

    }

    create() {
        this.text = this.add.text(230, 400, "Клікніть щоб розпочати", { font: "34px Impact" });

        this.input.on('pointerdown', function(e){
            this.scene.start("Scene_1")
        }, this)
    }
}

export default Scene_0;