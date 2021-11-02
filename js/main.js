// min(minを含む)からmax(maxを含まない)までの間でランダムな値を返す関数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// ランダムな2桁の00からFFまでの値を返す関数
function getRandomTwoDigits() {
  return ('00' + getRandomInt(0, 256).toString(16)).slice(-2);
}

// ランダムなカラーコードを返す関数
function getRandomColor() {
  return "#" + getRandomTwoDigits() + getRandomTwoDigits() + getRandomTwoDigits();
}

var canvas = document.getElementById("myCanvas"); //htmlをjsで扱う
var ctx = canvas.getContext("2d"); //2dとして土地を扱う
var checkBoxInf = document.getElementById("customSwitch1"); // トグルスイッチをjsで扱えるようにする
var dvd_list = []; // 各DVDの連想配列を入れておくためのリスト
var infinity = false; // 無限増殖モードのステータス用変数
ctx.font = "48px Oswald"; // canvasのフォント設定
ctx.textAlign = "center" // canvasのフォント表示位置設定
var text = "DVD"; // canvasに表示するテキストを設定
var text_info = ctx.measureText(text); // canvasに表示するテキストに関する情報を取得

// 連想配列を追加する関数
function add_dvd() {
  dvd_list.push({
    x: getRandomInt(text_info.actualBoundingBoxRight, canvas.width - text_info.actualBoundingBoxLeft), // x軸方向にランダムな場所を設定
    y: getRandomInt(text_info.actualBoundingBoxAscent, canvas.height - text_info.actualBoundingBoxDescent), // y軸方向にランダムな場所を設定
    dx: 2 * getRandomInt(0, 2) - 1, // x軸方向の移動距離に-1または1を設定
    dy: 2 * getRandomInt(0, 2) - 1, // y軸方向の移動距離に-1または1を設定
    color: getRandomColor() // ランダムな色を設定
  });
}

// トグルスイッチの値を無限増殖モードのステータス用変数に設定する関数
function inf() {
  infinity = checkBoxInf.checked;
}

// リセットする関数
function res() {
  dvd_list.splice(1); // DVDの個数を1つに戻す
  infinity = false; // 無限増殖モードをオフ
  checkBoxInf.checked = infinity; // トグルスイッチをオフ
}

add_dvd(); // DVDを1つ追加

// 全DVDを描画する関数
function drawDvd() {
  ctx.beginPath(); // 描画を開始
  dvd_list.forEach(function (element) { // すべてのオブジェクトに適用
    ctx.fillStyle = element.color; // 色を設定
    ctx.fillText(text, element.x, element.y); // 描画
  });
  ctx.fill(); // 塗る
  ctx.closePath(); // 描画を終了
}

// 無限増殖モードの場合DVDを追加する関数
function judgeInf() {
  if (infinity === true) {
    add_dvd();
  }
}

// メイン関数
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をリセット
  drawDvd();
  dvd_list.forEach(function (element) {
    if (element.x + element.dx > canvas.width - text_info.actualBoundingBoxLeft || element.x + element.dx < text_info.actualBoundingBoxRight) { // もしx軸上の範囲外に行ったら
      element.dx = -element.dx; // dxの正負を逆転
      element.color = getRandomColor(); // 色を変更
      judgeInf();
    }
    if (element.y + element.dy > canvas.height - text_info.actualBoundingBoxDescent || element.y + element.dy < text_info.actualBoundingBoxAscent) { // もしy軸上の範囲外に行ったら
      element.dy = -element.dy; // dyの正負を逆転
      element.color = getRandomColor(); // 色を変更
      judgeInf();
    }
    element.x += element.dx; // 移動
    element.y += element.dy; // 移動
    document.getElementById("edit_area").innerHTML = '<h3><span class="badge badge-pill badge-light">' + dvd_list.length + '</span></h3>'; // DVDの個数を表示
  });
}

setInterval(draw, 10); // 10ミリ秒ごとにdraw関数を呼び出す
