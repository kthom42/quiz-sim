const question = document.querySelector('#question')
const option = Array.from(document.querySelectorAll('.option-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the outer most color of the rainbow?',
        option1: 'purple',
        option2: 'red',
        option3: 'yellow',
        answer: '2',
    },


    {
        question: 'How many continents are there in the world?',
        option1: '10',
        option2: '5',
        option3: '7',
        answer: '3',
    },


    {
        question: 'What do humans mostly breathe in?',
        option1: 'nitrogen',
        option2: 'oxygen',
        option3: 'carbon dioxide',
        answer: '2',
    },


    {
        question: 'What is the freezing temperature of water?',
        option1: '40 °F',
        option2: '22 °F',
        option3: '32 °F',
        answer: '3',
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

        questionCounter++
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

        const questionsIndex = Math.floor(Math.random() *availableQuestions.length)
        currentQuestion = availableQuestions[questionsIndex]
        question.innerText = currentQuestion.question


        option.forEach(choice => {
            const number = option.dataset['number']
            option.innerText = currentQuestion['option' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true

    
}

option.forEach(option => {
    option.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedOption = e.target
        const selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedOption.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

}

startQuiz()