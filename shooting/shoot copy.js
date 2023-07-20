//キャンパスの設定
const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 600

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 60,
  height: 50,
  color: "blue",
  speed: 20,
  isShooting: false,

}
const enemies = []
const enemySpeed = 2


const bullets = []
const bulletSpeed = 20

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

function keyDownHandler(event) {
  if (player.x < 0) {
    player.x = 0
  } else if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width
  }
  if (player.y < 0) {
    player.y = 0
  } else if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height
  }
  if (event.keyCode === 37) {
    player.x -= player.speed
  } else if (event.keyCode === 39) {
    player.x += player.speed
  } else if (event.keyCode === 38) {
    player.y -= player.speed
  } else if (event.keyCode === 40) {
    player.y += player.speed
  } else if (event.keyCode === 32) {
    if (!player.isShooting) {
      shootBullet()
    }
  }
}


function keyUpHandler(event) {
  if (event.keyCode === 32) {
    player.isShooting = false
  }
}

function shootBullet() {
  const bullet = {
    x: player.x - 2, //+ player.width / 2,
    y: player.y - 40,
    width: 8,
    height: 10,
    color: "red",
    speed: bulletSpeed,
  }
  bullets.push(bullet)
  player.isShooting = true
}
function createEnemy() {
  const enemy = {
    x: Math.random() * (canvas.width - 30) + 15,
    y: 0,
    width: 30,
    height: 30,
    color: "green",
    speed: enemySpeed,
  }
  enemies.push(enemy)
}
//
function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPlayer() {
  drawCircle(player.x, player.y, player.width / 2, player.color);
}

// function drawPlayer() {
//   ctx.beginPath();
//   ctx.rect(player.x, player.y, player.width, player.height);
//   ctx.fillStyle = player.color;
//   ctx.fill();
//   ctx.closePath();
// }
function drawEnemies() {
  enemies.forEach((enemy, index) => {
    ctx.beginPath();
    ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = enemy.color;
    ctx.fill();
    ctx.closePath();
    // 敵を移動させる
    enemy.y += enemy.speed;
    // プレイヤーと敵の衝突を検出
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // 衝突した場合はゲームオーバー
      resetGame();
    }
    // 弾丸と敵の衝突を検出
    bullets.forEach((bullet, bulletIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        // 衝突した場合は敵を削除する
        enemies.splice(index, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
    // 敵がキャンバス外に出たら削除する
    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }
  });
}
function drawBullets() {
  bullets.forEach((bullet, index) => {
    ctx.beginPath();
    ctx.rect(bullet.x, bullet.y, bullet.width, bullet.height);
    ctx.fillStyle = bullet.color;
    ctx.fill();
    ctx.closePath();
    // 弾丸を移動させる
    bullet.y -= bullet.speed;
    // 弾丸がキャンバス外に出たら削除する
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
  });
}
function resetGame() {
  alert("Game Over");
  enemies.length = 0;
  bullets.length = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height - 50;
}
function draw() {
  // キャンバスをクリアする
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  // drawEnemies();
  drawBullets();
  requestAnimationFrame(draw);
}
setInterval(createEnemy, 1000);
draw()