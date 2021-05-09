function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    return "#" + getRandomInt(0, 256).toString(16) + getRandomInt(0, 256).toString(16) + getRandomInt(0, 256).toString(16);
}

var canvas = document.getElementById("myCanvas"); //htmlをjsで扱う
var ctx = canvas.getContext("2d"); //2dとして土地を扱う

class Dvds {
    constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
}

dvd_list = []

var infinity = false;

function add_dvd() {
    dvd_list.push(new Dvds(
        getRandomInt(60, canvas.width - 60),
        getRandomInt(60, canvas.height - 60),
        2 * getRandomInt(0, 2) - 1,
        2 * getRandomInt(0, 2) - 1,
        getRandomColor()
        ));
}

function inf() {
    infinity = true;
}

function res() {
    dvd_list.splice(1);
    infinity = false;
}

add_dvd();

// たまをうごかす
function drawBall() {
    ctx.beginPath();
    ctx.font = "48px bold sans-serif";
    ctx.textAlign = "center"
    dvd_list.forEach(function(element){
        ctx.fillText("DVD", element.x, element.y);
        ctx.fillStyle = element.color;
    });
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    text_info = ctx.measureText("DVD");
    dvd_list.forEach(function(element){
        if (element.x + element.dx > canvas.width - text_info.actualBoundingBoxLeft|| element.x + element.dx < text_info.actualBoundingBoxRight)  { // もしx軸上の範囲外に行ったら
            element.dx = -element.dx; // dxの正負を逆転
            element.color = getRandomColor();
            if (infinity === true) {
                add_dvd();
            }
        }
        if (element.y + element.dy > canvas.height - text_info.actualBoundingBoxDescent || element.y + element.dy < text_info.actualBoundingBoxAscent) { // もしy軸上の範囲外に行ったら
            element.dy = -element.dy; // dyの正負を逆転
            element.color = getRandomColor();
            if (infinity === true) {
                add_dvd();
            }
        }
        element.x += element.dx;
        element.y += element.dy;
    });
}
setInterval(draw, 10);