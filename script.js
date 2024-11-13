const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const newGameBtn = document.getElementById('new-btn');
const resetBtn = document.querySelector('.resetbtn');
const modeBtn = document.getElementById('mode-btn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);
let isTwoPlayerMode = false;  // Mode flag

// Winning combinations based on index positions
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Add event listeners
boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
modeBtn.addEventListener('click', toggleMode);

// Function to handle box clicks
function handleBoxClick(index) {
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  if (checkWin()) {
    gameOver(`${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell)) {
    gameOver('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    if (!isTwoPlayerMode && currentPlayer === 'O') {
      aiMove();
    }
  }
}

// Function for AI move in Player vs AI mode
function aiMove() {
  let emptyIndices = boardState.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  
  boardState[randomIndex] = currentPlayer;
  boxes[randomIndex].textContent = currentPlayer;

  if (checkWin()) {
    gameOver(`${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell)) {
    gameOver('It\'s a draw!');
  } else {
    currentPlayer = 'X';
  }
}

// Check for win conditions
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

// Display game over message
function gameOver(message) {
  gameActive = false;
  msg.textContent = message;
  msgContainer.classList.remove('hide');
}

// Reset game to initial state
function resetGame() {
  gameActive = true;
  boardState.fill(null);
  boxes.forEach(box => box.textContent = '');
  currentPlayer = 'X';
  msgContainer.classList.add('hide');
}

// Toggle between Player vs Player and Player vs AI modes
function toggleMode() {
  isTwoPlayerMode = !isTwoPlayerMode;
  resetGame();
  modeBtn.textContent = isTwoPlayerMode ? 'Switch to Player vs AI' : 'Switch to Player vs Player';
}
