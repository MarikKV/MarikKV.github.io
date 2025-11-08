class Scene_0 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_0" } )
    }
    
    preload(){

    }

    create() {
        // Add text
        this.text = this.add.text(0, 0, "Клікніть щоб розпочати", { font: "600% Impact", fill: "#fff" });

        // Center it on screen
        this.text.setOrigin(0.5); // centers the text relative to its position
        this.text.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Handle click
        this.input.on('pointerdown', function(e){
            this.scene.start("Scene_1")
        }, this)
    }
}

export default Scene_0;