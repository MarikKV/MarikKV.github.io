import Scene_0 from "./scene_0.js";
import Scene_1 from "./scene_1.js";
import Scene_2 from "./scene_2.js";
import Scene_3 from "./scene_3.js";
import Scene_4 from "./scene_4.js";
import Scene_5 from "./scene_5.js";

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth <= 1200 ? window.innerWidth : 1200, //window.innerWidth
    height: window.innerHeight, //window.innerHeight
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ Scene_0, Scene_1, Scene_2, Scene_3, Scene_4, Scene_5]
};

console.log(Phaser)
var game = new Phaser.Game(config);
