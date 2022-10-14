const question = document.querySelector('#question');
const option = Array.from(document.querySelectorAll('.option-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#question');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the outer most color of the rainbow?',
        choice1: 'purple'
        choice2: 'red'
        choice3: 'yellow'
        answer: '2'
    },


    {
        question: 'How many continents are there in the world?',
        choice1: '10'
        choice2: '5'
        choice3: '7'
        answer: '3'
    },


    {
        question: 'What do humans mostly breathe in?',
        choice1: 'nitrogen'
        choice2: 'oxygen'
        choice3: 'carbon dioxide'
        answer: '2'
    },


    {
        question: 'What is the freezing temperature of water?',
        choice1: '40 °F'
        choice2: '22 °F'
        choice3: '32 °F'
        answer: '3'
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

        questionCounter++
        progressText.innerText `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() *availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question


        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true

    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startGame()