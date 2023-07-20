const board = document.querySelector('.row')
const message = document.querySelector("#msg")
let player = '〇'
const cells = []
const text = "OVER!!"

// 盤面のマス目を生成
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    board.appendChild(cell);
    console.log(cell)
}

cells.forEach((cell) => cell.addEventListener('click', (event) => {
    const cell = event.target;
    if (cell.innerHTML !== '' || message.textContent.includes('勝利')) {
        return
    }
    cell.innerHTML = player
    player = player === '〇' ? '×' : '〇'
    checkWin()
}));

const checkWin = () => {
    const pattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for (const [a, b, c] of pattern) {
        if (
            cells[a].innerHTML !== '' &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML
        ) {
            message.textContent = text + cells[a].innerHTML + 'の勝利'
            console.log('終わり')
            break;
        }
    }
}

const reset = () => {
    cells.forEach((cell) => cell.innerHTML = '')
    message.innerHTML = ''
    player = '〇'
}

const button = document.querySelector('#reset')
button.addEventListener('click', reset)

// const vs = (event) => {
//     const cell = event.target;
//     if (cell.innerHTML !== '' || message.textContent.includes('勝利')) {
//         return
//     }
//     cell.innerHTML = player
//     player = player === '〇' ? '×' : '〇'

//     checkWin()
// }