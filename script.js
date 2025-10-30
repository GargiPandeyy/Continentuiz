let currentQuestion = 0;
let score = 0;
let difficulty = '';
let mode = '';
let hintsLeft = 0;
let skipsLeft = 0;
let timerInterval;
let timeLeft = 20;
let totalQuestions = 30;
let currentQuestions = [];

let questions = {
    easy: [
        {
            question: "Which is the largest continent by area?",
            answers: ["Asia", "Africa", "North America", "Europe"],
            correct: 0,
            hint: "It's home to China and India"
        },
        {
            question: "Which continent is known as the 'Dark Continent'?",
            answers: ["South America", "Africa", "Australia", "Antarctica"],
            correct: 1,
            hint: "Lions and elephants live here"
        },
        {
            question: "Which continent is the smallest by area?",
            answers: ["Europe", "Antarctica", "Australia", "South America"],
            correct: 2,
            hint: "It's also a country"
        },
        {
            question: "On which continent is the United States located?",
            answers: ["North America", "South America", "Europe", "Asia"],
            correct: 0,
            hint: "Canada is also on this continent"
        },
        {
            question: "Which continent is entirely in the Southern Hemisphere?",
            answers: ["Africa", "South America", "Antarctica", "Asia"],
            correct: 2,
            hint: "It's the coldest place on Earth"
        },
        {
            question: "Which continent has the most countries?",
            answers: ["Asia", "Africa", "Europe", "South America"],
            correct: 1,
            hint: "It has 54 countries"
        },
        {
            question: "Which continent is home to the Sahara Desert?",
            answers: ["Australia", "Asia", "Africa", "South America"],
            correct: 2,
            hint: "Egypt is on this continent"
        },
        {
            question: "Which continent is known as the 'New World'?",
            answers: ["Europe", "America", "Asia", "Africa"],
            correct: 1,
            hint: "Columbus sailed here"
        },
        {
            question: "Which continent has kangaroos?",
            answers: ["Africa", "South America", "Australia", "Asia"],
            correct: 2,
            hint: "Think of the Outback"
        },
        {
            question: "On which continent is Brazil located?",
            answers: ["Africa", "South America", "North America", "Asia"],
            correct: 1,
            hint: "Amazon rainforest is here"
        }
    ],
    medium: [
        {
            question: "Which continent has the longest coastline?",
            answers: ["Asia", "North America", "Africa", "Europe"],
            correct: 0,
            hint: "It's the biggest continent"
        },
        {
            question: "The Andes Mountains are located on which continent?",
            answers: ["Asia", "North America", "South America", "Africa"],
            correct: 2,
            hint: "Chile and Peru are here"
        },
        {
            question: "Which continent has no permanent human population?",
            answers: ["Antarctica", "Australia", "Arctic", "Greenland"],
            correct: 0,
            hint: "Only scientists visit"
        },
        {
            question: "The Alps mountain range is in which continent?",
            answers: ["Asia", "Europe", "Africa", "North America"],
            correct: 1,
            hint: "Switzerland and France are here"
        },
        {
            question: "Which continent is also known as the 'Island Continent'?",
            answers: ["Antarctica", "Greenland", "Australia", "Madagascar"],
            correct: 2,
            hint: "Koalas live here"
        },
        {
            question: "Which continent has the most population?",
            answers: ["Africa", "Europe", "Asia", "North America"],
            correct: 2,
            hint: "Over 4 billion people"
        },
        {
            question: "The Amazon Rainforest is primarily in which continent?",
            answers: ["Africa", "Asia", "Australia", "South America"],
            correct: 3,
            hint: "Brazil is the main country"
        },
        {
            question: "Which continent is home to the Gobi Desert?",
            answers: ["Africa", "Asia", "Australia", "South America"],
            correct: 1,
            hint: "It's in Mongolia and China"
        },
        {
            question: "Vatican City is located on which continent?",
            answers: ["Asia", "Europe", "Africa", "Australia"],
            correct: 1,
            hint: "It's inside Rome, Italy"
        },
        {
            question: "Which continent is crossed by the Equator?",
            answers: ["All of these", "Africa", "South America", "Asia"],
            correct: 0,
            hint: "More than one continent"
        }
    ],
    hard: [
        {
            question: "Which continent has the highest average elevation?",
            answers: ["Asia", "Antarctica", "South America", "Africa"],
            correct: 1,
            hint: "Thick ice sheets raise it"
        },
        {
            question: "The Great Rift Valley is located in which continent?",
            answers: ["Asia", "Africa", "South America", "Australia"],
            correct: 1,
            hint: "Runs through Ethiopia and Kenya"
        },
        {
            question: "Which continent was the last to be discovered by humans?",
            answers: ["Australia", "Antarctica", "America", "Arctic"],
            correct: 1,
            hint: "Too cold for early humans"
        },
        {
            question: "Which continent has the fewest flowering plant species?",
            answers: ["Antarctica", "Australia", "Europe", "Arctic"],
            correct: 0,
            hint: "Almost nothing grows there"
        },
        {
            question: "Lake Baikal, the deepest lake, is on which continent?",
            answers: ["Europe", "Asia", "North America", "Africa"],
            correct: 1,
            hint: "It's in Siberia, Russia"
        },
        {
            question: "Which continent moves the fastest due to tectonic plates?",
            answers: ["Australia", "Africa", "South America", "Antarctica"],
            correct: 0,
            hint: "Moving north about 7cm per year"
        },
        {
            question: "The Atacama Desert, driest place on Earth, is in which continent?",
            answers: ["Africa", "Asia", "Australia", "South America"],
            correct: 3,
            hint: "It's in Chile"
        },
        {
            question: "Which continent has the most freshwater?",
            answers: ["Asia", "North America", "South America", "Antarctica"],
            correct: 3,
            hint: "It's frozen as ice"
        },
        {
            question: "Mount Elbrus, Europe's highest peak, is in which country?",
            answers: ["Switzerland", "Russia", "France", "Italy"],
            correct: 1,
            hint: "In the Caucasus Mountains"
        },
        {
            question: "The Ring of Fire volcanic belt affects which continents most?",
            answers: ["Asia and America", "Africa and Europe", "Australia only", "Antarctica only"],
            correct: 0,
            hint: "Pacific Ocean region"
        }
    ]
};

