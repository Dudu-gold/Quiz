const questions = [
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Nile", correct: false },
            { text: "Mekong", correct: false },
            { text: "Amazon", correct: true },
            { text: "Congo", correct: false }
        ]
    },
    {
        question: "Which gas is the lightest?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Ammonia", correct: false },
            { text: "Oxygen", correct: false }
        ]
    },
    {
        question: "What is the first element on the periodic table?",
        answers: [
            { text: "Helium", correct: false },
            { text: "Hydrogen", correct: true },
            { text: "Ammonia", correct: false },
            { text: "Oxygen", correct: false }
        ]
    },
    {
        question: "What is the largest planet in the solar system?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mercury", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "How many days is in a week?",
        answers: [
            { text: "Five", correct: false },
            { text: "Ten", correct: false },
            { text: "Seven", correct: true },
            { text: "Nine", correct: false }
        ]
    }
//Add more questions
    
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const TIME_LIMIT = 60; // seconds

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const questionNumberDisplay = document.getElementById('question-number');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    updateUI();
    startTimer();
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function showQuestion(question) {
    questionText.innerText = question.question;
    answerButtons.innerHTML = '';
    
    for (let i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        const button = document.createElement('button');
        button.innerText = `${String.fromCharCode(65 + i)}. ${answer.text}`; // Alphabetical numbering
        button.classList.add('answer-button');
        
        button.addEventListener('click', () => {
            handleAnswer(answer);
        });
        
        answerButtons.appendChild(button);
    }
}

function handleAnswer(answer) {
    if (answer.correct) {
        score++;
        alert('Correct!');
    } else {
        alert('Incorrect! Try again.');
    }
    updateUI();
    nextButton.classList.remove('hidden');
}

function handleTimeout() {
    questionText.innerText = `Time's up! Your final score is ${score}`;
    answerButtons.innerHTML = '';
    nextButton.classList.add('hidden');
}

function updateUI() {
    showQuestion(questions[currentQuestionIndex]);
    questionNumberDisplay.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    scoreDisplay.innerText = `Score: ${score} / ${questions.length}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateUI();
        nextButton.classList.add('hidden');
    } else {
        questionText.innerText = `Quiz finished! Your final score is ${score} / ${questions.length}`;
        answerButtons.innerHTML = '';
        nextButton.classList.add('hidden');
        clearInterval(timerInterval);
    }
});

startQuiz();