const board = document.querySelector('.row');
const message = document.querySelector("#msg");
const randomButton = document.querySelector("#random");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const numberElement = document.querySelector("#number");
const historyElement = document.querySelector("#history");
const cells = []
historyElement.textContent = "既出: "
startButton.disabled = true
// ビンゴマス目の生成
const usedNumbers = new Set()
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  const number = document.createElement('p');
  number.classList.add('number');
  const mark = document.createElement('p');
  mark.classList.add('mark');
  cell.appendChild(number);
  cell.appendChild(mark);
  cells.push({ number, mark })
  board.appendChild(cell)
  if (i === 12) {
    number.id = "free"
  }
}
// 左の縦一列に1〜15までのランダムな数字を入れる
randomButton.addEventListener("click", () => {
  randomButton.disabled = true; // ボタンを無効化
  startButton.disabled = false
  for (let i = 0; i < 25; i++) {
    const { number } = cells[i]
    const { mark } = cells[i]
    if (i % 5 === 0) {
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * 15 + 1);
      } while (usedNumbers.has(randomNumber))
      usedNumbers.add(randomNumber)
      number.textContent = randomNumber
    } else if (i % 5 === 1) {
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * 15 + 16);
      } while (usedNumbers.has(randomNumber))
      usedNumbers.add(randomNumber)
      number.textContent = randomNumber;
    } else if (i % 5 === 2 && i !== 12) {//センター部分を外している
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * 15 + 31);
      } while (usedNumbers.has(randomNumber))
      usedNumbers.add(randomNumber)
      number.textContent = randomNumber;
    } else if (i % 5 === 3) {
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * 15 + 46);
      } while (usedNumbers.has(randomNumber))
      usedNumbers.add(randomNumber)
      number.textContent = randomNumber;
    } else if (i % 5 === 4) {
      let randomNumber
      do {
        randomNumber = Math.floor(Math.random() * 15 + 61);
      } while (usedNumbers.has(randomNumber))
      usedNumbers.add(randomNumber)
      number.textContent = randomNumber;
    } else if (i === 12) {
      number.textContent = "free"
      mark.textContent = "〇"
    }
  }
})
const historyNumbers = new Set()
startButton.addEventListener("click", () => {
  //const 
  let randomNumber
  do {
    randomNumber = Math.floor(Math.random() * 75 + 1);
  } while (historyNumbers.has(randomNumber))
  historyNumbers.add(randomNumber)
  numberElement.textContent = randomNumber
  // ヒストリーに数字を追加
  const historyItem = document.createElement('span');
  historyItem.textContent = `${randomNumber}, `;
  historyElement.appendChild(historyItem);
  // 該当するセルに○を表示
  cells.forEach((cell) => {
    if (parseInt(cell.number.textContent) === randomNumber) {
      cell.mark.textContent = "〇";
      cell.mark.classList.add('mark');
    }
  });
  checkBingo(); // ビンゴのチェック
});
const usedNumber = (number) => {
  return cells.some((cell) => parseInt(cell.number.textContent === number))
}
resetButton.addEventListener("click", () => {
  randomButton.disabled = false; // ランダムボタンを有効化
  // セルの中身とマークをリセット
  cells.forEach((cell) => {
    cell.number.textContent = "";
    cell.mark.textContent = "";
  });
  numberElement.textContent = "★☆★☆"; // h2要素を初期値にリセット
  historyElement.textContent = "既出: "; // ヒストリーをリセット
  message.textContent = ""; // ビンゴメッセージをリセット
  numberElement.classList.remove('bingo')
  startButton.disabled = true
})
console.log(cells)
// const checkBingo = () => {
//   const patterns = [
//     [0, 1, 2, 3, 4], // 横のライン
//     [5, 6, 7, 8, 9],
//     [10, 11, 12, 13, 14],
//     [15, 16, 17, 18, 19],
//     [20, 21, 22, 23, 24],
//     [0, 5, 10, 15, 20], // 縦のライン
//     [1, 6, 11, 16, 21],
//     [2, 7, 12, 17, 22],
//     [3, 8, 13, 18, 23],
//     [4, 9, 14, 19, 24],
//     [0, 6, 12, 18, 24], // 斜めのライン
//     [4, 8, 12, 16, 20]
//   ];
//   for (const pattern of patterns) {
//     const cellsInPattern = pattern.map((index) => cells[index]);
//     const markCells = cellsInPattern.filter((cell) => cell.mark.textContent === '〇');
//     if (markCells.length === 5) {
//       displayBingo();
//       startButton.disabled = true; // スタートボタンを無効化
//       return;
//     }
//   }
// };

const checkBingo = () => {
  const patterns = [
    // 横のライン
    Array.from({ length: 5 }, (_, index) => index),
    Array.from({ length: 5 }, (_, index) => index + 5),
    Array.from({ length: 5 }, (_, index) => index + 10),
    Array.from({ length: 5 }, (_, index) => index + 15),
    Array.from({ length: 5 }, (_, index) => index + 20),
    // 縦のライン
    Array.from({ length: 5 }, (_, index) => index * 5),
    Array.from({ length: 5 }, (_, index) => index * 5 + 1),
    Array.from({ length: 5 }, (_, index) => index * 5 + 2),
    Array.from({ length: 5 }, (_, index) => index * 5 + 3),
    Array.from({ length: 5 }, (_, index) => index * 5 + 4),
    // 斜めのライン
    Array.from({ length: 5 }, (_, index) => index * 6),
    Array.from({ length: 5 }, (_, index) => 4 + index * 4)
  ];
  for (const pattern of patterns) {
    const markCells = pattern.map((index) => cells[index].mark.textContent);
    if (markCells.every((mark) => mark === '〇')) {
      displayBingo();
      startButton.disabled = true; // スタートボタンを無効化
      return;
    } else if (markCells.filter((mark) => mark === '〇').length === 4) {
      message.textContent = "リーチ！！！"
    }
  }
};

const displayBingo = () => {
  message.textContent = "ビンゴ！";
  numberElement.textContent = "ビンゴ！"
  numberElement.classList.add('bingo')
}