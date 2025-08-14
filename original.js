const hands = ['ROCK', 'PAPER', 'SCISSORS'];
let playerScore = 0;
let computerScore = 0;

function playNodeVersion() {

    let choice='';
    let playerHand='';
    let computerHand='';

    do {         
        if (playerScore === 3 || computerScore === 3) {
            break;
        }

        if (choice === null) {
            break;
        } 

        do {
            
            choice = prompt("Let's play ROCK, PAPER, SCISSORS!\nFirst to 3 points WINS!\n[1] ROCK\n[2] PAPER\n[3] SCISSORS\n\nPlayer: " + playerScore + '  |  Computer: ' + computerScore);

            playerHand = hands[choice - 1];
            computerHand = nodeGetComputerHand();       

            if (choice === null) {
                break;
            } else {
                if (!['1','2','3'].includes(choice)) { 
                    alert('INVALID INPUT!\nValid choices:\n[1] ROCK\n[2] PAPER\n[3] SCISSORS');
                } else {
                    if (choice !== undefined) {                
                        nodeStartGame(playerHand, computerHand);
                    }
                }    
            }
        } while (choice !== null && choice !== undefined && !['1', '2', '3'].includes(choice));
        
    } while ((computerScore < 3 || playerScore < 3) && choice !== null);
}

function nodeStartGame(playerHand, computerHand) {
    let message = '';

    const winsAgainst = {
        ROCK: "SCISSORS",
        PAPER: "ROCK",
        SCISSORS: "PAPER",
    };

    if (playerHand === computerHand) {
        message = 'DRAW!'
    } else {
        if (winsAgainst[playerHand] === computerHand) {
            playerScore += 1;
            message = 'Player '
        } else {
            computerScore += 1;
            message = 'Computer '
        }
        
        if ((playerScore < 3 && computerScore < 3)) {
            message += 'Scores!';
        } else {
            message += 'WINS!';
        }
    }

    alert(message + '\n' + playerHand + '  vs  ' + computerHand + '\nPlayer: '+ playerScore + '  |  Computer: ' + computerScore);
}

function nodeGetComputerHand() {
    
    randomNumber = Math.floor(Math.random() * 3);
    return hands[randomNumber];
}