const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Resetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "./images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(char => `<li class="letter${char === ' ' ? ' space' : ''}"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { words, hint } = wordList[Math.floor(Math.random() * wordList.length)];

    // Update the word display element
    const wordDisplay = document.querySelector(".word-display");
    wordDisplay.innerHTML = words.map(word => 
        `<div class="word-segment">${word.split('').map(char => `<span class="letter">${char === ' ' ? '&nbsp;' : char}</span>`).join('')}</div>`
    ).join(" ");

    document.querySelector(".hint-text b").innerHTML = hint; // Update the hint

    resetGame(); // Resetting the game UI
};

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You figured it out! The answer is:` : 'The correct answer was:';
    gameModal.querySelector("img").src = `./images/${isVictory ? 'rainbow' : 'lose'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

// const initGame = (letter) => {
//     // Checking if clickedLetter is exist on the currentWord
//     if (currentWord.toLowerCase().includes(letter)) {
//         // Showing all correct letters on the word display
//         [...currentWord.toLowerCase()].forEach((char, index) => {
//             if (char === letter) {
//                 correctLetters.push(char);
//                 wordDisplay.querySelectorAll("li")[index].innerText = currentWord[index];
//                 wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
//             }
//         });
//     } else {
//         // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
//         wrongGuessCount++;
//         hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
//     }
//     guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

//     // Calling gameOver function if any of these condition meets
//     if (wrongGuessCount === maxGuesses) return gameOver(false);
//     if (correctLetters.length === currentWord.replace(/ /g, '').length) return gameOver(true);
// }

const initGame = (letter) => {
    // Checking if clickedLetter exists in the currentWord
    if (currentWord.toLowerCase().includes(letter)) {
        // Showing all correct letters on the word display
        [...currentWord.toLowerCase()].forEach((char, index) => {
            if (char === letter) {
                correctLetters.push(char);
                wordDisplay.querySelectorAll("li")[index].innerText = currentWord[index]; // Reveal the letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist, update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    }
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these conditions meet
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.replace(/ /g, '').length) return gameOver(true);
}

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const button = document.querySelector(`.keyboard button[data-key="${key}"]`);
    if (button && !button.disabled) {
        button.disabled = true;
        initGame(key);
    }
});

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
