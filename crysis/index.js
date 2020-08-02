import { armor } from './suit_consts'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;


const centerX = canvas.width/2;
const centerY = canvas.height/2;

const player = {
    width: 30,
    hand: 10,
    positionX: 0,
    positionY: 0
}
function drawPlayer(x, y) {
    if(canvas.getContext){
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(centerX + x, centerY + y, player.width, 0, Math.PI * 2, true); // body
        ctx.arc(centerX - player.width - player.hand + x, centerY + y, player.hand, 0, Math.PI * 2, true); // left hand
        ctx.arc(centerX + player.width + player.hand + x, centerY + y, player.hand, 0, Math.PI * 2, true); // left hand
        ctx.stroke();
    }
}


function darawArmor(){
    let armor2 = armor.map(item => item = {x: canvas.width - item.x - 10, y: item.y});
    let armor3 = armor.map(item => item = {x: item.x, y: canvas.height - item.y - 20});
    let armor4 = armor.map(item => item = {x: canvas.width - item.x - 10, y: canvas.height - item.y - 20});

    const allArmor = [...armor, ...armor2, ...armor3, ...armor4]
    allArmor.map( item => {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(item.x, item.y);
        ctx.lineTo(item.x+10, item.y);
        ctx.lineTo(item.x+15, item.y+10);
        ctx.lineTo(item.x+10, item.y+20);
        ctx.lineTo(item.x, item.y+20);
        ctx.lineTo(item.x-5, item.y+10);
        ctx.closePath();
        ctx.stroke();
    })
}

darawArmor()


drawPlayer(player.positionX, player.positionY)

const up = document.getElementById('up');

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
     //ctx.clearRect(player.positionX, player.positionY, player.width + player.hand, player.width + player.hand)
}

function playerMove(x, y){
    player.positionX -= x;
    player.positionY -= y;
    clear();
    drawPlayer(player.positionX, player.positionY)
}

const keysHold = {
    w: false, //w
    d: false, //d
    a: false, //a
    s: false, //s
}

const drawNewPlayerPosition = (x,spead) => {
    if(x.w){ playerMove(0, spead) }
    if(x.d){ playerMove(-spead, 0) }
    if(x.a){ playerMove(spead, 0) }
    if(x.s){ playerMove(0, -spead) }
}

const updateKeys1 = event => {
    let key = event.keyCode;
    if(key === 87){ keysHold.w = true ;}
    if(key === 68){ keysHold.d = true ;}
    if(key === 65){ keysHold.a = true ;}
    if(key === 83){ keysHold.s = true ;}
}

const updateKeys2 = event => {
    let key = event.keyCode;
    if(key === 87){ keysHold.w = false ;}
    if(key === 68){ keysHold.d = false ;}
    if(key === 65){ keysHold.a = false ;}
    if(key === 83){ keysHold.s = false ;}
}

const lol = setInterval( () => drawNewPlayerPosition(keysHold,5),40)
document.onkeydown = updateKeys1;
document.onkeyup = updateKeys2;

