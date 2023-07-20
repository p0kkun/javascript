const board = document.querySelector('.row');
const message = document.querySelector("#msg");
const randomButton = document.querySelector("#random");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const numberElement = document.querySelector("#number");
const historyElement = document.querySelector("#history");
const cells = [];
// ビンゴマス目の生成
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  const number = document.createElement('p');
  number.classList.add('number');
  const mark = document.createElement('p');
  mark.classList.add('mark');
  cell.appendChild(number);
  cell.appendChild(mark);
  cells.push({ number, mark });
  board.appendChild(cell);
}
// スタートボタンのクリックイベントハンドラ
randomButton.addEventListener("click", () => {
  // 1〜75のランダムな数字を配置
  const usedNumbers = new Set();
  cells.forEach((cell) => {
    if (i % 5 === 0) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 15) + 1;
    } while (usedNumbers.has(randomNumber));
    usedNumbers.add(randomNumber);
    cell.number.textContent = randomNumber;
    cell.mark.textContent = "";
  }
});
});
// リセットボタンのクリックイベントハンドラ
resetButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.number.textContent = "";
    cell.mark.textContent = "";
  });
});
// ビンゴのチェック関数
const checkBingo = () => {
  // ビンゴの判定ロジックはここに追加
};
//変更する