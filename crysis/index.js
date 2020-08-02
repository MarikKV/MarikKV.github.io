const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;


const centerX = canvas.width/2;
const centerY = canvas.height/2;

const armor = [
    //col 1
    {x:0,y:0},
    {x:0,y:20},
    {x:0,y:40},
    {x:0,y:60},
    //col2
    {x:15,y:-10},
    {x:15,y:10},
    {x:15,y:30},
    {x:15,y:50},
    //col3
    {x:30,y:0},
    {x:30,y:20},
    {x:30,y:40},
    //col4
    {x:45,y:-10},
    {x:45,y:10},
    {x:45,y:30},
    //col5
    {x:60,y:0},
    {x:60,y:20},
    //col6
    {x:75,y:-10},
    {x:75,y:10},
    //col7
    {x:90,y:0},
    //col8
    {x:105,y:-10},
]
let armor2 = armor.map(item => item = {x: canvas.width - item.x - 10, y: item.y});
let armor3 = armor.map(item => item = {x: item.x, y: canvas.height - item.y - 20});
let armor4 = armor.map(item => item = {x: canvas.width - item.x - 10, y: canvas.height - item.y - 20});

const allArmor = [...armor, ...armor2, ...armor3, ...armor4];
const audioArmor = new Audio('./sounds/armor.m4a');
const audioCloak = new Audio('./sounds/cloak.m4a');


const player = {
    width: 30,
    hand: 10,
    positionX: 0,
    positionY: 0,
    armor: false,
    cloak: false
}

function drawPlayer(x, y) {
    if(canvas.getContext){
        if(!player.cloak) {ctx.fillStyle = 'black';} else{ ctx.strokeStyle = 'blue'; }
        ctx.beginPath();
        ctx.arc(centerX + x, centerY + y, player.width, 0, Math.PI * 2, true); // body
        ctx.moveTo(centerX - player.width + x,  centerY + y);
        ctx.arc(centerX - player.width - player.hand + x, centerY + y, player.hand, 0, Math.PI * 2, true); // left hand
        ctx.moveTo(centerX + player.width + player.hand*2 + x,  centerY + y);
        ctx.arc(centerX + player.width + player.hand + x, centerY + y, player.hand, 0, Math.PI * 2, true); // right hand
        if(!player.cloak) {ctx.fill()} else { ctx.stroke(); }
    }
}

function darawArmor(){ 
    allArmor.map( item => {
        ctx.strokeStyle = 'gray';
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


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function playerMove(x, y){
    player.positionX -= x;
    player.positionY -= y;
    drawPlayer(player.positionX, player.positionY)
}

const keysHold = {
    w: false, //w
    d: false, //d
    a: false, //a
    s: false, //s
}

const savePlayerPosition = (x, speed) => {
    if(x.w){ playerMove(0, speed) }
    if(x.d){ playerMove(-speed, 0) }
    if(x.a){ playerMove(speed, 0) }
    if(x.s){ playerMove(0, -speed) }
}

const updateKeys1 = event => {
    let key = event.keyCode;
    //console.log(key)
    if(key === 87){ keysHold.w = true ;}
    if(key === 68){ keysHold.d = true ;}
    if(key === 65){ keysHold.a = true ;}
    if(key === 83){ keysHold.s = true ;}

    //armor
    if(key === 81){ 
        player.armor = !player.armor;
        player.cloak = false;
        if(player.armor){audioArmor.play();}
    }
    //cloak
    if(key === 69){ 
        player.cloak = !player.cloak;
        player.armor = false;
        if(player.cloak){audioCloak.play();}
    }
}

const updateKeys2 = event => {
    let key = event.keyCode;
    if(key === 87){ keysHold.w = false ;}
    if(key === 68){ keysHold.d = false ;}
    if(key === 65){ keysHold.a = false ;}
    if(key === 83){ keysHold.s = false ;}
}

document.onkeydown = updateKeys1;
document.onkeyup = updateKeys2;

const run = setInterval( () => {
    clear();
    savePlayerPosition(keysHold, 3);
    drawPlayer(player.positionX, player.positionY)
    drawBullets();
    if(player.armor){ darawArmor()}
}, 30)


//fire
const bullets = [];

const fire = () => {
    let bullet = { 
        x: centerX + player.positionX,
        y: centerY + player.positionY
    }
    bullets.push(bullet);
}

function drawBullets(){
    bullets.map((item, idx) => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(item.x - 1, item.y);
        ctx.lineTo(item.x + 1, item.y);
        ctx.lineTo(item.x + 1, item.y+20);
        ctx.lineTo(item.x - 1, item.y+20);
        ctx.fill();
        bullets[idx].y -= 20;
        if(bullets[idx].y <= -30){ bullets.shift()}
    })
}

document.onmousedown = fire;