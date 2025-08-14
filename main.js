const original = document.getElementById('original');

const startGame = document.getElementById('btn__play'); //starting the game
const timerDisplay = document.getElementById('timer'); //displaying the time
const eventShow = document.getElementById('event__banner');
const pauseCover = document.getElementById('restart__banner');
const restartYes = document.getElementById('restart__yes');
const restartNo = document.getElementById('restart__no');

const handsContainerAll = document.querySelectorAll('.hands .btn__hand');
const handsContainerButtons = document.querySelector('.hands'); // checking when player chose a hand
const playerPoints = document.querySelector('.player__points');

const computerHand = document.getElementById('computer__hand');
const computerHandLabel = document.querySelector('.computer__handLabel');
const computerPoints = document.querySelector('.computer__points');

const historyLog = document.getElementById('log__display');

let toggleInterval;
let selectedHand = "";
let isPaused = true;

timerDisplay.innerText = 5;

togglePlayerHands(true); // (isDisabled = true)

original.addEventListener('click', () => {
    playNodeVersion();
});

startGame.addEventListener('click', function() {
    if (btn__play.innerText !== 'Pause') {
        setTimeout(() => {
            btn__play.innerText = 'Pause';
            historyLog.innerHTML = '';
        }, 500);     
        setTimeout(() => {
            isPaused = false;
            startTimer(timerDisplay.innerText);
        }, 1000);   
    } else {
        clearInterval(toggleInterval);
        isPaused = true;
        pauseCover.style.display = 'flex';
        console.log(isPaused);
    }
});

restartYes.addEventListener('click', () => {
    pauseCover.style.display = 'none';
    resetAll();
});

restartNo.addEventListener('click', () => {
    isPaused = false;
    startTimer(timerDisplay.innerText);
    pauseCover.style.display = 'none';
});

handsContainerButtons.addEventListener('click', function(event) {
    const target = event.target;

    if (btn__play.innerText === 'Pause') {
        if (timerDisplay.innerText > 0) {     
            if(target.classList.contains('btn__hand')) {
                selectedHand = target.id;
                checkScore();
            }
        }
    }
});

function startTimer(startSeconds) {

    if (!isPaused) {
        togglePlayerHands(false); // (isDisabled = false)

        toggleInterval = setInterval(() => {
            startSeconds--;
            timerDisplay.innerText = startSeconds;
            if (startSeconds === 0) {
                clearInterval(toggleInterval);
                checkScore();
            }
        }, 1000);
    }
}

function resetAll() {

    isPaused = true;
    clearInterval(toggleInterval);
    timerDisplay.innerText = 5;
    playerPoints.innerText = 0;
    computerPoints.innerText = 0;
    btn__play.innerText = "Let's Play!";    
    eventShow.innerText = '';
    historyLog.innerHTML = '';
    togglePlayerHands(true);    
    resetStyles();
}

function resetStyles() {

    handsContainerAll.forEach(button => {
        button.style.borderColor = 'transparent';
        button.classList.remove('wiggling');
    });

    computerHand.classList.remove('wiggling');
    computerHand.innerText = '✊🏼';
    computerHandLabel.innerText = '';
    selectedHand = "";

    setTimeout(() => {
        startGame.disabled = false;
    }, 2000);
}

function togglePlayerHands(isDisabled) {

    handsContainerAll.forEach(button => {
        button.disabled = isDisabled;
    });
}

function checkScore() {

    const winsAgainst = {
        ROCK: "SCISSORS",
        PAPER: "ROCK",
        SCISSORS: "PAPER",
    };

    getComputerHand();

    if (Number(playerPoints.innerText) < 5 && Number(computerPoints.innerText) < 5) {
        if(selectedHand) {
            isPaused = true;

            if (selectedHand.toLowerCase() === computerHandLabel.innerText.toLowerCase()) {
                showBanner('Draw!');
            } else {
                if (winsAgainst[selectedHand.toUpperCase()] === computerHandLabel.innerText.toUpperCase()) {
                    playerPoints.innerText = (Number(playerPoints.innerText) + 1).toString();

                    if (Number(playerPoints.innerText) < 5) {

                        showBanner('Player scores!');
                    }
                } else {
                    computerPoints.innerText = (Number(computerPoints.innerText) + 1).toString();

                    if (Number(computerPoints.innerText) < 5) {

                        showBanner('Computer scores!');
                    }
                }
            }
        } else {

            if (Number(timerDisplay.innerText) === 0) {
                computerPoints.innerText = (Number(computerPoints.innerText) + 1).toString();

                if (Number(computerPoints.innerText) < 5) {
                    showBanner('Computer Scores!');
                }
            }
        }
    }

    clearInterval(toggleInterval);

    setTimeout (() => {
        resetStyles();
        timerDisplay.innerText = 5;
    }, 1000);

    checkWinner();
    recordHistory();
}

function checkWinner() {

    startGame.disabled = true;
    clearInterval(toggleInterval);

    if (Number(playerPoints.innerText) === 5 || Number(computerPoints.innerText) === 5) {
        if (Number(playerPoints.innerText) === 5) {
            showBanner('Player WINS!');
        } else {
            showBanner('Computer WINS!');
        }

        setTimeout(() => {           
            resetAll();
        }, 3000);  

    } else {
        setTimeout(() => {
            isPaused = false;
            startTimer(timerDisplay.innerText);
        }, 2000);
    }
    console.log('checkWinner()' + isPaused);
}

function getComputerHand() {
    
    const hands = {
        Rock: '✊🏼',
        Paper: '🖐🏼',
        Scissors: '✌🏼',
    }

    let handKey = Object.keys(hands);
    let randomNumber = Math.floor(Math.random() * 3);
    let selectedKey = handKey[randomNumber];

    computerHand.innerText = hands[selectedKey];
    computerHandLabel.innerText = selectedKey;
    computerHand.classList.add('wiggling');
}

function showBanner(message) {
    eventShow.innerText = message;
    eventShow.style.display = 'flex';

    setTimeout(() => {        
        startGame.disabled = true;
        togglePlayerHands(true); // (isDisabled = true)       
        eventShow.classList.add('show');
    }, 10);

    setTimeout(() => {
        eventShow.classList.remove('show');
        setTimeout(() => {
            eventShow.style.display = 'none';
        }, 500);
    }, 1000);
}

function recordHistory() {
    const item = document.createElement('li');
    const p = document.createElement('p');

    p.innerHTML = (eventShow.innerText).toUpperCase() + '<br>Player: ' + selectedHand + ' | Computer: ' + (computerHandLabel.innerText).toLowerCase();

    if (eventShow.innerText.includes('WINS')) {
        p.innerHTML = p.innerHTML + '<br>Player [' + playerPoints.innerText + '] | Computer [' + computerPoints.innerText + ']';
    }

    item.appendChild(p);
    historyLog.appendChild(item);
}