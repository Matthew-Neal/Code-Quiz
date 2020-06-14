// Javascript code to make the quiz function

// Variables

let index = 0;
const timer = document.querySelector(#time);
let secondsLeft = 60;
let timerReturn = " ";


//Question Arrays
const questions = [
    {
        question: `What is 2 + 2?`,
        answers: [`1`, `2`, `3`, `4`],
        correctAnswer: `4`,
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



//Timer Functions
function startTimer() {

}

function stopTimer() {

}

//Start Quiz

startButton.addEventListener("click", functoin(event) {
    event.preventDefault();
    timerReturn = startTimer();
    quizHeader.style.display = "none";
    startquiz.style.display = "none";
    startQuestions();
});

function startQuestions() {
    let ul = document.getElementById("question1")
    const currentQuestion = questions[index];
    let li = document.createElement("li");
    const questionMain = document.createElement("h1");
    questionMain.textContent = currentQuestion.question;
    li.className = "q2";
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    li.appendChild(questionMain);
    ul.appendChild(li);
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let answerChoice = currentQuestion.answers[i];
        let answersli = document.createElement("li");
        let button = document.createElement("button");
        button.setAttribute("value", answerChoice);
        button.textContent = answerChoice;
        button.className += "btn btn-info q2"
        ul.appendChild(answersli);
        answersli.appendChild(button);
        button.onclick = checkAnswer;
    }
}
