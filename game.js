// game.js
const board = document.getElementById('board');
const size = 15;
let currentPlayer = 'black';
// 初始化棋盘数组
const boardArray = Array(size).fill(null).map(() => Array(size).fill(null));
// 初始化棋盘
for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
}
// 检查胜负
function checkWinner(boardArray, player) {
    const directions = [
        [1, 0], // 水平
        [0, 1], // 垂直
        [1, 1], // 左上到右下
        [1, -1] // 右上到左下
    ];
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (boardArray[y][x] === player) {
                for (let [dx, dy] of directions) {
                    let count = 1;
                    for (let step = 1; step < 5; step++) {
                        const nx = x + dx * step;
                        const ny = y + dy * step;
                        
                        if (
                            nx >= 0 && nx < size &&
                            ny >= 0 && ny < size &&
                            boardArray[ny][nx] === player
                        ) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    if (count === 5) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
// 监听点击事件
board.addEventListener('click', (event) => {
    const cell = event.target;
    if (cell.classList.contains('cell') && !cell.innerHTML) {
        const index = +cell.dataset.index;
        const x = index % size;
        const y = Math.floor(index / size);
        
        const disc = document.createElement('div');
        disc.style.width = '30px';
        disc.style.height = '30px';
        disc.style.borderRadius = '50%';
        disc.style.backgroundColor = currentPlayer;
        cell.appendChild(disc);
        
        // 更新棋盘状态
        boardArray[y][x] = currentPlayer;
        
        // 检查胜负
        if (checkWinner(boardArray, currentPlayer)) {
            alert(`${currentPlayer} wins!`);
        } else {
            // 切换玩家
            currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        }
    }
});