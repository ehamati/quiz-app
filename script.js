// Mbingarkohet variablave dhe elementeve të DOM:
const startButton = document.getElementById('start-btn'); // Butoni për të filluar quiz-in
const nextButton = document.getElementById('next-btn'); // Butoni për të shkuar te pyetja tjetër
const questionContainerElement = document.getElementById('question-container'); // Kontenieri për pyetjet
const questionElement = document.getElementById('question'); // Elementi për të shfaqur pyetjen
const answerButtonsElement = document.getElementById('answer-buttons'); // Elementi për të shfaqur përgjigjet

// Variablat për gjendjen e quiz-it
let shuffledQuestions, currentQuestionIndex;
let quizScore = 0; // Pikët e quiz-it

// Vendosim dëgjuesit e ngjarjeve për butonat
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// Funksioni për të filluar quiz-in
function startGame() {
    startButton.classList.add('hide'); // Fsheh butonin e fillimit
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Përzierja e pyetjeve për të pasur një varg të renditur të rastësishëm
    currentQuestionIndex = 0; // Caktojë indeksin e pyetjes aktuale në fillim
    questionContainerElement.classList.remove('hide'); // Tregon kontenierin e pyetjeve
    setNextQuestion(); // Vendosim pyetjen e parë
    quizScore = 0; // Fillon pikët e quiz-it nga 0
    document.getElementById('right-answers').innerText = quizScore; // Përditëson numrin e përgjigjeve të sakta në faqe
}

// Funksioni për të vendosur pyetjen e ardhshme në ekran
function setNextQuestion() {
    resetState(); // Reseton gjendjen e ekranit përpara se të shfaqet pyetja e re
    showQuestion(shuffledQuestions[currentQuestionIndex]); // Shfaq pyetjen e re
}

// Funksioni për të shfaqur një pyetje në ekran
function showQuestion(question) {
    questionElement.innerText = question.question; // Shfaq tekstin e pyetjes
    question.answers.forEach((answer) => {
        const button = document.createElement('button'); // Krijon një element buton për secilën përgjigje
        button.innerText = answer.text; // Vendos tekst në buton nga përgjigja
        button.classList.add('btn'); // Shton një klasë për të stilitizuar butonin
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Nëse përgjigja është e saktë, vendos një atribut 'dataset' për të shënuar këtë
        }
        button.addEventListener('click', selectAnswer); // Dëgjon për ngjarjen e klikimit për përgjigjen
        answerButtonsElement.appendChild(button); // Shton butonin në kontenierin e përgjigjeve
    });
}

// Funksioni për të riresetuar gjendjen e ekranit
function resetState() {
    clearStatusClass(document.body); // Fshin klasat 'correct' dhe 'wrong' nga elementi <body> për të zbritur stilit e përgjigjeve të mëparshme
    nextButton.classList.add('hide'); // Fsheh butonin për të shkuar te pyetja tjetër
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); // Fshin të gjitha butonat e përgjigjeve të mëparshme përpara se të shfaqen ato të reja
    }
}

// Funksioni për të zgjedhur një përgjigje
function selectAnswer(e) {
    const selectedButton = e.target; // Përgjigja e zgjedhur nga përdoruesi
    const correct = selectedButton.dataset.correct; // Kontrollon nëse përgjigja është e saktë duke parë atributin 'dataset'

    setStatusClass(selectedButton, correct); // Vendos klasën për stilit bazuar në përgjigjen e zgjedhur

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide'); // Shfaq butonin për të shkuar te pyetja tjetër nëse ka pyetje të mbetura
    } else {
        startButton.innerText = 'Restart'; // Ndryshon tekstin e butonit fillestar në "Rifillo"
        startButton.classList.remove('hide'); // Shfaq butonin për të filluar quiz-in nga fillimi
    }

    if (correct === "true") {
        quizScore++; // Shto pikë nëse përgjigja është e saktë
        document.getElementById('right-answers').innerText = quizScore; // Përditëso numrin e përgjigjeve të sakta në faqe
    }
}

// Funksioni për të vendosur klasën e stilit për një buton
function setStatusClass(element, correct) {
    clearStatusClass(element); // Fshin klasën e stilit të mëparshëm për të parandaluar konflikte
    if (correct === "true") {
        element.classList.add('correct'); // Shton klasën 'correct' për të stilitizuar butonin si një përgjigje të saktë
    } else {
        element.classList.add('wrong'); // Shton klasën 'wrong' për të stilitizuar butonin si një përgjigje të gabuar
    }
}

// Funksioni për të fshirë klasën e stilit të një elementi
function clearStatusClass(element) {
    element.classList.remove('correct'); // Fshin klasën 'correct'
    element.classList.remove('wrong'); // Fshin klasën 'wrong'
}

// Lista e pyetjeve për quiz
const questions = [
    {
        question: 'Cila prej këtyre është një framework për JavaScript?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false },
        ],
    },
    {
        question: 'Kush është kryeministri i Shqipërisë?',
        answers: [
            { text: 'Edi Rama', correct: true },
            { text: 'Sali Berisha', correct: false },
            { text: 'Erjon Velija', correct: false },
            { text: 'Grida Duma', correct: false },
        ],
    },
    {
        question: 'Sa është 4*3?',
        answers: [
            { text: '6', correct: false },
            { text: '12', correct: true },
        ],
    },
];
