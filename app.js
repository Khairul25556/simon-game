
let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let started = false; //*Just storing false
let level = 0;

let h2 = document.querySelector('h2');

//**1st Process
document.addEventListener('keypress', function() {   
    if (started == false){ //* Code checks the value of started
        console.log('game is started');
        started = true; //* Now we change it to true
        levelUp();
    }
});

document.addEventListener('click', function() {   
    if (started == false){ //* Code checks the value of started
        console.log('game is started');
        started = true; //* Now we change it to true
        levelUp();
    }
});

document.addEventListener('touchstart', function() {   
    if (started == false){ //* Code checks the value of started
        console.log('game is started');
        started = true; //* Now we change it to true
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    }, 250);
}
//**2nd Process */
function levelUp() { //*while leveling up we need to change h2 and random button will flash
    userSeq = []; //*when leveling up, userSeq will be reset. So we need to select button from the begining everytime
    level++;
    h2.style.animation = 'none';
    h2.innerText = `Level ${level}`; //* h2 will change here
    let randIdx = Math.floor(Math.random() * 3); //* simple generating random num between 0 and 3
    let randColor = btns[randIdx]; //* now in randColor can  access rnadom Index that means specific button will be selected
    let randBtn = document.querySelector (`.${randColor}`); //* for accessing the button
    // console.log(randIdx);
    // gameSeq.push(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn); //* passing the randBtn variable to flash random button
};

let highestScoreElement = document.querySelector('#highest-score'); //* Element to show highest score

//* Get the highest score from localStorage (or default to 0)
let highestScore;

if (localStorage.getItem('highestScore')) {
    //* If there's a saved highest score in localStorage, get it and parse it to an integer
    highestScore = parseInt(localStorage.getItem('highestScore'));
} else {
    //* If no score is saved in localStorage, set highestScore to 0
    highestScore = 0;
}

highestScoreElement.innerText = `Highest Score: ${highestScore}`;

//**5th Process */
function checkAns(idx) {
   
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game over! Your score is <b>${level}</b>.<br>Press any key to start`;
        // document.querySelector('body').style.backgroundColor = 'red';
        document.querySelector('body').classList.remove('img');
        setTimeout(function(){
            document.querySelector('body').classList.add('img');
            // document.querySelector('body').style.backgroundColor = 'white';
        }, 350);

        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem('highestScore', highestScore); // Save highest score to localStorage
            highestScoreElement.innerText = `Highest Score: ${highestScore}`;
        }
        reset();
        
    }
}

//**3rd Process */ conneted to 5th process */
function btnPress() {
    let btn = this;
    userFlash(btn); //* passing the btn(this btn) variable to btnFlash. Now whatever we will click it will flash.

    userColor = btn.getAttribute('id'); //* (the btn we clicked)
    // console.log(userColor); 
    userSeq.push(userColor); //* add userColor to userSeq array

    checkAns(userSeq.length - 1); //* check last entered value
}

let allBtns = document.querySelectorAll ('.btn');
for (btn of allBtns) {
    btn.addEventListener('click',btnPress);
}

//**4th Process */ connected to the 5th process */
function reset() { //*for resetting after game is over
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