function showScreen(screenId) {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function showDifficulty() {
    showScreen('difficultyScreen');
}

function selectDifficulty(level) {
    difficulty = level;
    if (level === 'easy') {
        hintsLeft = 3;
        skipsLeft = 1;
        totalQuestions = 15;
        currentQuestions = [...questions.easy.slice(0, 10), ...questions.medium.slice(0, 5)];
    } else if (level === 'medium') {
        hintsLeft = 2;
        skipsLeft = 1;
        totalQuestions = 30;
        currentQuestions = [...questions.easy, ...questions.medium, ...questions.hard];
    } else {
        hintsLeft = 0;
        skipsLeft = 0;
        totalQuestions = 30;
        currentQuestions = [...questions.easy, ...questions.medium, ...questions.hard];
    }
    document.getElementById('hintsLeft').textContent = hintsLeft;
    document.getElementById('skipsLeft').textContent = skipsLeft;

    if (hintsLeft === 0) {
        document.getElementById('hintBtn').style.display = 'none';
    } else {
        document.getElementById('hintBtn').style.display = 'inline-block';
    }

    if (skipsLeft === 0) {
        document.getElementById('skipBtn').style.display = 'none';
    } else {
        document.getElementById('skipBtn').style.display = 'inline-block';
    }

    showScreen('modeScreen');
}

function selectMode(selectedMode) {
    mode = selectedMode;
    showScreen('quizScreen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion >= totalQuestions) {
        showVictory();
        return;
    }

    let q = currentQuestions[currentQuestion];

    document.getElementById('question').textContent = q.question;
    document.getElementById('current').textContent = currentQuestion + 1;
    document.getElementById('total').textContent = totalQuestions;
    document.getElementById('score').textContent = score;

    let progress = ((currentQuestion) / totalQuestions) * 100;
    document.getElementById('progress').style.width = progress + '%';

    let answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    q.answers.forEach((ans, index) => {
        let btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = ans;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });

    document.getElementById('hintText').classList.remove('show');
    document.getElementById('hintText').textContent = '';

    if (mode === 'timed') {
        startTimer();
    } else {
        document.getElementById('timer').style.display = 'none';
    }
}

function startTimer() {
    timeLeft = 20;
    let timerEl = document.getElementById('timer');
    timerEl.textContent = `Time: ${timeLeft}s`;
    timerEl.style.display = 'block';
    timerEl.style.color = '#ffc107';
    timerEl.style.animation = '';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 5 && timeLeft > 0) {
            timerEl.style.color = '#f44336';
            timerEl.style.animation = 'shake 0.5s ease infinite';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timerInterval);

    let q = currentQuestions[currentQuestion];

    let buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.onclick = null);

    if (selected === q.correct) {
        buttons[selected].classList.add('correct');
        score += 10;
        let scoreEl = document.getElementById('score');
        scoreEl.textContent = score;
        scoreEl.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            scoreEl.style.animation = '';
        }, 500);

        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 1000);
    } else {
        buttons[selected].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        setTimeout(() => {
            gameOver();
        }, 1500);
    }
}

