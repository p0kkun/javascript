const board = document.querySelector('.board');
const cells = [];
// 盤面のマス目を生成
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cells.push(cell);
  board.appendChild(cell);
}
let currentPlayer = '○';
let gameOver = false;
let winner = null;
// マスがクリックされたときの処理
function handleCellClick(event) {
  const cell = event.target;
  // マスが既に埋まっている場合やゲームが終了している場合は処理しない
  // if (cell.innerHTML !== '' || gameOver) {
  //   return;
  // }
  // マスに現在のプレイヤーのマークを表示する
  cell.innerHTML = currentPlayer;
  // 勝利判定を行う
  if (checkWin()) {
    gameOver = true;
    winner = currentPlayer;
    showMessage(`プレイヤー ${winner} の勝利！`);
    return;
  }
  // 引き分け判定を行う
  if (checkDraw()) {
    gameOver = true;
    showMessage('引き分け');
    return;
  }
  // プレイヤーの交代
  currentPlayer = currentPlayer === '○' ? '×' : '○';
}
// 勝利判定を行う
function checkWin() {
  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横のパターン
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦のパターン
    [0, 4, 8], [2, 4, 6] // 斜めのパターン
  ];
  for (let i = 0; i < patterns.length; i++) {
    const [a, b, c] = patterns[i];
    if (
      cells[a].innerHTML !== '' &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      return true;
    }
  }
  return false;
}
// 引き分け判定を行う
function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === '') {
      return false;
    }
  }
  return true;
}
// メッセージを表示する
function showMessage(text) {
  const message = document.querySelector('.message');
  message.innerHTML = text;
}
// ゲームをリセットする
function resetGame() {
  currentPlayer = '○';
  gameOver = false;
  winner = null;
  // 盤面のマスを初期化する
  cells.forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('win');
  });
  showMessage('');
  // クリックイベントを追加
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
}
// 初期状態でクリックイベントを追加
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});