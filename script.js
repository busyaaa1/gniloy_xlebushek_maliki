const cardsArray = [
  { name: 'card1', img: 'images/card1.png' },
  { name: 'card2', img: 'images/card2.png' },
  { name: 'card3', img: 'images/card3.webp' },
  { name: 'card4', img: 'images/card4.webp' },
  { name: 'card5', img: 'images/card5.webp' },
  { name: 'card6', img: 'images/card6.webp' },
  { name: 'card7', img: 'images/card7.png' },
  { name: 'card8', img: 'images/card8.png' },
  { name: 'card9', img: 'images/card9.png' },
  { name: 'card10', img: 'images/card10.webp' },
  { name: 'card11', img: 'images/card11.png' },
  { name: 'card12', img: 'images/card12.png' },
  { name: 'card13', img: 'images/card13.webp' },
  { name: 'card14', img: 'images/card14.webp' },
  { name: 'card15', img: 'images/card15.png' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timerStarted = false;
let timeLeft = 120;
let timerInterval;
let matchedPairs = 0;
const totalPairs = cardsArray.length;

function createBoard() {
  const gameBoard = document.querySelector('.game-board');
  const shuffledCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

  shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card.name;

    const cardImage = document.createElement('img');
    cardImage.src = card.img;
    cardElement.appendChild(cardImage);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  const clickSound = document.getElementById('click-sound');
  if (clickSound) clickSound.play();

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedPairs++;
  if (matchedPairs === totalPairs) {
    clearInterval(timerInterval);
    showWinner();
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
  const timerEl = document.getElementById('timer');
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showGameOver();
    }
  }, 1000);
}

function showGameOver() {
  const gameOverEl = document.getElementById('game-over');
  gameOverEl.classList.remove('hidden');
  gameOverEl.innerHTML = `
    <img src="game_over.webp" alt="Game Over" class="shaking">
    <button class="refresh-button" onclick="location.reload()">Refresh</button>
  `;
  const loseSound = document.getElementById('lose-sound');
  if (loseSound) loseSound.play();
}

function showWinner() {
  const winnerEl = document.getElementById('winner');
  winnerEl.classList.remove('hidden');
  winnerEl.innerHTML = `
    <img src="winner.webp" alt="Winner" class="shaking">
    <button class="refresh-button" onclick="location.reload()">Refresh</button>
  `;
  const winSound = document.getElementById('win-sound');
  if (winSound) winSound.play();
}

// Музыка
function startMusicOnce() {
  const music = document.getElementById('bg-music');
  if (music) {
    music.play().catch(e => console.log('Автовоспроизведение заблокировано:', e));
  }
  document.removeEventListener('click', startMusicOnce);
}

document.addEventListener('DOMContentLoaded', createBoard);
document.addEventListener('click', startMusicOnce);

// Скрытие инструкции
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup-instruction');
  const button = document.getElementById('start-game');
  const timerEl = document.getElementById('timer');

  button.addEventListener('click', () => {
    popup.style.display = 'none';
    timerEl.classList.remove('hidden');
  });
});