function useHint() {
    if (hintsLeft <= 0) return;

    hintsLeft--;
    score = Math.max(0, score - 5);

    document.getElementById('hintsLeft').textContent = hintsLeft;
    let scoreEl = document.getElementById('score');
    scoreEl.textContent = score;
    scoreEl.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        scoreEl.style.animation = '';
    }, 500);

    let q = currentQuestions[currentQuestion];

    let hintDiv = document.getElementById('hintText');
    hintDiv.textContent = '💡 ' + q.hint;
    hintDiv.classList.add('show');

    if (hintsLeft === 0) {
        document.getElementById('hintBtn').disabled = true;
    }
}

function skipQuestion() {
    if (skipsLeft <= 0) return;

    skipsLeft--;
    score = Math.max(0, score - 5);

    document.getElementById('skipsLeft').textContent = skipsLeft;
    let scoreEl = document.getElementById('score');
    scoreEl.textContent = score;
    scoreEl.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        scoreEl.style.animation = '';
    }, 500);

    clearInterval(timerInterval);
    currentQuestion++;
    loadQuestion();

    if (skipsLeft === 0) {
        document.getElementById('skipBtn').disabled = true;
    }
}

function gameOver() {
    clearInterval(timerInterval);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('questionsAnswered').textContent = currentQuestion;
    document.getElementById('totalGameOver').textContent = totalQuestions;
    showScreen('gameOverScreen');
}

function showVictory() {
    clearInterval(timerInterval);
    document.getElementById('victoryScore').textContent = score;
    document.getElementById('victoryDifficulty').textContent = difficulty.toUpperCase();
    document.getElementById('victoryMode').textContent = mode.toUpperCase();
    showScreen('victoryScreen');
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    difficulty = '';
    mode = '';
    hintsLeft = 0;
    skipsLeft = 0;
    timeLeft = 20;
    totalQuestions = 30;
    currentQuestions = [];
    clearInterval(timerInterval);

    document.getElementById('hintBtn').disabled = false;
    document.getElementById('skipBtn').disabled = false;
    document.getElementById('hintBtn').style.display = 'inline-block';
    document.getElementById('skipBtn').style.display = 'inline-block';

    showScreen('storyScreen');
}
