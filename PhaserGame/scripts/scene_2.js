class Scene_2 extends Phaser.Scene {
    constructor(){
        super( { key: "Scene_2" } )
    }
    
    preload(){

    }

    create() {
        this.text = this.add.text(50, 50, "У древні часи не було бутилок. \n І було тяжко рускім.", { font: "20px Impact" })
    }
}

export default Scene_2;