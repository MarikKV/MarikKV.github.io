import Scene_1 from "./scene_1.js";
import Scene_2 from "./scene_2.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ Scene_1, Scene_2 ]
};

var game = new Phaser.Game(config);
