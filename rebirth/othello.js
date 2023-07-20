// const board = document.querySelector('.row')
// const cells = []
// for (let i = 0; i < 64; i++) {
//     const cell = document.createElement('div');
//     cell.classList.add('cell');
//     const color = document.createElement('p');
//     color.classList.add('color');
//     const mark = document.createElement('p');
//     mark.classList.add('mark');
//     cell.appendChild(color);
//     cell.appendChild(mark);
//     cells.push({ color, mark })
//     board.appendChild(cell)
//   }
//   let currentPlayer = 'WHITE'; // 初期プレイヤーは白
// board.addEventListener('click', (event) => {
//   const clickedCell = event.target;
//   // クリックされた要素が石を置くためのセルであることを確認
//   if (clickedCell.classList.contains('cell')) {
//     const { color, mark } = cells[Array.from(board.children).indexOf(clickedCell)];
//     // 既に石が置かれている場合は何もしない
//     if (color.textContent !== '' || mark.textContent !== '') {
//       return;
//     }
//     // 現在のプレイヤーの石をセルに表示
//     if (currentPlayer === 'WHITE') {
//       color.textContent = '●'; // 白石
//       color.classList.add('color-white')
//     } else {
//       color.textContent = '●'; // 黒石
//       color.classList.add('color-BLACK')
//     }
//     // TODO: 石の配置に応じてオセロのルールに基づいた処理を追加する
//     // プレイヤーを交代
//     currentPlayer = currentPlayer === 'WHITE' ? 'BLACK' : 'WHITE';
//   }
// });
const EMPTY = '';
const WHITE = 'WHITE';
const BLACK = 'BLACK';
const board = document.querySelector('.row');
// プレイヤーを表示するためのコードを追加
const playerTextElement = document.getElementById('playerText')
const nowElement = document.getElementById('now');
const cells = [];
//白石の個数
let whiteCount = 2;
// 黒石の個数
let blackCount = 2;
// 盤面を初期化する関数
const makeBoard = () => {
  for (let i = 0; i < 64; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    const color = document.createElement('p');
    color.classList.add('color');
    const mark = document.createElement('p');
    mark.classList.add('mark');
    cell.appendChild(color);
    cell.appendChild(mark);
    cells.push({ color, mark });
    board.appendChild(cell);
  }
  // 初期配置を生成
  cells[27].color.textContent = '●'; // 白石
  cells[27].color.classList.add('color-white');
  cells[28].color.textContent = '●'; // 黒石
  cells[28].color.classList.add('color-black');
  cells[35].color.textContent = '●'; // 黒石
  cells[35].color.classList.add('color-black');
  cells[36].color.textContent = '●'; // 白石
  cells[36].color.classList.add('color-white');
};
// 有効な配置場所かどうかを判定する関数
const move = (row, col) => {
  const { color } = cells[row * 8 + col];
  if (color.textContent !== '') {
    return false; // 既に石が置かれている場所には置けない状態にするため
  }
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  let valid = false;//置けない状態にするため
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    let foundOpponent = false;
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const { color } = cells[r * 8 + c];
      if (color.textContent === '') {
        break; // 空きマスなのでループを終了
      }
      if (color.classList.contains('color-white') && currentPlayer === 'WHITE') {
        if (foundOpponent) {
          valid = true;
          break;
        } else {
          break; // 自分の石がないのでループを終了
        }
      } else if (color.classList.contains('color-black') && currentPlayer === 'BLACK') {
        if (foundOpponent) {
          valid = true;
          break;
        } else {
          break; // 自分の石がないのでループを終了
        }
      } else {
        foundOpponent = true; // 相手の石が見つかった
      }
      r += dr;
      c += dc;
    }
    if (valid) {
      break;
    }
  }
  return valid;
};
// 白石と黒石の個数を更新する関数
const updateStoneCount = () => {
  let white = 0;
  let black = 0;
  for (const { color } of cells) {
    if (color.classList.contains('color-white')) {
      white++;
    } else if (color.classList.contains('color-black')) {
      black++;
    }
  }
  whiteCount = white;
  blackCount = black;
  updatePlayerText();
};
// 石を裏返すロジックを追加
const flipStones = (row, col) => {
  const { color } = cells[row * 8 + col];
  const currentColor = currentPlayer === 'WHITE' ? 'color-white' : 'color-black';
  const oppositeColor = currentPlayer === 'WHITE' ? 'color-black' : 'color-white';
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    let foundOpponent = false;
    let flippedStones = [];
    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const { color } = cells[r * 8 + c];
      if (color.textContent === '') {
        break; // 空きマスなのでループを終了
      }
      if (color.classList.contains(currentColor)) {
        if (foundOpponent) {
          // 追加：石を裏返すアニメーション
          setTimeout(() => {
            flippedStones.forEach((stone) => {
              stone.classList.replace(oppositeColor, currentColor);
            });
            updateStoneCount(); // 石の個数を更新
          }, 200); // 200ミリ秒後に色を切り替える（アニメーションの時間と合わせる）
        };
        break;
      } else if (color.classList.contains(oppositeColor)) {
        foundOpponent = true;
        flippedStones.push(color);
      }
      r += dr;
      c += dc;
    }
  }
};
let currentPlayer = 'WHITE'; // 初期プレイヤーは白

board.addEventListener('click', (event) => {
  const clickedCell = event.target;
  if (clickedCell.classList.contains('cell')) {
    const index = Array.from(board.children).indexOf(clickedCell);
    const row = Math.floor(index / 8);
    const col = index % 8;
    if (move(row, col)) {
      const { color } = cells[index];
      if (currentPlayer === 'WHITE') {
        color.textContent = '●'; // 白石
        color.classList.add('color-white');
      } else {
        color.textContent = '●'; // 黒石
        color.classList.add('color-black');
      }
      flipStones(row, col); // 石を裏返すロジックを呼び出す
      currentPlayer = currentPlayer === 'WHITE' ? 'BLACK' : 'WHITE';
    }
  }
  updatePlayerText()
});

// 初期配置を反映
makeBoard()
 // プレイヤーの表示を更新するための関数
 const updatePlayerAndStoneCount = () => {
  playerTextElement.textContent = `現在のプレイヤー: ${currentPlayer === 'WHITE' ? '白' : '黒'}`;
  nowElement.textContent = `白: ${whiteCount}個 | 黒: ${blackCount}個`;
};
// プレイヤーの表示を初期化
updatePlayerAndStoneCount();