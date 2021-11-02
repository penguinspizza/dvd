function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
  return "#" + ('00' + getRandomInt(0, 256).toString(16)).slice(-2) + ('00' + getRandomInt(0, 256).toString(16)).slice(-2) + ('00' + getRandomInt(0, 256).toString(16)).slice(-2);
}

var canvas = document.getElementById("myCanvas"); //htmlをjsで扱う
var ctx = canvas.getContext("2d"); //2dとして土地を扱う

var checkBoxInf = document.getElementById("customSwitch1");

class Dvds {
  constructor(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }
}

var dvd_list = [];

var infinity = false;

var text = "DVD";
ctx.font = "48px Oswald";
ctx.textAlign = "center"
var text_info = ctx.measureText(text);


function add_dvd() {
  dvd_list.push(new Dvds(
    getRandomInt(text_info.actualBoundingBoxRight, canvas.width - text_info.actualBoundingBoxLeft),
    getRandomInt(text_info.actualBoundingBoxAscent, canvas.height - text_info.actualBoundingBoxDescent),
    2 * getRandomInt(0, 2) - 1,
    2 * getRandomInt(0, 2) - 1,
    getRandomColor()
  ));
}

function inf() {
  infinity = checkBoxInf.checked;
}

function res() {
  dvd_list.splice(1);
  infinity = false;
  checkBoxInf.checked = false;
}

add_dvd();

// たまをうごかす
function drawBall() {
  ctx.beginPath();
  dvd_list.forEach(function (element) {
    ctx.fillStyle = element.color;
    ctx.fillText(text, element.x, element.y);
  });
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  dvd_list.forEach(function (element) {
    if (element.x + element.dx > canvas.width - text_info.actualBoundingBoxLeft || element.x + element.dx < text_info.actualBoundingBoxRight) { // もしx軸上の範囲外に行ったら
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
    document.getElementById("edit_area").innerHTML = '<h3><span class="badge badge-pill badge-light">' + dvd_list.length + '</span></h3>';
  });
}
setInterval(draw, 10);
