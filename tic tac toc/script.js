const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('game-status');
const restartBtn = document.getElementById('restart-btn');
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
];

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'draw';
}

function handleCellClick(e) {
    const idx = +e.target.dataset.cell;
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.disabled = true;
    const result = checkWinner();
    if (result === 'X' || result === 'O') {
        statusDiv.textContent = `Player ${result} wins!`;
        statusDiv.className = 'alert alert-success text-center mb-4';
        gameActive = false;
    } else if (result === 'draw') {
        statusDiv.textContent = "It's a draw!";
        statusDiv.className = 'alert alert-warning text-center mb-4';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
        statusDiv.className = 'alert alert-info text-center mb-4';
    }
}

function restartGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = "Player X's turn";
    statusDiv.className = 'alert alert-info text-center mb-4';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame); 