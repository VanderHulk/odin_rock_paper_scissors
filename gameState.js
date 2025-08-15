function initialState(ms) {  

    setTimeout(() => {
        timerDisplay.innerText = 5;
        playerPoints.innerText = 0;
        computerPoints.innerText = 0;
        
        btn__play.innerText = "Let's Play!";
        event__banner.innerText = "";
        pauseCover.style.display = 'none'; //pause__curtain hidden

        selectedHand = "";
        disablePlayerHands(true); //true means player's hands are disabled

        computerHand.classList.remove('wiggling');
        computerHand.innerText = "✊🏼";
        computerHandLabel.innerText = "";

        if (btnPlayPause.innerText === "Let's Play!") {
            historyLog.innerHTML = defaultHistoryLog;
        }

        startTimer(true, timerDisplay.innerText); //for timer; timer is paused
        clearInterval(toggleInterval); //stop the timer interval   
    }, ms); 
}

function startGameState() {   

    setTimeout(() => {
        btn__play.innerText = 'Pause';            
    }, 500);     

    setTimeout(() => {       
        startTimer(false, timerDisplay.innerText);
    }, 1000);   

    pauseCover.style.display = 'none';
}

function pauseGameState() {    

    startTimer(true, timerDisplay.innerText);
    clearInterval(toggleInterval);
    pauseCover.style.display = 'flex'    
}

function everyRoundState() {    

    clearInterval(toggleInterval);
    startTimer(true, timerDisplay.innerText)

    disablePlayerHands(true);
    btnPlayPause.disabled = true;
}

function roundIsOverState() {    

    setTimeout(() => {
        handsContainerAll.forEach(button => {
            button.style.borderColor = 'transparent';
            button.classList.remove('wiggling');           
        });
        disablePlayerHands(false);
        selectedHand = "";

        computerHand.classList.remove('wiggling');
        computerHand.innerText = "✊🏼";
        computerHandLabel.innerText = "";

        btnPlayPause.disabled = false;   

        timerDisplay.innerText = 5;    
        event__banner.innerText = "";
        clearInterval(toggleInterval);
        
        startTimer(false, timerDisplay.innerText)
    }, 2000);       
}