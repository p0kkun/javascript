const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;
let currentPlayer = BLACK;
let board = [];
const player=document.querySelector('#msg')
const makeBoard = () => {
    for (let i = 0; i < 8; i++) {
        board[i] = Array.from({ length: 8 }, () => EMPTY);
    }
    // 初期配置を生成
    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;
};
// 盤面とクリックしたときに石が置かれる処理
const drawBoard = () => {
    const container = document.querySelector('.board');
    container.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] === BLACK) {
                cell.classList.add('black');
            } else if (board[i][j] === WHITE) {
                cell.classList.add('white');
            }
            cell.addEventListener('click', () => {
                if (isValidMove(i, j)) {
                    makeMove(i, j);
                    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
                    drawBoard();
                    player.textContent=currentPlayer
                }
            });
            container.appendChild(cell);
        }
    }
};
// 指定されたセルが有効な移動かどうかをチェック
const isValidMove = (row, col) => {
    if (board[row][col] !== EMPTY) {
        return false; // 既に石が置かれている場合は無効な移動
    }
    const directions = [
        { x: -1, y: -1 }, // 左上
        { x: -1, y: 0 }, // 上
        { x: -1, y: 1 }, // 右上
        { x: 0, y: -1 }, // 左
        { x: 0, y: 1 }, // 右
        { x: 1, y: -1 }, // 左下
        { x: 1, y: 0 }, // 下
        { x: 1, y: 1 }, // 右下
    ];
    let validMove = false;
    for (let dir of directions) {
        let newRow = row + dir.x;
        let newCol = col + dir.y;
        if (
            newRow >= 0 &&
            newRow < 8 &&
            newCol >= 0 &&
            newCol < 8 &&
            board[newRow][newCol] === getOpponent()
        ) {
            // 隣接するセルが相手の石の場合、その方向に進み、自分の石があるかどうかを確認する
            newRow += dir.x;
            newCol += dir.y;
            while (
                newRow >= 0 &&
                newRow < 8 &&
                newCol >= 0 &&
                newCol < 8
            ) {
                if (board[newRow][newCol] === currentPlayer) {
                    validMove = true; // 途中に自分の石がある場合は有効な移動
                    break;
                } else if (board[newRow][newCol] === EMPTY) {
                    break; // 空きマスの場合は無効な移動
                }
                newRow += dir.x;
                newCol += dir.y;
            }
        }
    }
    return validMove;
};
// セルをクリックしたときの処理
const makeMove = (row, col) => {
    if (isValidMove(row, col)) {
        board[row][col] = currentPlayer;
        const directions = [
            { x: -1, y: -1 }, // 左上
            { x: -1, y: 0 }, // 上
            { x: -1, y: 1 }, // 右上
            { x: 0, y: -1 }, // 左
            { x: 0, y: 1 }, // 右
            { x: 1, y: -1 }, // 左下
            { x: 1, y: 0 }, // 下
            { x: 1, y: 1 }, // 右下
        ];
        for (let dir of directions) {
            let newRow = row + dir.x;
            let newCol = col + dir.y;
            let tilesToFlip = [];
            while (
                newRow >= 0 &&
                newRow < 8 &&
                newCol >= 0 &&
                newCol < 8 &&
                board[newRow][newCol] === getOpponent()
            ) {
                tilesToFlip.push({ row: newRow, col: newCol });
                newRow += dir.x;
                newCol += dir.y;
            }
            if (
                newRow >= 0 &&
                newRow < 8 &&
                newCol >= 0 &&
                newCol < 8 &&
                board[newRow][newCol] === currentPlayer
            ) {
                for (let tile of tilesToFlip) {
                    board[tile.row][tile.col] = currentPlayer;
                }
            }
        }
    }
};
// 相手のプレイヤーを取得
const getOpponent = () => {
    return currentPlayer === BLACK ? WHITE : BLACK;
};
const start = () => {
    makeBoard();
    drawBoard();
};
start();