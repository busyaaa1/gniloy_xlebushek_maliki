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
    { name: 'card15', img: 'images/card15.png' },
    // Добавьте остальные пары карт
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

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

document.addEventListener('DOMContentLoaded', createBoard);

// музыка
document.addEventListener('click', function startMusicOnce() {
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().catch(e => {
            console.log('Автовоспроизведение заблокировано:', e);
        });
    }
    document.removeEventListener('click', startMusicOnce);
});
