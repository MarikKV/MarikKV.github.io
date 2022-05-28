import Scene_0 from "./scene_0.js";
import Scene_1 from "./scene_1.js";
import Scene_2 from "./scene_2.js";
import Scene_3 from "./scene_3.js";

var config = {
    type: Phaser.AUTO,
    width: 800, //window.innerHeight
    height: 600, //window.innerWidth
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ Scene_0, Scene_1, Scene_2, Scene_3]
};
var game = new Phaser.Game(config);
