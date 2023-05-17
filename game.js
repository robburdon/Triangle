const gameBoard = document.querySelector('#game-board');
const infoText = document.querySelector('#info-text'); // New text element
const size = 10; // Size of the game board (10x10)
let playerPosition = { x: 0, y: 0 }; // Starting position

// Create game board
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        // Calculate Manhattan distance to center
        const distance = Math.abs(i - (size / 2)) + Math.abs(j - (size / 2));

        // Scale it so that the maximum distance corresponds to maximum darkness
        const shade = Math.floor((distance / (size - 1)) * 255);
        const color = `rgb(${shade}, ${shade}, ${shade})`;

        // Set the cell's background color
        cell.style.backgroundColor = color;

        if (i === playerPosition.y && j === playerPosition.x) {
            cell.classList.add('player');
            cell.textContent = '▲';
        }

        gameBoard.appendChild(cell);
    }
}

// Get the control buttons
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');

// Add event listeners for the control buttons
upButton.addEventListener('click', () => movePlayer('ArrowUp'));
downButton.addEventListener('click', () => movePlayer('ArrowDown'));
leftButton.addEventListener('click', () => movePlayer('ArrowLeft'));
rightButton.addEventListener('click', () => movePlayer('ArrowRight'));

const centerLink = document.querySelector('#center-link');

function movePlayer(direction) {
    let { x, y } = playerPosition;

    // Remove player from current position
    const currentCell = document.querySelector(`.cell:nth-child(${y * size + x + 1})`);
    currentCell.classList.remove('player');
    currentCell.textContent = '';

    // Update player position based on direction
    if (direction === 'ArrowUp') y = Math.max(y - 1, 0);
    else if (direction === 'ArrowDown') y = Math.min(y + 1, size - 1);
    else if (direction === 'ArrowLeft') x = Math.max(x - 1, 0);
    else if (direction === 'ArrowRight') x = Math.min(x + 1, size - 1);

    playerPosition = { x, y };

    // Calculate Manhattan distance to center for the new position
    const distance = Math.abs(y - (size / 2)) + Math.abs(x - (size / 2));

    // Update info text based on the distance
    if (distance <= 2) {
        infoText.textContent = 'The pyramid is free.';
        centerLink.style.display = 'block';  // Show the link
    } else if (distance <= 4) {
        infoText.textContent = 'You are getting closer to the center.';
        centerLink.style.display = 'none';  // Hide the link
    } else {
        infoText.textContent = 'You are far from the center.';
        centerLink.style.display = 'none';  // Hide the link
    }

    // Add player to new position
    const newCell = document.querySelector(`.cell:nth-child(${y * size + x + 1})`);
    newCell.classList.add('player');
    newCell.textContent = '▲';
}

// Replace previous event listener with this one
document.addEventListener('keydown', function(event) {
    movePlayer(event.key);
})

const egyptianCharacters = ['Where lies the strangling fruit','the Pyramid stands, a testament to times relentless sand','the Pyramid that came from the hand of the sinner','the Pyramid shall bring forth the seeds of the dead','to share with the worms that gather in the darkness','and surround the pyramid','while from the dimlit interior halls of other pyramids','forms that never were and never could be','writhe for the impatience of the few','in the black water with the sun shining at midnight','those fruit shall come ripe in the chambers of the sacred form','the revelation of the fatal softness in the earth','In the embrace of the Pyramid, the self is lost and found,'𓂁', '𓂂','𓅶'];  // Add more characters as needed

function createRisingCharacter() {
    // Create a new div for the character
    const charDiv = document.createElement('div');
    charDiv.classList.add('rising');

    // Choose a random Egyptian character
    const charIndex = Math.floor(Math.random() * egyptianCharacters.length);
    charDiv.textContent = egyptianCharacters[charIndex];

    // Set the starting position to a random point at the bottom of the screen
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;

    charDiv.style.left = `${startX}px`;
    charDiv.style.top = `${startY}px`;

    // Add the new character to the body
    document.body.appendChild(charDiv);

    // Remove the character from the DOM after the animation completes
    setTimeout(() => {
        document.body.removeChild(charDiv);
    }, 5000);  // Match this to the length of the animation in the CSS
}

// Call createRisingCharacter periodically to keep generating new characters
setInterval(createRisingCharacter, 500);  // Adjust this as needed

