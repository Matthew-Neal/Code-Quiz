// Javascript code

//Variables
let index = 0;
const timer = document.querySelector("#time");
let secondsLeft = 60;
let timerReturn = " ";
let checkAnswerDisplay = document.createElement("p");
let userName = " ";
let user = [];
let highscore = [];
let scoreArray = localStorage.getItem('highscore');

if (scoreArray) { // this checks if scoreArray already exists 
    scoreArray = JSON.parse(scoreArray);
} else {
    scoreArray = [];
}




//Question Arrays
const questions = [
    {
        question: `What is two + two?`,
        answers: [`one`, `two`, `three`, `four`,],
        correctAnswer: `four`,
    },
    {
        question: `What name is short for Robert?`,
        answers: [`Bob`, `Bill`, `Will`, `Dick`],
        correctAnswer: `Bob`,
    },
    {
        question: `What name is my name?`,
        answers: [`Bob`, `Bill`, `Matt`, `Dick`],
        correctAnswer: `Matt`,
    },
    {
        question: `What name is my dog's name?`,
        answers: [`Bob`, `Akela`, `Will`, `Dick`],
        correctAnswer: `Akela`,
    },
    {
        question: `Are you hungry?`,
        answers: [`No`, `Maybe`, `Yes`, `A little`],
        correctAnswer: `Yes`,
    },
];



//TIMER
function time() {
    secondsLeft--;

    if (secondsLeft <= 0) {
        secondsLeft = 0;
    }

    timer.textContent = secondsLeft;
};

//Timer Start
function startTimer() {
    let timerInterval = setInterval(time, 1000);
    return timerInterval;
};

//Timer Stop
function stopTimer() {
    clearInterval(timerReturn);
    timer.textContent = '';
}

//Quiz Functions
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    //Start Timer
    timerReturn = startTimer();
    //Hides start instrctions and starts quiz
    quizHeader.style.display = "none";
    startDisplay.style.display = "none";
    //Questions
    createQuestionDisplay();
});

//Questions and Answer Checking
function createQuestionDisplay() {
    let ul = document.getElementById("qa");
    const currentQ = questions[index];
    let li = document.createElement("li");
    const questionh1 = document.createElement("h1");
    questionh1.textContent = currentQ.question;
    console.log(currentQ);//Test
    li.className = "my-2";
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    li.appendChild(questionh1);
    ul.appendChild(li);
    for (let i = 0; i < currentQ.answers.length; i++) {
        var answerChoices = currentQ.answers[i];
        var answersli = document.createElement("li");
        var button = document.createElement("button");
        button.setAttribute("value", answerChoices);
        button.textContent = answerChoices;
        button.className += "btn btn-info my-2";
        ul.appendChild(answersli);
        answersli.appendChild(button);
        button.onclick = checkAnswer;
    }
}

//Answer Checking Function

function checkAnswer() {
    if (this.value !== questions[index].correctAnswer) {
        console.log(this.value);
        checkAnswerDisplay.textContent = "Incorrect";
        checkAnswerDisplay.style.textAlign = "center";
        answerCheck.appendChild(checkAnswerDisplay);
        secondsLeft = secondsLeft - 10; //Time deduction
        console.log(secondsLeft);
        timer.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            endQuiz();
        }
    } else {
        checkAnswerDisplay.textContent = "Correct";
        checkAnswerDisplay.style.textAlign = "center";
        answerCheck.appendChild(checkAnswerDisplay);
    }
    index++;
    if (index === questions.length) {
        endQuiz();
    }
    createQuestionDisplay();
}

//Stops Quiz
function endQuiz() {
    stopTimer();

    quizHeader.style.display = "none";
    startDisplay.style.display = "none";
    qa.style.display = "none";
    answerCheck.style.display = "none";

    //HIGHSCORE LOCAL VARIABLES
    /*Description: Variables needed in order to collect and store highscores. Creates Initial Input Display.*/
    const highscoreInputHeader = document.createElement("h1");
    const highscoreInputHeaderText = document.createTextNode("Highscores");
    let score = secondsLeft; //Calculates score and time remaining
    const scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Your final score is " + score + ".";
    const initialsInputLabel = document.createElement("LABEL");
    initialsInputLabel.textContent = "Enter initials: ";
    initialsInputLabel.className += "mr-1"
    const initialsInput = document.createElement("INPUT");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("value", " ");
    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.className += "btn btn-info ml-1";

    //Submit High Score
    submitButton.onclick = function (event) {
        event.preventDefault;
        //Prompt for initials to save for high score
        let userName = initialsInput.value;
        console.log(userName);
        //Store in local storage
        function storeHighscore() {
            scoreArray.push({ user: userName, score: score });
            localStorage.setItem('highscore', JSON.stringify(scoreArray))
            // scoreArray = [{ user: userName, score: score },  { user: userName, score: score }]
        }
        //STORE USER
        storeHighscore();
        highscoresDisplay();
    };

    //Displays Highscore Input Area in HTML
    highscoreInputHeader.appendChild(highscoreInputHeaderText);
    highscoreContent.appendChild(highscoreInputHeader);
    highscoreContent.appendChild(scoreDisplay);
    highscoreContent.appendChild(initialsInputLabel);
    highscoreContent.appendChild(initialsInput);
    highscoreContent.appendChild(submitButton);

}

//VIEW HIGHSCORE BUTTON
const highscoreButton = document.getElementById("highscorebtn");
highscoreButton.onclick = function (event) {
    event.preventDefault;
    answerCheck.style.display = "none";
    stopTimer();
    highscoresDisplay();
};

//Highscore Display
function highscoresDisplay() {
    /* Hide quiz instructions and start button as well as the questions and answers 
   and the Highscore input diplay page*/
    quizHeader.style.display = "none";
    startDisplay.style.display = "none";
    qa.style.display = "none";
    highscoreContent.style.display = "none";
    //Creates "Highscore" Header and collects data for localStorage
    const highscoreHeader = document.createElement("h1");
    const highscoreHeaderText = document.createTextNode("Highscores");
    const highscoreList = document.createElement("div");
    highscoreHeader.appendChild(highscoreHeaderText);
    highscoreDisplay.appendChild(highscoreHeader);
    for (let i = 0; i < scoreArray.length; i++) {
        let highscoreLatest = document.createElement("p");
        let highscoreLatestText = document.createTextNode(
            scoreArray[i].user +
            " - " +
            scoreArray[i].score
        );
        highscoreLatest.appendChild(highscoreLatestText);
        highscoreList.appendChild(highscoreLatest);
    };
    highscoreDisplay.appendChild(highscoreList);
    //GO BACK BUTTON
    const goBackButton = document.createElement("button");
    goBackButton.innerHTML = "Go Back";
    goBackButton.className += "btn btn-info mr-3";
    goBackButton.onclick = function (event) {
        event.preventDefault;
        window.location.reload();
    };

    //CLEAR BUTTON
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear Highscore";
    clearButton.className += "btn btn-info";
    clearButton.onclick = function (event) {
        event.preventDefault;
        window.localStorage.clear();
        highscoreList.innerHTML = '';

    };

    //Displays highscore information
    highscoreDisplay.appendChild(goBackButton);
    highscoreDisplay.appendChild(clearButton);

    //Disable View Highscore Button
    highscoreButton.disabled = true;
}