
// ゲームの状態を表す変数
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;
let currentPlayer = BLACK;
let board = [];
// ボードの初期化
function initializeBoard() {
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i][j] = EMPTY;
        }
    }
    // 初期配置
    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;
}
// ボードを描画
function drawBoard() {
    const boardContainer = document.querySelector('.board');
    boardContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[i][j] === BLACK) {
                cell.classList.add('black');
            } else if (board[i][j] === WHITE) {
                cell.classList.add('white');
            }
            cell.addEventListener('click', ()=> {
                if (isValidMove(i, j)) {
                    makeMove(i, j);
                    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
                    drawBoard();
                }
            });
            boardContainer.appendChild(cell);
        }
    }
}