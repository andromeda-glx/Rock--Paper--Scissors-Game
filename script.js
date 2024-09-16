/* header */

let winsCounter = document.querySelector('.js-wins');
let tiesCounter = document.querySelector('.js-ties');
let lossesCounter = document.querySelector('.js-losses');

let scoreBoard = JSON.parse(localStorage.getItem('rockScore')) || {
    wins: 0,
    ties: 0,
    losses: 0
}

updateScore();


document.querySelector('.js-reset-score').addEventListener('click', () => showMessage());

function resetScore() {
    scoreBoard.wins = 0,
        scoreBoard.ties = 0,
        scoreBoard.losses = 0;
    updateScore();
}

let resetMessageElement = document.querySelector('.js-reset-message');

function showMessage() {
    // if (resetMessageElement.classList.contains('hide')){
    //     resetMessageElement.classList.remove('hide');
    // }
    resetMessageElement.setAttribute('style', 'padding: 20px;');
    resetMessageElement.innerHTML = `
            <p>Are you sure you want to reset the score?</p>
            <button class="js-yes-btn">Yes</button>
            <button class="js-no-btn">No</button> 
        `;

    document.querySelector('.js-no-btn').addEventListener('click', () =>{
        hideMessage();
    });
    
    document.querySelector('.js-yes-btn').addEventListener('click', () => {
        resetScore();
        hideMessage();
    });
}

function hideMessage() {
    // if (!resetMessageElement.classList.contains('hide')){
    //     resetMessageElement.classList.add('hide');
    // }

    resetMessageElement.innerHTML = '';
    resetMessageElement.removeAttribute('style', 'padding: 20px;');
}


function updateScore() {
    winsCounter.innerHTML = scoreBoard.wins;
    tiesCounter.innerHTML = scoreBoard.ties;
    lossesCounter.innerHTML = scoreBoard.losses;

    localStorage.setItem('rockScore', JSON.stringify(scoreBoard));
}


document.querySelector('.js-mode').addEventListener('click', () => switchMode());

function switchMode() {

    document.querySelectorAll('img').forEach(element => {
        if (element.classList.contains('new-mode')) {
            element.classList.remove('new-mode')
            element.classList.add('old-mode');
        }
        else {
            element.classList.remove('old-mode')
            element.classList.add('new-mode');
        }
    });

    const mode = document.querySelector('.js-mode');
    if (mode.innerText === 'Classic Mode') {
        mode.innerHTML = 'New Mode';
    }
    else {
        mode.innerHTML = 'Classic Mode';
    }
}


let isAutoPlay = false;
let intervalID;

document.querySelector('.js-auto-btn').addEventListener('click', () => autoPlay());

function autoPlay() {
    const autoButtonElement = document.querySelector('.js-auto-btn');

    if (!isAutoPlay) {
        intervalID = setInterval(() => {
            startGame(null);
        }, 1000);

        isAutoPlay = true;
        autoButtonElement.innerHTML = 'Manual Play';
    }
    else {
        clearInterval(intervalID);
        isAutoPlay = false;
        autoButtonElement.innerHTML = 'Auto Play';
    }
}

/* body */

document.querySelector('.js-rock-item').addEventListener('click', () => startGame('✊'));
document.querySelector('.js-paper-item').addEventListener('click', () => startGame('✋'));
document.querySelector('.js-scissors-item').addEventListener('click', () => startGame('✌️'));

document.body.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'r':
            startGame('✊');
            break;
        case 'p':
            startGame('✋');
            break;
        case 's':
            startGame('✌️');
            break;
        case 'a':
            autoPlay();
            break;
        case 'Backspace':
            showMessage();
            break;
        default:
            break;
    }
});

function startGame(selection) {
    let playerSelection = selection || generateCPUSelection();
    let cpuSelection = generateCPUSelection();
    displayResult(compare(cpuSelection, playerSelection), cpuSelection, playerSelection);
}

function compare(cpuSelection, playerSelection) {

    if (cpuSelection === playerSelection) {
        scoreBoard.ties++;
        return 0;
    }
    else if (cpuSelection === '✊' && playerSelection === '✋' || cpuSelection === '✋' && playerSelection === '✌️' || cpuSelection === '✌️' && playerSelection === '✊') {
        scoreBoard.wins++;
        return 1;
    }
    else {
        scoreBoard.losses++;
        return -1;
    }
}

function generateCPUSelection() {
    let cpuSelection = Math.floor((Math.random() * 3) + 1);

    switch (cpuSelection) {
        case 1:
            return '✊';
        case 2:
            return '✋';
        case 3:
            return '✌️'
    }
}

function displayResult(num, cpuSelection, playerSelection) {
    let result = document.querySelector('.js-winner');
    let display = document.querySelector('.js-display');

    display.innerHTML = `You: ${playerSelection} vs ${cpuSelection} :CPU`;

    if (num > 0) {
        result.innerHTML = 'Player win!';
        result.style.color = 'lightgreen';
    }
    else if (num === 0) {
        result.innerHTML = 'Draw!';
        result.style.color = 'lightgoldenrodyellow';
    }
    else {
        result.innerHTML = 'Player Lose!';
        result.style.color = 'lightcoral';
    }

    updateScore();
}